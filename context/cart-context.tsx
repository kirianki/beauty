"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/data"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  color?: string
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number, color?: string) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  subtotal: number
  shipping: number
  total: number
  itemCount: number
  whatsappNumber: string
  sendWhatsAppOrder: (product: Product, quantity: number, color?: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const whatsappNumber = "254708227810" // Replace with your actual WhatsApp number

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const sendWhatsAppOrder = (product: Product, quantity: number, color?: string) => {
    const message = `Hello! I would like to order:\n\n*${quantity}x ${product.name}*${color ? ` (Color: ${color})` : ""}\nPrice: $${(product.price * quantity).toFixed(2)}\n\nPlease let me know how to proceed with my order. Thank you!`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const addToCart = (product: Product, quantity: number, color?: string) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && (!color || item.color === color),
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images[0] || "/placeholder.svg",
            color,
          },
        ]
      }
    })

    // Open cart drawer when adding items
    setIsCartOpen(true)
  }

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 35 ? 0 : 5.99
  const total = subtotal + shipping
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    shipping,
    total,
    itemCount,
    whatsappNumber,
    sendWhatsAppOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

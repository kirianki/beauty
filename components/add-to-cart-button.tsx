"use client"

import { useState } from "react"
import { ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/data"

type AddToCartButtonProps = {
  product: Product
  quantity?: number
  color?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function AddToCartButton({
  product,
  quantity = 1,
  color,
  variant = "default",
  size = "default",
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity, color)
    setIsAdded(true)

    // Reset the button after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} ${isAdded ? "bg-green-500 hover:bg-green-600" : ""}`}
      onClick={handleAddToCart}
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added!
        </>
      ) : (
        <>
          {size !== "icon" && <ShoppingBag className="h-4 w-4 mr-2" />}
          {size === "icon" ? <ShoppingBag className="h-4 w-4" /> : "Add to Cart"}
        </>
      )}
    </Button>
  )
}

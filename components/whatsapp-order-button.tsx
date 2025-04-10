"use client"

import { useState } from "react"
import { PhoneIcon as WhatsappIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/data"

type WhatsAppOrderButtonProps = {
  product: Product
  quantity?: number
  color?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function WhatsAppOrderButton({
  product,
  quantity = 1,
  color,
  variant = "default",
  size = "default",
  className = "",
}: WhatsAppOrderButtonProps) {
  const { sendWhatsAppOrder } = useCart()
  const [isOrdering, setIsOrdering] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const handleOrder = () => {
    setIsOrdering(true)
    setShowEmoji(true)

    // Small delay to show the button state change
    setTimeout(() => {
      sendWhatsAppOrder(product, quantity, color)
      setIsOrdering(false)

      setTimeout(() => {
        setShowEmoji(false)
      }, 1000)
    }, 500)
  }

  return (
    <div className="relative">
      {showEmoji && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce-custom">💖</div>
      )}
      <Button
        variant={variant}
        size={size}
        className={`${className} ${isOrdering ? "bg-green-500 hover:bg-green-600" : ""} rounded-full transition-all duration-300`}
        onClick={handleOrder}
        disabled={isOrdering}
      >
        {isOrdering ? (
          "Opening WhatsApp..."
        ) : (
          <>
            {size !== "icon" && <WhatsappIcon className="h-4 w-4 mr-2" />}
            {size === "icon" ? <WhatsappIcon className="h-4 w-4" /> : "Order via WhatsApp"}
          </>
        )}
      </Button>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

type QuantitySelectorProps = {
  initialQuantity?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
  className?: string
}

export function QuantitySelector({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onChange,
  className = "",
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isAnimating, setIsAnimating] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
      animateChange()
    }
  }

  const increaseQuantity = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
      animateChange()
    }
  }

  const animateChange = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className={`flex items-center border rounded-full overflow-hidden border-pink-200 bg-white ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-none text-primary hover:bg-pink-50 interactive-element h-9 w-9"
        onClick={decreaseQuantity}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3 md:h-4 md:w-4" />
      </Button>
      <span
        className={`w-8 md:w-12 text-center transition-all duration-300 ${isAnimating ? "scale-125" : "scale-100"}`}
      >
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-none text-primary hover:bg-pink-50 interactive-element h-9 w-9"
        onClick={increaseQuantity}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3 md:h-4 md:w-4" />
      </Button>
    </div>
  )
}

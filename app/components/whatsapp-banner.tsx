"use client"

import { useState } from "react"
import { PhoneIcon as WhatsappIcon, X, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export function WhatsAppBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { whatsappNumber } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  if (!isVisible) return null

  const handleContactClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello! I'm interested in your products.")}`,
      "_blank",
    )
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md z-50 px-4">
      <div
        className={`bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between transition-all duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          <div className="relative">
            <WhatsappIcon className="h-6 w-6 mr-3" />
            {isHovered && (
              <>
                <Heart className="absolute -top-2 -right-2 h-3 w-3 text-pink-300 animate-pulse-slow" />
                <Star
                  className="absolute -bottom-2 -right-2 h-3 w-3 text-yellow-300 animate-pulse-slow"
                  style={{ animationDelay: "0.5s" }}
                />
              </>
            )}
          </div>
          <div>
            <p className="font-display font-medium">Order directly via WhatsApp!</p>
            <p className="text-sm text-green-100">Fast responses and personalized service</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-green-600 hover:bg-green-50 rounded-full button-glow"
            onClick={handleContactClick}
          >
            Contact Us
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-green-600 rounded-full"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

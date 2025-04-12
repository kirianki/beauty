"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { PhoneIcon as WhatsappIcon, Heart, Star } from "lucide-react"

interface WhatsAppBannerProps {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

const WhatsappBanner: React.FC<WhatsAppBannerProps> = ({ isVisible, setIsVisible }) => {
  const [isHovered, setIsHovered] = useState(false)

  if (!isVisible) {
    return null
  }

  const handleContactClick = () => {
    window.open("https://wa.me/YOUR_WHATSAPP_NUMBER", "_blank") // Replace with your WhatsApp number
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md z-50 px-4">
      <div
        className={`bg-gradient-to-r from-green-500 to-green-600 text-white p-3 md:p-4 rounded-2xl shadow-lg flex items-center justify-between transition-all duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          <div className="relative">
            <WhatsappIcon className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
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
            <p className="font-display font-medium text-sm md:text-base">Order directly via WhatsApp!</p>
            <p className="text-xs md:text-sm text-green-100 hidden sm:block">Fast responses and personalized service</p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-green-600 hover:bg-green-50 rounded-full button-glow text-xs md:text-sm px-2 md:px-3"
            onClick={handleContactClick}
          >
            Contact
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-green-600 rounded-full p-1 md:p-2"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WhatsappBanner

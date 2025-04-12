"use client"

import { useState } from "react"

type ColorSelectorProps = {
  colors?: string[] // Make colors optional
  onChange?: (color: string) => void
  className?: string
}

export function ColorSelector({ colors = [], onChange, className = "" }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0] || "")
  const [isAnimating, setIsAnimating] = useState(false)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
    onChange?.(color)
  }

  // Return null if no colors are provided or if the array is empty
  if (!colors || colors.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <h3 className="font-display font-medium mb-2 text-foreground">Colors</h3>
      <div className="flex gap-2">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-300 ${
              selectedColor === color
                ? "border-primary scale-110 shadow-md"
                : "border-transparent hover:border-pink-200"
            } interactive-element`}
            style={{
              background:
                color === "pink"
                  ? "linear-gradient(135deg, #faa5ba, #e8546f)"
                  : color === "purple"
                    ? "linear-gradient(135deg, #beade8, #9370cf)"
                    : color === "blue"
                      ? "linear-gradient(135deg, #bdcde3, #8293c3)"
                      : color === "silver"
                        ? "linear-gradient(135deg, #e5e7eb, #d1d5db)"
                        : color === "gold"
                          ? "linear-gradient(135deg, #fde68a, #f59e0b)"
                          : color === "clear"
                            ? "linear-gradient(135deg, #f8fafc, #f1f5f9)"
                            : color === "sparkle"
                              ? "linear-gradient(135deg, #faa5ba, #beade8, #bdcde3)"
                              : color === "rainbow"
                                ? "linear-gradient(to right, #faa5ba, #fde68a, #abbcad, #bdcde3, #beade8, #e3b19a)"
                                : "#ffffff",
            }}
            onClick={() => handleColorChange(color)}
            aria-label={`Select ${color} color`}
          ></button>
        ))}
      </div>
      <p
        className={`text-xs text-muted-foreground mt-2 capitalize transition-all duration-300 ${isAnimating ? "scale-110 text-primary" : "scale-100"}`}
      >
        Selected: {selectedColor}
      </p>
    </div>
  )
}
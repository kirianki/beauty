"use client";

import { useState, useEffect } from "react";
import type { MouseEvent } from "react";

export function CursorEffects() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [emojis] = useState(["✨", "💖", "💕", "💗", "💓", "💝", "🌸", "🎀"]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
      createEmojiTrail();
    };

    const createEmojiTrail = () => {
      const emoji = document.createElement("div");
      emoji.className = "emoji-trail";
      emoji.style.left = `${position.x}px`;
      emoji.style.top = `${position.y}px`;
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      document.body.appendChild(emoji);

      setTimeout(() => {
        emoji.remove();
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [position, emojis]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ${
        clicked ? "scale-150" : "scale-100"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${clicked ? "scale(1.5)" : "scale(1)"}`,
        background: "rgba(232, 160, 171, 0.5)",
        boxShadow: "0 0 10px 2px rgba(232, 160, 171, 0.3)",
      }}
    />
  );
}

export default CursorEffects;
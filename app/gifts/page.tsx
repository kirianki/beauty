import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Sparkles, Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getAllProducts } from "@/lib/data"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { MobileNav } from "@/components/mobile-nav"

export default function GiftsPage() {
  // For this example, we'll just show all products as potential gifts
  // In a real app, you might have a "isGift" flag or a gift category
  const giftProducts = getAllProducts().slice(0, 8)

  return (
    <div className="flex flex-col min-h-screen bg-pastel-gradient-animated">
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <MobileNav />
            <Link href="/" className="font-display font-bold text-xl text-primary flex items-center sparkle">
              <Sparkles className="h-5 w-5 mr-1 text-primary animate-pulse-slow" />
              <span className="magical-text">GlowGirl</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/new-arrivals"
                className="text-sm font-medium hover:text-primary transition-colors interactive-element"
              >
                New Arrivals
              </Link>
              <Link
                href="/categories/skincare"
                className="text-sm font-medium hover:text-primary transition-colors interactive-element"
              >
                Skincare
              </Link>
              <Link
                href="/categories/makeup"
                className="text-sm font-medium hover:text-primary transition-colors interactive-element"
              >
                Makeup
              </Link>
              <Link
                href="/categories/hair"
                className="text-sm font-medium hover:text-primary transition-colors interactive-element"
              >
                Hair
              </Link>
              <Link href="/gifts" className="text-sm font-medium text-primary transition-colors interactive-element">
                Gifts
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary interactive-element">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary">Gifts</span>
        </div>

        <div className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-100 to-lavender-100 p-8 md:p-12">
            <div className="absolute inset-0 sparkle-bg opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <Gift className="h-8 w-8 text-primary mr-3" />
                <h1 className="font-display text-3xl md:text-4xl font-bold gradient-text">Perfect Gifts</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Find the perfect gift for that special someone! Our curated selection of beauty products makes
                gift-giving easy and delightful. From starter kits to luxury sets, we have something for everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold gradient-text mb-6">Gift Ideas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {giftProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100 mb-12">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Gift Cards</h2>
          <p className="text-muted-foreground mb-6">
            Can't decide what to get? Our digital gift cards are the perfect solution! Available in various
            denominations, they let your loved ones choose exactly what they want.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-rose-100 to-lavender-100 p-6 rounded-xl text-center">
              <h3 className="font-display font-bold text-lg mb-2">Ksh 2,500 Gift Card</h3>
              <p className="text-sm text-muted-foreground mb-4">Perfect for small treats</p>
              <Button className="bg-primary hover:bg-primary/90 rounded-full w-full">Purchase</Button>
            </div>
            <div className="bg-gradient-to-r from-lavender-100 to-dustyblue-100 p-6 rounded-xl text-center">
              <h3 className="font-display font-bold text-lg mb-2">Ksh 5,000 Gift Card</h3>
              <p className="text-sm text-muted-foreground mb-4">Ideal for beauty essentials</p>
              <Button className="bg-primary hover:bg-primary/90 rounded-full w-full">Purchase</Button>
            </div>
            <div className="bg-gradient-to-r from-dustyblue-100 to-sage-100 p-6 rounded-xl text-center">
              <h3 className="font-display font-bold text-lg mb-2">Ksh 10,000 Gift Card</h3>
              <p className="text-sm text-muted-foreground mb-4">The ultimate beauty gift</p>
              <Button className="bg-primary hover:bg-primary/90 rounded-full w-full">Purchase</Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-rose-100">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Custom Gift Sets</h2>
          <p className="text-muted-foreground mb-6">
            Create a personalized gift set tailored to your recipient's preferences. Choose from our range of products
            and we'll package them beautifully with a handwritten note.
          </p>
          <Button className="bg-primary hover:bg-primary/90 rounded-full">Create Custom Gift</Button>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-rose-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 card-hover holographic">
      <Link href={`/products/${product.id}`} className="block aspect-square w-full overflow-hidden">
        <div className="relative w-full h-full bg-gradient-to-br from-rose-50 to-lavender-50">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-700"
          />
        </div>
      </Link>
      <div className="p-2 md:p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-display text-sm md:text-base font-medium hover:text-primary transition-colors duration-300 text-foreground line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-1 md:mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary text-sm md:text-base">Ksh {product.price.toFixed(2)}</span>
          <WhatsAppOrderButton
            product={product}
            size="sm"
            className="bg-green-500 hover:bg-green-600 rounded-full transform transition-transform duration-300 group-hover:scale-105 h-7 md:h-auto text-xs md:text-sm"
          />
        </div>
      </div>
    </div>
  )
}

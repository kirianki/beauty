import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { MobileNav } from "@/components/mobile-nav"

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.slug)
  const products = getProductsByCategory(params.slug)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
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
                className={`text-sm font-medium ${params.slug === "skincare" ? "text-primary" : "hover:text-primary"} transition-colors interactive-element`}
              >
                Skincare
              </Link>
              <Link
                href="/categories/makeup"
                className={`text-sm font-medium ${params.slug === "makeup" ? "text-primary" : "hover:text-primary"} transition-colors interactive-element`}
              >
                Makeup
              </Link>
              <Link
                href="/categories/hair"
                className={`text-sm font-medium ${params.slug === "hair" ? "text-primary" : "hover:text-primary"} transition-colors interactive-element`}
              >
                Hair
              </Link>
              <Link
                href="/gifts"
                className="text-sm font-medium hover:text-primary transition-colors interactive-element"
              >
                Gifts
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary">{category.name}</span>
        </div>

        <div className={`rounded-3xl p-4 md:p-8 mb-8 ${category.color}`}>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={60}
                height={60}
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{category.name}</h1>
              <p className="text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <h2 className="font-display text-xl font-medium text-foreground">No products found in this category</h2>
            <p className="text-muted-foreground mt-2">Check back soon for new additions!</p>
            <Button asChild className="mt-4 bg-primary hover:bg-primary/90 rounded-full">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 card-hover">
      <div className="absolute top-1 md:top-2 right-1 md:right-2 z-10 flex gap-1">
        {product.isNew && (
          <span className="bg-primary text-white text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
            New
          </span>
        )}
      </div>
      <Link href={`/products/${product.id}`} className="block aspect-square w-full overflow-hidden">
        <div className="relative w-full h-full bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-2 md:p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-display text-sm md:text-base font-medium hover:underline text-card-foreground line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-1 md:mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary text-sm md:text-base">Ksh {product.price.toFixed(2)}</span>
          <WhatsAppOrderButton
            product={product}
            size="sm"
            className="bg-green-500 hover:bg-green-600 rounded-full h-7 md:h-auto text-xs md:text-sm"
          />
        </div>
      </div>
    </div>
  )
}

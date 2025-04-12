import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Truck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { QuantitySelector } from "@/components/quantity-selector"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { ColorSelector } from "@/components/color-selector"
import { MobileNav } from "@/components/mobile-nav"

export default function ProductPage({ params }) {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId)

  if (!product) {
    return <div>Product not found</div>
  }

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
          <Link href="/" className="hover:text-primary interactive-element">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-primary interactive-element">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary">{product.name}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-md holographic">
              <div className="relative w-full h-full">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-xl border border-pink-200 cursor-pointer bg-white hover:border-primary transition-colors interactive-element"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 10vw"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              {product.isNew && (
                <span className="inline-block bg-primary text-white text-xs font-medium px-2 py-1 rounded-full mb-2 animate-pulse-slow">
                  New Arrival
                </span>
              )}
              <h1 className="font-display text-3xl font-bold text-foreground gradient-text">{product.name}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <div className="text-3xl font-bold text-primary neon-text">Ksh {product.price.toFixed(2)}</div>
            <Separator className="bg-pink-100" />
            <div className="diary-style">
              <h3 className="font-display font-medium mb-2 text-foreground">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            <div className="space-y-4">
              <ColorSelector colors={product.colors} />
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <QuantitySelector className="w-full sm:w-auto" />
                <WhatsAppOrderButton
                  product={product}
                  className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 rounded-full button-glow"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden sm:flex rounded-full border-pink-200 interactive-element"
                >
                  <Heart className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-xl">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping on orders over Ksh 3,500</span>
            </div>
            <Tabs defaultValue="details" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-lg interactive-element"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-lg interactive-element"
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="how-to-use"
                  className="data-[state=active]:bg-white data-[state=active]:text-primary rounded-lg interactive-element"
                >
                  How to Use
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4 animate-fade-in-up">
                <h3 className="font-display font-medium text-foreground">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index} className="interactive-element">
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="ingredients" className="pt-4 animate-fade-in-up">
                <h3 className="font-display font-medium mb-2 text-foreground">Ingredients</h3>
                <p className="text-muted-foreground">{product.ingredients}</p>
              </TabsContent>
              <TabsContent value="how-to-use" className="pt-4 animate-fade-in-up">
                <h3 className="font-display font-medium mb-2 text-foreground">How to Use</h3>
                <p className="text-muted-foreground">{product.howToUse}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center mb-6">
            <Sparkles className="h-5 w-5 text-primary mr-2 animate-pulse-slow" />
            <h2 className="font-display text-2xl font-bold gradient-text">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((product) => (
              <RelatedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatedProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-rose-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 card-hover">
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

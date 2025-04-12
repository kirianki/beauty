import Link from "next/link"
import Image from "next/image"
import { Search, Heart, ChevronRight, Sparkles, Star, Music, Gift, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getFeaturedProducts, getAllCategories } from "@/lib/data"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const categories = getAllCategories()

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
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex w-full max-w-sm items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 bg-muted/50 rounded-full border-pink-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-8 md:py-12 lg:py-24 bg-[url('/hero.jpeg?height=500&width=1200')] bg-cover bg-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
          <div className="absolute inset-0 hearts-pattern opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium mb-2 animate-bounce-custom">
                  ✨ New Collection Available!
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white drop-shadow-md neon-text">
                  Discover Your Natural Glow
                </h1>
                <p className="max-w-[600px] text-white text-sm md:text-xl drop-shadow">
                  Safe, fun, and age-appropriate beauty products designed especially for young skin.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full shadow-lg button-glow">
                    Shop Now
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/20 text-white border-white hover:bg-white/30 rounded-full backdrop-blur-sm"
                  >
                    View Collections
                  </Button>
                </div>
              </div>
              <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-float blob-shape mt-6 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-3xl"></div>
                <Image
                  src="/hero.jpg?height=500&width=500"
                  alt="Featured beauty products"
                  fill
                  className="object-cover mix-blend-overlay"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background to-transparent"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <div className="flex items-center">
                <Sparkles className="h-6 w-6 text-primary mr-2 animate-pulse-slow" />
                <h2 className="font-display text-2xl font-bold tracking-tight gradient-text">Featured Products</h2>
              </div>
              <Link href="/products" className="flex items-center text-primary hover:underline interactive-element">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-rose-50 to-lavender-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute inset-0 sparkle-bg opacity-10"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <div className="sticker inline-block mb-4 animate-bounce-custom">
                <Sparkles className="h-6 w-6 text-white mx-auto" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight gradient-text mb-2">Shop by Category</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Explore our magical collection of beauty products made just for you!
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 confetti-pattern opacity-5"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl effect-3d">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-200/30 to-lavender-200/30 mix-blend-overlay"></div>
                <Image
                  src="/natural.jpg?height=400&width=600"
                  alt="Natural ingredients"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 animate-float">
                  <div className="cute-badge">100% Natural</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-block bg-muted px-3 py-1 rounded-full text-primary text-sm font-medium">
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  Our Promise
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight gradient-text">
                  Safe Ingredients for Young Skin
                </h2>
                <p className="text-muted-foreground">
                  Our products are specially formulated with gentle, natural ingredients that are safe for young skin.
                  We never use harsh chemicals, parabens, or artificial fragrances.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center interactive-element">
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                      <Star className="h-3 w-3 text-primary" />
                    </div>
                    <span>Dermatologist tested</span>
                  </li>
                  <li className="flex items-center interactive-element">
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                      <Star className="h-3 w-3 text-primary" />
                    </div>
                    <span>No harsh chemicals</span>
                  </li>
                  <li className="flex items-center interactive-element">
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                      <Star className="h-3 w-3 text-primary" />
                    </div>
                    <span>Cruelty-free</span>
                  </li>
                </ul>
                <Button className="bg-primary hover:bg-primary/90 rounded-full button-glow">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-candy-50 to-bubblegum-50 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <div className="washi-tape">
                <h2 className="font-display text-2xl font-bold tracking-tight gradient-text mb-2">Why Girls Love Us</h2>
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                Join thousands of happy customers who love our products!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-md border border-pink-100 doodle-border hover:shadow-lg transition-all duration-300 animate-fade-in-up">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Music className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-center mb-2 text-primary">Fun & Playful</h3>
                <p className="text-center text-muted-foreground">
                  Our products are designed to be fun and playful, making beauty routines enjoyable for young girls.
                </p>
              </div>
              <div
                className="bg-white p-6 rounded-3xl shadow-md border border-pink-100 doodle-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gift className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-center mb-2 text-primary">Perfect Gifts</h3>
                <p className="text-center text-muted-foreground">
                  Our beautifully packaged products make perfect gifts for birthdays, holidays, or special occasions.
                </p>
              </div>
              <div
                className="bg-white p-6 rounded-3xl shadow-md border border-pink-100 doodle-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-center mb-2 text-primary">Boost Confidence</h3>
                <p className="text-center text-muted-foreground">
                  Our products help young girls express themselves and boost their confidence in a healthy way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white mt-8 md:mt-16">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="font-display font-semibold mb-3 text-primary">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/new-arrivals"
                    className="text-sm text-muted-foreground hover:text-primary interactive-element"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-sm text-muted-foreground hover:text-primary interactive-element"
                  >
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="/gifts" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    Gift Sets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-3 text-primary">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    Ingredients
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-3 text-primary">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-3 text-primary">Connect</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Sign up for our newsletter to receive updates and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input placeholder="Your email" className="rounded-full border-pink-200" />
                <Button variant="outline" size="sm" className="rounded-full button-glow">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground">© 2025 GlowGirl. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary interactive-element">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* Update the ProductCard component to use more modern colors and fix image display */
function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-rose-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 card-hover holographic">
      <div className="absolute top-1 md:top-2 right-1 md:right-2 z-10 flex gap-1">
        {product.isNew && (
          <span className="bg-primary text-white text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-full animate-pulse-slow">
            New
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
        >
          <Heart className="h-3 w-3 md:h-4 md:w-4 text-primary" />
        </Button>
      </div>
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
        <h3 className="font-display text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
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

/* Update the CategoryCard component to use more modern colors */
function CategoryCard({ category }) {
  return (
    <Link href={`/categories/${category.slug}`} className="group relative overflow-hidden rounded-3xl">
      <div
        className={`aspect-square overflow-hidden ${category.color} p-4 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:shadow-xl blob-shape`}
      >
        <div className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mb-3 shadow-sm group-hover:animate-pulse-slow">
          <div className="relative w-10 h-10">
            <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
          </div>
        </div>
        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {category.description}
        </p>
      </div>
    </Link>
  )
}

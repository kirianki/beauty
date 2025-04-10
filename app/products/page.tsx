import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, Sparkles, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getAllProducts, getAllCategories } from "@/lib/data"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"

export default function ProductsPage() {
  const products = getAllProducts()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
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
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight gradient-text">All Products</h1>
            <p className="text-muted-foreground">Browse our magical collection of beauty products</p>
          </div>
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-1 rounded-full">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gradient-to-b from-rose-50 to-white">
                <SheetHeader>
                  <SheetTitle className="text-primary font-display">Filter Products</SheetTitle>
                  <SheetDescription>Narrow down your product search with these filters.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div>
                    <h3 className="font-display font-medium mb-3 text-primary">Category</h3>
                    <div className="grid gap-2">
                      {categories.map((category) => (
                        <Label key={category.id} className="flex items-center gap-2 font-normal">
                          <Checkbox id={`category-${category.slug}`} /> {category.name}
                        </Label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-medium mb-3 text-primary">Price Range</h3>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="price-under10" /> Under $10
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="price-10to20" /> $10 - $20
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="price-20to30" /> $20 - $30
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="price-over30" /> Over $30
                      </Label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-medium mb-3 text-primary">Age Range</h3>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="age-6-8" /> 6-8 years
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="age-8-12" /> 8-12 years
                      </Label>
                      <Label className="flex items-center gap-2 font-normal">
                        <Checkbox id="age-12-16" /> 12-16 years
                      </Label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-full">Apply Filters</Button>
                    <Button variant="outline" className="flex-1 rounded-full">
                      Reset
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 my-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="flex gap-1 rounded-full bg-white">
            Category <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1 rounded-full bg-white">
            Price <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1 rounded-full bg-white">
            Age Range <ChevronDown className="h-4 w-4" />
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              className={`rounded-full ${category.color} border border-border`}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mx-auto rounded-full border-border text-primary">
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 card-hover">
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        {product.isNew && <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">New</span>}
      </div>
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-display font-medium hover:underline text-card-foreground">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
          <WhatsAppOrderButton product={product} size="sm" className="bg-green-500 hover:bg-green-600 rounded-full" />
        </div>
      </div>
    </div>
  )
}

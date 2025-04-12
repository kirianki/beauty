"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, Sparkles, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getAllProducts, getAllCategories } from "@/lib/data"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { MobileNav } from "@/components/mobile-nav"
import type { Product } from "@/lib/data"

export default function ProductsPage() {
  const allProducts = getAllProducts()
  const categories = getAllCategories()
  const [products, setProducts] = useState<Product[]>(allProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[]
    priceRanges: string[]
    ageRanges: string[]
  }>({
    categories: [],
    priceRanges: [],
    ageRanges: [],
  })
  const [sortOption, setSortOption] = useState("featured")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Price range options
  const priceRanges = [
    { id: "price-under10", label: "Under Ksh 1,000", min: 0, max: 1000 },
    { id: "price-10to20", label: "Ksh 1,000 - Ksh 2,000", min: 1000, max: 2000 },
    { id: "price-20to30", label: "Ksh 2,000 - Ksh 3,000", min: 2000, max: 3000 },
    { id: "price-over30", label: "Over Ksh 3,000", min: 3000, max: Number.POSITIVE_INFINITY },
  ]

  // Age range options
  const ageRanges = [
    { id: "age-6-8", label: "6-8 years", range: "6-8" },
    { id: "age-8-12", label: "8-12 years", range: "8-12" },
    { id: "age-12-16", label: "12-16 years", range: "12-16" },
  ]

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply category filters
    if (activeFilters.categories.length > 0) {
      result = result.filter((product) => activeFilters.categories.includes(product.category.toLowerCase()))
    }

    // Apply price range filters
    if (activeFilters.priceRanges.length > 0) {
      result = result.filter((product) => {
        return activeFilters.priceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId)
          if (range) {
            return product.price >= range.min && product.price < range.max
          }
          return false
        })
      })
    }

    // Apply age range filters
    if (activeFilters.ageRanges.length > 0) {
      result = result.filter((product) => {
        return activeFilters.ageRanges.some((rangeId) => {
          const range = ageRanges.find((r) => r.id === rangeId)
          if (range) {
            return product.ageRange.includes(range.range)
          }
          return false
        })
      })
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result = result.filter((product) => product.isNew).concat(result.filter((product) => !product.isNew))
        break
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      // Default is "featured", which uses the original order
    }

    setFilteredProducts(result)
  }, [allProducts, activeFilters, sortOption, searchQuery])

  const handleCategoryFilter = (category: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const categoryName = category.toLowerCase()
      if (checked) {
        return { ...prev, categories: [...prev.categories, categoryName] }
      } else {
        return { ...prev, categories: prev.categories.filter((c) => c !== categoryName) }
      }
    })
  }

  const handlePriceRangeFilter = (rangeId: string, checked: boolean) => {
    setActiveFilters((prev) => {
      if (checked) {
        return { ...prev, priceRanges: [...prev.priceRanges, rangeId] }
      } else {
        return { ...prev, priceRanges: prev.priceRanges.filter((id) => id !== rangeId) }
      }
    })
  }

  const handleAgeRangeFilter = (rangeId: string, checked: boolean) => {
    setActiveFilters((prev) => {
      if (checked) {
        return { ...prev, ageRanges: [...prev.ageRanges, rangeId] }
      } else {
        return { ...prev, ageRanges: prev.ageRanges.filter((id) => id !== rangeId) }
      }
    })
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryClick = (categoryName: string) => {
    const isAlreadyActive = activeFilters.categories.includes(categoryName.toLowerCase())

    if (isAlreadyActive) {
      setActiveFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== categoryName.toLowerCase()),
      }))
    } else {
      setActiveFilters((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryName.toLowerCase()],
      }))
    }
  }

  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      priceRanges: [],
      ageRanges: [],
    })
    setSearchQuery("")
  }

  const hasActiveFilters =
    activeFilters.categories.length > 0 ||
    activeFilters.priceRanges.length > 0 ||
    activeFilters.ageRanges.length > 0 ||
    searchQuery.length > 0

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
            <div className="relative w-full max-w-sm hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 rounded-full"
                value={searchQuery}
                onChange={handleSearch}
              />
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
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-1 rounded-full flex-1 md:flex-none">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 bg-primary text-white">
                      {activeFilters.categories.length +
                        activeFilters.priceRanges.length +
                        activeFilters.ageRanges.length +
                        (searchQuery ? 1 : 0)}
                    </Badge>
                  )}
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
                          <Checkbox
                            id={`category-${category.slug}`}
                            checked={activeFilters.categories.includes(category.name.toLowerCase())}
                            onCheckedChange={(checked) => handleCategoryFilter(category.name, checked as boolean)}
                          />
                          {category.name}
                        </Label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-medium mb-3 text-primary">Price Range</h3>
                    <div className="grid gap-2">
                      {priceRanges.map((range) => (
                        <Label key={range.id} className="flex items-center gap-2 font-normal">
                          <Checkbox
                            id={range.id}
                            checked={activeFilters.priceRanges.includes(range.id)}
                            onCheckedChange={(checked) => handlePriceRangeFilter(range.id, checked as boolean)}
                          />
                          {range.label}
                        </Label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-medium mb-3 text-primary">Age Range</h3>
                    <div className="grid gap-2">
                      {ageRanges.map((range) => (
                        <Label key={range.id} className="flex items-center gap-2 font-normal">
                          <Checkbox
                            id={range.id}
                            checked={activeFilters.ageRanges.includes(range.id)}
                            onCheckedChange={(checked) => handleAgeRangeFilter(range.id, checked as boolean)}
                          />
                          {range.label}
                        </Label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90 rounded-full"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-full" onClick={resetFilters}>
                      Reset
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Select defaultValue={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[120px] md:w-[180px] rounded-full flex-1 md:flex-none">
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

        {/* Mobile search */}
        <div className="md:hidden relative my-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 rounded-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 my-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="rounded-full flex items-center gap-1 bg-white">
                Search: {searchQuery}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {activeFilters.categories.map((category) => (
              <Badge key={category} variant="outline" className="rounded-full flex items-center gap-1 bg-white">
                {category}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleCategoryFilter(category, false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {activeFilters.priceRanges.map((rangeId) => {
              const range = priceRanges.find((r) => r.id === rangeId)
              return (
                <Badge key={rangeId} variant="outline" className="rounded-full flex items-center gap-1 bg-white">
                  {range?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handlePriceRangeFilter(rangeId, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
            {activeFilters.ageRanges.map((rangeId) => {
              const range = ageRanges.find((r) => r.id === rangeId)
              return (
                <Badge key={rangeId} variant="outline" className="rounded-full flex items-center gap-1 bg-white">
                  {range?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleAgeRangeFilter(rangeId, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7" onClick={resetFilters}>
                Clear all
              </Button>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 my-6 overflow-x-auto pb-2 no-scrollbar">
          <Button variant="outline" size="sm" className="flex gap-1 rounded-full bg-white whitespace-nowrap">
            Category <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1 rounded-full bg-white whitespace-nowrap">
            Price <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1 rounded-full bg-white whitespace-nowrap">
            Age <ChevronDown className="h-4 w-4" />
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              className={`rounded-full ${category.color} border border-border whitespace-nowrap ${
                activeFilters.categories.includes(category.name.toLowerCase()) ? "bg-primary/10 border-primary" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="font-display text-xl font-medium text-foreground">No products found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or search criteria</p>
            <Button variant="outline" className="mt-4 rounded-full" onClick={resetFilters}>
              Reset filters
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

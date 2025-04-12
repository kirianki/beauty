import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"

export type Product = {
  id: number
  name: string
  slug: string
  category: string
  price: number
  description: string
  features: string[]
  ingredients: string
  howToUse: string
  images: string[]
  isFeatured: boolean
  isNew: boolean
  colors: string[]
  ageRange: string
}

export type Category = {
  id: number
  name: string
  slug: string
  description: string
  image: string
  color: string
}

export function getAllProducts(): Product[] {
  return productsData
}

export function getFeaturedProducts(): Product[] {
  return productsData.filter((product) => product.isFeatured)
}

export function getNewProducts(): Product[] {
  return productsData.filter((product) => product.isNew)
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((product) => product.slug === slug)
}

export function getProductById(id: number): Product | undefined {
  return productsData.find((product) => product.id === id)
}

export function getRelatedProducts(productId: number, limit = 4): Product[] {
  const currentProduct = getProductById(productId)
  if (!currentProduct) return []

  return productsData
    .filter(
      (product) =>
        product.id !== productId &&
        (product.category === currentProduct.category || product.ageRange === currentProduct.ageRange),
    )
    .slice(0, limit)
}

export function getAllCategories(): Category[] {
  return categoriesData
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesData.find((category) => category.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return []

  return productsData.filter((product) => product.category.toLowerCase() === category.name.toLowerCase())
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()

  return productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  )
}

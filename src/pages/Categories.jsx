import React, { useState, useEffect } from 'react'
import { ShoppingBag, ExternalLink, Plus, Trash2, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const Categories = () => {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [products, setProducts] = useState([])

  const categories = ['All', 'Electronics', 'Home & Kitchen', 'Fashion', 'Health & Wellness', 'Sports & Outdoors']
  const storeOptions = ['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'AJIO']

  // Initial products data (fallback if localStorage is empty)
  const initialProducts = [
    {
      id: 1,
      title: "Sony WH-1000XM5 Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      category: "Electronics",
      description: "Industry-leading noise cancellation with exceptional sound quality and 30-hour battery life.",
      price: "₹29,990",
      store: "Amazon",
      affiliateLink: "https://www.amazon.in/dp/B09XS7JWHH"
    },
    {
      id: 2,
      title: "Instant Pot Duo 7-in-1 Cooker",
      image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop",
      category: "Home & Kitchen",
      description: "Multi-use pressure cooker that speeds up cooking by 2-6 times while preserving nutrients.",
      price: "₹8,999",
      store: "Amazon",
      affiliateLink: "https://www.amazon.in/dp/B00W4M8P5O"
    },
    {
      id: 3,
      title: "Levi's 511 Slim Fit Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
      category: "Fashion",
      description: "Classic slim fit jeans with stretch comfort and timeless style for everyday wear.",
      price: "₹3,499",
      store: "Myntra",
      affiliateLink: "https://www.myntra.com/jeans/levis/levis-men-slim-fit-jeans/1234567"
    },
    {
      id: 4,
      title: "Fitbit Charge 5 Fitness Tracker",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
      category: "Health & Wellness",
      description: "Advanced health monitoring with ECG, stress management, and built-in GPS.",
      price: "₹14,999",
      store: "Amazon",
      affiliateLink: "https://www.amazon.in/dp/B094G5GLKJ"
    },
    {
      id: 5,
      title: "Yoga Mat Premium 6mm",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
      category: "Health & Wellness",
      description: "Non-slip, eco-friendly yoga mat with extra cushioning for comfortable practice.",
      price: "₹1,299",
      store: "Flipkart",
      affiliateLink: "https://www.flipkart.com/yoga-mat-premium-6mm/p/itme123456789"
    },
    {
      id: 6,
      title: "Nike Air Zoom Pegasus Running Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      category: "Sports & Outdoors",
      description: "Responsive cushioning and breathable mesh for comfortable runs on any terrain.",
      price: "₹10,995",
      store: "Myntra",
      affiliateLink: "https://www.myntra.com/sports-shoes/nike/nike-air-zoom-pegasus/2345678"
    },
    {
      id: 7,
      title: "Apple MacBook Air M2",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      category: "Electronics",
      description: "Ultra-thin laptop with powerful M2 chip, 18-hour battery, and stunning Liquid Retina display.",
      price: "₹1,19,900",
      store: "Amazon",
      affiliateLink: "https://www.amazon.in/dp/B0B3C7DQZG"
    },
    {
      id: 8,
      title: "Philips Air Fryer XXL",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
      category: "Home & Kitchen",
      description: "Large capacity air fryer for healthier cooking with rapid fat removal technology.",
      price: "₹12,999",
      store: "Flipkart",
      affiliateLink: "https://www.flipkart.com/philips-air-fryer-xxl/p/itme987654321"
    },
    {
      id: 9,
      title: "Columbia Waterproof Jacket",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop",
      category: "Sports & Outdoors",
      description: "Waterproof, breathable jacket with Omni-Tech technology for all-weather protection.",
      price: "₹6,499",
      store: "Amazon",
      affiliateLink: "https://www.amazon.in/dp/B08X7YZ5FQ"
    },
    {
      id: 10,
      title: "Ray-Ban Aviator Sunglasses",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      category: "Fashion",
      description: "Iconic aviator style with UV protection and crystal-clear lenses for timeless elegance.",
      price: "₹9,890",
      store: "Flipkart",
      affiliateLink: "https://www.flipkart.com/ray-ban-aviator-sunglasses/p/itme456789123"
    },
    {
      id: 11,
      title: "JBL Flip 6 Portable Speaker",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      category: "Electronics",
      description: "Waterproof portable speaker with powerful bass and 12-hour playtime.",
      price: "₹9,999",
      store: "Amazon",
      affiliateLink: "https://www.amazon.in/dp/B09Z1JH5XK"
    },
    {
      id: 12,
      title: "NordicTrack Treadmill",
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=300&fit=crop",
      category: "Sports & Outdoors",
      description: "Professional-grade treadmill with interactive training and advanced cushioning.",
      price: "₹89,999",
      store: "Amazon",
      affiliateLink: "https://www.amazon.in/dp/B08N5KWB9H"
    },
    {
      id: 13,
      title: "U.S. Polo Assn. Women Brand Print Sweatshirt",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
      category: "Fashion",
      description: "Premium pink printed sweatshirt with a round neck and long sleeves.",
      price: "₹1,999",
      store: "AJIO",
      affiliateLink: "https://www.ajio.com"
    },
    {
      id: 14,
      title: "NIKE Men Court Vision Low Shoes",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
      category: "Fashion",
      description: "Classic white sporty sneakers, perfect for basketball and casual wear.",
      price: "₹5,995",
      store: "AJIO",
      affiliateLink: "https://www.ajio.com"
    }
  ]

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('sallagar_products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(initialProducts)
    }
  }, [])

  // Set selected category from URL query param on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams, categories])

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('sallagar_products', JSON.stringify(products))
    }
  }, [products])

  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    title: '',
    image: '',
    category: 'Electronics',
    store: 'Amazon',
    price: '',
    description: '',
    affiliateLink: ''
  })

  // Handle adding a new product
  const handleAddProduct = (e) => {
    e.preventDefault()
    const productToAdd = {
      ...newProduct,
      id: Date.now() // Generate unique ID based on timestamp
    }
    setProducts([...products, productToAdd])
    // Reset form
    setNewProduct({
      title: '',
      image: '',
      category: 'Electronics',
      store: 'Amazon',
      price: '',
      description: '',
      affiliateLink: ''
    })
    setShowAdminForm(false)
  }

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id))
    }
  }

  // Store-specific button styling configuration
  const getStoreButtonStyle = (store) => {
    const styles = {
      Amazon: {
        bgClass: 'bg-orange-500 hover:bg-orange-600',
        buttonText: 'Buy on Amazon'
      },
      Flipkart: {
        bgClass: 'bg-gradient-to-r from-blue-500 to-yellow-400 hover:from-blue-600 hover:to-yellow-500',
        buttonText: 'Buy on Flipkart'
      },
      Meesho: {
        bgClass: 'bg-pink-500 hover:bg-pink-600',
        buttonText: 'Buy on Meesho'
      },
      Myntra: {
        bgClass: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600',
        buttonText: 'Buy on Myntra'
      },
      AJIO: {
        bgClass: 'bg-gray-800 hover:bg-gray-900',
        buttonText: 'Buy on AJIO'
      }
    }
    return styles[store] || styles.Amazon // Default to Amazon if store not found
  }

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-glow"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <ShoppingBag className="h-10 w-10 mr-4" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">Categories</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl font-light">
            Browse our recommended products by category
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Admin Toggle Button */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setShowAdminForm(!showAdminForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50"
          >
            {showAdminForm ? (
              <>
                <X className="h-5 w-5" />
                Close Admin Panel
              </>
            ) : (
              <>
                <span className="text-lg">✨</span>
                Add New Product
              </>
            )}
          </button>
          <button
            onClick={() => {
              if (window.confirm('This will reset all products to the default list. Any custom products you added will be lost. Continue?')) {
                localStorage.removeItem('sallagar_products')
                setProducts(initialProducts)
              }
            }}
            className="flex items-center gap-2 glassmorphism text-slate-700 px-5 py-3 rounded-2xl font-semibold transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-xl hover:shadow-emerald-200/50"
          >
            Reset to Default Products
          </button>
        </div>

        {/* Admin Form */}
        {showAdminForm && (
          <div className="glassmorphism rounded-3xl shadow-xl p-8 mb-12 animate-slide-down">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">✨</span>
              Add New Product
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Product title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                  >
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Store</label>
                  <select
                    required
                    value={newProduct.store}
                    onChange={(e) => setNewProduct({...newProduct, store: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                  >
                    {storeOptions.map((store) => (
                      <option key={store} value={store}>{store}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Price</label>
                  <input
                    type="text"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="₹9,999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Affiliate Link</label>
                  <input
                    type="url"
                    required
                    value={newProduct.affiliateLink}
                    onChange={(e) => setNewProduct({...newProduct, affiliateLink: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="https://amazon.in/dp/..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Short product description"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminForm(false)}
                  className="glassmorphism text-slate-700 px-8 py-3 rounded-2xl font-semibold transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-xl hover:shadow-emerald-200/50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-500 ease-out ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105 hover:scale-110'
                  : 'glassmorphism text-slate-700 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 shadow-md border border-white/50 hover:shadow-emerald-200/50 hover:-translate-y-1'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="glassmorphism rounded-3xl shadow-md overflow-hidden hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2 z-20">
                  <span className="bg-emerald-100/80 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300 z-20 backdrop-blur-sm hover:scale-110"
                  title="Delete product"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    {product.price}
                  </span>
                </div>
                
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-white py-3 px-4 rounded-2xl font-semibold flex items-center justify-center transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 ${getStoreButtonStyle(product.store).bgClass}`}
                >
                  {getStoreButtonStyle(product.store).buttonText}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg font-medium">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories

import React, { useState, useEffect } from 'react'
import { ShoppingBag, ExternalLink, Plus, Trash2, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const Categories = () => {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [products, setProducts] = useState([])

  const categories = ['All', 'Electronics', 'Home & Kitchen', 'Fashion', 'Health & Wellness', 'Sports & Outdoors']
  const storeOptions = ['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'AJIO']

  // Fetch products from Supabase on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }
    }

    fetchProducts()
  }, [])

  // Set selected category from URL query param on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams, categories])


  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    title: '',
    image_url: '',
    category: '',
    store: 'Amazon',
    price: '',
    description: '',
    affiliateLink: ''
  })

  // Handle adding a new product to Supabase
  const handleAddProduct = async (e) => {
    e.preventDefault()
    
    const productToAdd = {
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
      image_url: newProduct.image_url,
      category: newProduct.category,
      store: newProduct.store,
      affiliate_link: newProduct.affiliateLink
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productToAdd])
      .select()

    if (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product. Please try again.')
    } else {
      // Refresh products from Supabase
      const { data: refreshedData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (refreshedData) {
        setProducts(refreshedData)
      }
    }

    // Reset form
    setNewProduct({
      title: '',
      image_url: '',
      category: '',
      store: 'Amazon',
      price: '',
      description: '',
      affiliateLink: ''
    })
    setShowAdminForm(false)
  }

  // Handle deleting a product from Supabase
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product. Please try again.')
      } else {
        // Refresh products from Supabase
        const { data: refreshedData } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (refreshedData) {
          setProducts(refreshedData)
        }
      }
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
                    value={newProduct.image_url}
                    onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category (optional)</label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Enter or select category"
                    list="category-options"
                  />
                  <datalist id="category-options">
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </datalist>
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
                  src={product.image_url || product.image} 
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

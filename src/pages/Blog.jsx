import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Plus, Trash2, X } from 'lucide-react'
import { supabase } from '../supabaseClient'

const Blog = () => {
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [posts, setPosts] = useState([])
  const [currentLang, setCurrentLang] = useState('mr')

  const categoryOptions = ['Good Thoughts', 'Health & Ayurveda', 'Motivation']

  // Fetch posts from Supabase on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data || [])
      }
    }

    fetchPosts()
  }, [])

  // Form state for new blog post with multi-language support
  const [newPost, setNewPost] = useState({
    title: { en: '', mr: '', hi: '' },
    excerpt: { en: '', mr: '', hi: '' },
    content: { en: '', mr: '', hi: '' },
    image: '',
    category: 'Good Thoughts',
    readTime: ''
  })

  // Helper function to format current date
  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  }

  // Handle adding a new blog post to Supabase
  const handleAddPost = async (e) => {
    e.preventDefault()
    
    const postToAdd = {
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      image: newPost.image,
      category: newPost.category,
      read_time: newPost.readTime,
      date: getCurrentDate()
    }

    const { data, error } = await supabase
      .from('blogs')
      .insert([postToAdd])
      .select()

    if (error) {
      console.error('Error adding post:', error)
      alert('Failed to add blog post. Please try again.')
    } else {
      // Refresh posts from Supabase
      const { data: refreshedData } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (refreshedData) {
        setPosts(refreshedData)
      }
    }

    // Reset form
    setNewPost({
      title: { en: '', mr: '', hi: '' },
      excerpt: { en: '', mr: '', hi: '' },
      content: { en: '', mr: '', hi: '' },
      image: '',
      category: 'Good Thoughts',
      readTime: ''
    })
    setShowAdminForm(false)
  }

  // Handle deleting a blog post from Supabase
  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting post:', error)
        alert('Failed to delete blog post. Please try again.')
      } else {
        // Refresh posts from Supabase
        const { data: refreshedData } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (refreshedData) {
          setPosts(refreshedData)
        }
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-glow"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold text-white tracking-wide mb-4">Blog</h1>
          <p className="text-xl text-white/90 max-w-2xl font-light">
            Changle Vichar, Health, Ayurveda, ani Motivation - आयुष्याचा खरा सल्लागार
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Language Switcher */}
        <div className="mb-8 flex justify-center">
          <div className="bg-slate-900/10 backdrop-blur-sm border border-slate-300 rounded-full p-1 flex gap-2 inline-flex mx-auto">
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                currentLang === 'en' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                  : 'text-slate-700 hover:text-emerald-700 font-semibold transition-colors duration-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('mr')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                currentLang === 'mr' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                  : 'text-slate-700 hover:text-emerald-700 font-semibold transition-colors duration-200'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setCurrentLang('hi')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                currentLang === 'hi' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                  : 'text-slate-700 hover:text-emerald-700 font-semibold transition-colors duration-200'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

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
                Write New Blog
              </>
            )}
          </button>
        </div>

        {/* Admin Form */}
        {showAdminForm && (
          <div className="glassmorphism rounded-3xl shadow-xl p-8 mb-12 animate-slide-down">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">✨</span>
              Write New Blog Post
            </h2>
            <form onSubmit={handleAddPost} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title - English</label>
                  <input
                    type="text"
                    required
                    value={newPost.title.en}
                    onChange={(e) => setNewPost({...newPost, title: { ...newPost.title, en: e.target.value }})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Blog title in English"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title - मराठी</label>
                  <input
                    type="text"
                    required
                    value={newPost.title.mr}
                    onChange={(e) => setNewPost({...newPost, title: { ...newPost.title, mr: e.target.value }})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="ब्लॉगचे नाव मराठीत"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title - हिंदी</label>
                  <input
                    type="text"
                    required
                    value={newPost.title.hi}
                    onChange={(e) => setNewPost({...newPost, title: { ...newPost.title, hi: e.target.value }})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="ब्लॉग का शीर्षक हिंदी में"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description/Excerpt - English</label>
                  <textarea
                    required
                    value={newPost.excerpt.en}
                    onChange={(e) => setNewPost({...newPost, excerpt: { ...newPost.excerpt, en: e.target.value }})}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Short description in English"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description/Excerpt - मराठी</label>
                  <textarea
                    required
                    value={newPost.excerpt.mr}
                    onChange={(e) => setNewPost({...newPost, excerpt: { ...newPost.excerpt, mr: e.target.value }})}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="थोडक्यात माहिती मराठीत"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description/Excerpt - हिंदी</label>
                  <textarea
                    required
                    value={newPost.excerpt.hi}
                    onChange={(e) => setNewPost({...newPost, excerpt: { ...newPost.excerpt, hi: e.target.value }})}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="हिंदी में थोड़ी जानकारी"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Content - English</label>
                  <textarea
                    required
                    value={newPost.content.en}
                    onChange={(e) => setNewPost({...newPost, content: { ...newPost.content, en: e.target.value }})}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Full blog content in English"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Content - मराठी</label>
                  <textarea
                    required
                    value={newPost.content.mr}
                    onChange={(e) => setNewPost({...newPost, content: { ...newPost.content, mr: e.target.value }})}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="पूर्ण लेख मराठीत"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Content - हिंदी</label>
                  <textarea
                    required
                    value={newPost.content.hi}
                    onChange={(e) => setNewPost({...newPost, content: { ...newPost.content, hi: e.target.value }})}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="हिंदी में पूर्ण लेख"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL (फोटोची लिंक)</label>
                  <input
                    type="url"
                    required
                    value={newPost.image}
                    onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <select
                    required
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Read Time (उदा. 5 min read)</label>
                  <input
                    type="text"
                    required
                    value={newPost.readTime}
                    onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="5 min read"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Publish Blog
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="glassmorphism rounded-3xl shadow-md overflow-hidden hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02]">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                  <span className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    (typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category) === 'Good Thoughts' || (typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category) === 'चांगले विचार' || (typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category) === 'अच्छे विचार' ? 'bg-purple-100/80 text-purple-700' :
                    (typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category) === 'Health & Ayurveda' || (typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category) === 'आरोग्य आणि आयुर्वेद' || (typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category) === 'स्वास्थ्य और आयुर्वेद' ? 'bg-emerald-100/80 text-emerald-700' :
                    'bg-orange-100/80 text-orange-700'
                  }`}>
                    {typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="absolute top-4 right-4 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300 z-20 backdrop-blur-sm hover:scale-110"
                  title="Delete blog post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.read_time || post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {typeof post.title === 'object' ? (post.title[currentLang] || post.title['mr'] || post.title['en']) : post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {typeof post.excerpt === 'object' ? (post.excerpt[currentLang] || post.excerpt['mr'] || post.excerpt['en']) : post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors hover:translate-x-1"
                >
                  {currentLang === 'en' ? 'Read More' : currentLang === 'mr' ? 'अधिक वाचा' : 'और पढ़ें'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600 mb-3">अजून एकही ब्लॉग उपलब्ध नाही</p>
            <p className="text-lg text-white font-medium bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 rounded-full inline-block shadow-lg">
              नवीन ब्लॉग जोडण्यासाठी 'Write New Blog' वर क्लिक करा!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Plus, Trash2, X } from 'lucide-react'

const Blog = () => {
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [posts, setPosts] = useState([])

  const categoryOptions = ['Good Thoughts', 'Health & Ayurveda', 'Motivation']

  // Initial blog posts data (fallback if localStorage is empty)
  const initialPosts = [
    {
      id: 1,
      title: "५ विचार जे तुमचे आयुष्य बदलू शकतात",
      excerpt: "जीवनात यश मिळवण्यासाठी आणि सुखी राहण्यासाठी हे ५ सोपे विचार तुमच्या मनाला नवीन दिशा देऊ शकतात. या विचारांचा अभ्यास करा आणि बदल पहा.",
      content: "जीवनात यश मिळवण्यासाठी आणि सुखी राहण्यासाठी हे ५ सोपे विचार तुमच्या मनाला नवीन दिशा देऊ शकतात. या विचारांचा अभ्यास करा आणि बदल पहा.",
      category: "Good Thoughts",
      date: "June 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "दैनिक जीवनात आयुर्वेदाचे महत्त्व आणि सोपे नियम",
      excerpt: "आयुर्वेद हा आपल्या आरोग्यासाठी एक अमूल्य वरदान आहे. दैनंदिन जीवनात आयुर्वेदाचे काही सोपे नियम पाळून आपण आरोग्य आणि आनंदी जीवन जगू शकतो.",
      content: "आयुर्वेद हा आपल्या आरोग्यासाठी एक अमूल्य वरदान आहे. दैनंदिन जीवनात आयुर्वेदाचे काही सोपे नियम पाळून आपण आरोग्य आणि आनंदी जीवन जगू शकतो.",
      category: "Health & Ayurveda",
      date: "June 12, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "अपयशातून यश कसं मिळवायचं? Speak Motivation",
      excerpt: "अपयश हा यशाचा पहिला पायरी आहे. अपयशातून कसे शिकायचे आणि त्यातून कसे बलवान बनून यश मिळवायचे, हे जाणून घ्या आमच्या या प्रेरणादायक लेखातून.",
      content: "अपयश हा यशाचा पहिला पायरी आहे. अपयशातून कसे शिकायचे आणि त्यातून कसे बलवान बनून यश मिळवायचे, हे जाणून घ्या आमच्या या प्रेरणादायक लेखातून.",
      category: "Motivation",
      date: "June 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "सकारात्मक विचारांचे जीवनावरील प्रभाव",
      excerpt: "सकारात्मक विचार केवळ आनंद देत नाहीत, तर ते आपल्या आरोग्य, नाती आणि कामगिरीवरही सकारात्मक परिणाम करतात. सकारात्मकता कशी विकसित करावी?",
      content: "सकारात्मक विचार केवळ आनंद देत नाहीत, तर ते आपल्या आरोग्य, नाती आणि कामगिरीवरही सकारात्मक परिणाम करतात. सकारात्मकता कशी विकसित करावी?",
      category: "Good Thoughts",
      date: "June 8, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "सकाळच्या दिनचर्येतील आयुर्वेदिक संकल्पना",
      excerpt: "उठण्यापासून झोपण्यापर्यंत आयुर्वेदानुसार कशी दिनचर्या पाळावी? सकाळचे उठणे, व्यायाम, आहार आणि इतर महत्त्वाच्या गोष्टी जाणून घ्या.",
      content: "उठण्यापासून झोपण्यापर्यंत आयुर्वेदानुसार कशी दिनचर्या पाळावी? सकाळचे उठणे, व्यायाम, आहार आणि इतर महत्त्वाच्या गोष्टी जाणून घ्या.",
      category: "Health & Ayurveda",
      date: "June 5, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "ध्येय निश्चित करण्याची महत्त्वाची टप्पी",
      excerpt: "आयुष्यात यश मिळवण्यासाठी ध्येय निश्चित करणे अत्यंत महत्त्वाचे आहे. कसे योग्य ध्येय निश्चित करावे आणि त्याकडे कसे पोहोचावे, हे शिकून घ्या.",
      content: "आयुष्यात यश मिळवण्यासाठी ध्येय निश्चित करणे अत्यंत महत्त्वाचे आहे. कसे योग्य ध्येय निश्चित करावे आणि त्याकडे कसे पोहोचावे, हे शिकून घ्या.",
      category: "Motivation",
      date: "June 2, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=400&fit=crop"
    }
  ]

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('sallagar_blogs')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    } else {
      setPosts(initialPosts)
    }
  }, [])

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('sallagar_blogs', JSON.stringify(posts))
    }
  }, [posts])

  // Form state for new blog post
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Good Thoughts',
    readTime: ''
  })

  // Helper function to format current date
  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  }

  // Handle adding a new blog post
  const handleAddPost = (e) => {
    e.preventDefault()
    const postToAdd = {
      ...newPost,
      id: Date.now(), // Generate unique ID based on timestamp
      date: getCurrentDate() // Auto-generate current date
    }
    setPosts([postToAdd, ...posts]) // Add to top of list
    // Reset form
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: 'Good Thoughts',
      readTime: ''
    })
    setShowAdminForm(false)
  }

  // Handle deleting a blog post
  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter(post => post.id !== id))
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
          <button
            onClick={() => {
              if (window.confirm('This will reset all blogs to the default list. Any custom blogs you added will be lost. Continue?')) {
                localStorage.removeItem('sallagar_blogs')
                setPosts(initialPosts)
              }
            }}
            className="flex items-center gap-2 glassmorphism text-slate-700 px-5 py-3 rounded-2xl font-semibold transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-xl hover:shadow-emerald-200/50"
          >
            Reset to Default Blogs
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title (नाव)</label>
                  <input
                    type="text"
                    required
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Blog title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description/Excerpt (थोडक्यात माहिती)</label>
                  <textarea
                    required
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Short description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Content (पूर्ण लेख)</label>
                  <textarea
                    required
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Full blog content"
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
                    post.category === 'Good Thoughts' ? 'bg-purple-100/80 text-purple-700' :
                    post.category === 'Health & Ayurveda' ? 'bg-emerald-100/80 text-emerald-700' :
                    'bg-orange-100/80 text-orange-700'
                  }`}>
                    {post.category}
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
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors hover:translate-x-1"
                >
                  अधिक वाचा
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg font-medium">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog

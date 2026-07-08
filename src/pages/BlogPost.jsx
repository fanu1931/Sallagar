import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Share2, Tag, Heart } from 'lucide-react'
import { supabase } from '../supabaseClient'

const BlogPost = () => {
  const { id } = useParams()
  const [currentLang, setCurrentLang] = useState('mr')
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch post from Supabase on mount
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching post:', error)
        setError(error)
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#022c22] to-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6 animate-pulse">
            <span className="text-3xl">📝</span>
          </div>
          <p className="text-xl font-bold text-emerald-400 mb-3">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#022c22] to-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          {/* Language Switcher */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-full p-1 flex gap-2 inline-flex">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  currentLang === 'en' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                    : 'text-white/60 hover:text-white font-semibold transition-colors duration-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('mr')}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  currentLang === 'mr' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                    : 'text-white/60 hover:text-white font-semibold transition-colors duration-200'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setCurrentLang('hi')}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  currentLang === 'hi' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                    : 'text-white/60 hover:text-white font-semibold transition-colors duration-200'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            {currentLang === 'en' ? 'Post Not Found' : currentLang === 'mr' ? 'लेख सापडला नाही' : 'पोस्ट नहीं मिली'}
          </h1>
          <Link to="/blog" className="text-emerald-300 hover:text-emerald-200">
            {currentLang === 'en' ? 'Back to Blog' : currentLang === 'mr' ? 'ब्लॉगवर परत जा' : 'ब्लॉग पर वापस जाएं'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#022c22] to-[#0f172a] text-white">
      {/* Premium Ambient Light Leaks */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Header Image */}
      <div className="relative h-96">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center text-white hover:text-emerald-300 transition-colors mb-4 hover:translate-x-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentLang === 'en' ? 'Back to Blog' : currentLang === 'mr' ? 'ब्लॉगवर परत जा' : 'ब्लॉग पर वापस जाएं'}
            </Link>
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
              {typeof post.category === 'object' ? (post.category[currentLang] || post.category['mr'] || post.category['en']) : post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {typeof post.title === 'object' ? (post.title[currentLang] || post.title['mr'] || post.title['en']) : post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Language Switcher */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-full p-1 flex gap-2 inline-flex">
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                currentLang === 'en' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                  : 'text-white/60 hover:text-white font-semibold transition-colors duration-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('mr')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                currentLang === 'mr' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                  : 'text-white/60 hover:text-white font-semibold transition-colors duration-200'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setCurrentLang('hi')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                currentLang === 'hi' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md' 
                  : 'text-white/60 hover:text-white font-semibold transition-colors duration-200'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-emerald-400" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-emerald-400" />
            <span>{post.read_time || post.readTime}</span>
          </div>
          <div className="flex items-center ml-auto">
            <button className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors hover:scale-110">
              <Heart className="h-5 w-5 mr-2" />
              Save
            </button>
            <button className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors ml-4 hover:scale-110">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-2xl p-4 mb-8 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <Tag className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-200">
                <strong>Affiliate Disclosure:</strong> This post contains affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you.
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-emerald-300 prose-a:text-emerald-400 prose-ul:text-gray-300"
          dangerouslySetInnerHTML={{ __html: typeof post.content === 'object' ? (post.content[currentLang] || post.content['mr'] || post.content['en']) : post.content }}
        />

        {/* Affiliate CTA Section */}
        <div className="mt-12 mb-8">
          <div className="bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {currentLang === 'en' ? 'Buy Recommended Products' : currentLang === 'mr' ? 'शिफारस केलेले उत्पादन खरेदी करा' : 'अनुशंसित उत्पाद खरीदें'}
            </h3>
            <p className="text-gray-300 mb-6">
              {currentLang === 'en' ? 'Check out our curated selection of products that align with the principles discussed in this article.' : currentLang === 'mr' ? 'या लेखात चर्चा केलेल्या तत्त्वांशी जुळणाऱ्या उत्पादनांची आमची निवड केलेली निवड तपासा.' : 'इस लेख में चर्चा किए गए सिद्धांतों के अनुरूप उत्पादों की हमारी चयनित श्रृंखला देखें.'}
            </p>
            <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/60">
              {currentLang === 'en' ? 'See Advisor Picks' : currentLang === 'mr' ? 'सल्लागारांची निवड पहा' : 'सलाहकार की पिक्स देखें'}
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">
            {currentLang === 'en' ? 'Related Posts' : currentLang === 'mr' ? 'संबंधित लेख' : 'संबंधित पोस्ट'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
                <h3 className="font-semibold text-white mb-2">Related Post Title {i}</h3>
                <p className="text-sm text-gray-300 mb-3">Brief description of related post content goes here.</p>
                <Link to="/blog" className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 hover:translate-x-1 inline-block">
                  {currentLang === 'en' ? 'Read More' : currentLang === 'mr' ? 'अधिक वाचा' : 'और पढ़ें'} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost

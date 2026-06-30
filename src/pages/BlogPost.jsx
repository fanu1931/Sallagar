import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Share2, Tag, Heart } from 'lucide-react'

const samplePosts = {
  1: {
    title: "Top 10 Wireless Earbuds for 2024: Complete Guide",
    category: "Electronics",
    date: "June 15, 2024",
    readTime: "8 min read",
    author: "Sallagar Team",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&h=600&fit=crop",
    content: `
      <p class="mb-4">Wireless earbuds have become an essential accessory for music lovers, professionals, and fitness enthusiasts alike. With so many options available, finding the perfect pair can be overwhelming. This comprehensive guide will help you make an informed decision.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Why Wireless Earbuds Matter</h2>
      <p class="mb-4">The freedom of movement without tangled wires is just the beginning. Modern wireless earbuds offer exceptional sound quality, active noise cancellation, and seamless connectivity that enhance your daily audio experience.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Key Features to Consider</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Sound Quality:</strong> Look for earbuds with balanced audio profiles and good bass response</li>
        <li><strong>Battery Life:</strong> Minimum 6 hours of playback with charging case</li>
        <li><strong>Noise Cancellation:</strong> Active noise cancellation for immersive listening</li>
        <li><strong>Comfort:</strong> Multiple ear tip sizes for secure fit</li>
        <li><strong>Water Resistance:</strong> IPX4 or higher for workouts</li>
        <li><strong>Price:</strong> Balance features with your budget</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Our Top Recommendations</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Premium Choice</h3>
      <p class="mb-4">For those who want the best audio experience, premium earbuds offer exceptional sound quality, advanced noise cancellation, and premium build materials. While they come at a higher price point, the investment is worth it for audiophiles.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Best Value</h3>
      <p class="mb-4">Mid-range options provide excellent features without breaking the bank. These earbuds often include most premium features at a more accessible price point.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Budget-Friendly</h3>
      <p class="mb-4">Entry-level wireless earbuds have improved significantly and now offer decent sound quality and essential features at an affordable price.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Final Thoughts</h2>
      <p class="mb-4">Choosing the right wireless earbuds depends on your specific needs, budget, and usage patterns. Consider how you'll use them most frequently - whether for commuting, workouts, or casual listening - and prioritize features accordingly.</p>
      
      <p class="mb-4">Remember that the most expensive option isn't always the best for everyone. Focus on finding earbuds that match your lifestyle and provide the features you'll actually use.</p>
    `
  },
  2: {
    title: "Best Smart Home Devices Under ₹5,000",
    category: "Home & Kitchen",
    date: "June 12, 2024",
    readTime: "6 min read",
    author: "Sallagar Team",
    image: "https://images.unsplash.com/photo-1558002038-1091a1661116?w=1200&h=600&fit=crop",
    content: `
      <p class="mb-4">Transforming your home into a smart home doesn't have to cost a fortune. There are plenty of affordable smart devices that can make your life easier and more convenient without breaking the bank.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Why Smart Home Devices?</h2>
      <p class="mb-4">Smart home devices offer convenience, energy efficiency, and enhanced security. From controlling lights with your voice to monitoring your home remotely, these devices can significantly improve your daily life.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Top Affordable Smart Devices</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Smart Bulbs</h3>
      <p class="mb-4">Smart LED bulbs are one of the most affordable entry points into home automation. You can control them with your phone, set schedules, and even change colors to match your mood.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Smart Plugs</h3>
      <p class="mb-4">Transform any regular appliance into a smart device with smart plugs. They're perfect for lamps, fans, and other small appliances.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Smart Speakers</h3>
      <p class="mb-4">Budget smart speakers offer voice control capabilities and can serve as the central hub for your other smart devices.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
      <p class="mb-4">Start with one or two devices that address your immediate needs. As you become more comfortable with smart home technology, you can gradually expand your setup.</p>
    `
  },
  3: {
    title: "Complete Guide to Buying Your First Laptop",
    category: "Electronics",
    date: "June 10, 2024",
    readTime: "10 min read",
    author: "Sallagar Team",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=600&fit=crop",
    content: `
      <p class="mb-4">Buying your first laptop is an exciting but potentially overwhelming experience. With so many options available, it's important to understand what specifications matter most for your needs.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Laptop Specifications</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Processor (CPU)</h3>
      <p class="mb-4">The processor is the brain of your laptop. For basic tasks, Intel Core i3 or AMD Ryzen 3 are sufficient. For more demanding applications, consider i5/i7 or Ryzen 5/7.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">RAM</h3>
      <p class="mb-4">8GB is the minimum for smooth performance. 16GB is recommended for multitasking and creative work.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Storage</h3>
      <p class="mb-4">SSDs are much faster than traditional HDDs. Aim for at least 256GB SSD storage.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Display</h3>
      <p class="mb-4">Consider screen size, resolution, and panel type. IPS panels offer better viewing angles and color accuracy.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Choosing Based on Your Needs</h2>
      <p class="mb-4">Identify your primary use case - whether it's for work, gaming, creative projects, or general use - and prioritize specifications accordingly.</p>
    `
  },
  4: {
    title: "Top Fitness Trackers for Health Monitoring",
    category: "Health & Wellness",
    date: "June 8, 2024",
    readTime: "7 min read",
    author: "Sallagar Team",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1200&h=600&fit=crop",
    content: `
      <p class="mb-4">Fitness trackers have evolved from simple step counters to comprehensive health monitoring devices. Here's our guide to finding the perfect fitness tracker for your health journey.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Key Health Metrics to Track</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Heart rate monitoring</li>
        <li>Sleep tracking</li>
        <li>Step counting and distance</li>
        <li>Calorie burn estimation</li>
        <li>Blood oxygen levels (SpO2)</li>
        <li>Stress monitoring</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Features to Look For</h2>
      <p class="mb-4">Consider battery life, water resistance, GPS accuracy, and smartphone integration when choosing a fitness tracker.</p>
    `
  },
  5: {
    title: "Best Kitchen Appliances for Small Spaces",
    category: "Home & Kitchen",
    date: "June 5, 2024",
    readTime: "5 min read",
    author: "Sallagar Team",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop",
    content: `
      <p class="mb-4">Living in a small space doesn't mean you have to compromise on kitchen functionality. These compact appliances are designed to maximize efficiency while minimizing footprint.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Essential Small Kitchen Appliances</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Multi-Cookers</h3>
      <p class="mb-4">Combine multiple cooking functions in one device - pressure cooking, slow cooking, rice cooking, and more.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Compact Blenders</h3>
      <p class="mb-4">Personal-sized blenders are perfect for smoothies and single-serve preparations.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Toaster Ovens</h3>
      <p class="mb-4">A toaster oven can replace multiple appliances - toaster, oven, and sometimes even an air fryer.</p>
    `
  },
  6: {
    title: "Ultimate Guide to Camera Gear for Beginners",
    category: "Electronics",
    date: "June 2, 2024",
    readTime: "12 min read",
    author: "Sallagar Team",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=600&fit=crop",
    content: `
      <p class="mb-4">Starting your photography journey can be exciting but also confusing with all the gear options available. This guide will help you choose the right equipment to begin your photographic adventure.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Choosing Your First Camera</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">DSLR vs Mirrorless</h3>
      <p class="mb-4">Both have their advantages. DSLRs offer optical viewfinders and longer battery life, while mirrorless cameras are more compact and offer advanced features.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Essential Lenses</h3>
      <p class="mb-4">Start with a versatile kit lens, then consider a prime lens for low-light situations and portrait photography.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Must-Have Accessories</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Memory cards with sufficient capacity</li>
        <li>Camera bag for protection</li>
        <li>Tripod for stable shots</li>
        <li>Cleaning kit for lens maintenance</li>
      </ul>
    `
  }
}

const BlogPost = () => {
  const { id } = useParams()
  const post = samplePosts[id]

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-emerald-600 hover:text-emerald-700">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <div className="relative h-96">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center text-white hover:text-emerald-200 transition-colors mb-4 hover:translate-x-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-8 pb-8 border-b border-slate-200">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-emerald-600" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center">
            <span>By {post.author}</span>
          </div>
          <div className="flex items-center ml-auto">
            <button className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors hover:scale-110">
              <Heart className="h-5 w-5 mr-2" />
              Save
            </button>
            <button className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors ml-4 hover:scale-110">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="glassmorphism rounded-r-lg p-4 mb-8 hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <Tag className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-800">
                <strong>Affiliate Disclosure:</strong> This post contains affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you.
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glassmorphism rounded-lg p-4 hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
                <h3 className="font-semibold text-slate-900 mb-2">Related Post Title {i}</h3>
                <p className="text-sm text-slate-600 mb-3">Brief description of related post content goes here.</p>
                <Link to="/blog" className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 hover:translate-x-1 inline-block">
                  Read More →
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

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, MapPin, DollarSign, Plus, X, Loader2, Search, Home, Edit2, Trash2 } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { isAdmin, adminLogout } from '../utils/adminAuth'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const Jobs = () => {
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isUserAdmin, setIsUserAdmin] = useState(() => localStorage.getItem('is_admin') === 'true')
  const [editingJob, setEditingJob] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const getImageUrl = (job) => {
    let imageUrl = job?.banner_url || job?.banner || job?.image_url || job?.image
    if (typeof imageUrl === 'object' && imageUrl !== null) {
      imageUrl = imageUrl.url || imageUrl.src || JSON.stringify(imageUrl)
    }
    if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) return imageUrl
    if (typeof imageUrl === 'string' && !imageUrl.startsWith('http')) {
      return `${supabaseUrl}/storage/v1/object/public/job-banners/${imageUrl}`
    }
    return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200'
  }

  const filteredJobs = (jobs || []).filter(job => {
    const search = searchQuery.toLowerCase()
    return (job?.title || '').toLowerCase().includes(search) ||
           (job?.location || '').toLowerCase().includes(search) ||
           (job?.skills || '').toLowerCase().includes(search)
  })

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
        if (error) throw error
        setJobs(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // Handle window resize to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide functionality for mobile view only
  useEffect(() => {
    if (!sliderRef.current || filteredJobs.length === 0 || !isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % filteredJobs.length
        const slider = sliderRef.current
        if (slider) {
          const slideWidth = slider.children[0]?.offsetWidth || 0
          slider.scrollTo({
            left: nextSlide * slideWidth,
            behavior: 'smooth'
          })
        }
        return nextSlide
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [filteredJobs.length, isMobile])

  const [newJob, setNewJob] = useState({
    title: '', salary: '', skills: '', jobType: 'Full-Time',
    location: '', summary: '', jobLink: '', banner: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || file.size > 5 * 1024 * 1024 || !file.type.startsWith('image/')) return
    try {
      setIsSubmitting(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('job-banners').upload(fileName, file)
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage.from('job-banners').getPublicUrl(fileName)
      setNewJob({ ...newJob, banner: publicUrl })
    } catch (err) {
      alert(`Upload failed: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddJob = async (e) => {
    e.preventDefault()
    if (!isUserAdmin) return alert('Access denied')
    setIsSubmitting(true)
    try {
      const payload = {
        title: newJob.title, salary: newJob.salary, skills: newJob.skills,
        job_type: newJob.jobType, location: newJob.location,
        job_summary: newJob.summary, job_link: newJob.jobLink, banner_url: newJob.banner
      }
      let result
      if (editingJob) {
        result = await supabase.from('jobs').update(payload).eq('id', editingJob.id).select()
      } else {
        payload.date = new Date().toLocaleDateString()
        result = await supabase.from('jobs').insert([payload]).select()
      }
      if (result.error) throw result.error
      const { data: refreshedData } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
      setJobs(refreshedData || [])
      setNewJob({ title: '', salary: '', skills: '', jobType: 'Full-Time', location: '', summary: '', jobLink: '', banner: '' })
      setShowAdminForm(false)
      setEditingJob(null)
      alert(`Job ${editingJob ? 'updated' : 'posted'} successfully!`)
    } catch (error) {
      alert(`Failed: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return
    const { error } = await supabase.from('jobs').delete().eq('id', id)
    if (error) return alert('Failed to delete')
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || [])
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
    setShowAdminForm(true)
    setNewJob({
      title: job?.title || '', salary: job?.salary || '', skills: job?.skills || '',
      jobType: job?.job_type || job?.jobType || 'Full-Time', location: job?.location || '',
      summary: job?.summary || job?.job_summary || '', jobLink: job?.job_link || job?.jobLink || '',
      banner: job?.banner_url || job?.banner || ''
    })
  }

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-purple-950/90 text-white py-6 sm:py-8">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Jobs</h1>
            <Link to="/" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
          <p className="text-sm text-white/90 max-w-2xl font-light mt-1">Find your next career opportunity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg p-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title, location, or skills..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-slate-900"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-2 pb-4 no-scrollbar md:grid md:grid-cols-3 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden w-[28vw] min-w-[105px] max-w-[115px] sm:w-[300px] md:w-full flex-shrink-0 snap-center">
                <div className="h-14 w-full bg-gray-100 animate-pulse rounded-t-lg" />
                <div className="p-1.5 sm:p-3">
                  <div className="h-3 bg-slate-200 rounded animate-pulse mb-1" />
                  <div className="h-2 bg-slate-200 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {isUserAdmin && (
              <div className="mb-6">
                <button
                  onClick={() => setShowAdminForm(!showAdminForm)}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-300"
                >
                  {showAdminForm ? <><X className="h-5 w-5" /> Close</> : <><Plus className="h-5 w-5" /> Add New Job</>}
                </button>
              </div>
            )}

            {showAdminForm && isUserAdmin && (
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                  {editingJob ? 'Edit Job' : 'Add New Job'}
                </h2>
                <form onSubmit={handleAddJob} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                      <input type="text" required value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900" placeholder="e.g., Senior React Developer" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Salary</label>
                      <input type="text" required value={newJob.salary} onChange={(e) => setNewJob({...newJob, salary: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900" placeholder="e.g., ₹25,000 - ₹40,000/month" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Required Skills</label>
                      <input type="text" required value={newJob.skills} onChange={(e) => setNewJob({...newJob, skills: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900" placeholder="e.g., React, Communication" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Job Type</label>
                      <select required value={newJob.jobType} onChange={(e) => setNewJob({...newJob, jobType: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900">
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Remote">Remote</option>
                        <option value="Work From Home">Work From Home</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                      <input type="text" required value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900" placeholder="e.g., Pune, Maharashtra" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Job Link (Apply URL)</label>
                      <input type="url" required value={newJob.jobLink} onChange={(e) => setNewJob({...newJob, jobLink: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900" placeholder="https://company.com/apply" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Job Summary</label>
                    <textarea required value={newJob.summary} onChange={(e) => setNewJob({...newJob, summary: e.target.value})} rows="15" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900" placeholder="Enter detailed job description (up to 1,500+ words)..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Image</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isSubmitting} className="w-full px-4 py-3 border border-gray-200 rounded-2xl" />
                    {newJob.banner && <img src={newJob.banner} alt="Preview" className="w-full h-48 object-cover rounded-2xl mt-2" />}
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => { setShowAdminForm(false); setEditingJob(null); setNewJob({ title: '', salary: '', skills: '', jobType: 'Full-Time', location: '', summary: '', jobLink: '', banner: '' }) }} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold">{isSubmitting ? 'Saving...' : (editingJob ? 'Update Job' : 'Post Job')}</button>
                  </div>
                </form>
              </div>
            )}

            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No jobs found</h3>
              </div>
            ) : (
              <div ref={sliderRef} className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-2 pb-4 no-scrollbar md:grid md:grid-cols-3 md:gap-6">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group w-[28vw] min-w-[105px] max-w-[115px] sm:w-[300px] md:w-full flex-shrink-0 snap-center">
                      <div className="relative p-0 m-0 w-full overflow-hidden rounded-t-2xl">
                        <img src={getImageUrl(job)} alt={job?.title || 'Job'} className="h-14 w-full object-cover rounded-t-lg block border-b border-gray-100" />
                        <div className="absolute top-2 right-2 z-10">
                          <span className="bg-purple-600 text-white px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold">{job?.job_type || job?.jobType || 'Full-Time'}</span>
                        </div>
                      </div>
                      <div className="p-1.5 sm:p-3">
                        <h3 className="text-[10px] sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2 line-clamp-1">{job?.title || 'Job Title'}</h3>
                        <div className="space-y-0.5 sm:space-y-2 mb-2 sm:mb-3">
                          <div className="flex items-center text-slate-600 text-[9px] sm:text-sm">
                            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-600" />
                            {job?.salary || 'Salary not specified'}
                          </div>
                          <div className="flex items-center text-slate-600 text-[9px] sm:text-sm">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-600" />
                            {job?.location || 'Location not specified'}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                          {(job?.skills || '').split(',').filter(s => s.trim()).slice(0, 3).map((skill, i) => (
                            <span key={i} className="bg-purple-100 text-purple-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-medium">{skill.trim()}</span>
                          ))}
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          <Link to={`/jobs/${job.id}`} className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-xl font-semibold text-center transition-all duration-300 text-[9px] sm:text-sm">View Details</Link>
                          {isUserAdmin && (
                            <>
                              <div className="flex gap-1 sm:gap-2">
                                <button onClick={() => handleEditJob(job)} className="p-1 sm:p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-all"><Edit2 className="h-3 w-3 sm:h-4 sm:w-4" /></button>
                                <button onClick={() => handleDeleteJob(job.id)} className="p-1 sm:p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4" /></button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Jobs

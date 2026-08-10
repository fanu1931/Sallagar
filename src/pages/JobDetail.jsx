import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, DollarSign, Briefcase, ExternalLink, Calendar, Edit2, Trash2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'
import { isAdmin } from '../utils/adminAuth'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUserAdmin, setIsUserAdmin] = useState(() => localStorage.getItem('is_admin') === 'true')

  const getImageUrl = (job) => {
    let imageUrl = job.banner_url || job.banner || job.image_url || job.image
    if (typeof imageUrl === 'object' && imageUrl !== null) {
      imageUrl = imageUrl.url || imageUrl.src || JSON.stringify(imageUrl)
    }
    if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) return imageUrl
    if (typeof imageUrl === 'string' && !imageUrl.startsWith('http')) {
      return `${supabaseUrl}/storage/v1/object/public/job-banners/${imageUrl}`
    }
    return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200'
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single()
        if (error) throw error
        setJob(data)
      } catch (error) {
        console.error('Error fetching job:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  useEffect(() => {
    const checkAdminStatus = () => setIsUserAdmin(isAdmin())
    window.addEventListener('storage', checkAdminStatus)
    return () => window.removeEventListener('storage', checkAdminStatus)
  }, [])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    const { error } = await supabase.from('jobs').delete().eq('id', id)
    if (error) return alert('Failed to delete job')
    window.location.href = '/jobs'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1e1b2e] via-[#2d2545] to-[#13111c] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
          <p className="text-purple-400 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1e1b2e] via-[#2d2545] to-[#13111c] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
          <Link to="/jobs" className="text-purple-300 hover:text-purple-200">Back to Jobs</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{job?.title || 'Job'} | Sallagar Jobs</title>
        <meta name="description" content={job?.summary?.substring(0, 160) || ''} />
        <meta name="keywords" content={`${job?.title || ''}, ${job?.location || ''}, ${job?.skills || ''}, jobs, career`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#1e1b2e] via-[#2d2545] to-[#13111c] text-white">
        {/* Header with Banner */}
        <div className="relative min-h-[300px] w-full">
          <div className="absolute inset-0">
            <img src={getImageUrl(job)} alt={job?.title || 'Job'} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-900/50 to-[#1e1b2e]"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/jobs" className="inline-flex items-center text-white hover:text-purple-300 transition-colors mb-6 hover:translate-x-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
              {job?.job_type || job?.jobType || 'Full-time'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {job?.title || 'Job Title'}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-300 border-b border-white/10 mb-8 pb-8">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-purple-400" />
              <span>{job?.location || 'Location not specified'}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
              <span>{job?.salary || 'Salary not specified'}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-purple-400" />
              <span>{job?.date || 'Date not specified'}</span>
            </div>
            {isUserAdmin && (
              <div className="flex items-center ml-auto gap-2">
                <button className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <Edit2 className="h-5 w-5 mr-2" />
                  Edit
                </button>
                <button onClick={handleDelete} className="flex items-center text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Skills Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(job?.skills || job?.required_skills || '').split(',').filter(s => s.trim()).map((skill, i) => (
                <span key={i} className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full text-sm font-medium">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Job Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
            <div className="whitespace-pre-line leading-relaxed text-gray-300 text-lg">
              {job?.summary || job?.job_summary || 'No job description available.'}
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-12">
            <a
              href={job?.job_link || job?.jobLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetail

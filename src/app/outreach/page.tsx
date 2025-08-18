
'use client'

import { useEffect, useState } from 'react'
import { Mail, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'

interface Outreach {
  id: string
  subject: string
  body: string
  status: string
  sentAt: string | null
  openedAt: string | null
  repliedAt: string | null
  createdAt: string
  lead: {
    firstName: string
    lastName: string
    email: string
    company: string
  }
  template: {
    name: string
    category: string
  } | null
}

export default function OutreachPage() {
  const [outreach, setOutreach] = useState<Outreach[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOutreach()
  }, [])

  const fetchOutreach = async () => {
    try {
      const response = await fetch('/api/outreach')
      if (response.ok) {
        const data = await response.json()
        setOutreach(data)
      }
    } catch (error) {
      console.error('Error fetching outreach:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Mail className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOutreach = outreach.filter(item => {
    if (filter === 'all') return true
    return item.status === filter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Outreach History</h1>
        <p className="mt-2 text-gray-600">Track your email campaigns and responses</p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {['all', 'sent', 'failed', 'draft'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'all' && ` (${outreach.length})`}
              {status !== 'all' && ` (${outreach.filter(o => o.status === status).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Outreach List */}
      <div className="space-y-4">
        {filteredOutreach.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(item.status)}
                  <h3 className="text-lg font-medium text-gray-900">{item.subject}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  To: <strong>{item.lead.firstName} {item.lead.lastName}</strong> ({item.lead.email}) at <strong>{item.lead.company}</strong>
                </div>
                {item.template && (
                  <div className="text-sm text-gray-500 mb-2">
                    Template: {item.template.name} ({item.template.category.replace('_', ' ')})
                  </div>
                )}
              </div>
              <div className="text-right text-sm text-gray-500">
                {item.sentAt ? (
                  <div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Sent: {new Date(item.sentAt).toLocaleDateString()}
                    </div>
                    <div>{new Date(item.sentAt).toLocaleTimeString()}</div>
                  </div>
                ) : (
                  <div>
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  View Email Content
                </summary>
                <div className="mt-3 p-4 bg-gray-50 rounded-md">
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {item.body}
                  </div>
                </div>
              </details>
            </div>

            {(item.openedAt || item.repliedAt) && (
              <div className="border-t pt-4 mt-4">
                <div className="flex gap-6 text-sm">
                  {item.openedAt && (
                    <div className="text-blue-600">
                      Opened: {new Date(item.openedAt).toLocaleDateString()}
                    </div>
                  )}
                  {item.repliedAt && (
                    <div className="text-green-600">
                      Replied: {new Date(item.repliedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOutreach.length === 0 && (
        <div className="text-center py-12">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No outreach found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' 
              ? 'Start sending emails to see your outreach history here.'
              : `No ${filter} emails found.`
            }
          </p>
        </div>
      )}
    </div>
  )
}

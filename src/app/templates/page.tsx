
'use client'

import { useEffect, useState } from 'react'
import { Plus, Mail, Edit, Trash2 } from 'lucide-react'
import AddTemplateModal from '@/components/AddTemplateModal'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  category: string
  sentCount: number
  openCount: number
  replyCount: number
  createdAt: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPerformanceRate = (template: EmailTemplate, type: 'open' | 'reply') => {
    if (template.sentCount === 0) return 0
    const count = type === 'open' ? template.openCount : template.replyCount
    return Math.round((count / template.sentCount) * 100)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'cold_outreach': 'bg-blue-100 text-blue-800',
      'follow_up': 'bg-yellow-100 text-yellow-800',
      'meeting_request': 'bg-green-100 text-green-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
            <p className="mt-2 text-gray-600">Manage your outreach templates</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Templates List */}
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white p-6 rounded-lg shadow cursor-pointer border-2 transition-colors ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-gray-200'
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                    {template.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.subject}</p>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>Sent: {template.sentCount}</span>
                <span>Open Rate: {getPerformanceRate(template, 'open')}%</span>
                <span>Reply Rate: {getPerformanceRate(template, 'reply')}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Template Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          {selectedTemplate ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Template Preview</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Use Template
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    {selectedTemplate.subject}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                  <div className="p-3 bg-gray-50 rounded-md text-sm whitespace-pre-wrap">
                    {selectedTemplate.body}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedTemplate.sentCount}</div>
                    <div className="text-sm text-gray-500">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {getPerformanceRate(selectedTemplate, 'open')}%
                    </div>
                    <div className="text-sm text-gray-500">Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {getPerformanceRate(selectedTemplate, 'reply')}%
                    </div>
                    <div className="text-sm text-gray-500">Reply Rate</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No template selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a template from the list to preview it here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Template Modal */}
      <AddTemplateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchTemplates}
      />
    </div>
  )
}

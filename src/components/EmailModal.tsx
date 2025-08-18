
'use client'

import { useState, useEffect } from 'react'
import { X, Send } from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  category: string
}

interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  company: string
  title?: string
}

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  lead: Lead | null
  onSuccess: () => void
}

export default function EmailModal({ isOpen, onClose, lead, onSuccess }: EmailModalProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchTemplates()
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedTemplate && templates.length > 0) {
      const template = templates.find(t => t.id === selectedTemplate)
      if (template && lead) {
        setSubject(personalizeText(template.subject, lead))
        setBody(personalizeText(template.body, lead))
      }
    }
  }, [selectedTemplate, templates, lead])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const personalizeText = (text: string, lead: Lead) => {
    return text
      .replace(/\{\{firstName\}\}/g, lead.firstName)
      .replace(/\{\{lastName\}\}/g, lead.lastName)
      .replace(/\{\{fullName\}\}/g, `${lead.firstName} ${lead.lastName}`)
      .replace(/\{\{company\}\}/g, lead.company)
      .replace(/\{\{title\}\}/g, lead.title || '')
      .replace(/\{\{email\}\}/g, lead.email)
  }

  const handleSend = async () => {
    if (!lead || !subject || !body) return

    setLoading(true)
    try {
      const response = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          templateId: selectedTemplate || null,
          subject,
          body,
          recipientEmail: lead.email
        })
      })

      if (response.ok) {
        onSuccess()
        onClose()
        setSelectedTemplate('')
        setSubject('')
        setBody('')
      }
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !lead) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Send Email to {lead.firstName} {lead.lastName}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Template (Optional)
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-4"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="">Custom Email</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.category.replace('_', ' ')})
                </option>
              ))}
            </select>

            {/* Lead Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Lead Information</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Name:</strong> {lead.firstName} {lead.lastName}</p>
                <p><strong>Email:</strong> {lead.email}</p>
                <p><strong>Company:</strong> {lead.company}</p>
                {lead.title && <p><strong>Title:</strong> {lead.title}</p>}
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Available Variables:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p>{'{{firstName}}'} - {lead.firstName}</p>
                <p>{'{{lastName}}'} - {lead.lastName}</p>
                <p>{'{{fullName}}'} - {lead.firstName} {lead.lastName}</p>
                <p>{'{{company}}'} - {lead.company}</p>
                <p>{'{{title}}'} - {lead.title || 'N/A'}</p>
                <p>{'{{email}}'} - {lead.email}</p>
              </div>
            </div>
          </div>

          {/* Email Composition */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                required
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter your message here..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={loading || !subject || !body}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {loading ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

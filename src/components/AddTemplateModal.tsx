
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface AddTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddTemplateModal({ isOpen, onClose, onSuccess }: AddTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'cold_outreach'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSuccess()
        onClose()
        setFormData({
          name: '',
          subject: '',
          body: '',
          category: 'cold_outreach'
        })
      }
    } catch (error) {
      console.error('Error adding template:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const sampleTemplates = {
    cold_outreach: {
      subject: "Quick question about {{company}}'s growth",
      body: `Hi {{firstName}},

I noticed {{company}} has been expanding rapidly in the {{industry}} space. Congratulations on the recent growth!

I'm reaching out because we've helped similar companies like yours streamline their operations and reduce costs by up to 30%. 

Would you be open to a brief 15-minute call this week to discuss how we might be able to help {{company}} achieve similar results?

Best regards,
[Your Name]`
    },
    follow_up: {
      subject: "Following up on our conversation",
      body: `Hi {{firstName}},

I wanted to follow up on my previous email about helping {{company}} with [specific solution].

I understand you're probably busy, but I believe this could make a significant impact on your [relevant business area].

Would you have 10 minutes for a quick call this week?

Best,
[Your Name]`
    },
    meeting_request: {
      subject: "Meeting request - {{company}} growth opportunity",
      body: `Hi {{firstName}},

Based on our previous conversations, I'd love to schedule a meeting to discuss how we can help {{company}} achieve [specific goal].

I have availability:
- [Day] at [Time]
- [Day] at [Time]
- [Day] at [Time]

Which works best for you?

Looking forward to our conversation.

Best regards,
[Your Name]`
    }
  }

  const loadSample = () => {
    const sample = sampleTemplates[formData.category as keyof typeof sampleTemplates]
    setFormData({
      ...formData,
      subject: sample.subject,
      body: sample.body
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Email Template</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Cold Outreach - Tech Companies"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="cold_outreach">Cold Outreach</option>
                <option value="follow_up">Follow Up</option>
                <option value="meeting_request">Meeting Request</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Subject Line *
              </label>
              <button
                type="button"
                onClick={loadSample}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Load Sample Template
              </button>
            </div>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter email subject with variables like {{firstName}}, {{company}}"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Body *
            </label>
            <textarea
              required
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Enter your email template with personalization variables..."
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Available Variables:</h3>
            <div className="text-sm text-blue-700 grid grid-cols-2 gap-2">
              <p>{'{{firstName}}'} - Lead's first name</p>
              <p>{'{{lastName}}'} - Lead's last name</p>
              <p>{'{{fullName}}'} - Lead's full name</p>
              <p>{'{{company}}'} - Lead's company</p>
              <p>{'{{title}}'} - Lead's job title</p>
              <p>{'{{email}}'} - Lead's email address</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

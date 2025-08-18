
'use client'

import { useState } from 'react'
import { Save, Mail, Database, User, Bell } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    profile: {
      name: 'Demo User',
      email: 'admin@example.com',
      company: 'Your Company',
      timezone: 'America/New_York'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: '',
      smtpPass: '',
      fromName: 'Your Name',
      fromEmail: 'your-email@company.com'
    },
    scoring: {
      companySize: {
        startup: 5,
        small: 10,
        medium: 15,
        large: 20,
        enterprise: 25
      },
      industry: {
        technology: 20,
        saas: 25,
        finance: 15,
        healthcare: 15
      },
      title: {
        ceo: 25,
        cto: 20,
        vp: 18,
        director: 15
      }
    }
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'email', name: 'Email Setup', icon: Mail },
    { id: 'scoring', name: 'Lead Scoring', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ]

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Settings saved successfully!')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow rounded-lg mr-8">
          <nav className="p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-2 text-left rounded-md mb-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={settings.profile.name}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, name: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={settings.profile.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, email: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={settings.profile.company}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, company: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={settings.profile.timezone}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, timezone: e.target.value }
                    })}
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Email Configuration</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={settings.email.smtpHost}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, smtpHost: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={settings.email.smtpPort}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPort: e.target.value }
                      })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={settings.email.smtpUser}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpUser: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={settings.email.smtpPass}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpPass: e.target.value }
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={settings.email.fromName}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, fromName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={settings.email.fromEmail}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, fromEmail: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scoring' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Lead Scoring Configuration</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Company Size Scoring</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(settings.scoring.companySize).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          value={value}
                          onChange={(e) => setSettings({
                            ...settings,
                            scoring: {
                              ...settings.scoring,
                              companySize: {
                                ...settings.scoring.companySize,
                                [key]: parseInt(e.target.value) || 0
                              }
                            }
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Industry Scoring</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(settings.scoring.industry).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          value={value}
                          onChange={(e) => setSettings({
                            ...settings,
                            scoring: {
                              ...settings.scoring,
                              industry: {
                                ...settings.scoring.industry,
                                [key]: parseInt(e.target.value) || 0
                              }
                            }
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email updates about your leads and outreach</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Lead Responses</h3>
                    <p className="text-sm text-gray-500">Get notified when leads respond to your emails</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Daily Summary</h3>
                    <p className="text-sm text-gray-500">Receive a daily summary of your activities</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

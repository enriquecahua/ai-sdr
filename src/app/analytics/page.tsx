
'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Users, Mail, Calendar, Target } from 'lucide-react'

interface AnalyticsData {
  totalLeads: number
  leadsByStatus: Record<string, number>
  outreach: {
    total: number
    sent: number
    replied: number
    responseRate: number
  }
  templatePerformance: Array<{
    id: string
    name: string
    sentCount: number
    openCount: number
    replyCount: number
  }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!analytics) {
    return <div>Error loading analytics</div>
  }

  const kpiCards = [
    {
      name: 'Total Leads',
      value: analytics.totalLeads,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Emails Sent',
      value: analytics.outreach.sent,
      icon: Mail,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      name: 'Response Rate',
      value: `${analytics.outreach.responseRate}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+2.1%'
    },
    {
      name: 'Meetings Booked',
      value: analytics.leadsByStatus['Meeting Scheduled'] || 0,
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">Track your sales performance and metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiCards.map((kpi) => (
          <div key={kpi.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${kpi.color}`}>
                    <kpi.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {kpi.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {kpi.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {kpi.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Pipeline */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Lead Pipeline</h2>
          <div className="space-y-4">
            {Object.entries(analytics.leadsByStatus).map(([status, count]) => {
              const percentage = analytics.totalLeads > 0 ? (count / analytics.totalLeads) * 100 : 0
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{status}</span>
                    <span>{count}</span>
                  </div>
                  <div className="mt-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Template Performance */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Template Performance</h2>
          <div className="space-y-4">
            {analytics.templatePerformance.map((template) => {
              const openRate = template.sentCount > 0 ? (template.openCount / template.sentCount) * 100 : 0
              const replyRate = template.sentCount > 0 ? (template.replyCount / template.sentCount) * 100 : 0
              
              return (
                <div key={template.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
                    <span className="text-sm text-gray-500">{template.sentCount} sent</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Open Rate: </span>
                      <span className="font-medium text-blue-600">{Math.round(openRate)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Reply Rate: </span>
                      <span className="font-medium text-green-600">{Math.round(replyRate)}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Conversion Funnel</h2>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{analytics.totalLeads}</div>
            <div className="text-sm text-gray-500">Total Leads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{analytics.leadsByStatus['Qualified'] || 0}</div>
            <div className="text-sm text-gray-500">Qualified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analytics.leadsByStatus['Contacted'] || 0}</div>
            <div className="text-sm text-gray-500">Contacted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.leadsByStatus['Meeting Scheduled'] || 0}</div>
            <div className="text-sm text-gray-500">Meetings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{analytics.leadsByStatus['Closed'] || 0}</div>
            <div className="text-sm text-gray-500">Closed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

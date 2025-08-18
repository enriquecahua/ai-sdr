
'use client'

import { useEffect, useState } from 'react'
import { Users, Mail, TrendingUp, Calendar } from 'lucide-react'

interface DashboardStats {
  totalLeads: number
  leadsByStatus: Record<string, number>
  outreach: {
    total: number
    sent: number
    replied: number
    responseRate: number
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
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

  const statCards = [
    {
      name: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Emails Sent',
      value: stats?.outreach.sent || 0,
      icon: Mail,
      color: 'bg-green-500'
    },
    {
      name: 'Response Rate',
      value: `${stats?.outreach.responseRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      name: 'Meetings Scheduled',
      value: stats?.leadsByStatus['Meeting Scheduled'] || 0,
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your AI SDR workspace</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Status Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Lead Pipeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(stats?.leadsByStatus || {}).map(([status, count]) => (
            <div key={status} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500">{status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

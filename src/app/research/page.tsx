
'use client'

import { useState } from 'react'
import { Search, Building, Users, Globe, TrendingUp } from 'lucide-react'

export default function ResearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('company')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setLoading(true)
    // Simulate API call - in real app, this would call an enrichment service
    setTimeout(() => {
      setResults({
        company: {
          name: searchTerm,
          industry: 'Technology',
          size: '100-500 employees',
          location: 'San Francisco, CA',
          website: 'https://example.com',
          description: 'A leading technology company focused on innovative solutions.',
          revenue: '$10M - $50M',
          founded: '2015'
        },
        insights: [
          'Recently raised Series B funding',
          'Expanding engineering team',
          'Looking for sales automation tools',
          'Active on LinkedIn and Twitter'
        ],
        contacts: [
          {
            name: 'John Smith',
            title: 'VP of Sales',
            email: 'john.smith@example.com',
            linkedin: 'linkedin.com/in/johnsmith'
          },
          {
            name: 'Sarah Johnson',
            title: 'Head of Marketing',
            email: 'sarah.j@example.com',
            linkedin: 'linkedin.com/in/sarahjohnson'
          }
        ]
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lead Research</h1>
        <p className="mt-2 text-gray-600">Research companies and contacts for better outreach</p>
      </div>

      {/* Search Interface */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter company name or domain..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <select
            className="px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="company">Company</option>
            <option value="person">Person</option>
            <option value="domain">Domain</option>
          </select>
          <button
            onClick={handleSearch}
            disabled={loading || !searchTerm.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        <p className="text-sm text-gray-500">
          Search for companies to get detailed information, contact data, and personalization insights.
        </p>
      </div>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{results.company.name}</h3>
                <p className="text-gray-600">{results.company.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Industry</span>
                  <p className="text-gray-900">{results.company.industry}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Size</span>
                  <p className="text-gray-900">{results.company.size}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Location</span>
                  <p className="text-gray-900">{results.company.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Revenue</span>
                  <p className="text-gray-900">{results.company.revenue}</p>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Website</span>
                <p className="text-blue-600 hover:underline cursor-pointer">{results.company.website}</p>
              </div>
            </div>
          </div>

          {/* Key Contacts */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Key Contacts</h2>
            </div>
            
            <div className="space-y-4">
              {results.contacts.map((contact: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.title}</p>
                      <p className="text-sm text-blue-600">{contact.email}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Add Lead
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Personalization Insights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.insights.map((insight: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-900 mb-2">Suggested Outreach Angle</h3>
              <p className="text-blue-800 text-sm">
                Focus on their recent funding and expansion plans. Mention how your solution can help them scale their sales processes efficiently during this growth phase.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!results && !loading && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No research data</h3>
          <p className="mt-1 text-sm text-gray-500">
            Search for a company to get detailed insights and contact information.
          </p>
        </div>
      )}
    </div>
  )
}

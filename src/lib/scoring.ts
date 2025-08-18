
interface Lead {
  title?: string
  industry?: string
  companySize?: string
  source?: string
}

interface ScoringCriteria {
  criteria: string
  weight: number
  isActive: boolean
}

export function calculateLeadScore(lead: Lead, criteria: ScoringCriteria[] = []): number {
  let score = 0

  // Base scoring rules
  const scoringRules = [
    // Company Size scoring
    { condition: lead.companySize === '1000+', points: 25 },
    { condition: lead.companySize === '201-1000', points: 20 },
    { condition: lead.companySize === '51-200', points: 15 },
    { condition: lead.companySize === '11-50', points: 10 },
    { condition: lead.companySize === '1-10', points: 5 },

    // Industry scoring
    { condition: lead.industry === 'Technology', points: 20 },
    { condition: lead.industry === 'Healthcare', points: 18 },
    { condition: lead.industry === 'Finance', points: 16 },
    { condition: lead.industry === 'Manufacturing', points: 14 },
    { condition: lead.industry === 'Education', points: 12 },
    { condition: lead.industry === 'Retail', points: 10 },

    // Title scoring
    { condition: isCLevel(lead.title), points: 30 },
    { condition: isVPLevel(lead.title), points: 25 },
    { condition: isDirectorLevel(lead.title), points: 20 },
    { condition: isManagerLevel(lead.title), points: 15 },

    // Source scoring
    { condition: lead.source === 'Referral', points: 15 },
    { condition: lead.source === 'LinkedIn', points: 10 },
    { condition: lead.source === 'Website', points: 8 },
    { condition: lead.source === 'Event', points: 12 },
    { condition: lead.source === 'Cold Call', points: 5 },
  ]

  // Apply base scoring rules
  for (const rule of scoringRules) {
    if (rule.condition) {
      score += rule.points
    }
  }

  // Apply custom criteria if provided
  for (const criterion of criteria) {
    if (!criterion.isActive) continue

    const criteriaMatch = checkCriteriaMatch(lead, criterion.criteria)
    if (criteriaMatch) {
      score += criterion.weight
    }
  }

  // Ensure score is between 0 and 100
  return Math.min(Math.max(score, 0), 100)
}

function isCLevel(title?: string): boolean {
  if (!title) return false
  const cLevelTitles = ['CEO', 'CTO', 'CFO', 'COO', 'CMO', 'Chief']
  return cLevelTitles.some(t => title.toUpperCase().includes(t.toUpperCase()))
}

function isVPLevel(title?: string): boolean {
  if (!title) return false
  return title.toUpperCase().includes('VP') || title.toUpperCase().includes('VICE PRESIDENT')
}

function isDirectorLevel(title?: string): boolean {
  if (!title) return false
  return title.toUpperCase().includes('DIRECTOR')
}

function isManagerLevel(title?: string): boolean {
  if (!title) return false
  return title.toUpperCase().includes('MANAGER')
}

function checkCriteriaMatch(lead: Lead, criteria: string): boolean {
  const criteriaLower = criteria.toLowerCase()
  
  // Check company size criteria
  if (criteriaLower.includes('company size') && lead.companySize) {
    return criteriaLower.includes(lead.companySize.toLowerCase())
  }
  
  // Check industry criteria
  if (criteriaLower.includes('industry') && lead.industry) {
    return criteriaLower.includes(lead.industry.toLowerCase())
  }
  
  // Check title criteria
  if (criteriaLower.includes('title') && lead.title) {
    if (criteriaLower.includes('c-level')) {
      return isCLevel(lead.title)
    }
    if (criteriaLower.includes('vp') || criteriaLower.includes('director')) {
      return isVPLevel(lead.title) || isDirectorLevel(lead.title)
    }
  }
  
  // Check source criteria
  if (criteriaLower.includes('source') && lead.source) {
    return criteriaLower.includes(lead.source.toLowerCase())
  }
  
  return false
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800'
  if (score >= 60) return 'bg-yellow-100 text-yellow-800'
  if (score >= 40) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Hot'
  if (score >= 60) return 'Warm'
  if (score >= 40) return 'Cold'
  return 'Low'
}

export function getPriorityLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 70) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

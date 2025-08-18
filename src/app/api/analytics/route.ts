
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get lead counts by status
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      where: { userId: user.id },
      _count: { id: true }
    })

    // Get total leads
    const totalLeads = await prisma.lead.count({
      where: { userId: user.id }
    })

    // Get outreach stats
    const totalOutreach = await prisma.outreach.count({
      where: { userId: user.id }
    })

    const sentOutreach = await prisma.outreach.count({
      where: { 
        userId: user.id,
        sentAt: { not: null }
      }
    })

    const repliedOutreach = await prisma.outreach.count({
      where: { 
        userId: user.id,
        repliedAt: { not: null }
      }
    })

    // Get template performance
    const templateStats = await prisma.emailTemplate.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        sentCount: true,
        openCount: true,
        replyCount: true
      }
    })

    // Calculate response rate
    const responseRate = sentOutreach > 0 ? (repliedOutreach / sentOutreach) * 100 : 0

    const analytics = {
      totalLeads,
      leadsByStatus: leadsByStatus.reduce((acc, item) => {
        acc[item.status] = item._count.id
        return acc
      }, {} as Record<string, number>),
      outreach: {
        total: totalOutreach,
        sent: sentOutreach,
        replied: repliedOutreach,
        responseRate: Math.round(responseRate * 100) / 100
      },
      templatePerformance: templateStats
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

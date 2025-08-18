
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where = {
      userId: user.id,
      ...(status && { status }),
      ...(search
        ? {
            OR: [
              { firstName: { contains: search } },
              { lastName: { contains: search } },
              { email: { contains: search } },
              { company: { contains: search } },
            ],
          }
        : {}),
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    if (format === 'csv') {
      const csvHeaders = [
        'First Name',
        'Last Name', 
        'Email',
        'Company',
        'Title',
        'Phone',
        'Industry',
        'Company Size',
        'Source',
        'Status',
        'Score',
        'Notes',
        'Created At'
      ]

      const csvRows = leads.map(lead => [
        lead.firstName,
        lead.lastName,
        lead.email,
        lead.company,
        lead.title || '',
        lead.phone || '',
        lead.industry || '',
        lead.companySize || '',
        lead.source || '',
        lead.status,
        lead.score.toString(),
        lead.notes || '',
        lead.createdAt.toISOString()
      ])

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => 
          row.map(field => `"${field.replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n')

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="leads-export-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // JSON format
    return NextResponse.json(leads)
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}

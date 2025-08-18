
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
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

    const { leadId, templateId, subject, body, recipientEmail } = await request.json()

    // Create outreach record
    const outreach = await prisma.outreach.create({
      data: {
        leadId,
        templateId,
        subject,
        body,
        status: 'sent',
        sentAt: new Date(),
        userId: user.id
      }
    })

    // Send email
    try {
      await sendEmail({
        to: recipientEmail,
        subject,
        body
      })

      // Update lead status to 'Contacted' if it's still 'New'
      await prisma.lead.updateMany({
        where: {
          id: leadId,
          status: 'New'
        },
        data: {
          status: 'Contacted'
        }
      })

      // Update template sent count if template was used
      if (templateId) {
        await prisma.emailTemplate.update({
          where: { id: templateId },
          data: {
            sentCount: {
              increment: 1
            }
          }
        })
      }

    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Update outreach status to failed
      await prisma.outreach.update({
        where: { id: outreach.id },
        data: {
          status: 'failed'
        }
      })
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, outreach })
  } catch (error) {
    console.error('Outreach API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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
    const leadId = searchParams.get('leadId')

    const where = {
      userId: user.id,
      ...(leadId && { leadId })
    }

    const outreach = await prisma.outreach.findMany({
      where,
      include: {
        lead: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            company: true
          }
        },
        template: {
          select: {
            name: true,
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(outreach)
  } catch (error) {
    console.error('Outreach GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

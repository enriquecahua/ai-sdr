
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculateLeadScore } from '@/lib/scoring'
import { z } from 'zod'

const updateLeadSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  company: z.string().min(1).optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional()
})

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { params } = context
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

    const body = await request.json()
    const validatedData = updateLeadSchema.parse(body)

    const existingLead = await prisma.lead.findFirst({
      where: { id: params.id, userId: user.id }
    })

    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const updatedData = { ...existingLead, ...validatedData }
    const score = calculateLeadScore({
      title: updatedData.title ?? undefined,
      industry: updatedData.industry ?? undefined,
      companySize: updatedData.companySize ?? undefined,
      source: updatedData.source ?? undefined
    })

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        score
      }
    })

    return NextResponse.json(lead)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    console.error('Error updating lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { params } = context
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

    const lead = await prisma.lead.findFirst({
      where: { id: params.id, userId: user.id }
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    await prisma.lead.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Lead deleted successfully' })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

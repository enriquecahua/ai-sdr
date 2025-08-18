
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create a demo user
  const hashedPassword = bcrypt.hashSync('demo123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@ai-sdr.com' },
    update: {},
    create: {
      email: 'demo@ai-sdr.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  })

  console.log('Created user:', user.email)

  // Create sample leads
  const sampleLeads = [
    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@techcorp.com',
      company: 'TechCorp Inc',
      title: 'VP of Engineering',
      phone: '+1-555-0101',
      industry: 'Technology',
      companySize: '201-1000',
      source: 'LinkedIn',
      status: 'New',
      score: 85,
      notes: 'Interested in automation solutions'
    },
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@healthplus.com',
      company: 'HealthPlus Solutions',
      title: 'Chief Technology Officer',
      phone: '+1-555-0102',
      industry: 'Healthcare',
      companySize: '51-200',
      source: 'Website',
      status: 'Qualified',
      score: 92,
      notes: 'Looking for HIPAA-compliant solutions'
    },
    {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'm.chen@financeflow.com',
      company: 'FinanceFlow',
      title: 'Director of Operations',
      phone: '+1-555-0103',
      industry: 'Finance',
      companySize: '11-50',
      source: 'Referral',
      status: 'Contacted',
      score: 78,
      notes: 'Needs cost-effective solution'
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@retailmax.com',
      company: 'RetailMax',
      title: 'IT Manager',
      phone: '+1-555-0104',
      industry: 'Retail',
      companySize: '1000+',
      source: 'Cold Call',
      status: 'Responded',
      score: 88,
      notes: 'Interested in scalability features'
    },
    {
      firstName: 'David',
      lastName: 'Wilson',
      email: 'd.wilson@edutech.com',
      company: 'EduTech Solutions',
      title: 'Product Manager',
      phone: '+1-555-0105',
      industry: 'Education',
      companySize: '201-1000',
      source: 'Event',
      status: 'Meeting Scheduled',
      score: 95,
      notes: 'Demo scheduled for next week'
    },
    {
      firstName: 'Lisa',
      lastName: 'Brown',
      email: 'lisa.brown@manufacturing.com',
      company: 'Advanced Manufacturing',
      title: 'Operations Director',
      phone: '+1-555-0106',
      industry: 'Manufacturing',
      companySize: '51-200',
      source: 'LinkedIn',
      status: 'Closed',
      score: 90,
      notes: 'Deal closed successfully'
    }
  ]

  for (const leadData of sampleLeads) {
    const existingLead = await prisma.lead.findFirst({
      where: { email: leadData.email, userId: user.id }
    })
    
    if (!existingLead) {
      await prisma.lead.create({
        data: {
          ...leadData,
          userId: user.id,
        },
      })
    }
  }

  console.log('Created sample leads')

  // Create sample email templates
  const sampleTemplates = [
    {
      name: 'Cold Outreach - Tech Companies',
      subject: 'Quick question about {{company}}\'s growth',
      body: `Hi {{firstName}},

I noticed {{company}} has been expanding rapidly in the {{industry}} space. Congratulations on the recent growth!

I'm reaching out because we've helped similar companies like yours streamline their operations and reduce costs by up to 30%. 

Would you be open to a brief 15-minute call this week to discuss how we might be able to help {{company}} achieve similar results?

Best regards,
Alex Thompson
Senior Sales Development Representative`,
      category: 'cold_outreach',
      sentCount: 25,
      openCount: 18,
      replyCount: 6
    },
    {
      name: 'Follow-up - Initial Contact',
      subject: 'Following up on our conversation about {{company}}',
      body: `Hi {{firstName}},

I wanted to follow up on my previous email about helping {{company}} with operational efficiency.

I understand you're probably busy, but I believe this could make a significant impact on your team's productivity.

Would you have 10 minutes for a quick call this week? I can share some specific examples of how we've helped companies in the {{industry}} industry.

Best,
Alex Thompson`,
      category: 'follow_up',
      sentCount: 15,
      openCount: 12,
      replyCount: 4
    },
    {
      name: 'Meeting Request - Qualified Lead',
      subject: 'Meeting request - {{company}} efficiency opportunity',
      body: `Hi {{firstName}},

Based on our previous conversations, I'd love to schedule a meeting to discuss how we can help {{company}} achieve the 30% cost reduction we discussed.

I have availability:
- Tuesday at 2:00 PM EST
- Wednesday at 10:00 AM EST  
- Thursday at 3:00 PM EST

Which works best for you? The meeting will take about 30 minutes and I'll come prepared with specific recommendations for {{company}}.

Looking forward to our conversation.

Best regards,
Alex Thompson`,
      category: 'meeting_request',
      sentCount: 8,
      openCount: 7,
      replyCount: 5
    }
  ]

  for (const templateData of sampleTemplates) {
    const existingTemplate = await prisma.emailTemplate.findFirst({
      where: { name: templateData.name, userId: user.id }
    })
    
    if (!existingTemplate) {
      await prisma.emailTemplate.create({
        data: {
          ...templateData,
          userId: user.id,
        },
      })
    }
  }

  console.log('Created sample email templates')

  // Create sample outreach records
  const leads = await prisma.lead.findMany({ where: { userId: user.id } })
  const templates = await prisma.emailTemplate.findMany({ where: { userId: user.id } })

  if (leads.length > 0 && templates.length > 0) {
    const sampleOutreach = [
      {
        leadId: leads[0].id,
        templateId: templates[0].id,
        subject: `Quick question about ${leads[0].company}'s growth`,
        body: `Hi ${leads[0].firstName},

I noticed ${leads[0].company} has been expanding rapidly in the ${leads[0].industry} space. Congratulations on the recent growth!

I'm reaching out because we've helped similar companies like yours streamline their operations and reduce costs by up to 30%. 

Would you be open to a brief 15-minute call this week to discuss how we might be able to help ${leads[0].company} achieve similar results?

Best regards,
Alex Thompson`,
        status: 'sent',
        sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        openedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        leadId: leads[1].id,
        templateId: templates[1].id,
        subject: `Following up on our conversation about ${leads[1].company}`,
        body: `Hi ${leads[1].firstName},

I wanted to follow up on my previous email about helping ${leads[1].company} with operational efficiency.

I understand you're probably busy, but I believe this could make a significant impact on your team's productivity.

Would you have 10 minutes for a quick call this week?

Best,
Alex Thompson`,
        status: 'sent',
        sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      }
    ]

    for (const outreachData of sampleOutreach) {
      await prisma.outreach.create({
        data: {
          ...outreachData,
          userId: user.id,
        },
      })
    }

    console.log('Created sample outreach records')
  }

  // Create lead scoring criteria
  const scoringCriteria = [
    { criteria: 'Company Size: 1000+', weight: 25, isActive: true },
    { criteria: 'Industry: Technology', weight: 20, isActive: true },
    { criteria: 'Title: C-Level', weight: 30, isActive: true },
    { criteria: 'Title: VP/Director', weight: 25, isActive: true },
    { criteria: 'Source: Referral', weight: 15, isActive: true },
    { criteria: 'Source: LinkedIn', weight: 10, isActive: true },
  ]

  for (const criteria of scoringCriteria) {
    const existingCriteria = await prisma.leadScore.findFirst({
      where: { criteria: criteria.criteria }
    })
    
    if (!existingCriteria) {
      await prisma.leadScore.create({
        data: criteria,
      })
    }
  }

  console.log('Created lead scoring criteria')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

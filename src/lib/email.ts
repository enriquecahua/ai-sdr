
import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  body: string
}

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  // For development, use a service like Ethereal Email or configure with your SMTP
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
    pass: process.env.SMTP_PASS || 'ethereal.pass'
  }
})

export async function sendEmail({ to, subject, body }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@ai-sdr.com',
      to,
      subject,
      text: body,
      html: body.replace(/\n/g, '<br>')
    })

    console.log('Email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

export function validateEmailTemplate(template: string, variables: Record<string, string>) {
  let processedTemplate = template
  
  // Replace variables
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
    processedTemplate = processedTemplate.replace(regex, value || '')
  })
  
  return processedTemplate
}

# AI SDR - Sales Development Representative Platform

A comprehensive web-based lead qualification and outreach management tool built with Next.js, TypeScript, and PostgreSQL. This application provides SDRs with everything they need to manage leads, create email templates, track outreach campaigns, and analyze performance.

## 🚀 Features

### Core Functionality

#### 1. **Lead Management System**
- ✅ Add/import leads with complete contact information
- ✅ Lead status tracking (New, Qualified, Contacted, Responded, Meeting Scheduled, Closed)
- ✅ Lead source tracking and detailed notes
- ✅ Advanced search and filtering capabilities
- ✅ Bulk operations and CSV export functionality

#### 2. **Intelligent Lead Scoring System**
- ✅ Configurable scoring criteria (company size, industry, title, engagement level)
- ✅ Automatic score calculation and priority ranking
- ✅ Visual score indicators with color-coded badges
- ✅ Smart filtering by score ranges

#### 3. **Email Template Library**
- ✅ Pre-built email templates for different outreach stages
- ✅ Personalization variables ({{firstName}}, {{company}}, {{title}}, etc.)
- ✅ Template performance tracking (sent, open, reply rates)
- ✅ Category-based organization (Cold Outreach, Follow-up, Meeting Request)

#### 4. **Outreach Management**
- ✅ Manual email sending with template selection
- ✅ Real-time variable personalization
- ✅ Outreach history and status tracking
- ✅ Response categorization and follow-up reminders

#### 5. **Analytics Dashboard**
- ✅ Key metrics: total leads, response rates, meetings booked, conversion rates
- ✅ Visual pipeline progression charts
- ✅ Template performance comparison
- ✅ Conversion funnel analysis

#### 6. **Lead Research Assistant**
- ✅ Company information display
- ✅ Contact enrichment suggestions
- ✅ Industry insights for personalization

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js with credentials provider
- **Styling**: Tailwind CSS with custom components
- **Charts**: Chart.js with React integration
- **Email**: Nodemailer for email sending
- **Validation**: Zod for type-safe validation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd ai-sdr
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FROM_EMAIL="your-email@gmail.com"
```

3. **Initialize database and seed data**
```bash
npm run db:migrate
npm run db:seed
```

4. **Start development server**
```bash
npm run dev
```

5. **Access the application**
- Open http://localhost:3000
- Login with: `demo@ai-sdr.com` / `demo123`

## 🎯 Usage Guide

### Getting Started

1. **Login**: Use the demo credentials or create a new account
2. **Dashboard**: View your key metrics and pipeline overview
3. **Add Leads**: Import or manually add leads with complete information
4. **Create Templates**: Build personalized email templates for different scenarios
5. **Send Outreach**: Use templates to send personalized emails to leads
6. **Track Performance**: Monitor your campaigns and optimize based on analytics

### Key Workflows

#### Lead Management
1. Navigate to **Leads** page
2. Click **Add Lead** to create new prospects
3. Use filters to find specific leads
4. Update lead status as you progress through your sales process
5. Export lead lists for external use

#### Email Outreach
1. Go to **Templates** page to create email templates
2. Use personalization variables like `{{firstName}}`, `{{company}}`
3. From the Leads page, click **Email** next to any lead
4. Select a template or write a custom message
5. Send and track in the **Outreach** section

#### Performance Analysis
1. Visit **Analytics** dashboard for overview metrics
2. Monitor conversion rates and template performance
3. Identify high-scoring leads for priority outreach
4. Track pipeline progression and bottlenecks

## 🔧 Configuration

### Lead Scoring
The system automatically scores leads based on:
- **Company Size**: 1000+ employees (25 pts), 201-1000 (20 pts), etc.
- **Industry**: Technology (20 pts), Healthcare (18 pts), Finance (16 pts)
- **Title Level**: C-Level (30 pts), VP (25 pts), Director (20 pts)
- **Source**: Referral (15 pts), LinkedIn (10 pts), Events (12 pts)

### Email Templates
Templates support these variables:
- `{{firstName}}` - Lead's first name
- `{{lastName}}` - Lead's last name  
- `{{fullName}}` - Full name
- `{{company}}` - Company name
- `{{title}}` - Job title
- `{{email}}` - Email address

## 🚀 Deployment

### Production Deployment

#### Option 1: Vercel + Supabase
1. **Deploy to Vercel**
```bash
npm install -g vercel
vercel
```

2. **Set up Supabase PostgreSQL**
- Create account at supabase.com
- Create new project and get connection string
- Update `DATABASE_URL` in Vercel environment variables

3. **Run migrations**
```bash
npx prisma migrate deploy
```

#### Option 2: Railway/Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

### Environment Variables for Production
```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="secure-random-string"
SMTP_HOST="your-smtp-host"
SMTP_USER="your-email"
SMTP_PASS="your-password"
```

## 📊 Database Schema

### Core Tables
- **Users**: Authentication and user management
- **Leads**: Contact information and lead data
- **EmailTemplates**: Reusable email templates
- **Outreach**: Email campaign tracking
- **LeadScore**: Scoring criteria configuration

### Key Relationships
- Users have many Leads, Templates, and Outreach records
- Leads can have multiple Outreach attempts
- Templates can be used in multiple Outreach campaigns

## 🔒 Security Features

- **Authentication**: Secure credential-based login with NextAuth.js
- **Authorization**: User-scoped data access
- **Input Validation**: Zod schema validation on all inputs
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **XSS Protection**: React's built-in XSS prevention

## 🧪 Testing

### Run Tests
```bash
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run lint        # Code linting
npm run type-check  # TypeScript checking
```

### Test Coverage
- API route testing with Jest
- Component testing with React Testing Library
- Integration testing for critical user flows

## 📈 Performance Optimizations

- **Database**: Indexed queries for fast lead searches
- **Frontend**: React Server Components for optimal loading
- **Caching**: Next.js automatic caching for static content
- **Bundle Size**: Tree-shaking and code splitting
- **Images**: Next.js Image optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Leads API
- `GET /api/leads` - List leads with filtering
- `POST /api/leads` - Create new lead
- `PUT /api/leads/[id]` - Update lead
- `DELETE /api/leads/[id]` - Delete lead
- `GET /api/leads/export` - Export leads as CSV

### Templates API
- `GET /api/templates` - List email templates
- `POST /api/templates` - Create template
- `PUT /api/templates/[id]` - Update template
- `DELETE /api/templates/[id]` - Delete template

### Outreach API
- `GET /api/outreach` - List outreach history
- `POST /api/outreach` - Send email campaign

### Analytics API
- `GET /api/analytics` - Get dashboard metrics

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
npx prisma generate
npx prisma migrate reset
```

**Email Sending Problems**
- Verify SMTP credentials in `.env.local`
- Check firewall settings for SMTP ports
- Use app-specific passwords for Gmail

**Build Errors**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Tailwind CSS for beautiful styling
- The open-source community for inspiration

---

## 🎉 Demo Credentials

**Username**: `demo@ai-sdr.com`  
**Password**: `demo123`

The application comes pre-loaded with sample data including:
- 6 sample leads across different industries
- 3 email templates for different outreach stages
- Sample outreach history and analytics data

---

**Built with ❤️ for Sales Development Representatives**

For support or questions, please open an issue on GitHub.

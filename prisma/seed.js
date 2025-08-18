"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, user, sampleLeads, _i, sampleLeads_1, leadData, existingLead, sampleTemplates, _a, sampleTemplates_1, templateData, existingTemplate, leads, templates, sampleOutreach, _b, sampleOutreach_1, outreachData, scoringCriteria, _c, scoringCriteria_1, criteria, existingCriteria;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, bcrypt.hash('demo123', 10)];
                case 1:
                    hashedPassword = _d.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'demo@ai-sdr.com' },
                            update: {},
                            create: {
                                email: 'demo@ai-sdr.com',
                                name: 'Demo User',
                                password: hashedPassword,
                            },
                        })];
                case 2:
                    user = _d.sent();
                    console.log('Created user:', user.email);
                    sampleLeads = [
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
                    ];
                    _i = 0, sampleLeads_1 = sampleLeads;
                    _d.label = 3;
                case 3:
                    if (!(_i < sampleLeads_1.length)) return [3 /*break*/, 7];
                    leadData = sampleLeads_1[_i];
                    return [4 /*yield*/, prisma.lead.findFirst({
                            where: { email: leadData.email, userId: user.id }
                        })];
                case 4:
                    existingLead = _d.sent();
                    if (!!existingLead) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.lead.create({
                            data: __assign(__assign({}, leadData), { userId: user.id }),
                        })];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7:
                    console.log('Created sample leads');
                    sampleTemplates = [
                        {
                            name: 'Cold Outreach - Tech Companies',
                            subject: 'Quick question about {{company}}\'s growth',
                            body: "Hi {{firstName}},\n\nI noticed {{company}} has been expanding rapidly in the {{industry}} space. Congratulations on the recent growth!\n\nI'm reaching out because we've helped similar companies like yours streamline their operations and reduce costs by up to 30%. \n\nWould you be open to a brief 15-minute call this week to discuss how we might be able to help {{company}} achieve similar results?\n\nBest regards,\nAlex Thompson\nSenior Sales Development Representative",
                            category: 'cold_outreach',
                            sentCount: 25,
                            openCount: 18,
                            replyCount: 6
                        },
                        {
                            name: 'Follow-up - Initial Contact',
                            subject: 'Following up on our conversation about {{company}}',
                            body: "Hi {{firstName}},\n\nI wanted to follow up on my previous email about helping {{company}} with operational efficiency.\n\nI understand you're probably busy, but I believe this could make a significant impact on your team's productivity.\n\nWould you have 10 minutes for a quick call this week? I can share some specific examples of how we've helped companies in the {{industry}} industry.\n\nBest,\nAlex Thompson",
                            category: 'follow_up',
                            sentCount: 15,
                            openCount: 12,
                            replyCount: 4
                        },
                        {
                            name: 'Meeting Request - Qualified Lead',
                            subject: 'Meeting request - {{company}} efficiency opportunity',
                            body: "Hi {{firstName}},\n\nBased on our previous conversations, I'd love to schedule a meeting to discuss how we can help {{company}} achieve the 30% cost reduction we discussed.\n\nI have availability:\n- Tuesday at 2:00 PM EST\n- Wednesday at 10:00 AM EST  \n- Thursday at 3:00 PM EST\n\nWhich works best for you? The meeting will take about 30 minutes and I'll come prepared with specific recommendations for {{company}}.\n\nLooking forward to our conversation.\n\nBest regards,\nAlex Thompson",
                            category: 'meeting_request',
                            sentCount: 8,
                            openCount: 7,
                            replyCount: 5
                        }
                    ];
                    _a = 0, sampleTemplates_1 = sampleTemplates;
                    _d.label = 8;
                case 8:
                    if (!(_a < sampleTemplates_1.length)) return [3 /*break*/, 12];
                    templateData = sampleTemplates_1[_a];
                    return [4 /*yield*/, prisma.emailTemplate.findFirst({
                            where: { name: templateData.name, userId: user.id }
                        })];
                case 9:
                    existingTemplate = _d.sent();
                    if (!!existingTemplate) return [3 /*break*/, 11];
                    return [4 /*yield*/, prisma.emailTemplate.create({
                            data: __assign(__assign({}, templateData), { userId: user.id }),
                        })];
                case 10:
                    _d.sent();
                    _d.label = 11;
                case 11:
                    _a++;
                    return [3 /*break*/, 8];
                case 12:
                    console.log('Created sample email templates');
                    return [4 /*yield*/, prisma.lead.findMany({ where: { userId: user.id } })];
                case 13:
                    leads = _d.sent();
                    return [4 /*yield*/, prisma.emailTemplate.findMany({ where: { userId: user.id } })];
                case 14:
                    templates = _d.sent();
                    if (!(leads.length > 0 && templates.length > 0)) return [3 /*break*/, 19];
                    sampleOutreach = [
                        {
                            leadId: leads[0].id,
                            templateId: templates[0].id,
                            subject: "Quick question about ".concat(leads[0].company, "'s growth"),
                            body: "Hi ".concat(leads[0].firstName, ",\n\nI noticed ").concat(leads[0].company, " has been expanding rapidly in the ").concat(leads[0].industry, " space. Congratulations on the recent growth!\n\nI'm reaching out because we've helped similar companies like yours streamline their operations and reduce costs by up to 30%. \n\nWould you be open to a brief 15-minute call this week to discuss how we might be able to help ").concat(leads[0].company, " achieve similar results?\n\nBest regards,\nAlex Thompson"),
                            status: 'sent',
                            sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                            openedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                        },
                        {
                            leadId: leads[1].id,
                            templateId: templates[1].id,
                            subject: "Following up on our conversation about ".concat(leads[1].company),
                            body: "Hi ".concat(leads[1].firstName, ",\n\nI wanted to follow up on my previous email about helping ").concat(leads[1].company, " with operational efficiency.\n\nI understand you're probably busy, but I believe this could make a significant impact on your team's productivity.\n\nWould you have 10 minutes for a quick call this week?\n\nBest,\nAlex Thompson"),
                            status: 'sent',
                            sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                        }
                    ];
                    _b = 0, sampleOutreach_1 = sampleOutreach;
                    _d.label = 15;
                case 15:
                    if (!(_b < sampleOutreach_1.length)) return [3 /*break*/, 18];
                    outreachData = sampleOutreach_1[_b];
                    return [4 /*yield*/, prisma.outreach.create({
                            data: __assign(__assign({}, outreachData), { userId: user.id }),
                        })];
                case 16:
                    _d.sent();
                    _d.label = 17;
                case 17:
                    _b++;
                    return [3 /*break*/, 15];
                case 18:
                    console.log('Created sample outreach records');
                    _d.label = 19;
                case 19:
                    scoringCriteria = [
                        { criteria: 'Company Size: 1000+', weight: 25, isActive: true },
                        { criteria: 'Industry: Technology', weight: 20, isActive: true },
                        { criteria: 'Title: C-Level', weight: 30, isActive: true },
                        { criteria: 'Title: VP/Director', weight: 25, isActive: true },
                        { criteria: 'Source: Referral', weight: 15, isActive: true },
                        { criteria: 'Source: LinkedIn', weight: 10, isActive: true },
                    ];
                    _c = 0, scoringCriteria_1 = scoringCriteria;
                    _d.label = 20;
                case 20:
                    if (!(_c < scoringCriteria_1.length)) return [3 /*break*/, 24];
                    criteria = scoringCriteria_1[_c];
                    return [4 /*yield*/, prisma.leadScore.findFirst({
                            where: { criteria: criteria.criteria }
                        })];
                case 21:
                    existingCriteria = _d.sent();
                    if (!!existingCriteria) return [3 /*break*/, 23];
                    return [4 /*yield*/, prisma.leadScore.create({
                            data: criteria,
                        })];
                case 22:
                    _d.sent();
                    _d.label = 23;
                case 23:
                    _c++;
                    return [3 /*break*/, 20];
                case 24:
                    console.log('Created lead scoring criteria');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

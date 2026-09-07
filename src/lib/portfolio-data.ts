export const profile = {
  name: "Bryant Francisco",
  role: "AI Automation Specialist",
  tagline: "CRM & Workflow Automation",
  location: "Quezon City, Philippines",
  phone: "0998-258-0160",
  email: "bryantfranciscoai@gmail.com",
  linkedin: "https://linkedin.com/in/bryntfrncsc",
  summary:
    "Motivated AI Automation Specialist with hands-on experience building and troubleshooting workflows using n8n, Make, Zapier, and GoHighLevel. Skilled in APIs, webhooks, CRM automation, AI tools, and business process automation — helping businesses reduce manual work, improve efficiency, and streamline operations.",
};

export const services = [
  {
    title: "Workflow Automation",
    blurb:
      "End-to-end automations in n8n, Make, and Zapier that remove repetitive manual work from daily operations.",
    points: ["Conditional logic, routers & iterators", "Scheduled triggers and delays", "Error handling and monitoring"],
  },
  {
    title: "CRM & Lead Automation",
    blurb:
      "GoHighLevel pipelines that capture leads, tag them, and follow up automatically through SMS, calls, and email.",
    points: ["Lead capture forms", "Automated follow-up sequences", "Pipeline tagging & routing"],
  },
  {
    title: "AI Agents & Chatbots",
    blurb:
      "AI-powered assistants with knowledge bases and conversation memory for customer support and internal teams.",
    points: ["Knowledge base retrieval", "Prompt engineering", "Meta / web chat integration"],
  },
  {
    title: "API & Systems Integration",
    blurb:
      "Connecting the tools you already use through REST APIs, webhooks, and clean, reliable data mapping.",
    points: ["REST APIs & webhooks", "JSON data mapping", "API authentication"],
  },
  {
    title: "Content & Social Automation",
    blurb:
      "Automated content pipelines that generate, repurpose, and publish material across social channels.",
    points: ["AI content generation", "Transcription & repurposing", "Scheduled publishing"],
  },
  {
    title: "Reporting & Data Processing",
    blurb:
      "Automated data collection and reporting across Google Sheets, Drive, Xero, and project tools.",
    points: ["Sheets & Drive pipelines", "Xero report delivery", "Automated summaries"],
  },
];

export const experience = [
  {
    period: "Ongoing",
    title: "AI Automation & Workflow Projects",
    org: "Independent / Personal Projects",
    bullets: [
      "Built workflow automations using n8n, Make, Zapier, and GoHighLevel.",
      "Integrated applications using APIs, webhooks, HTTP requests, JSON, and authentication.",
      "Developed AI-powered workflows for customer support, content creation, recruitment, job searching, and business processes.",
      "Created CRM and lead automation for lead capture, follow-ups, SMS, and customer communication.",
      "Used conditional logic, filters, routers, iterators, delays, and scheduled triggers to control workflow execution.",
      "Worked with Google Sheets, Google Drive, Gmail, Slack, Facebook Pages, Google Calendar, Asana, and Xero.",
      "Troubleshot API, data mapping, node configuration, authentication, and workflow logic issues.",
    ],
  },
  {
    period: "2022",
    title: "BS in Hospitality Management",
    org: "STI College Fairview",
    bullets: ["Bachelor of Science graduate, 2022."],
  },
  {
    period: "Certifications",
    title: "Automation Certifications",
    org: "Zapier · Make · n8n · GoHighLevel",
    bullets: [
      "Zapier Automation",
      "Make Automation",
      "n8n Automation",
      "GoHighLevel Automation Specialist",
    ],
  },
];

export type Project = {
  title: string;
  stack: string[];
  description: string;
};

export type Category = {
  id: string;
  label: string;
  headline: string;
  intro: string;
  projects: Project[];
};

export const categories: Category[] = [
  {
    id: "n8n",
    label: "n8n Automation",
    headline: "AI agents and multi-step workflows built in n8n",
    intro:
      "Self-hosted style automations combining AI agents, webhooks, and third-party APIs for support, content, and recruitment.",
    projects: [
      {
        title: "AI Customer Support Chatbot",
        stack: ["n8n", "Google Gemini", "Webhooks", "Google Docs", "Meta API"],
        description:
          "AI-powered customer support workflow that receives messages through webhooks, retrieves FAQ information from a knowledge base, processes inquiries using an AI Agent, maintains conversation memory, and connects with Meta for automated customer responses.",
      },
      {
        title: "AI Video Creator & Social Media Automation",
        stack: ["n8n", "OpenAI", "Google Sheets", "Video API", "Facebook Graph API", "YouTube"],
        description:
          "Scheduled AI video workflow that generates content prompts, retrieves data from Google Sheets, connects to a video-generation API, monitors generation status, handles errors, processes generated files, and prepares content for social media publishing.",
      },
      {
        title: "AI Recruitment & Candidate Evaluation Assistant",
        stack: ["n8n", "AI", "Google Drive", "Forms", "Gmail", "Google Calendar"],
        description:
          "AI-assisted recruitment workflow that processes candidate information, supports candidate evaluation, generates questionnaires, sends personalized communication, schedules interviews, and updates candidate records.",
      },
      {
        title: "AI Job Search & Resume Assistant",
        stack: ["n8n", "Slack", "OpenRouter", "Job Search API", "Google Drive", "AI"],
        description:
          "AI-powered job-search workflow that receives requests through Slack, validates search queries, retrieves job listings through an API, processes job information, and uses AI to assist with customized resume content.",
      },
    ],
  },
  {
    id: "zapier",
    label: "Zapier Automation",
    headline: "Multi-step Zaps for lead flow and content",
    intro:
      "Zapier automations that route incoming data, apply AI processing, and trigger notifications and publishing.",
    projects: [
      {
        title: "AI Lead Automation & Enrichment",
        stack: ["Zapier", "Webhooks", "Google Sheets", "Slack", "AI", "Gmail"],
        description:
          "Multi-step lead automation that receives lead information through a webhook, processes and formats data, routes leads based on conditions, records information in Google Sheets, sends Slack notifications, applies AI processing, and triggers automated email communication.",
      },
      {
        title: "AI Content Repurposing & Social Media Automation",
        stack: ["Zapier", "Google Drive", "AI by Zapier", "Facebook Pages"],
        description:
          "Content repurposing workflow that detects new files in Google Drive, generates transcripts using AI, transforms content into social media material, processes multiple content items, and publishes content through automated workflow paths.",
      },
    ],
  },
  {
    id: "make",
    label: "Make Automation",
    headline: "Scenario-based automations in Make",
    intro:
      "Make scenarios using routers, iterators, and API modules for document handling and business reporting.",
    projects: [
      {
        title: "Automated Gmail Attachment Management",
        stack: ["Make", "Gmail", "AI", "Google Drive", "Google Sheets"],
        description:
          "Workflow that monitors Gmail attachments, processes files using AI, generates appropriate file names, uploads files to Google Drive, records information in Google Sheets, and sends an automated email summary.",
      },
      {
        title: "Xero Report Delivery to Asana",
        stack: ["Make", "Xero API", "Asana", "Google Sheets", "Router", "Iterator"],
        description:
          "Automation that retrieves business data from Xero through an API, processes information using routers and iterators, stores data in Google Sheets, aggregates report information, and delivers reports to Asana.",
      },
    ],
  },
  {
    id: "ghl",
    label: "GoHighLevel (GHL)",
    headline: "CRM follow-up systems in GoHighLevel",
    intro:
      "GoHighLevel builds that capture leads and keep them engaged with automated multi-channel follow-up.",
    projects: [
      {
        title: "Lead Capture & Automated Follow-Up System",
        stack: ["GoHighLevel", "Forms", "CRM", "SMS", "Calls", "Workflows"],
        description:
          "Lead follow-up system that captures form submissions, applies CRM tags, sends automated SMS and call sequences, waits for customer responses, and uses conditional logic to determine the appropriate follow-up action.",
      },
    ],
  },
];

export const skillGroups = [
  { label: "AI & Automation", items: ["n8n", "Make", "Zapier", "AI Agents", "Prompt Engineering"] },
  {
    label: "API & Integration",
    items: ["REST APIs", "Webhooks", "HTTP Requests", "JSON", "API Authentication"],
  },
  { label: "CRM", items: ["GoHighLevel", "Lead Management", "Follow-Ups", "CRM Workflows"] },
  {
    label: "Business Automation",
    items: ["Email", "SMS", "Appointments", "Data Processing", "Notifications"],
  },
  {
    label: "Tools",
    items: [
      "Google Sheets",
      "Google Drive",
      "Gmail",
      "Slack",
      "Facebook Pages",
      "Google Calendar",
      "Asana",
      "Xero",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Bryant mapped out our entire lead flow and rebuilt it in GoHighLevel. Follow-ups now go out in seconds instead of the next day, and nothing slips through.",
    name: "Marissa Cole",
    title: "Agency Owner, Coastline Marketing",
  },
  {
    quote:
      "The AI support chatbot he built answers the bulk of our repeat questions on its own. Our team finally has time for the conversations that actually need a human.",
    name: "David Ng",
    title: "Operations Lead, BrightDesk",
  },
  {
    quote:
      "Our Xero-to-Asana reporting used to be a weekly manual chore. Bryant automated the whole chain and it has run without a hiccup since.",
    name: "Elena Rivera",
    title: "Finance Manager, Northgate Supply",
  },
  {
    quote:
      "Clear communicator, quick to troubleshoot, and genuinely good at spotting where the wasted hours are hiding. The content pipeline he set up saves us a full day each week.",
    name: "Tom Whitaker",
    title: "Founder, Loop Creative",
  },
];

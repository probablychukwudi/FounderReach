import type {
  ActivityLogItem,
  AgentBlueprint,
  AgentRun,
  Booking,
  Contact,
  Institution,
  Outreach,
  PermissionToggle,
  Profile,
  Source,
} from "@/types";

export const demoProfile: Profile = {
  id: "profile-demo",
  fullName: "Alex Mercer",
  startupName: "FounderReach",
  startupDescription:
    "Architectural Studio leveraging AI agents to automate early-stage networking and outreach.",
  startupStage: "seed",
};

export const demoSources: Source[] = [
  {
    id: "source-scholar",
    platform: "google_scholar",
    label: "Google Scholar",
    subtitle: "Academic papers and researcher profiles",
    active: true,
    url: "https://scholar.google.com",
    useCase: "Map active labs and citation momentum for founder-adjacent work.",
  },
  {
    id: "source-rg",
    platform: "researchgate",
    label: "ResearchGate",
    subtitle: "Publications and lab affiliations",
    active: true,
    url: "https://www.researchgate.net",
    useCase: "Validate institutional affiliation and current publication cadence.",
  },
  {
    id: "source-nsf",
    platform: "nsf",
    label: "NSF.gov",
    subtitle: "Active grants and program officers",
    active: true,
    url: "https://www.nsf.gov",
    useCase: "Find active grant programs and contact surfaces with recent awards.",
  },
  {
    id: "source-nih",
    platform: "nih",
    label: "NIH Reporter",
    subtitle: "Funded research and principal investigators",
    active: true,
    url: "https://reporter.nih.gov",
    useCase: "Trace funding recency and identify active translational programs.",
  },
  {
    id: "source-academia",
    platform: "academia",
    label: "Academia.edu",
    subtitle: "Faculty pages and research interests",
    active: true,
    url: "https://www.academia.edu",
    useCase: "Add supplementary context from faculty and department pages.",
  },
  {
    id: "source-linkedin",
    platform: "linkedin",
    label: "LinkedIn",
    subtitle: "Lab directors, operators, and VC partners",
    active: true,
    url: "https://www.linkedin.com",
    useCase: "Resolve operator identity and outreach pathways for decision makers.",
  },
];

export const demoContacts: Contact[] = [
  {
    id: "contact-1",
    institutionId: "institution-1",
    name: "Dr. Elias Monroe",
    role: "Lab Director",
    email: "emonroe@media.mit.edu",
  },
  {
    id: "contact-2",
    institutionId: "institution-2",
    name: "Grace Holloway",
    role: "Program Officer, AI Systems",
    email: "grace@hai.stanford.edu",
  },
  {
    id: "contact-3",
    institutionId: "institution-3",
    name: "Noah Patel",
    role: "Program Officer",
    email: "npatel@nsf.gov",
  },
  {
    id: "contact-4",
    institutionId: "institution-4",
    name: "Prof. Leila Brooks",
    role: "Professor",
    email: "lbrooks@cmu.edu",
  },
];

export const demoInstitutions: Institution[] = [
  {
    id: "institution-1",
    sourceId: "source-scholar",
    name: "MIT Media Lab",
    type: "research_lab",
    focus: "AI+HCI",
    description:
      "Experimental lab exploring AI, design, and human-centered systems for next-generation products.",
    website: "https://www.media.mit.edu",
    location: "Cambridge, MA",
    relevanceScore: 0.95,
    fundingRecency: "active",
    collaborationHistory: true,
    stage: "qualified",
    primaryContactId: "contact-1",
    lastActivity: "Review pipeline for next steps",
  },
  {
    id: "institution-2",
    sourceId: "source-nsf",
    name: "Stanford HAI",
    type: "institute",
    focus: "Policy+AI",
    description:
      "Institute for human-centered AI research, public policy, and commercialization partnerships.",
    website: "https://hai.stanford.edu",
    location: "Stanford, CA",
    relevanceScore: 0.91,
    fundingRecency: "active",
    collaborationHistory: true,
    stage: "outreach_sent",
    primaryContactId: "contact-2",
    lastActivity: "Follow-up moved to 2:00 PM",
  },
  {
    id: "institution-3",
    sourceId: "source-nsf",
    name: "NSF Grant #2024",
    type: "grant",
    focus: "Infrastructure",
    description:
      "Active grant call focused on AI infrastructure, open tooling, and translational systems work.",
    website: "https://www.nsf.gov",
    location: "Washington, DC",
    relevanceScore: 0.88,
    fundingRecency: "recent",
    collaborationHistory: false,
    stage: "qualified",
    primaryContactId: "contact-3",
    lastActivity: "Grant deadline due today",
  },
  {
    id: "institution-4",
    sourceId: "source-rg",
    name: "Carnegie Mellon Robotics",
    type: "lab",
    focus: "Robotics",
    description:
      "Robotics lab building autonomous systems with strong technical founder adjacency.",
    website: "https://www.cmu.edu",
    location: "Pittsburgh, PA",
    relevanceScore: 0.89,
    fundingRecency: "recent",
    collaborationHistory: true,
    stage: "outreach_drafted",
    primaryContactId: "contact-4",
    lastActivity: "Interview scheduled",
  },
];

export const demoOutreach: Outreach[] = [
  {
    id: "outreach-1",
    institutionId: "institution-1",
    contactId: "contact-1",
    subject: "MIT Media Lab Email",
    body:
      "Alex — your recent work at MIT Media Lab on design-forward AI systems looks like a strong match for FounderReach. We are building a founder-facing platform that continuously maps live research, grant, and partner surfaces, then drafts outreach with recent context and clear collaboration hooks. I’d love to share what we are seeing across startup partnership workflows and explore whether there is room for a short conversation around applied AI, human-centered interfaces, and commercialization pathways.",
    status: "pending_approval",
  },
  {
    id: "outreach-2",
    institutionId: "institution-2",
    contactId: "contact-2",
    subject: "Stanford HAI Email",
    body:
      "Grace — FounderReach is building a live studio for startup research and outreach, and Stanford HAI stood out because of the institute’s balance of policy, commercialization, and human-centered systems work. We’re using AI agents to keep research signals current and to route founders toward the right institutional conversations faster. If helpful, I’d love to share what we’ve learned about founder workflows and see whether there is overlap with the HAI ecosystem.",
    status: "pending_approval",
  },
];

export const demoBookings: Booking[] = [
  {
    id: "booking-1",
    outreachId: "outreach-1",
    institutionId: "institution-2",
    contactId: "contact-2",
    title: "Stanford HAI Follow-up",
    scheduledAt: "2026-10-11T14:00:00.000Z",
    durationMinutes: 30,
    status: "confirmed",
    meetingLink: "https://meet.google.com/founderreach-stanford",
  },
  {
    id: "booking-2",
    outreachId: "outreach-2",
    institutionId: "institution-4",
    contactId: "contact-4",
    title: "CMU Robotics Interview",
    scheduledAt: "2026-10-17T10:00:00.000Z",
    durationMinutes: 30,
    status: "pending",
    meetingLink: "https://cal.com/founderreach/cmu-robotics",
  },
];

export const demoAgentRun: AgentRun = {
  id: "run-demo-1",
  startupContext:
    "FounderReach is a TinyFish-native platform that helps founders discover high-fit research institutions, grant programs, and investors, then draft personalized outreach and book follow-ups.",
  stage: "qualify",
  status: "running",
  tinyfishSessionId: "tf_demo_session_01",
  institutionsFound: 312,
  institutionsQualified: 74,
  draftsCreated: 12,
  startedAt: "2026-04-20T14:12:00.000Z",
};

export const demoActivityLog: ActivityLogItem[] = [
  {
    id: "activity-1",
    timestamp: "10:42 AM",
    action: "Extracted Stanford HAI faculty list",
    entityType: "institution",
    entityId: "institution-1",
  },
  {
    id: "activity-2",
    timestamp: "09:15 AM",
    action: "Drafted email to MIT director",
    entityType: "outreach",
    entityId: "outreach-1",
  },
  {
    id: "activity-3",
    timestamp: "08:42 AM",
    action: "Ranked NSF Grant #2024 as high-fit infrastructure target",
    entityType: "institution",
    entityId: "institution-3",
  },
  {
    id: "activity-4",
    timestamp: "08:16 AM",
    action: "Synced CMU Robotics interview to schedule",
    entityType: "booking",
    entityId: "booking-2",
  },
];

export const agentBlueprints: AgentBlueprint[] = [
  {
    id: "match",
    title: "Match",
    description:
      "Match your startup to relevant research labs and grant programs.",
    primaryUrl: "scholar.google.com/citations?view_op=search_authors...",
    access: [
      "Google Scholar researcher and paper pages",
      "ResearchGate publication and affiliation views",
      "NSF grant listings and program pages",
      "NIH Reporter awards and PI records",
      "LinkedIn people and company profiles",
    ],
    useCase: "Create an institution list with contact paths, websites, and funding context.",
    status: "complete",
    countLabel: "312 institutions scanned",
  },
  {
    id: "qualify",
    title: "Qualify",
    description:
      "Qualify the research relevance, funding recency, and past collaborators.",
    primaryUrl: "reporter.nih.gov/project-details...",
    access: [
      "Funding databases for recency checks",
      "Institution websites for strategic fit",
      "LinkedIn and publication history for operator validation",
    ],
    useCase: "Score each institution against the founder's current startup context.",
    status: "running",
    countLabel: "74 institutions ranked",
  },
  {
    id: "outreach",
    title: "Outreach",
    description:
      "Draft personalized research outreach emails and curated letters.",
    primaryUrl: "linkedin.com/in/lab-director...",
    access: [
      "Lab or fund websites for messaging anchors",
      "Individual contact profiles for tone and role context",
      "Recent publications or grants for specificity",
    ],
    useCase: "Generate approval-ready, specific emails with why-now personalization.",
    status: "ready",
    countLabel: "24 drafts ready",
  },
  {
    id: "book",
    title: "Book",
    description:
      "Book your startup with relevant research labs, grant programs, and VC contacts.",
    primaryUrl: "calendar.google.com/calendar/u/0/r",
    access: [
      "Email thread state for reply detection",
      "Google Calendar availability",
      "Cal.com or meeting scheduling flows",
    ],
    useCase: "Convert positive signals into scheduled conversations with the right stakeholders.",
    status: "queued",
    countLabel: "8 meetings queued",
  },
];

export const permissionToggles: PermissionToggle[] = [
  {
    id: "send-without-approval",
    label: "Send emails without approval",
    description: "Allow the Outreach agent to ship approved-ready messages automatically.",
    enabled: false,
  },
  {
    id: "book-without-approval",
    label: "Book meetings without approval",
    description: "Allow the Booking agent to confirm slots once a positive reply lands.",
    enabled: false,
  },
  {
    id: "scan-linkedin",
    label: "Use LinkedIn in browser runs",
    description: "Resolve operator identity and warm paths through live profile evidence.",
    enabled: true,
  },
  {
    id: "scan-grants",
    label: "Use public grant databases",
    description: "Read NSF and NIH program pages to validate active funding and fit.",
    enabled: true,
  },
];

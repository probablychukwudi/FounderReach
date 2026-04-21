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
  fullName: "Chukwudi Owo",
  startupName: "FounderReach",
  startupDescription:
    "FounderReach automates startup partnership intelligence, from discovery through warm outreach and booking.",
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
    active: false,
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
    name: "Dr. Maya Chen",
    role: "Director, Venture Studio Collaborations",
    email: "maya.chen@hai.stanford.edu",
  },
  {
    id: "contact-2",
    institutionId: "institution-2",
    name: "Jordan Bell",
    role: "Program Officer, AI Systems",
    email: "jordan.bell@nsf.gov",
  },
  {
    id: "contact-3",
    institutionId: "institution-3",
    name: "Amelia Ross",
    role: "Partner",
    email: "amelia@radicalfrontier.vc",
  },
  {
    id: "contact-4",
    institutionId: "institution-4",
    name: "Prof. Daniel Irving",
    role: "Lab Director",
    email: "dirving@cmu.edu",
  },
];

export const demoInstitutions: Institution[] = [
  {
    id: "institution-1",
    sourceId: "source-scholar",
    name: "Stanford HAI Venture Lab",
    type: "research_lab",
    focus: "AI + Startup Commercialization",
    description:
      "Bridges frontier AI research with venture-backed commercialization partners.",
    website: "https://hai.stanford.edu",
    location: "Stanford, CA",
    relevanceScore: 0.94,
    fundingRecency: "active",
    collaborationHistory: true,
    stage: "booked",
    primaryContactId: "contact-1",
    lastActivity: "Booked investor-research sync",
  },
  {
    id: "institution-2",
    sourceId: "source-nsf",
    name: "NSF Directorate for Technology Partnerships",
    type: "grant",
    focus: "AI Infrastructure",
    description:
      "Federal program office funding translational AI partnerships and infrastructure pilots.",
    website: "https://www.nsf.gov",
    location: "Washington, DC",
    relevanceScore: 0.88,
    fundingRecency: "active",
    collaborationHistory: false,
    stage: "outreach_sent",
    primaryContactId: "contact-2",
    lastActivity: "Draft approved and sent",
  },
  {
    id: "institution-3",
    sourceId: "source-linkedin",
    name: "Radical Frontier Ventures",
    type: "vc",
    focus: "AI Tooling",
    description:
      "Seed fund focused on infrastructure and workflow products that unlock distribution for founders.",
    website: "https://radicalfrontier.vc",
    location: "New York, NY",
    relevanceScore: 0.82,
    fundingRecency: "recent",
    collaborationHistory: false,
    stage: "qualified",
    primaryContactId: "contact-3",
    lastActivity: "Added to target investor lane",
  },
  {
    id: "institution-4",
    sourceId: "source-rg",
    name: "CMU Human-Centered Automation Lab",
    type: "lab",
    focus: "AI + HCI",
    description:
      "Research lab working on human-centered automation systems and collaborative agents.",
    website: "https://www.cmu.edu",
    location: "Pittsburgh, PA",
    relevanceScore: 0.91,
    fundingRecency: "recent",
    collaborationHistory: true,
    stage: "outreach_drafted",
    primaryContactId: "contact-4",
    lastActivity: "Awaiting founder approval",
  },
];

export const demoOutreach: Outreach[] = [
  {
    id: "outreach-1",
    institutionId: "institution-2",
    contactId: "contact-2",
    subject: "FounderReach x NSF infrastructure pilot",
    body:
      "Jordan — I’m building FounderReach to help startups identify and activate research and grant partnerships faster. Your AI Systems program stood out because of its clear interest in practical infrastructure outcomes and founder accessibility. We’ve built a TinyFish-powered workflow that continuously maps labs, grant programs, and operator surfaces, then drafts high-context outreach grounded in live evidence. I’d love to show how that infrastructure could support more founders finding fit with NSF initiatives and learn where your team is most interested in commercialization-grade tooling this year.",
    status: "sent",
    sentAt: "2026-04-20T15:30:00.000Z",
  },
  {
    id: "outreach-2",
    institutionId: "institution-4",
    contactId: "contact-4",
    subject: "FounderReach x CMU HCA collaboration",
    body:
      "Professor Irving — FounderReach turns fragmented partnership research into a live operating system for founders, and your lab’s work on human-centered automation is exactly the kind of partner signal we want to activate responsibly. We’ve been following your recent collaborative agent research and believe there is a clear opportunity to pair your lab’s strengths with founder-facing distribution and commercialization experiments. If useful, I’d love to share how we’re using TinyFish browser agents to keep partnership intelligence current and explore whether there is overlap worth testing.",
    status: "pending_approval",
  },
];

export const demoBookings: Booking[] = [
  {
    id: "booking-1",
    outreachId: "outreach-1",
    institutionId: "institution-1",
    contactId: "contact-1",
    title: "Stanford HAI x FounderReach partnership review",
    scheduledAt: "2026-04-24T17:00:00.000Z",
    durationMinutes: 30,
    status: "confirmed",
    meetingLink: "https://meet.google.com/founderreach-hai",
  },
  {
    id: "booking-2",
    outreachId: "outreach-2",
    institutionId: "institution-2",
    contactId: "contact-2",
    title: "NSF AI Systems funding fit discussion",
    scheduledAt: "2026-04-28T15:30:00.000Z",
    durationMinutes: 30,
    status: "pending",
    meetingLink: "https://cal.com/founderreach/nsf-fit",
  },
];

export const demoAgentRun: AgentRun = {
  id: "run-demo-1",
  startupContext:
    "FounderReach is a TinyFish-native platform that helps founders discover high-fit research institutions, grant programs, and investors, then draft personalized outreach and book follow-ups.",
  stage: "outreach",
  status: "running",
  tinyfishSessionId: "tf_demo_session_01",
  institutionsFound: 38,
  institutionsQualified: 14,
  draftsCreated: 5,
  startedAt: "2026-04-20T14:12:00.000Z",
};

export const demoActivityLog: ActivityLogItem[] = [
  {
    id: "activity-1",
    timestamp: "2:12 PM",
    action: "TinyFish Match agent opened Google Scholar for startup-aligned institutions",
    entityType: "institution",
    entityId: "institution-1",
  },
  {
    id: "activity-2",
    timestamp: "2:16 PM",
    action: "Qualified Stanford HAI Venture Lab at 94% relevance with active funding",
    entityType: "institution",
    entityId: "institution-1",
  },
  {
    id: "activity-3",
    timestamp: "2:20 PM",
    action: "Drafted personalized outreach for CMU Human-Centered Automation Lab",
    entityType: "outreach",
    entityId: "outreach-2",
  },
  {
    id: "activity-4",
    timestamp: "2:28 PM",
    action: "Booked partnership review with Stanford HAI Venture Lab",
    entityType: "booking",
    entityId: "booking-1",
  },
];

export const agentBlueprints: AgentBlueprint[] = [
  {
    id: "match",
    title: "Match",
    description:
      "Scan research, grants, and investor surfaces to build the raw institution graph.",
    primaryUrl: "scholar.google.com",
    access: [
      "Google Scholar researcher and paper pages",
      "ResearchGate publication and affiliation views",
      "NSF grant listings and program pages",
      "NIH Reporter awards and PI records",
      "LinkedIn people and company profiles",
    ],
    useCase: "Create an institution list with contact paths, websites, and funding context.",
    status: "complete",
    countLabel: "38 matches",
  },
  {
    id: "qualify",
    title: "Qualify",
    description:
      "Rank each target by relevance, recency, and active collaboration or funding signals.",
    primaryUrl: "reporter.nih.gov",
    access: [
      "Funding databases for recency checks",
      "Institution websites for strategic fit",
      "LinkedIn and publication history for operator validation",
    ],
    useCase: "Score each institution against the founder's current startup context.",
    status: "running",
    countLabel: "14 qualified",
  },
  {
    id: "outreach",
    title: "Outreach",
    description:
      "Write personalized outbound drafts grounded in live institutional evidence.",
    primaryUrl: "www.linkedin.com",
    access: [
      "Lab or fund websites for messaging anchors",
      "Individual contact profiles for tone and role context",
      "Recent publications or grants for specificity",
    ],
    useCase: "Generate approval-ready, specific emails with why-now personalization.",
    status: "ready",
    countLabel: "5 drafts ready",
  },
  {
    id: "book",
    title: "Book",
    description:
      "Turn approved outreach into live meeting flows and calendar slots.",
    primaryUrl: "calendar.google.com",
    access: [
      "Email thread state for reply detection",
      "Google Calendar availability",
      "Cal.com or meeting scheduling flows",
    ],
    useCase: "Convert positive signals into scheduled conversations with the right stakeholders.",
    status: "queued",
    countLabel: "2 meetings pending",
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

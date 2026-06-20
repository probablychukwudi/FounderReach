export type StartupStage = "idea" | "pre-seed" | "seed" | "series-a";

export type SourcePlatform =
  | "google_scholar"
  | "researchgate"
  | "nsf"
  | "nih"
  | "academia"
  | "linkedin"
  | "custom";

export type InstitutionStage =
  | "matched"
  | "qualified"
  | "outreach_drafted"
  | "outreach_sent"
  | "booked";

export type OutreachStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "sent"
  | "replied"
  | "booked";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type AgentStage = "match" | "qualify" | "outreach" | "book";

export interface Profile {
  id: string;
  fullName: string;
  avatarUrl?: string;
  startupName: string;
  startupDescription: string;
  startupStage: StartupStage;
}

export type FounderAccountMode = "guest" | "email";

export interface FounderAccount {
  mode: FounderAccountMode;
  email?: string;
  newsletterOptIn: boolean;
  createdAt: string;
}

export interface Source {
  id: string;
  platform: SourcePlatform;
  label: string;
  subtitle: string;
  active: boolean;
  url: string;
  useCase: string;
}

export interface Contact {
  id: string;
  institutionId: string;
  name: string;
  role: string;
  email: string;
  linkedinUrl?: string;
  notes?: string;
}

export interface Institution {
  id: string;
  sourceId: string;
  name: string;
  type: "research_lab" | "institute" | "grant" | "vc" | "lab";
  focus: string;
  description: string;
  website: string;
  location: string;
  relevanceScore: number;
  fundingRecency: "active" | "recent" | "stale";
  collaborationHistory: boolean;
  stage: InstitutionStage;
  primaryContactId: string;
  lastActivity: string;
}

export interface Outreach {
  id: string;
  institutionId: string;
  contactId: string;
  subject: string;
  body: string;
  status: OutreachStatus;
  approvedAt?: string;
  sentAt?: string;
  repliedAt?: string;
}

export interface Booking {
  id: string;
  outreachId: string;
  institutionId: string;
  contactId: string;
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  status: BookingStatus;
  meetingLink: string;
}

export interface AgentRun {
  id: string;
  startupContext: string;
  stage: AgentStage;
  status: "queued" | "running" | "complete" | "error";
  tinyfishSessionId?: string;
  institutionsFound: number;
  institutionsQualified: number;
  draftsCreated: number;
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: string;
  entityType?: "institution" | "outreach" | "booking";
  entityId?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface AgentBlueprint {
  id: AgentStage;
  title: string;
  description: string;
  primaryUrl: string;
  access: string[];
  useCase: string;
  status: "complete" | "running" | "ready" | "queued";
  countLabel: string;
}

export interface PermissionToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export type OpportunityCategory =
  | "hackathon"
  | "accelerator"
  | "conference"
  | "funding"
  | "incentive"
  | "investor"
  | "mentor"
  | "talent"
  | "launch"
  | "news"
  | "forum"
  | "fellowship"
  | "competition";

export type OpportunityFormat =
  | "Online"
  | "In-person"
  | "Hybrid"
  | "Remote"
  | "Global"
  | "Directory";

export type OpportunityCost =
  | "Free"
  | "Paid"
  | "Equity"
  | "Non-dilutive"
  | "Dilutive"
  | "Credits"
  | "Community";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationDomain?: string;
  logoUrl?: string;
  category: OpportunityCategory;
  format: OpportunityFormat;
  location: string;
  sectors: string[];
  audience: string;
  summary: string;
  deadline?: string;
  startDate?: string;
  endDate?: string;
  value?: string;
  cost: OpportunityCost;
  sourceName: string;
  sourceUrl: string;
  actionLabel: string;
  tags: string[];
  trustSignal: string;
  priority: "urgent" | "soon" | "evergreen" | "watch";
  featured?: boolean;
}

export interface OpportunityCategoryMeta {
  id: OpportunityCategory | "all";
  label: string;
  description: string;
}

export interface OpportunitySyncCandidate {
  id: string;
  title: string;
  organization: string;
  organizationDomain?: string;
  logoUrl?: string;
  category: OpportunityCategory;
  format: OpportunityFormat;
  location: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  discoveredBy: string;
  fetchedTitle?: string;
  fetchedDescription?: string;
  confidence: number;
}

export interface CalendarPreferences {
  timezone: string;
  defaultView: "month" | "week" | "list";
  digestFrequency: "off" | "daily" | "weekly";
  savedDeadlineWindowDays: number;
}

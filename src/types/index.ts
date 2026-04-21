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

import type { AgentStage, Source } from "@/types";

const TINYFISH_BASE_URL =
  process.env.TINYFISH_BASE_URL ?? "https://agent.tinyfish.ai/v1";

type TinyFishEvent = {
  event?: string;
  data: string;
};

export interface TinyFishAutomationInput {
  url: string;
  goal: string;
}

export interface TinyFishAutomationResult {
  events: TinyFishEvent[];
  finalData?: unknown;
  rawText: string;
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

async function parseSseResponse(response: Response) {
  if (!response.body) {
    throw new Error("TinyFish returned no body.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let rawText = "";
  const events: TinyFishEvent[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    rawText += decoder.decode(value);

    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";

    for (const chunk of chunks) {
      const lines = chunk.split("\n");
      const event = lines.find((line) => line.startsWith("event:"))?.replace("event:", "").trim();
      const data = lines
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.replace("data:", "").trim())
        .join("\n");

      if (data) {
        events.push({ event, data });
      }
    }
  }

  const finalEvent = [...events].reverse().find((item) => safeJsonParse(item.data));

  return {
    events,
    finalData: finalEvent ? safeJsonParse(finalEvent.data) : undefined,
    rawText,
  } satisfies TinyFishAutomationResult;
}

export async function runTinyFishAutomation(input: TinyFishAutomationInput) {
  const apiKey = process.env.TINYFISH_API_KEY;

  if (!apiKey) {
    throw new Error("Missing TINYFISH_API_KEY.");
  }

  const response = await fetch(`${TINYFISH_BASE_URL}/automation/run-sse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`TinyFish request failed with status ${response.status}.`);
  }

  return parseSseResponse(response);
}

export function buildTinyFishGoal({
  startupContext,
  sources,
  stage,
}: {
  startupContext: string;
  sources: Source[];
  stage: AgentStage;
}) {
  const sourceLabels = sources.map((source) => source.label).join(", ");

  if (stage === "match") {
    return `Search these live browser sources: ${sourceLabels}. Startup context: ${startupContext}. Find research labs, institutes, grant programs, and VC firms that are relevant. For each result extract institution name, type, focus area, website, location, primary contact name and role, and recent funding or publication evidence. Return structured JSON.`;
  }

  if (stage === "qualify") {
    return `Using the current institution set from ${sourceLabels}, score each institution against this startup context: ${startupContext}. Factors: topic relevance, funding recency, partnership potential, operator accessibility, and commercialization fit. Return ranked JSON with relevance_score, funding_recency, and a one-sentence rationale per institution.`;
  }

  if (stage === "outreach") {
    return `Draft a concise founder outreach email grounded in current browser evidence. Startup context: ${startupContext}. Use the institution website, profile data, and recent work to produce a subject line plus 150-200 word message with no filler. Return JSON with subject, body, institution_name, and contact_name.`;
  }

  return `Given live browser access to calendar and communication surfaces plus this startup context: ${startupContext}, identify the best next booking step for each warm institution and return JSON with institution_name, recommended_time_window, meeting_goal, and rationale.`;
}

export const TINYFISH_AGENT_ACCESS = {
  match: [
    "Google Scholar result pages",
    "ResearchGate lab and affiliation pages",
    "NSF award listings",
    "NIH Reporter grant records",
    "LinkedIn people and firm profiles",
  ],
  qualify: [
    "Institution websites and lab pages",
    "Funding databases and recent award pages",
    "Publication feeds for recency checks",
  ],
  outreach: [
    "Institution homepages and team pages",
    "Recent publication or grant detail pages",
    "LinkedIn role context for personalization",
  ],
  book: [
    "Email response context",
    "Google Calendar availability",
    "Cal.com booking flows",
  ],
} as const;

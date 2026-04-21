import { NextResponse } from "next/server";
import { demoAgentRun, demoSources } from "@/lib/demo-data";
import { buildTinyFishGoal, runTinyFishAutomation } from "@/lib/tinyfish/client";
import type { AgentStage } from "@/types";

export async function POST(request: Request) {
  const body = await request.json();
  const startupContext = body.startupContext as string | undefined;
  const stage = (body.stage as AgentStage | undefined) ?? "match";
  const sourceIds = (body.sourceIds as string[] | undefined) ?? [];

  if (!startupContext) {
    return NextResponse.json({ error: "startupContext is required." }, { status: 400 });
  }

  const activeSources = demoSources.filter((source) =>
    sourceIds.length ? sourceIds.includes(source.id) : source.active,
  );

  const primarySource = activeSources[0] ?? demoSources[0];
  const run = {
    ...demoAgentRun,
    id: crypto.randomUUID(),
    stage,
    status: process.env.TINYFISH_API_KEY ? "running" : "queued",
    startupContext,
    startedAt: new Date().toISOString(),
  };

  if (!process.env.TINYFISH_API_KEY) {
    return NextResponse.json({
      message:
        "FounderReach planned the TinyFish browser run. Add TINYFISH_API_KEY to execute the live automation.",
      run,
      mode: "planned",
      plannedAutomation: {
        url: primarySource.url,
        goal: buildTinyFishGoal({
          startupContext,
          sources: activeSources,
          stage,
        }),
      },
    });
  }

  try {
    const result = await runTinyFishAutomation({
      url: primarySource.url,
      goal: buildTinyFishGoal({
        startupContext,
        sources: activeSources,
        stage,
      }),
    });

    return NextResponse.json({
      message: `TinyFish ${stage} agent launched against ${primarySource.label}.`,
      mode: "live",
      run: {
        ...run,
        tinyfishSessionId:
          (result.finalData as { session_id?: string } | undefined)?.session_id ?? crypto.randomUUID(),
      },
      tinyfish: result.finalData ?? result.events.slice(-3),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "TinyFish run failed; FounderReach kept the pipeline staged for retry.",
        mode: "error",
        error: error instanceof Error ? error.message : "Unknown TinyFish error",
        run: {
          ...run,
          status: "error",
        },
      },
      { status: 502 },
    );
  }
}

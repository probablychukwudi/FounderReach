import { NextResponse } from "next/server";
import { load } from "cheerio";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await fetch("https://hacklist.io/", {
    headers: {
      "user-agent": "FounderReach resource indexer (+https://founderreach.app)",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "HackList fetch failed", status: response.status },
      { status: 502 },
    );
  }

  const html = await response.text();
  const $ = load(html);
  const pageText = $("body").text().replace(/\s+/g, " ").trim();
  const activeCount = Number(pageText.match(/(\d+)\s+Active Hackathons/i)?.[1] ?? 0);
  const prizePool = pageText.match(/\$[0-9,]+(?:\.[0-9]+)?\s+in Total Prizes/i)?.[0] ?? null;
  const applyLinks = $("a")
    .toArray()
    .map((element) => ({
      label: $(element).text().replace(/\s+/g, " ").trim(),
      url: new URL($(element).attr("href") ?? "/", "https://hacklist.io/").toString(),
    }))
    .filter((link) => /apply|opportunity|access/i.test(link.label));

  const listings = $("h3")
    .toArray()
    .map((element) => $(element).text().replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 40);

  return NextResponse.json({
    source: "https://hacklist.io/",
    fetchedAt: new Date().toISOString(),
    activeCount,
    prizePool,
    listings,
    applyLinks,
  });
}

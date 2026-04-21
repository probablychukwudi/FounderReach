import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, Mail, Network, Sparkles } from "lucide-react";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import { PipelineCard } from "@/components/pipeline/pipeline-card";
import { PipelineConnector } from "@/components/pipeline/pipeline-connector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { agentBlueprints, demoInstitutions } from "@/lib/demo-data";

const features = [
  {
    title: "Live institution matching",
    description:
      "TinyFish browser agents crawl real academic, grant, and operator surfaces instead of relying on stale databases.",
    icon: Globe2,
  },
  {
    title: "Qualification engine",
    description:
      "FounderReach ranks targets by fit, funding recency, and operator accessibility so founders focus on high-signal paths.",
    icon: Network,
  },
  {
    title: "Approval-first outreach",
    description:
      "Personalized emails are drafted from current browser evidence and held for founder review before they ship.",
    icon: Mail,
  },
  {
    title: "Booking workflow",
    description:
      "Once momentum exists, the platform moves from outreach into meeting scheduling and calendar orchestration.",
    icon: Sparkles,
  },
];

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <section className="border-b border-black/5">
        <div className="mx-auto flex max-w-launch items-center justify-between px-5 py-6 lg:px-8">
          <FounderReachLogo />
          <nav className="hidden items-center gap-8 text-sm text-ink-2 lg:flex">
            <a href="#product">Product</a>
            <a href="#pipeline">Solutions</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">Resources</a>
            <Link href="/login">Sign In</Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto grid max-w-launch gap-10 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <Chip tone="success">TinyFish-native partnership automation</Chip>
            <h1 className="mt-6 max-w-[760px] text-[52px] font-black leading-[0.96] text-ink sm:text-[72px]">
              Your AI-powered research partner network for founders.
            </h1>
            <p className="mt-6 max-w-[640px] text-lg leading-8 text-ink-2">
              FounderReach matches startup context against research labs, grant programs, and investor surfaces, qualifies the strongest paths with live evidence, drafts personalized outreach, and moves warm threads into booked meetings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup">
                <Button size="lg">Start for free</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["38", "institutions matched in the current run"],
                ["14", "high-fit paths qualified by live signals"],
                ["5", "drafts prepared for approval"],
              ].map(([value, label]) => (
                <Card key={label} className="p-4">
                  <div className="font-display text-[36px] font-black text-ink">{value}</div>
                  <div className="mt-2 text-sm leading-6 text-ink-3">{label}</div>
                </Card>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden p-5">
            <div className="rounded-[28px] bg-gradient-to-br from-grad-top to-grad-bot p-6 text-white">
              <div className="eyebrow !text-white/75">Live Founder Workflow</div>
              <div className="mt-4 text-[32px] font-black leading-tight">
                Deploy browser agents that continuously map your next research and capital partner.
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip tone="dark">Match</Chip>
                <Chip tone="dark">Qualify</Chip>
                <Chip tone="dark">Outreach</Chip>
                <Chip tone="dark">Book</Chip>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {demoInstitutions.slice(0, 3).map((institution) => (
                <div key={institution.id} className="flex items-start justify-between rounded-[18px] bg-surface px-4 py-3">
                  <div>
                    <div className="font-display text-sm font-bold text-ink">{institution.name}</div>
                    <div className="mt-1 text-xs leading-5 text-ink-3">{institution.description}</div>
                  </div>
                  <Chip tone="success">{Math.round(institution.relevanceScore * 100)}%</Chip>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="pipeline" className="border-y border-black/5 bg-white/35">
        <div className="mx-auto max-w-launch px-5 py-16 lg:px-8">
          <div className="max-w-[760px]">
            <div className="eyebrow">The Voxel Pipeline</div>
            <h2 className="mt-3 text-[44px] font-black text-ink">Match, qualify, outreach, and book from one founder command center.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-2">
              FounderReach keeps TinyFish browser use cases explicit. Every agent knows exactly which surfaces it can access and what outcome it owns.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-6 xl:flex-row xl:items-stretch">
            <PipelineCard agent={agentBlueprints[0]} />
            <PipelineConnector label="institution_list →" />
            <PipelineCard agent={agentBlueprints[1]} />
            <PipelineConnector label="qualified_targets →" />
            <PipelineCard agent={agentBlueprints[2]} />
          </div>
        </div>
      </section>

      <section id="product">
        <div className="mx-auto max-w-launch px-5 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <feature.icon className="h-8 w-8 text-green" />
                <h3 className="mt-5 text-2xl font-black text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-2">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white/35">
        <div className="mx-auto grid max-w-launch gap-6 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="eyebrow">Why founders use it</div>
            <h2 className="mt-3 text-[44px] font-black text-ink">Stop assembling partner lists by hand.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-2">
              The product is built around browser-first agent access, so each stage is anchored in current evidence rather than static enrichment guesses.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Google Scholar and ResearchGate for fresh academic context",
              "NSF and NIH for active grants and funding recency",
              "LinkedIn for operator identity and outreach paths",
              "Approval-gated outbound before any send occurs",
            ].map((item) => (
              <Card key={item} className="flex items-start gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-green" />
                <p className="text-sm leading-7 text-ink-2">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="mx-auto max-w-launch px-5 py-16 lg:px-8">
          <div className="eyebrow">Studio Plans</div>
          <div className="mt-3 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$0",
                summary: "For founders validating their first partnership thesis.",
              },
              {
                name: "Studio",
                price: "$149",
                summary: "For teams who need live browser research, approvals, and inbox flow.",
              },
              {
                name: "Enterprise",
                price: "Custom",
                summary: "For venture studios, university programs, and innovation teams.",
              },
            ].map((plan) => (
              <Card key={plan.name} className="flex flex-col justify-between p-6">
                <div>
                  <div className="eyebrow">{plan.name}</div>
                  <div className="mt-3 text-[44px] font-black text-ink">{plan.price}</div>
                  <p className="mt-3 text-sm leading-7 text-ink-2">{plan.summary}</p>
                </div>
                <Button className="mt-8 justify-between">
                  Choose {plan.name}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="mx-auto max-w-launch px-5 py-16 lg:px-8">
          <Card className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="eyebrow">FounderReach</div>
              <h2 className="mt-3 text-[38px] font-black text-ink">Launch your partnership engine with live browser agents.</h2>
              <p className="mt-4 max-w-[720px] text-base leading-7 text-ink-2">
                Authenticate, configure your sources, and let the pipeline move from discovery to booked conversations without losing the founder in admin.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/signup">
                <Button>Start for free</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary">Open demo</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}

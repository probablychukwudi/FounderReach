import Image from "next/image";
import Link from "next/link";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";

const pipelineSteps = [
  {
    step: "Step 1",
    title: "Match",
    description:
      "Agents index millions of data points to identify startups matching your exact thesis criteria.",
    icon: "/assets/figma/landing/step-match.svg",
    highlight: false,
  },
  {
    step: "Step 2",
    title: "Qualify",
    description:
      "Advanced LLMs analyze recent news, funding rounds, and hiring signals to score intent.",
    icon: "/assets/figma/landing/step-qualify.svg",
    highlight: false,
  },
  {
    step: "Step 3",
    title: "Outreach",
    description:
      "Automated, highly personalized initial contact drafted and sent directly from the studio.",
    icon: "/assets/figma/landing/step-outreach.svg",
    highlight: true,
  },
];

const pricingTiers = [
  {
    name: "Founder",
    description: "For individual angels and solo operators.",
    price: "$49",
    suffix: "/mo",
    button: "Select Founder",
    emphasis: false,
    perks: ["1 Active Agent", "500 Matches / month", "Basic Qualification"],
  },
  {
    name: "Studio",
    description: "For emerging micro-funds and syndicates.",
    price: "$199",
    suffix: "/mo",
    button: "Select Studio",
    emphasis: true,
    perks: ["5 Active Agents", "5,000 Matches / month", "Advanced LLM Qualification", "Automated Outreach"],
  },
  {
    name: "Enterprise",
    description: "For institutional VC firms.",
    price: "Custom",
    suffix: "",
    button: "Contact Sales",
    emphasis: false,
    perks: ["Unlimited Agents", "Infinite Matches", "Custom Data Integrations", "Dedicated Support"],
  },
];

export function LandingPage() {
  return (
    <main className="bg-[#f3f3f4] text-ink">
      <header className="sticky top-0 z-30 border-b border-[#f3f3f4] bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 lg:px-8">
          <FounderReachLogo compact />
          <nav className="hidden items-center gap-8 text-base font-medium tracking-[-0.025em] text-ink-2 lg:flex">
            <a href="#product">Product</a>
            <a href="#pipeline">Solutions</a>
            <a href="#pricing">Pricing</a>
            <a href="#resources">Resources</a>
          </nav>
          <div className="flex items-center gap-4 lg:gap-5">
            <Link href="/login" className="hidden text-base font-medium tracking-[-0.025em] text-ink-2 lg:block">
              Sign In
            </Link>
            <Link
              href="/step-1"
              className="rounded-[8px] bg-[linear-gradient(160deg,#006d36_0%,#4ade80_100%)] px-5 py-2.5 text-base font-medium tracking-[-0.025em] text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-4 pb-7 pt-24 lg:px-8">
        <div className="mx-auto flex max-w-[1152px] flex-col gap-12">
          <Image
            src="/assets/brand/founderreach-logo-mark.png"
            alt="FounderReach mark"
            width={102}
            height={109}
            className="h-auto w-[84px] lg:w-[102px]"
            priority
          />
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="space-y-6">
              <h1 className="max-w-[760px] font-display text-[52px] font-black leading-[0.96] tracking-[-0.05em] text-ink sm:text-[64px] lg:text-[72px]">
                Automate your startup research with FounderReach voxel agents
              </h1>
              <div className="max-w-[512px] text-lg leading-7 text-ink-2 lg:text-[20px] lg:leading-7">
                Deploy AI-driven voxel agents to scour the web, qualify leads, and initiate contact, all within a unified studio environment.
              </div>
            </div>

            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[56px]">
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/step-1"
                  className="rounded-[8px] bg-[linear-gradient(166deg,#006d36_0%,#4ade80_100%)] px-8 py-4 text-[18px] font-bold text-white"
                >
                  Start Building Agents
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-[8px] bg-[#e2e2e2] px-8 py-4 text-[18px] font-bold text-green"
                >
                  View Demo
                </Link>
              </div>

              <div className="w-full max-w-[475px] self-end shadow-[-12px_15px_9.7px_rgba(0,0,0,0.25)]">
                <Image
                  src="/assets/figma/landing/dashboard-preview.png"
                  alt="FounderReach dashboard preview"
                  width={475}
                  height={338}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pipeline" className="mx-auto max-w-[1280px] px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-[1152px]">
          <div className="space-y-4 text-center">
            <h2 className="font-display text-[36px] font-bold tracking-[-0.025em] text-ink">The Voxel Pipeline</h2>
            <p className="mx-auto max-w-[672px] text-base leading-6 text-ink-2">
              Our agents operate in a strict, observable 3-step sequence to ensure absolute precision in your outreach.
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
            <div className="absolute left-0 right-0 top-1/2 hidden h-[1.5px] -translate-y-1/2 bg-[#e2e2e2] lg:block" />
            {pipelineSteps.map((step) => (
              <div key={step.title} className="relative rounded-[12px] bg-white px-8 pb-[34px] pt-8 shadow-[0px_4px_24px_-4px_rgba(26,28,28,0.04)]">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${step.highlight ? "bg-[rgba(74,222,128,0.2)]" : "bg-[#e2e2e2]"}`}
                >
                  <Image src={step.icon} alt="" width={25} height={25} className="h-auto w-6" />
                </div>
                <div className="mt-6 text-center text-xs font-bold uppercase tracking-[0.1em] text-green">{step.step}</div>
                <h3 className="mt-3 text-center font-display text-[20px] font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-center text-sm leading-5 text-ink-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-[#dadada] bg-surface px-4 pb-24 pt-[68px] lg:px-8">
        <div className="mx-auto max-w-[1152px]">
          <div className="space-y-4 text-center">
            <h2 className="font-display text-[36px] font-bold tracking-[-0.025em] text-ink">Studio Plans</h2>
            <p className="text-base leading-6 text-ink-2">Choose the tier that matches your research volume.</p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-[12px] bg-white p-8 shadow-[0px_4px_24px_-4px_rgba(26,28,28,0.04)] ${tier.emphasis ? "border-2 border-green" : ""}`}
              >
                {tier.emphasis ? (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white">
                    Most Popular
                  </div>
                ) : null}
                <div className="text-[20px] font-bold text-ink">{tier.name}</div>
                <p className="mt-2 text-sm leading-5 text-ink-2">{tier.description}</p>
                <div className="mt-6 flex items-end gap-1">
                  <div className="font-display text-[36px] font-black leading-10 text-ink">{tier.price}</div>
                  {tier.suffix ? <div className="pb-1 text-[18px] leading-7 text-ink-2">{tier.suffix}</div> : null}
                </div>
                <div className={`mt-6 space-y-[15.5px] ${tier.name === "Founder" ? "pb-[60px]" : tier.name === "Studio" ? "pb-8" : "pb-[25px]"}`}>
                  {tier.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-3">
                      <Image src="/assets/figma/landing/check.svg" alt="" width={12} height={12} className="h-[11px] w-[11px]" />
                      <span className="text-sm leading-5 text-ink">{perk}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full rounded-[8px] py-3 text-base font-bold ${tier.emphasis ? "bg-[linear-gradient(170deg,#006d36_0%,#4ade80_100%)] text-white" : "bg-surface text-green"}`}
                >
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="resources" className="border-t border-[rgba(188,202,187,0.2)] bg-[#f9f9f9] px-4 py-12 lg:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 text-xs text-ink-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink">FounderReach</span>
            <span>© 2026 FounderReach.</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#privacy" className="underline decoration-solid underline-offset-2">Privacy Policy</a>
            <a href="#terms" className="underline decoration-solid underline-offset-2">Terms of Service</a>
            <a href="https://x.com" className="underline decoration-solid underline-offset-2">Twitter</a>
            <a href="https://linkedin.com" className="underline decoration-solid underline-offset-2">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

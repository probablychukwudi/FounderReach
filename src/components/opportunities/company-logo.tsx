"use client";

import { useState } from "react";
import { getLogoUrlForDomain, getOrganizationInitials } from "@/lib/logos";
import { cn } from "@/lib/utils";

export function CompanyLogo({
  name,
  domain,
  logoUrl,
  className,
}: {
  name: string;
  domain?: string;
  logoUrl?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = logoUrl ?? getLogoUrlForDomain(domain, 64);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-green-soft text-[11px] font-semibold text-green",
          className,
        )}
      >
        {getOrganizationInitials(name)}
      </div>
    );
  }

  return (
    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-black/5 bg-white", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Dynamic external logo providers are not known at build time. */}
      <img
        src={src}
        alt={`${name} logo`}
        className="h-full w-full object-contain p-1"
        loading="eager"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

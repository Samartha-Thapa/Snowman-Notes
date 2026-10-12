"use client"

import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  return (
    <main className="min-h-screen bg-[#f7fbff text-slate-900 selection:bg-sky-100 bg-sky-50">
      <header className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="#" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#173b62] text-white shadow-sm">
            <span className="relative flex flex-col items-center leading-none">
              <span className="mb-[-2px] text-[13px]">✦</span>
              <span className="text-[16px]">❄</span>
            </span>
          </span>
              SnowMan Notes
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex" aria-label="Main navigation">
          <Link href="">WorkSpace</Link>
          <Link href="">About</Link>
          <Link href="">How it works</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadown-sm sm:flex" aria-label="Account menu">
            <span className="flex size-6 items-center justify-center rounded-full bg-[#d9edf9] text-[11px] font-bold text-[#24537a]">JD</span>
            Jamie <ChevronDown aria-hidden="true" />
          </button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><Menu /></Button>
        </div>
      </header>
      {mobileOpen && <nav className="mx-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm md:hidden">
        <Link href="/">WorkSpace</Link>  
        <Link href="/">About</Link> 
        <Link href="/">How it works</Link> 
      </nav>
    }



    </main>
  );
}

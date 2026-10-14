"use client"

import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, FileImage, ImagePlus, Lightbulb, Menu, Sparkles, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { snowmanImage } from "./actions/snowman-ss";
import { FlashCard } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [gemmaAnswer, setGemmaAnswer] = useState<{
    explanation: string;
    flashcards: Array<FlashCard>;
  }>({
    explanation: '',
    flashcards: [],
  });
  
  const handleFile = (selectedFile?: File) => {
    if(selectedFile) setFile(selectedFile);
  }

  const solveWithImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      if(!reader.result) return;

      const base64string = (reader.result as string).split(',')[1];
      
      try{
        const response = await snowmanImage(base64string);
        if(response.success && response.data) {
          setGemmaAnswer(response.data);
        } else {
          alert("Error processing your study material. Please try again.");
        }
      }catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] bg-sky-50 text-slate-900 selection:bg-sky-100 ">
      {/* Header */}
      <header className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#173b62] text-white shadow-sm">
            <span className="relative flex flex-col items-center leading-none">
              <span className="mb-[-2px] text-[13px]">✦</span>
              <span className="text-[16px]">❄</span>
            </span>
          </span>
              SnowMan Notes
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex" aria-label="Main navigation">
          <Link href="/" className="hover:text-slate-800 transition">WorkSpace</Link>
          <Link href="/about" className="hover:text-slate-800 transition">About</Link>
          <Link href="/how-it-works" className="hover:text-slate-800 transition">How it works</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadown-sm sm:flex" aria-label="Account menu">
            <span className="flex size-6 h-6 w-6 items-center justify-center rounded-full bg-[#d9edf9] text-[11px] font-bold text-[#24537a]">JD</span>
            Jamie <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><Menu /></Button>
        </div>
      </header>
      {mobileOpen && (<nav className="mx-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm md:hidden">
        <Link href="/">WorkSpace</Link>  
        <Link href="/about">About</Link> 
        <Link href="/how-it-works">How it works</Link> 
      </nav>)
    }

  {/* Workspace */}
    <section id="workspace" className="mx-auto max-w-[1320px] px-5 pb-12 pt-8 sm:px-8 lg:px-12 lg:pt-14">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#173b62] sm:text-5xl lg:text-[58px] lg:leading-[1.03]">We take your questions
          <br/>
          <span className="text-[#64add4]">and make them sense.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">Just take a picture of tough problem, and let Snowman explain it for you 😊</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(310px,.7fr)]">
        <form onSubmit={solveWithImage} className="rounded-[28px] border border-[#d9eaf3] bg-white p-5 shadow-[0_18px_50px_rgba(38, 98, 132, 0.07)] sm:p-7">
          <div className="mb-6 flex items-start justify-between">
            <div className="">
              <h2 className="text-lg font-bold text-[#173b62]">What are you working on?</h2>
              <p className="mt-1 text-sm text-slate-400">Upload a Question to get started</p>
            </div>
            <div className="rounded-2xl bg-[#edf8fd] p-3 text-[#5ba6cf]"> <BookOpen aria-hidden="true" /> </div>
          </div>
          <input ref={inputRef} className="sr-only" type="file" accept="image/*" onChange={(event) => handleFile(event.target.files?.[0])} />
          <div className="group flex min-h-[265px] cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-[#b9ddec] bg-[#f6fbfe] px-6 text-center transition hover:border-[#65afd5] hover:bg-[#f0faff]" role="button" tabIndex={0} onClick={() => inputRef.current?.click()} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click()}} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files?.[0]) }} onDragOver={(event) => event.preventDefault()}>
            <div className="mb-5 flex size-16 items-cener justify-center rounded-[20px] bg-white text-[#62abd2] shadow-[0_8px_25px_rgba(55, 143, 190, 0.12)] transition group-hover:scale-105"><ImagePlus aria-hidden="true" /></div>
            <p className="font-semibold text-[#24537a]">{file ? file.name : 'Drop your question here'}</p>
            <p className="mt-2 text-sm text-slate-400">or click to browse from your device</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#579bc1]"><Upload aria-hidden="true" />PNG, JPG or HEIC . up to 10MB</span>
          </div>
          {file && <div className="mt-4 flex items-center justify-between rounded-xl bg-[#eef9fd] px-4 py-3 text-sm text-[#24537a]"><span className="flex items-center gap-2"><FileImage aria-hidden="true" />{file.name}</span>
            <button onClick={() => setFile(null)} aria-label="Remove selected Image"><X /></button></div>}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-slate-400"><Lightbulb aria-hidden="true" /> Tip: Crop out distraction for a better answer</p>
            <Button type="submit" className="h-11 rounded-xl bg-[#173b62] px-5 text-white hover:bg-[#24537a]" disabled={!file || loading}>
              {loading ? "Solving..." : (
                <>
                  <Sparkles data-icon="inline-start" /> Solve with SnowMan
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Results Output Right Side */}
        <div className="space-y-6">
          {gemmaAnswer.explanation && (
            <div className="rounded-[28px] border border-[#d9eaf3] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#173b62] mb-3">Explanation</h3>
              <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed prose prose-slate prose-sm max-w-none
              ">
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {gemmaAnswer.explanation}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {gemmaAnswer.flashcards.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#173b62]">Study Flashcards</h3>
              <div className="grid gap-3 grid-cols-1">
                {gemmaAnswer.flashcards.map((card, index) => (
                  <div key={index} onClick={() => setFlippedIndex(flippedIndex === index ? null : index)} 
                  className="min-h-[100px] border border-[#d9eaf3] rounded-2xl p-5 flex items-center justify-center text-center cursor-pointer bg-white shadow-sm hover:border-[#65afd5] transition select-none">
                    <p className="text-sm font-semibold text-[#24537a]">
                      {flippedIndex === index ? `❄️ Answer: ${card.back}` : `? Question: ${card.front}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>

      <footer id="about" className="mx-auto flex max-w-[1320px] items-center justify-between border-t border-[#dfeef5] px-5 py-6 text-xs text-slate-400 sm:px-8 lg:px-12">
        <span>Made for curios minds.</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#76c59c]">Snowman AI is ready</span>
        </span>
      </footer>
    </main>
  );
}

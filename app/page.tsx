'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AuthModal from './components/auth/AuthModal'
import WaitlistModal from './components/WaitlistModal'
import { usePathname } from 'next/navigation'
// import Thesis from './components/Thesis' // Removing for now
// import ContentCarousel from './components/ContentCarousel' // Removing for now
// import { WorkWithUsModal } from './components/WorkWithUsModal' // Removing for now

// Main home page component
export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const pathname = usePathname();

  const openAuthModal = (view: 'login' | 'signup') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  // const [isModalOpen, setIsModalOpen] = useState(false) // Removing modal state

  // const contentItems = [ ... ] // Removing old content items

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-16 md:pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Mobile: Logo on top, then content */}
          <div className="md:hidden flex flex-col items-center">
            {/* Keep the logo */}
            <div className="w-[280px] h-[280px] relative mb-16">
              <Image
                src="/content/images/42-logo-t.svg" // Maybe replace this later?
                alt="Platform Logo" // Updated alt text
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center space-y-8">
              {/* Updated Hero Text */}
              <h1 className="text-[42px] sm:text-[42px] font-light leading-[1.1]">
                Your Unified <span className="font-normal">AI Assistant</span>
              </h1>
              <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-md mx-auto">
                Power your workflow with OpenAI, Gemini, and Anthropic — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
                <button
                  onClick={() => openAuthModal('signup')}
                  className="w-full sm:w-auto inline-block bg-black text-white font-mono text-[11px] tracking-wider px-6 py-3 hover:bg-orange-500 transition-colors"
                >
                  GET STARTED →
                </button>
                <button
                  onClick={() => openAuthModal('login')}
                  className="w-full sm:w-auto inline-block bg-neutral-200 text-black font-mono text-[11px] tracking-wider px-6 py-3 hover:bg-neutral-300 transition-colors"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: Side by side */}
          <div className="hidden md:grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               {/* Updated Hero Text */}
              <h1 className="text-[64px] font-light leading-[1.1]">
                 Your Unified <span className="font-normal">AI Assistant</span>
              </h1>
              <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-md">
                Power your workflow with OpenAI, Gemini, and Anthropic — all in one place.
              </p>
              <div className="flex items-center gap-4">
                 <button
                  onClick={() => openAuthModal('signup')}
                  className="inline-block bg-black text-white font-mono text-[11px] tracking-wider px-6 py-3 hover:bg-orange-500 transition-colors"
                >
                  GET STARTED →
                </button>
                <button
                  onClick={() => openAuthModal('login')}
                  className="inline-block bg-neutral-200 text-black font-mono text-[11px] tracking-wider px-6 py-3 hover:bg-neutral-300 transition-colors"
                >
                  LOGIN
                </button>
              </div>
            </div>
            {/* Keep the logo */}
            <div className="relative w-full aspect-square">
              <Image
                src="/content/images/42-logo-t.svg" // Maybe replace this later?
                alt="Platform Logo" // Updated alt text
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* === New Section: Unify Your AI === */}
      <section className="py-20 bg-white"> { /* Or bg-neutral-50 if needed for contrast */}
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            One Interface, Multiple Brains
          </h2>
          <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto mb-12 text-neutral-600">
          Seamlessly switch between Claude, Gemini, and OpenAI—or let NeuroSwitch™ route your queries automatically. Boost your productivity and efficiency with unified AI access.</p>

          {/* Visual Representation (Simple Cards) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Individual AI Cards */}
            <div className="flex gap-4 md:gap-8">
               {/* OpenAI */}
              <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 shadow-sm text-center w-28 h-28 flex flex-col justify-center items-center">
                 {/* Placeholder for Logo */}
                 {/* <span className="text-2xl mb-1">🧠</span> */}
                 <Image src="/content/images/openai.png" alt="OpenAI Logo" width={40} height={40} className="mb-2"/>
                 <span className="font-mono text-[10px] tracking-wider">OpenAI</span>
              </div>
               {/* Gemini */}
               <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 shadow-sm text-center w-28 h-28 flex flex-col justify-center items-center">
                 {/* Placeholder for Logo */}
                 {/* <span className="text-2xl mb-1">✨</span> */}
                 <Image src="/content/images/gemini.png" alt="Gemini Logo" width={40} height={40} className="mb-2"/>
                 <span className="font-mono text-[10px] tracking-wider">Gemini</span>
               </div>
               {/* Anthropic */}
               <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 shadow-sm text-center w-28 h-28 flex flex-col justify-center items-center">
                 {/* Placeholder for Logo */}
                 {/* <span className="text-2xl mb-1">💡</span> */}
                 <Image src="/content/images/claude.png" alt="Claude Logo" width={40} height={40} className="mb-2"/>
                 <span className="font-mono text-[10px] tracking-wider">Anthropic</span>
               </div>
            </div>

             {/* Separator/Arrow (Optional - could use an SVG or just space) */}
             <div className="text-4xl font-thin text-neutral-400 my-4 md:my-0">
               →
             </div>

             {/* Unified Platform Card */}
             <div className="p-6 border-2 border-orange-500 rounded-lg bg-white shadow-md text-center w-40 h-40 flex flex-col justify-center items-center">
                {/* Placeholder for Platform Logo */}
                <Image src="/content/images/42-logo-t.svg" alt="Unified Platform" width={60} height={60} className="mb-2"/>
                <span className="font-normal text-sm">Unified Assistant</span>
             </div>
          </div>
        </div>
      </section>
      {/* === End New Section === */}

      
      {/* Adding a wrapper div for the background image */}
      <div className="py-20 bg-neutral-50">
        {/* Key Features Section */}
        <section className="py-20 bg-neutral-50 bg-opacity-90">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 bg-white border border-neutral-200 text-center">
                <h3 className="font-mono text-[11px] tracking-wider mb-2">Unified Access</h3>
                <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto mb-12 text-neutral-600">
                  Access multiple AI models through a single interface, simplifying your workflow.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="p-8 bg-white border border-neutral-200 text-center">
                <h3 className="font-mono text-[11px] tracking-wider mb-2">Seamless Switching</h3>
                <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto mb-12 text-neutral-600">
                  Switch between AI models effortlessly to leverage the best capabilities of each.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="p-8 bg-white border border-neutral-200 text-center">
                <h3 className="font-mono text-[11px] tracking-wider mb-2">Intelligent Routing (NeuroSwitch™)</h3>
                <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto mb-12 text-neutral-600">
                  Automatically route queries to the most suitable AI model for optimal results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Notes Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-neutral-800">
              A Peek <span className="font-normal text-orange-600">Under the Hood</span>
            </h2>
            <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto mb-12 text-neutral-600">
            Fusion AI delivers AI-powered chat and automation tools using top-tier models. Our system ensures optimal cost and performance with detailed analytics, credit tracking, and enterprise-ready APIs.
            </p>
            <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto mb-12 text-neutral-600">
              Our NeuroSwitch™ query classification happens <strong className="font-normal">locally</strong> using a fine-tuned model based on <code className="font-mono text-sm bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded">smart zero-shot classifier/bart-large-mnli</code>. This means your prompts for routing are not sent to external servers for classification, ensuring privacy.
            </p>
            {/* <p className="text-sm font-light leading-relaxed text-neutral-600 mt-3">
              Primary Stack: Python (Flask/FastAPI backend), Next.js (React frontend).
            </p> */}
          </div>
        </section>

        {/* === End Use Cases Section === */}

        {/* === Placeholder Testimonials Section === */}
        <section className="py-20 bg-neutral-50 bg-opacity-90">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-light mb-4">What Our Users Are Saying</h2>
            <p className="font-mono text-[13px] tracking-wider leading-relaxed max-w-xl mx-auto mb-12 text-neutral-600">
            Real stories from real users who stopped juggling tabs, wasting tokens, and second-guessing model choices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Placeholder Testimonial 1 */}
              <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm text-left">
                <p className="font-light text-[14px] leading-relaxed italic mb-4 text-neutral-700">
                  "Fusion AI has completely changed how I interact with different models. Having everything in one place is a massive time-saver!"
                </p>
                <p className="font-mono text-[11px] tracking-wider text-neutral-900">- Thomas H., Flowbit Inc.</p>
              </div>

              {/* Placeholder Testimonial 2 */}
              <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm text-left">
                <p className="font-light text-[14px] leading-relaxed italic mb-4 text-neutral-700">
                  "I don't need to figure out which model to use — Fusion does that for me. NeuroSwitch handles the routing, I just focus on building. We ship faster without babysitting APIs."
                </p>
                <p className="font-mono text-[11px] tracking-wider text-neutral-900">— Jenna C., Independent AI Developer</p>
              </div>

              {/* Placeholder Testimonial 3 */}
              <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm text-left">
                <p className="font-light text-[14px] leading-relaxed italic mb-4 text-neutral-700">
                  "Finally, I don't need multiple browser tabs open for different AI chats. The unified interface is exactly what I needed."
                </p>
                <p className="font-mono text-[11px] tracking-wider text-neutral-900">— Marcus T., Product Manager, DevNest</p>
              </div>
              {/* Placeholder Testimonial 4 */}
              <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm text-left">
                <p className="font-light text-[14px] leading-relaxed italic mb-4 text-neutral-700">
                  "We've cut our AI spend by 40% since switching to Fusion AI. NeuroSwitch automatically routes tasks to the most cost-effective model, so our engineers aren't wasting GPT-4 on stuff Claude can handle."
                </p>
                <p className="font-mono text-[11px] tracking-wider text-neutral-900">— Alicia M., Head of Engineering, Flowbit Inc.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* === End Placeholder Testimonials Section === */}

      {/* === Final CTA Section === */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-purple-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            [OpenAI] + [Gemini] + [Anthropic]
          </h2>
          <h3 className="text-2xl md:text-3xl font-normal text-white mb-6">
            All in One Interface.
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Unified AI Access. Intelligent Routing. Optimal Model Selection.
          </p>
          <button
            onClick={() => setIsWaitlistModalOpen(true)}
            className="inline-block bg-white text-gray-800 font-semibold text-base px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Join the waitlist →
          </button>
        </div>
      </section>
      {/* === End Final CTA Section === */}

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-[11px] tracking-wider">
              © 2025 Fusion AI
            </div>
            <div className="flex gap-8">
              <Link href="/privacy" className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors">
                PRIVACY
              </Link>
              <Link href="/terms" className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors">
                TERMS
              </Link>
              <Link 
                href="/contact" 
                className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                CONTACT
              </Link>
              {/* Remove social links for now */}
               <Link href="https://www.linkedin.com/company/fusion-mcp4/" className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors">
                LINKEDIN
              </Link>
              <Link href="https://x.com/fusion_mcp4" className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors">
                TWITTER
              </Link> 
            </div>
          </div>
        </div>
      </footer>

      {/* Removing Modal */}
      



      {/* <WorkWithUsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
        returnUrl={pathname}
      />
      <WaitlistModal 
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />
    </div>
  )
}
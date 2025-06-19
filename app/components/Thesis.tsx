'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Thesis() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="thesis-content">
          <div className="thesis-text">
            <h2 className="font-mono text-[11px] tracking-wider mb-8">THESIS</h2>
            
            {!isExpanded ? (
              <div className="space-y-6">
                <p className="text-[13px] font-light leading-relaxed">
                  We're standing at the beginning of a fundamental shift in how businesses operate and create value. 
                  The companies that will thrive in this new era won't just be the ones with the best technology—they'll 
                  be the ones that best understand how to integrate AI into human systems...
                </p>
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors"
                >
                  Read More →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-[13px] font-light leading-relaxed">
                  We're standing at the beginning of a fundamental shift in how businesses operate and create value. 
                  The companies that will thrive in this new era won't just be the ones with the best technology—they'll 
                  be the ones that best understand how to integrate AI into human systems.
                </p>
                <p className="text-[13px] font-light leading-relaxed">
                  This integration demands more than just technical expertise. It requires a deep understanding of 
                  organizational dynamics, a network of exceptional talent, and a proven approach to implementation. 
                  We combine rapid prototyping with rigorous testing, offering flexible pathways for businesses to 
                  either build internal capabilities or leverage our continued support.
                </p>
                <p className="text-[13px] font-light leading-relaxed">
                  Agency42 exists to guide this transformation, bringing together the right talent, tools, and 
                  expertise to help businesses not just keep pace with change, but lead it.
                </p>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="font-mono text-[11px] tracking-wider hover:text-orange-500 transition-colors"
                >
                  Show Less ↑
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-12">
            <Link 
              href="https://www.linkedin.com/in/k3nneth/" 
              target="_blank"
              className="flex items-center gap-4 group"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/content/images/KCHEADSHOT.png"
                  alt="Kenneth F. Cavanagh"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-mono text-[11px] tracking-wider group-hover:text-orange-500 transition-colors">
                  Kenneth F. Cavanagh
                </h3>
                <span className="text-[11px] text-neutral-500">
                  Founder & Principal
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 
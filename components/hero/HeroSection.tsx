// components/HeroSection.tsx
'use client';

import React, { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    // Set custom cursor on mount
    document.body.style.cursor = 'url(/ladder.svg) 16 16, auto';
  }, []);

  return (
    <section 
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        cursor: 'url(/ladder.svg) 16 16, auto'
      }}
    >
      {/* Dotted Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Glow Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D8F209] opacity-20 blur-[150px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Portfolio Tag */}
        <div className="mb-12">
          <span className="text-white text-sm tracking-[0.3em] font-light">
            PORTFOLIO | 2026
          </span>
        </div>

        {/* Main Title */}
        <h1 className="mb-8">
          <span className="text-white font-bold text-[clamp(60px,8vw,120px)] leading-none">
            Ladders
          </span>
          <span 
            className="text-[clamp(60px,8vw,120px)] font-bold leading-none ml-2"
            style={{
              WebkitTextStroke: '2px #D8F209',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(216,242,9,0.6)'
            }}
          >
            Tech
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white text-[clamp(18px,2vw,28px)] font-bold mb-16 tracking-wide">
          Design. Develop. Automate. Analyze.
        </p>

        {/* CTA Button */}
        <div className="inline-block">
          <button 
            className="px-8 py-3 rounded-full bg-[#D8F209] border border-[#D8F209] shadow-[0_0_30px_rgba(216,242,9,0.6)] hover:shadow-[0_0_40px_rgba(216,242,9,0.8)] transition-all duration-300 hover:scale-105"
            style={{
              cursor: 'url(/ladder.svg) 16 16, pointer'
            }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-black font-semibold text-base tracking-wide">
              PROJECTS
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

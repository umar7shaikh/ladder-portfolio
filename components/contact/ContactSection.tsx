// components/ContactSection.tsx
'use client';

import React from 'react';

export default function ContactSection() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center px-4">
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
        {/* Top Label */}
        <div className="mb-12">
          <span className="text-white text-sm tracking-[0.3em] font-light">
            GET IN TOUCH
          </span>
        </div>

        {/* Main Title with Corner Decorations */}
        <div className="relative inline-block mb-16">
          {/* Top-left corner */}
          <div className="absolute -top-8 -left-8 w-12 h-12 border-t-2 border-l-2 border-gray-600">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-600 rotate-0"></div>
          </div>

          {/* Bottom-right corner */}
          <div className="absolute -bottom-8 -right-8 w-12 h-12 border-b-2 border-r-2 border-gray-600">
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-600 rotate-0"></div>
          </div>

          <h1 className="mb-8">
            <span className="text-white font-bold text-[clamp(60px,8vw,120px)] leading-none">
              CONTACT
            </span>
            <span 
              className="text-[clamp(60px,8vw,120px)] font-bold leading-none"
              style={{
                WebkitTextStroke: '2px #D8F209',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(216,242,9,0.6)'
              }}
            >
              US
            </span>
          </h1>
        </div>

        {/* Contact Info */}
        <div className="space-y-8 max-w-2xl mx-auto text-left">
          {/* Email */}
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">@</span>
            </div>
            <div>
              <p className="text-white font-bold mb-1">Email</p>
              <a href="mailto:contact@theladders.tech" className="text-gray-300 hover:text-[#D8F209] transition-colors">
                contact@theladders.tech
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">📞</span>
            </div>
            <div>
              <p className="text-white font-bold mb-1">Contact</p>
              <a href="tel:932-585-6501" className="text-gray-300 hover:text-[#D8F209] transition-colors">
                932-585-6501
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">in</span>
            </div>
            <div>
              <p className="text-white font-bold mb-1">LinkedIn</p>
              <a 
                href="https://www.linkedin.com/company/the-ladders-tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#D8F209] transition-colors break-all"
              >
                www.linkedin.com/company/the-ladders-tech
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

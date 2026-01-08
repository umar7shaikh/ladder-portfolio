"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Dumbbell, BarChart3, Handshake, Target } from "lucide-react";

export default function Project16() {
  const carouselControls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const allImages = [
    { src: "/projects/project16/ss1.png", alt: "FranzCo landing page", aspect: "16/9" },
    { src: "/projects/project16/ss2.png", alt: "Services section", aspect: "9/16" },
    { src: "/projects/project16/ss3.png", alt: "About us section", aspect: "16/9" },
    { src: "/projects/project16/ss4.png", alt: "Case studies section", aspect: "9/16" },
    { src: "/projects/project16/ss5.png", alt: "Contact form section", aspect: "16/9" },
    { src: "/projects/project16/ss6.png", alt: "Contact form section", aspect: "16/9" },
    


  ];

  // Start animation on mount for mobile
  useEffect(() => {
    setHasAnimated(true);
    setIsInView(true);
  }, []);

  // Calculate total width
  useEffect(() => {
    if (carouselRef.current && hasAnimated) {
      const scrollContainer = carouselRef.current.querySelector('.scroll-container');
      if (scrollContainer) {
        const totalScrollWidth = scrollContainer.scrollWidth;
        const containerWidth = carouselRef.current.offsetWidth;
        const singleSetWidth = totalScrollWidth - containerWidth;
        setTotalWidth(singleSetWidth);
      }
    }
  }, [hasAnimated]);

  // Removed auto-scroll animation - manual swipe only

  return (
    <>
      {/* MOBILE: Single Beautiful Scroll Experience */}
      <section className="lg:hidden relative w-full bg-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="w-full h-full bg-[image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative px-6 pt-12 pb-16 space-y-8">
          
          {/* Compact Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-red-300 uppercase tracking-wider">
                Landing Page
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h1 className="font-bold text-white leading-none text-5xl">
                FranzCo
              </h1>
              <p className="font-bold text-xl leading-none text-gray-500">
                UI/UX Designer & Content Strategist
              </p>
            </div>
          </motion.div>

          {/* Divider with Gradient */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent origin-left"
          />

          {/* Brief Intro */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              To design and structure FranzCo&apos;s website for a premium, credible, and lead-generating experience—targeting property developers, architects, and commercial clients with refined UX, visual consistency, and SEO-focused copy.
            </p>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              {["B2B", "Fitness Development", "Landing Page", "Real Estate"].map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Main Auto-Scrolling Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative py-8 -mx-6"
          >
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling Container */}
            <div ref={carouselRef} className="overflow-hidden">
              {hasAnimated && (
                <motion.div
                  drag="x"
                  dragConstraints={{ right: 0, left: totalWidth > 0 ? -totalWidth : 0 }}
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
                  className="flex gap-4 px-6 cursor-grab active:cursor-grabbing scroll-container"
                  style={{ width: "max-content" }}
                >
                  {/* Single set of all images for manual swipe */}
                  <div className="flex gap-4">
                    {allImages.map((image, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className={`relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-none ${
                          image.aspect === "16/9" 
                            ? "aspect-video w-[320px]" 
                            : "aspect-[9/16] w-[220px]"
                        }`}
                      >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
                        
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover shadow-none"
                          quality={90}
                          sizes="320px"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Problem/Solution Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Challenge Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/50 to-amber-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-black border border-orange-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-xl">⚠</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">The Challenge</h3>
                </div>
                <ul className="text-gray-400 text-sm leading-relaxed space-y-2 pl-13">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>Disconnected visual identity and lack of brand authority in the fitness amenity space.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>Poor content hierarchy with no persuasive storytelling or benefit-driven structure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>Limited clarity on service offerings and investment models.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>No guided inquiry or CTA pathways to convert B2B leads.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-rose-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-black border border-red-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xl">✓</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">The Solution</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-13 italic mb-2">
                  A cohesive, visually compelling, and SEO-optimized website that:
                </p>
                <ul className="text-gray-400 text-sm leading-relaxed space-y-2 pl-13">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>Elevates FranzCo&apos;s credibility through clear service pillars and success metrics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>Simplifies complex gym solutions with structured, audience-specific sections.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>Establishes trust via industry insights, case studies, and partnership assurance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>Integrates frictionless inquiry forms and consistent CTAs to drive conversions.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-white text-base flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-rose-500 rounded-full" />
              Key Deliverables
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Dumbbell, label: "Service Clarity", color: "from-red-500/20 to-orange-500/20", iconColor: "text-red-400" },
                { icon: BarChart3, label: "Success Metrics", color: "from-blue-500/20 to-indigo-500/20", iconColor: "text-blue-400" },
                { icon: Handshake, label: "B2B Focused", color: "from-green-500/20 to-emerald-500/20", iconColor: "text-green-400" },
                { icon: Target, label: "Lead Generation", color: "from-orange-500/20 to-yellow-500/20", iconColor: "text-orange-400" },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center space-y-3 hover:border-white/20 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10 flex flex-col items-center space-y-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/10`}>
                        <IconComponent className={`w-5 h-5 ${item.iconColor}`} strokeWidth={2} />
                      </div>
                      <p className="text-xs text-gray-300 font-medium">{item.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Final CTA or Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative mt-8 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20"
          >
            <div className="absolute top-4 right-4 w-20 h-20 bg-red-500/20 rounded-full blur-2xl" />
            <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
              "A premium B2B landing page that positions FranzCo as the trusted partner for full-spectrum fitness facility development."
            </p>
          </motion.div>

        </div>
      </section>

      {/* DESKTOP: Original 3 Sections */}
      <div className="hidden lg:block">
        {/* SECTION 1 - ONE IMAGE ON RIGHT */}
        <section className="relative w-full bg-black min-h-dvh">
          <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
            <div className="w-full h-full bg-[image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-dvh">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center px-[5vw] py-[5vh] relative z-10"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
              
              <div className="space-y-[3vh]">
                <div className="inline-block px-[1.5vw] py-[0.5vh] rounded-full border border-white/30 bg-white/5 backdrop-blur-sm">
                  <span className="uppercase tracking-[0.2em] text-white font-medium text-[clamp(10px,0.7vw,15px)]">
                    PROJECT
                  </span>
                </div>

                <div className="space-y-[0.5vh]">
                  <h2 className="font-bold text-white leading-none text-[clamp(40px,8vw,85px)]">
                    FranzCo
                  </h2>
                  <p className="font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_white] text-[clamp(32px,6.5vw,68px)]">
                    Landing Page
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Objective
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    To design and structure FranzCo&apos;s website for a premium, credible, and lead-generating experience—targeting property developers, architects, and commercial clients with refined UX, visual consistency, and SEO-focused copy.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Role
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    UI/UX Designer & Content Strategist — Crafted page architecture, UX flow, and conversion-oriented content, ensuring a sleek, scalable, and performance-driven digital experience.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative px-[5vw] py-[5vh] flex items-center justify-center"
            >
              <div className="relative w-full h-[85vh]">
                <Image
                  src="/projects/project16/ss1.png"
                  alt="FranzCo landing page overview"
                  fill
                  className="object-contain"
                  quality={85}
                  priority
                  sizes="50vw"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 - THREE IMAGES IN A ROW */}
        <section className="relative w-full bg-black min-h-dvh">
          <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
            <div className="w-full h-full bg-[image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute top-[5vh] left-[5vw] z-10"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
            <div className="inline-block px-[2vw] py-[1vh] rounded-full bg-white border border-gray-200">
              <span className="text-black font-medium text-[clamp(11px,1vw,15px)]">
                FranzCo Landing Page
              </span>
            </div>
          </motion.div>

          <div className="relative flex items-center justify-center min-h-dvh px-[5vw] py-[15vh]">
            <div className="grid grid-cols-3 gap-[2vw] w-full max-w-[1600px]">
              {[
                "/projects/project16/ss2.png",
                "/projects/project16/ss3.png",
                "/projects/project16/ss4.png"
              ].map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                  viewport={{ once: true }}
                  className="relative w-full h-[70vh]"
                >
                  <Image
                    src={src}
                    alt={`FranzCo page ${idx + 2}`}
                    fill
                    className="object-contain"
                    quality={85}
                    sizes="33vw"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 - ONE IMAGE ON RIGHT */}
        <section className="relative w-full bg-black min-h-dvh">
          <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
            <div className="w-full h-full bg-[image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="relative grid grid-cols-2 min-h-dvh">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center px-[5vw] py-[5vh] relative z-10"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
              
              <div className="space-y-[3vh]">
                <div className="inline-block px-[2vw] py-[1vh] rounded-full bg-white border border-gray-200">
                  <span className="text-black font-medium text-[clamp(11px,1vw,15px)]">
                    FranzCo Landing Page
                  </span>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    The Challenge
                  </h3>
                  <ul className="space-y-[1vh] text-gray-400 text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Disconnected visual identity and lack of brand authority in the fitness amenity space.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Poor content hierarchy with no persuasive storytelling or benefit-driven structure.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Limited clarity on service offerings and investment models.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>No guided inquiry or CTA pathways to convert B2B leads.</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    The Solution
                  </h3>
                  <p className="text-gray-400 italic mb-[1vh] text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                    A cohesive, visually compelling, and SEO-optimized website that:
                  </p>
                  <ul className="space-y-[1vh] text-gray-400 text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Elevates FranzCo&apos;s credibility through clear service pillars and success metrics.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Simplifies complex gym solutions with structured, audience-specific sections.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Establishes trust via industry insights, case studies, and partnership assurance.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Integrates frictionless inquiry forms and consistent CTAs to drive conversions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* ONE IMAGE ON RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative px-[5vw] py-[5vh] flex items-center justify-center"
            >
              <div className="relative w-full h-[85vh]">
                <Image
                  src="/projects/project16/ss5.png"
                  alt="FranzCo testimonials and footer"
                  fill
                  className="object-contain"
                  quality={85}
                  sizes="50vw"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

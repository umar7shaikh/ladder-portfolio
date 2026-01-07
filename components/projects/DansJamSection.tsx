"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function DansJamSection() {
  const carouselControls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null); // NEW: Track section visibility
  const [totalWidth, setTotalWidth] = useState(0);
  const [isInView, setIsInView] = useState(false); // NEW: Visibility tracking
  const [hasAnimated, setHasAnimated] = useState(false); // NEW: First-time tracking

  const allImages = [
    { src: "/projects/dans-jam/ss1.png", alt: "Dan's Jam hero section", aspect: "9/16" },
    { src: "/projects/dans-jam/ss2.png", alt: "Product showcase", aspect: "9/16" },
    { src: "/projects/dans-jam/ss3.png", alt: "Jam varieties display", aspect: "9/16" },
    { src: "/projects/dans-jam/ss4.png", alt: "Purchase flow", aspect: "9/16" },
    { src: "/projects/dans-jam/ss5.svg", alt: "Mobile contact form", aspect: "16/9" },
  ];

  // NEW: Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: "50px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Calculate total width ONLY when visible
  useEffect(() => {
    if (carouselRef.current && hasAnimated) {
      const scrollContainer = carouselRef.current.querySelector('.scroll-container');
      if (scrollContainer) {
        // Get the actual scrollable width (all 3 sets of images)
        const totalScrollWidth = scrollContainer.scrollWidth;
        // We need to scroll enough to reveal one complete set + container width
        const containerWidth = carouselRef.current.offsetWidth;
        // Calculate the width needed to scroll through one full set
        const singleSetWidth = (totalScrollWidth / 3) + containerWidth;
        setTotalWidth(singleSetWidth);
      }
    }
  }, [hasAnimated]);

  // Start/Stop animation based on visibility
  useEffect(() => {
    if (totalWidth > 0) {
      if (isInView) {
        carouselControls.start({
          x: [0, -totalWidth],
          transition: {
            duration: 120,
            ease: "linear",
            repeat: Infinity,
          },
        });
      } else {
        carouselControls.stop();
      }
    }
  }, [totalWidth, carouselControls, isInView]);

  return (
    <>
      {/* MOBILE: Single Beautiful Scroll Experience */}
      <section ref={sectionRef} className="lg:hidden relative w-full bg-black">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-cyan-300 uppercase tracking-wider">
                Product Website
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h1 className="font-bold text-white leading-none text-5xl">
                Dan&apos;s Jam
              </h1>
              <p className="font-bold text-xl leading-none text-gray-500">
                UI/UX Design & Content Strategy
              </p>
            </div>
          </motion.div>

          {/* Divider with Gradient */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent origin-left"
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
              Transformed an outdated jam e-commerce site into a bold, surf-punk digital experience 
              with conversion-focused design and SEO optimization.
            </p>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              {["E-commerce", "Mobile-First", "SEO", "Conversion"].map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Main Auto-Scrolling Carousel - OPTIMIZED */}
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
              {/* Only render when visible */}
              {hasAnimated && (
                <motion.div
                  drag="x"
                  dragConstraints={{ right: 0, left: -totalWidth }}
                  dragElastic={0.1}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  animate={carouselControls}
                  onDragStart={() => carouselControls.stop()}
                  onDragEnd={(event, info) => {
                    if (totalWidth > 0 && isInView) {
                      carouselControls.start({
                        x: [info.offset.x, -totalWidth],
                        transition: {
                          duration: 120,
                          ease: "linear",
                          repeat: Infinity,
                        }
                      });
                    }
                  }}
                  className="flex gap-4 px-6 cursor-grab active:cursor-grabbing scroll-container"
                  style={{ width: "max-content" }}
                >
                  {/* Triple loop for seamless infinite scroll */}
                  {[...Array(3)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-4">
                      {allImages.map((image, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className={`relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${
                            image.aspect === "16/9" 
                              ? "aspect-video w-[320px]" 
                              : "aspect-[9/16] w-[220px]"
                          }`}
                        >
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
                          
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            quality={90}
                            sizes="320px"
                            loading="lazy"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ))}
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-black border border-red-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xl">⚠</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">The Challenge</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-13">
                  Outdated design, weak storytelling, poor SEO structure, and no clear conversion path for customers.
                </p>
              </div>
            </div>

            {/* Solution Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-black border border-cyan-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 text-xl">✓</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">The Solution</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-13">
                  Mobile-first redesign with bold surf-punk aesthetics, clear CTAs, SEO-optimized content, and streamlined purchase journey.
                </p>
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
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
              Key Improvements
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🎨", label: "Bold Visual Identity" },
                { icon: "📱", label: "Mobile-First UX" },
                { icon: "🔍", label: "SEO Optimized" },
                { icon: "🎯", label: "High-Impact CTAs" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center space-y-2"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA or Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
          >
            <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl" />
            <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
              "A comprehensive redesign that transformed user engagement and established 
              Dan's Jams as a memorable, conversion-ready e-commerce brand."
            </p>
          </motion.div>

        </div>
      </section>

      {/* DESKTOP: Original 3 Sections */}
      <div className="hidden lg:block">
        {/* SECTION 1 */}
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
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
              
              <div className="space-y-[3vh]">
                <div className="inline-block px-[1.5vw] py-[0.5vh] rounded-full border border-white/30 bg-white/5 backdrop-blur-sm">
                  <span className="uppercase tracking-[0.2em] text-white font-medium text-[clamp(10px,0.7vw,15px)]">
                    PROJECT
                  </span>
                </div>

                <div className="space-y-[0.5vh]">
                  <h2 className="font-bold text-white leading-none text-[clamp(40px,8vw,85px)]">
                    Dan&apos;s Jam
                  </h2>
                  <p className="font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_white] text-[clamp(32px,6.5vw,68px)]">
                    Product Website
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Objective
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    To create a modern, bold, and conversion-focused single-page website for Dan&apos;s Jams, 
                    capturing its surf-punk personality while driving sales and subscriptions through 
                    engaging visuals, sharp storytelling, and SEO-ready content.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Role
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    UI/UX Designer & Content Strategist — Designed layout, UX flow, and all copy to deliver a 
                    clean, mobile-first, and conversion-driven user experience.
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
              <div className="relative w-full h-full">
                <Image
                  src="/projects/dans-jam/ss1.png"
                  alt="Dan's Jam website hero section"
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

        {/* SECTION 2 */}
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
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
            <div className="inline-block px-[2vw] py-[1vh] rounded-full bg-white border border-gray-200">
              <span className="text-black font-medium text-[clamp(11px,1vw,15px)]">
                Dan&apos;s Jam Product Website
              </span>
            </div>
          </motion.div>

          <div className="relative flex items-center justify-center min-h-dvh px-[5vw] py-[5vh]">
            <div className="grid grid-cols-3 gap-[3vw] w-full max-w-[1800px]">
              {["/projects/dans-jam/ss2.png", "/projects/dans-jam/ss3.png", "/projects/dans-jam/ss4.png"].map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                  viewport={{ once: true }}
                  className="relative aspect-[9/16] w-full"
                >
                  <Image
                    src={src}
                    alt={`Dan's Jam section ${idx + 2}`}
                    fill
                    className="object-contain"
                    quality={85}
                    sizes="33vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
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
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
              
              <div className="space-y-[3vh]">
                <div className="inline-block px-[2vw] py-[1vh] rounded-full bg-white border border-gray-200">
                  <span className="text-black font-medium text-[clamp(11px,1vw,15px)]">
                    Dan&apos;s Jam Product Website
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
                      <span>Outdated look with weak storytelling and no clear conversion path.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Poor SEO and missing alt/meta structure.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>No focused CTAs or interaction cues to guide purchases.</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    The Solution
                  </h3>
                  <p className="text-gray-400 italic mb-[1vh] text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                    A responsive, content-rich site that:
                  </p>
                  <ul className="space-y-[1vh] text-gray-400 text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Reflects Dan&apos;s bold, handcrafted identity.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Simplifies the user journey with clear storytelling.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Integrates SEO, accessibility, and high-impact CTAs for stronger engagement.</span>
                    </li>
                  </ul>
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative w-full h-[90vh]"
              >
                <Image
                  src="/projects/dans-jam/ss5.svg"
                  alt="Dan's Jam contact form"
                  fill
                  className="object-contain"
                  quality={85}
                  sizes="45vw"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

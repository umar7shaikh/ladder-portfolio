"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Bot, MessageCircle, BarChart3, Target } from "lucide-react";

export default function Project11() {
  const carouselControls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const allImages = [
    { src: "/projects/project11/ss1.png", alt: "Educationist.ai dashboard", aspect: "16/9" },
  ];

  // Intersection Observer for section visibility
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">
                Dashboard & Interface
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h1 className="font-bold text-white leading-none text-5xl">
                Educationist.ai
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
            className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent origin-left"
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
              An AI-powered career guidance platform designed to help students and working professionals discover the most suitable career paths based on their responses to curated questions.
            </p>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              {["AI Platform", "Career Guidance", "Dashboard", "UI/UX"].map((tag, idx) => (
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
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
                        
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-black border border-red-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xl">⚠</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">The Challenge</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-13">
                  Most students and working professionals are confused when it comes to choosing a career that truly fits their personality and skills. Generic aptitude tests often provide vague or rigid results, leaving users more lost than guided.
                </p>
              </div>
            </div>

            {/* Solution Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-black border border-blue-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                    <span className="text-blue-400 text-xl">✓</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">The Solution</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-13">
                  Designed a smart, AI-integrated platform that asks context-based questions, analyzes tone, intent, and interest, offers real-time feedback that&apos;s friendly, not robotic, and gives personalized, multi-option career paths.
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
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
              Key Deliverables
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Bot, label: "AI-Powered Analysis", color: "from-blue-500/20 to-indigo-500/20", iconColor: "text-blue-400" },
                { icon: MessageCircle, label: "Context Questions", color: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
                { icon: BarChart3, label: "Career Dashboard", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
                { icon: Target, label: "Personalized Paths", color: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-400" },
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
            className="relative mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20"
          >
            <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl" />
            <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
              "An AI-powered platform that transforms career confusion into clarity—one personalized question at a time."
            </p>
          </motion.div>

        </div>
      </section>

      {/* DESKTOP: Original 3 Sections */}
      <div className="hidden lg:block">
        {/* SECTION 1 - DASHBOARD ON RIGHT */}
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
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
              
              <div className="space-y-[3vh]">
                <div className="inline-block px-[1.5vw] py-[0.5vh] rounded-full border border-white/30 bg-white/5 backdrop-blur-sm">
                  <span className="uppercase tracking-[0.2em] text-white font-medium text-[clamp(10px,0.7vw,15px)]">
                    PROJECT
                  </span>
                </div>

                <div className="space-y-[0.5vh]">
                  <h2 className="font-bold text-white leading-none text-[clamp(40px,8vw,85px)]">
                    Educationist.ai
                  </h2>
                  <p className="font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_white] text-[clamp(32px,6.5vw,68px)]">
                    Dashboard & Interface
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Objective
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    An AI-powered career guidance platform designed to help students and working professionals discover the most suitable career paths based on their responses to curated questions.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Role
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    UI/UX Designer + Content Strategist — Designed the entire user flow, quiz interface, dashboard, and result screens. Also structured the content strategy to feel motivating and insightful.
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
                  src="/projects/project11/ss1.png"
                  alt="Educationist.ai dashboard interface"
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

        {/* SECTION 2 - COMPLEX LAYOUT */}
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
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
            <div className="inline-block px-[2vw] py-[1vh] rounded-full bg-white border border-gray-200">
              <span className="text-black font-medium text-[clamp(11px,1vw,15px)]">
                Educationist.ai - Dashboard & Interface
              </span>
            </div>
          </motion.div>

          <div className="relative flex items-center justify-center min-h-dvh px-[5vw] py-[15vh]">
            <div className="flex gap-[2vw] w-full max-w-[1600px]">
              
              {/* LEFT COLUMN - 3 DESKTOP SCREENSHOTS STACKED */}
              <div className="flex flex-col gap-[2vh] w-[35%]">
                {[
                  "/projects/project11/ss2.png",
                  "/projects/project11/ss3.png",
                  "/projects/project11/ss4.png"
                ].map((src, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                    viewport={{ once: true }}
                    className="relative w-full h-[25vh]"
                  >
                    <Image
                      src={src}
                      alt={`Educationist.ai desktop view ${idx + 2}`}
                      fill
                      className="object-contain"
                      quality={85}
                      sizes="35vw"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>

              {/* RIGHT SIDE - 3 MOBILE SCREENS SIDE BY SIDE */}
              <div className="flex gap-[2vw] w-[65%] items-center">
                {[
                  "/projects/project11/ss5.png",
                  "/projects/project11/ss6.png",
                  "/projects/project11/ss7.png"
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
                      alt={`Educationist.ai mobile screen ${idx + 5}`}
                      fill
                      className="object-contain"
                      quality={85}
                      sizes="22vw"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - SINGLE MOBILE IMAGE */}
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
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
              
              <div className="space-y-[3vh]">
                <div className="inline-block px-[2vw] py-[1vh] rounded-full bg-white border border-gray-200">
                  <span className="text-black font-medium text-[clamp(11px,1vw,15px)]">
                    Educationist.ai - Dashboard & Interface
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
                      <span>Most students and working professionals are confused when it comes to choosing a career that truly fits their personality and skills.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Generic aptitude tests often provide vague or rigid results, leaving users more lost than guided.</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    The Solution
                  </h3>
                  <p className="text-gray-400 italic mb-[1vh] text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                    A smart AI-integrated platform:
                  </p>
                  <ul className="space-y-[1vh] text-gray-400 text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Asks context-based questions and analyzes tone, intent, and interest.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Offers real-time feedback that&apos;s friendly, not robotic.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Gives personalized, multi-option career paths (not just &quot;one result fits all&quot;).</span>
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
                className="relative w-full h-[85vh]"
              >
                <Image
                  src="/projects/project11/ss8.png"
                  alt="Educationist.ai mobile interface"
                  fill
                  className="object-contain"
                  quality={85}
                  sizes="45vw"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

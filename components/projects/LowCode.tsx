"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Palette, Compass, Smartphone, Zap } from "lucide-react";

export default function LowCode() {
  const carouselControls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null); // NEW: Track entire section
  const [totalWidth, setTotalWidth] = useState(0);
  const [isInView, setIsInView] = useState(false); // NEW: Only animate when visible
  const [hasAnimated, setHasAnimated] = useState(false); // NEW: Track if ever animated

  const allImages = [
    { src: "/projects/low-code/ss1.png", alt: "Low Code Systems homepage", aspect: "9/16" },
    { src: "/projects/low-code/ss2.png", alt: "Services section", aspect: "9/16" },
    { src: "/projects/low-code/ss3.png", alt: "Platform features", aspect: "9/16" },
    { src: "/projects/low-code/ss4.png", alt: "Client solutions", aspect: "9/16" },
  ];

  // NEW: Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { 
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "50px" // Start loading slightly before visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Calculate total width ONLY when section is visible
  useEffect(() => {
    if (carouselRef.current && hasAnimated) {
      const scrollContainer = carouselRef.current.querySelector('.scroll-container');
      if (scrollContainer) {
        // Get the actual scrollable width (all images)
        const totalScrollWidth = scrollContainer.scrollWidth;
        // We need to scroll enough to reveal all images + container width
        const containerWidth = carouselRef.current.offsetWidth;
        // Calculate the width needed to scroll through all images
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-cyan-300 uppercase tracking-wider">
                Website Revamp
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h1 className="font-bold text-white leading-none text-5xl">
                Low Code Systems
              </h1>
              <p className="font-bold text-xl leading-none text-gray-500">
                UI/UX Designer
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
              The old website? Let's just say it was functional but far from fantastic. LCS needed a modern, sleek, and conversion-focused revamp that didn't just look good but actually worked for its users.
            </p>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              {["B2B Platform", "Redesign", "Responsive", "UX Focus"].map((tag, idx) => (
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
              {/* Only render carousel when it has been visible once */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
                        
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover shadow-none"
                          quality={85}
                          sizes="220px"
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
                  The old site felt like a maze—users struggled to find key info, the layout lacked clarity, and the design? Well, it didn't exactly scream "cutting-edge tech."
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
                  A site that showcased its expertise while making it ridiculously easy for potential clients to understand services and take action. Better structure, smoother navigation, and a look that speaks for itself.
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
              What I Delivered
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Palette, label: "Modern Design", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
                { icon: Compass, label: "Better Navigation", color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400" },
                { icon: Smartphone, label: "Fully Responsive", color: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
                { icon: Zap, label: "Clear CTAs", color: "from-yellow-500/20 to-orange-500/20", iconColor: "text-yellow-400" },
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
            className="relative mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
          >
            <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl" />
            <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
              "The goal was simple: Better structure, smoother navigation, and a visual identity that speaks for itself."
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
                    Low Code Systems
                  </h2>
                  <p className="font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_white] text-[clamp(32px,6.5vw,68px)]">
                    Website Revamp
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Objective
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    The old website? Let&apos;s just say it was functional but far from fantastic. LCS needed a modern, sleek, and conversion-focused revamp that didn&apos;t just look good but actually worked for its users. The goal was simple: Better structure, smoother navigation, and a look that speaks for itself.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent" />

                <div>
                  <h3 className="font-semibold text-white mb-[1vh] text-[clamp(16px,1.8vw,22px)]">
                    Role
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-[clamp(14px,1.2vw,18px)]">
                    UI/UX Designer — I took charge of redesigning the entire website page by page, ensuring it wasn&apos;t just pretty but also practical and intuitive.
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
                  src="/projects/low-code/ss1.png"
                  alt="Low Code Systems website hero section"
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
                Low Code Systems - Website Revamp
              </span>
            </div>
          </motion.div>

          <div className="relative flex items-center justify-center min-h-dvh px-[5vw] py-[5vh]">
            <div className="grid grid-cols-3 gap-[3vw] w-full max-w-[1800px]">
              {["/projects/low-code/ss2.png", "/projects/low-code/ss3.png", "/projects/low-code/ss4.png"].map((src, idx) => (
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
                    alt={`Low Code Systems section ${idx + 2}`}
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
                    Low Code Systems - Website Revamp
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
                      <span>The old site felt like a maze—users struggled to find key info, the layout lacked clarity, and the design? Well, it didn&apos;t exactly scream &quot;cutting-edge tech.&quot;</span>
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
                      <span>Introduced <em>Relume Figma Kit v2.5</em>, a game-changer that brought consistency and structure.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Revamped the entire UX with clear sections, engaging visuals, and bold CTAs that actually get users where they need to be instead of confusing them.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Created a modern, high-impact design that looks as professional as LCS&apos;s work itself.</span>
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
                  src="/projects/low-code/ss5.svg"
                  alt="Low Code Systems contact and footer section"
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

"use client";

import { useEffect, useRef, useState } from "react";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Trigger animation when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headerText = "What I Do /";
  // UPDATED COPY HERE
  const descText = "I combine data, creativity, and experimentation to unlock growth. I design experiences that engage users and drive long-term retention.";

  return (
    <section id="Services" className="relative z-20 w-full rounded-t-[2rem] md:rounded-t-[3rem] bg-[#080807] text-[#efeee9] px-4 py-20 md:px-10">
      
      {/* --- ANIMATED HEADER AREA --- */}
      <div ref={headerRef} className="relative flex w-full flex-col gap-y-8 md:gap-y-16 mb-20 md:mb-32">
        
        {/* Character-wise Pop-in Heading */}
        <h2 className="text-[14vw] md:text-[8vw] font-bold tracking-tighter text-[#d1d1c7] leading-none uppercase max-w-[18ch]">
          <div className="flex flex-wrap overflow-hidden pb-2 md:pb-4">
            {headerText.split("").map((char, index) => (
              <span key={index} className="overflow-hidden inline-block relative">
                <span
                  className={`inline-block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isVisible ? "translate-y-0" : "translate-y-[110%]"
                  }`}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </div>
        </h2>

        {/* Word-wise Pop-in Description Grid */}
        <div className="flex md:grid grid-cols-12 gap-x-8">
          <div className="col-span-7 flex flex-col gap-x-12 gap-y-6 sm:flex-row md:col-start-6">
            
            <span className="flex h-fit font-mono text-sm md:text-base font-medium uppercase text-nowrap text-[#7e766c] tracking-widest mt-1">
              (Services)
            </span>
            
            <div className="w-full max-w-[35ch] text-lg md:text-[1.35rem] font-medium leading-relaxed text-[#a9a9a9]">
              <div className="flex flex-wrap overflow-hidden">
                {descText.split(" ").map((word, index) => {
                  // Delay starts after the heading finishes animating
                  const baseDelay = headerText.length * 20; 
                  const wordDelay = baseDelay + (index * 15);

                  return (
                    <span key={index} className="overflow-hidden inline-block relative pr-2 pb-1">
                      <span
                        className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isVisible ? "translate-y-0" : "translate-y-[120%]"
                        }`}
                        style={{ transitionDelay: `${wordDelay}ms` }}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- STICKY CARDS (Untouched) --- */}
      <div className="flex flex-col bg-[#080807]">

        {/* CARD 01 - Now Growth & Marketing */}
        <div
          className="sticky border-t border-[#393632] bg-[#080807]"
          style={{ top: "20vh", marginBottom: "21em", zIndex: 10 }}
        >
          <div className="flex md:grid md:grid-cols-12 items-center gap-x-4 h-[100px]">
            <span className="col-span-2 text-3xl md:text-5xl font-semibold tracking-tighter text-[#d1d1c7]">(01)</span>
            <h3 className="col-span-8 md:col-start-6 text-3xl md:text-5xl font-semibold tracking-tighter text-[#bfbfb1] whitespace-nowrap">
              Growth & Marketing
            </h3>
          </div>
          <div className="relative flex flex-col md:grid md:grid-cols-12 min-h-[30vh] md:min-h-[40vh] pt-1">
            <div className="col-span-7 col-start-6 flex flex-col gap-4 pt-4 w-full">
              <p className="text-base md:text-lg font-medium text-[#a29e9a]  max-w-[40ch] leading-relaxed">
                I bridge the gap between marketing and engineering. I build the technical infrastructure that drives user acquisition, leveraging automation, data tracking, and performance optimization to scale growth initiatives efficiently.
              </p>
              <div className="flex flex-col divide-y divide-[#393632]">
                {["Technical SEO & Performance Optimization", "Marketing Automation & API Integrations", "A/B Testing Implementation & Tracking"].map((item, j) => (
                  <span key={j} className="flex items-center gap-6 py-3 md:py-5 text-lg md:text-2xl font-bold text-[#d1d1c7]">
                    <span className="font-mono text-sm text-[#7e766c] font-normal">{String(j+1).padStart(2,"0")}</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 02 - Now Content & Media Production */}
        <div
          className="sticky border-t border-[#393632] bg-[#080807]"
          style={{ top: "calc(20vh + 100px)", marginBottom: "15em", zIndex: 20 }}
        >
          <div className="flex md:grid md:grid-cols-12 items-center gap-x-4 h-[100px]">
            <span className="col-span-2 text-3xl md:text-5xl font-semibold tracking-tighter text-[#d1d1c7]">(02)</span>
            <h3 className="col-span-8 md:col-start-6 text-3xl md:text-5xl font-semibold tracking-tighter text-[#d1d1c7] whitespace-nowrap">
              Product Analytics & Data Visualization
            </h3>
          </div>
          <div className="relative flex flex-col md:grid md:grid-cols-12 min-h-[30vh] md:min-h-[40vh] pt-1">
            <div className="col-span-7 col-start-6 flex flex-col gap-4 pt-4 w-full">
              <p className="text-base md:text-lg font-medium text-[#a29e9a] max-w-[40ch] leading-relaxed">
                I turn user behavior into actionable engineering tasks. I set up complex tracking, leverage predictive analytics, and build custom data dashboards to identify drop-offs and engineer higher conversion rates.
              </p>
              <div className="flex flex-col divide-y divide-[#393632]">
                {["Custom Analytics Dashboards (Mixpanel, Google Analytics)", "Conversion Rate Optimization (CRO)", "User Behavior Tracking & Insights"].map((item, j) => (
                  <span key={j} className="flex items-center gap-6 py-3 md:py-5 text-lg md:text-2xl font-bold text-[#bfbfb1]">
                    <span className="font-mono text-sm text-[#7e766c] font-normal">{String(j+1).padStart(2,"0")}</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 03 - Now Full-Stack Development */}
        <div
          className="sticky border-t border-[#393632] bg-[#080807]"
          style={{ top: "calc(20vh + 200px)", marginBottom: "10em", zIndex: 30 }}
        >
          <div className="flex md:grid md:grid-cols-12 items-center gap-x-4 h-[100px]">
            <span className="col-span-2 text-3xl md:text-5xl font-semibold tracking-tighter text-[#d1d1c7]">(03)</span>
            <h3 className="col-span-8 md:col-start-6 text-3xl md:text-5xl font-semibold tracking-tighter text-[#d1d1c7] whitespace-nowrap">
              Full-Stack Development
            </h3>
          </div>
          <div className="relative flex flex-col md:grid md:grid-cols-12 min-h-[30vh] md:min-h-[40vh] pt-1">
            <div className="col-span-7 col-start-6 flex flex-col gap-4 pt-4 w-full">
              <p className="text-base md:text-lg font-medium text-[#a29e9a] max-w-[40ch] leading-relaxed">
                From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.
              </p>
              <div className="flex flex-col divide-y divide-[#393632]">
                {["React, Node.js, NextJs", "REST APIs, ", "Git, GitHub, Postman"].map((item, j) => (
                  <span key={j} className="flex items-center gap-6 py-3 md:py-5 text-lg md:text-2xl font-bold text-[#bfbfb1]">
                    <span className="font-mono text-sm text-[#7e766c] font-normal">{String(j+1).padStart(2,"0")}</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
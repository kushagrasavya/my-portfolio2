"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    company: "Minerva Innov",
    role: "Marketing and New Initiatives Intern",
    period: "2025 - Present",
    highlights: [
      "Developed and launched the official website leveraging a full-stack architecture with React, Next.js, Tailwind CSS, and Framer Motion.",
      "Architecting custom registration funnels and the official website for the x  initiative.",
      "Designing go-to-market strategies to drive user acquisition and growth for their ecosystem."
    ]
  },
  {
    company: "Creative Experience",
    role: "Content Strategist & Video Editor",
    period: "2024 - 2025",
    highlights: [
      "Social Media Marketing, Ignatius SNU: Developing and executing content strategies to increase engagement across platforms.",
      "Video Editing: Producing high-quality reels and short-form content using DaVinci Resolve, Capcut, and VN.",
      "Event Promotion: Designing engaging visual content and strategies to boost visibility and drive audience engagement.",
    ]
  }
];

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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

  const headerText = "Industry Experience /";
  const descText = "My professional journey across development and marketing, focusing on building scalable solutions and driving measurable growth.";

  return (
    <section id="Experience" className="relative z-20 w-full bg-[#080807] text-[#efeee9] px-4 py-20 md:px-10">

      {/* --- ANIMATED HEADER AREA --- */}
      <div ref={headerRef} className="relative flex w-full flex-col gap-y-8 md:gap-y-16 mb-20 md:mb-32">

        <h2 className="text-[14vw] md:text-[8vw] font-bold tracking-tighter text-[#d1d1c7] leading-none uppercase max-w-[20ch]">
          <div className="flex flex-wrap overflow-hidden pb-2 md:pb-4">
            {headerText.split("").map((char, index) => (
              <span key={index} className="overflow-hidden inline-block relative">
                <span
                  className={`inline-block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0" : "translate-y-[110%]"
                    }`}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </div>
        </h2>

        <div className="flex md:grid grid-cols-12 gap-x-8">
          <div className="col-span-7 flex flex-col gap-x-12 gap-y-6 sm:flex-row md:col-start-6">

            <span className="flex h-fit font-mono text-sm md:text-base font-medium uppercase text-nowrap text-[#7e766c] tracking-widest mt-1">
              (Experience)
            </span>

            <div className="w-full max-w-[35ch] text-lg md:text-[1.35rem] font-medium leading-relaxed text-[#a9a9a9]">
              <div className="flex flex-wrap overflow-hidden">
                {descText.split(" ").map((word, index) => {
                  const baseDelay = headerText.length * 20;
                  const wordDelay = baseDelay + (index * 15);

                  return (
                    <span key={index} className="overflow-hidden inline-block relative pr-2 pb-1">
                      <span
                        className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0" : "translate-y-[120%]"
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

      {/* --- STICKY EXPERIENCE CARDS (SERVICES PATTERN) --- */}
      <div className="flex flex-col bg-[#080807]">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="sticky border-t border-[#393632] bg-[#080807]"
            style={{
              top: `calc(20vh + ${index * 100}px)`,
              marginBottom: index === experiences.length - 1 ? "10em" : "16em",
              zIndex: (index + 1) * 10
            }}
          >
            {/* CARD HEADER (Always visible when stacked) */}
            <div className="flex md:grid md:grid-cols-12 items-center gap-x-4 min-h-[100px] py-6 md:py-0">
              <span className="col-span-2 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tighter text-[#d1d1c7]">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="col-span-8 md:col-start-6 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tighter text-[#bfbfb1] whitespace-normal md:whitespace-nowrap leading-tight">
                {exp.company}
              </h3>
            </div>

            {/* CARD CONTENT */}
            <div className="relative flex flex-col md:grid md:grid-cols-12 min-h-[30vh] md:min-h-[40vh] pt-1">
              <div className="col-span-7 col-start-6 flex flex-col gap-4 pt-4 w-full">
                <div className="flex flex-col gap-2 mb-6">
                  <p className="text-xl md:text-2xl font-semibold text-[#d1d1c7] tracking-tight">
                    {exp.role}
                  </p>
                  <p className="text-base md:text-lg font-medium text-[#a29e9a] max-w-[40ch] leading-relaxed">
                    {exp.period}
                  </p>
                </div>

                <div className="flex flex-col divide-y divide-[#393632]">
                  {exp.highlights.map((highlight, j) => (
                    <div key={j} className="flex items-center gap-6 py-4 md:py-6 text-lg md:text-2xl font-bold text-[#bfbfb1]">
                      <span className="font-mono text-sm text-[#7e766c] font-normal">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

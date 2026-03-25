"use client";

import { useEffect, useRef, useState, forwardRef } from "react";

// --- Sub-component to handle mouse movement per card ---
const ProjectCard = forwardRef<HTMLDivElement, { project: any; index: number }>(
  ({ project, index }, ref) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });
    };

    // --- FIX: Determine the object-fit class based on the project data ---
    const imageFitClass = project.containImage ? "object-contain" : "object-cover";

    return (
      <div
        key={index}
        data-index={index}
        ref={ref} 
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full">
          
          <div 
            ref={containerRef} 
            className="relative mt-5 flex aspect-square items-center justify-center overflow-clip rounded-xl bg-[#141414] p-6 sm:p-10 xl:p-16 transition-transform duration-500 group-hover:scale-[0.98]"
          >
            
            {/* Ambient Background Image */}
            <div className="absolute inset-0 w-full h-full opacity-30">
              <img
                src={project.bgImage}
                alt="background"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            {/* Inner Video/Image Frame */}
            {/* FIX: Removed bg-[#080807] so the empty space is transparent */}
            <div className="relative z-10 aspect-[4/3] w-full overflow-clip rounded-lg shadow-2xl cursor-none bg-transparent">
              
              {/* --- INDIVIDUAL PROJECT VIDEO OR IMAGE --- */}
              {/* FIX: Removed bg-[#1a1a1a] so it shows the ambient background behind fitted images */}
              <div className="w-full h-full bg-transparent transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                {project.innerVideo ? (
                  <video 
                    src={project.innerVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={`w-full h-full ${imageFitClass}`}
                  />
                ) : project.innerImage ? (
                  <img 
                    src={project.innerImage} 
                    alt={project.title} 
                    className={`w-full h-full ${imageFitClass}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#7e766c]/50 font-mono text-xs tracking-widest uppercase text-center px-4">
                    ADD innerVideo OR innerImage URL
                  </div>
                )}
              </div>
              
              {/* --- MOUSE FOLLOWING "View" BUTTON --- */}
              <div 
                className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ease-in-out ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div 
                  className="absolute w-20 h-20 md:w-24 md:h-24 bg-white/30 border border-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#080807] font-medium text-sm md:text-base shadow-lg flex-shrink-0"
                  style={{ 
                    transform: `translate(calc(${cursorPos.x}px - 50%), calc(${cursorPos.y}px - 50%)) scale(${isHovered ? 1 : 0.5})`,
                    transition: 'opacity 0.5s, transform 0.15s ease-out, scale 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  View
                </div>
              </div>

            </div>
          </div>

          {/* Footer Text Area */}
          <div className="flex flex-col lg:flex-row justify-between gap-y-4 pt-6">
            <div className="flex flex-col gap-y-1">
              <span className="font-mono text-sm font-medium text-[#7e766c]">
                {project.subtitle}
              </span>
              
              <div className="w-fit text-3xl font-semibold text-[#d1d1c7] group-hover:text-[#c4ef81] transition-colors duration-300">
                <h3 className="font-mono cursor-default">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="flex items-end gap-x-2 tracking-wide font-mono text-xs uppercase">
              <span className="border border-[#393632] text-[#a9a9a9] px-4 py-1.5 rounded-full">
                {project.category}
              </span>
              <span className="bg-[#d1d1c7] text-[#080807] font-bold px-4 py-1.5 rounded-full">
                {project.year}
              </span>
            </div>
          </div>

        </a>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";


// --- Main Works Component ---
export default function Works() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const projects = [
    {
      title: "Ignatius SNU",
      subtitle: "Modern Marketing tactics",
      category: "Marketing",
      year: "2025",
      bgImage: "https://res.cloudinary.com/dnocsf5bq/image/upload/g_auto/v1/6_jugckf?_a=BAVAZGE70",
      innerVideo: "/ignatius.mp4", 
      innerImage: "", 
      link: "https://www.instagram.com/reel/DGHfLOyMeGj/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
    },
    {
      title: "The Story Only I Could Tell",
      subtitle: "Content creation",
      category: "Story Telling",
      year: "2025",
      bgImage: "https://res.cloudinary.com/dnocsf5bq/image/upload/g_auto/v1/3_nzf5vb?_a=BAVAZGE70",
      innerVideo: "/personal.mp4", 
      innerImage: "", 
      link: "https://www.instagram.com/reel/DK1QEaUMYOo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
     {
      title: "Viral Content Creation",
      subtitle: "skilling up",
      category: "Marketing",
      year: "2026",
      bgImage: "https://res.cloudinary.com/dnocsf5bq/image/upload/g_auto/v1/2_frjjt5?_a=BAVAZGE70",
      innerVideo: "", 
      innerImage: "/img30.jpeg", 
      containImage: true, 
    },
      {
      title: "Spotify Clone",
      subtitle: "Frontend Architecture Concept",
      category: "Development",
      year: "2025",
      bgImage: "https://res.cloudinary.com/dnocsf5bq/image/upload/g_auto/v1/1_phf5ng?_a=BAVAZGE70",
      innerVideo: "", 
      innerImage: "/img7.png", 
      containImage: true, 
    },
    {
      title: "Cybersecurity",
      subtitle: "Web vulnerabilities & exploits",
      category: "Development",
      year: "2025",
      bgImage: "https://res.cloudinary.com/dnocsf5bq/image/upload/g_auto/v1/7_lfufd9?_a=BAVAZGE70",
      innerVideo: "", 
      innerImage: "/img6.png", 
    },

  ];

  useEffect(() => {
    const slotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" } 
    );

    projectRefs.current.forEach((ref) => {
      if (ref) slotObserver.observe(ref);
    });

    return () => slotObserver.disconnect();
  }, []);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    return () => headerObserver.disconnect();
  }, []);

  const headerText = "SELECTED WORKS /";
  const summaryText = "Thoughtfully crafted digital experiences that blend utility and aesthetics into something functional, memorable, and refined.";

  return (
    <section id="Works" className="relative w-full bg-[#080807] text-[#efeee9] px-4 py-24 md:px-10">
      
      {/* --- HEADER AREA --- */}
      <div className="flex flex-col gap-y-12 md:gap-y-24 mb-20 md:mb-32">
        <h2 
          ref={headerRef} 
          className="flex flex-wrap text-[14vw] md:text-[8vw] font-bold tracking-tighter text-[#d1d1c7] leading-[0.9] uppercase"
        >
          {headerText.split("").map((char, index) => (
            <span key={index} className="overflow-hidden inline-block relative pb-2">
              <span
                className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHeaderVisible ? "translate-y-0" : "translate-y-[110%]"
                }`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </h2>

        <div className="w-full flex md:grid md:grid-cols-12 justify-end">
          <div className="col-span-1 md:col-span-7 md:col-start-6 flex flex-col sm:flex-row gap-6 md:gap-12 md:pl-8">
            <span className="font-mono text-sm md:text-base uppercase text-[#7e766c] mt-2">
              (PROJECTS)
            </span>
            
            <div className="text-lg md:text-[1.5rem] font-medium leading-snug text-[#a9a9a9] max-w-[30ch]">
              <div className="flex flex-wrap overflow-hidden">
                {summaryText.split(" ").map((word, index) => {
                  const baseDelay = headerText.length * 30; 
                  const wordDelay = baseDelay + (index * 15);

                  return (
                    <span key={index} className="overflow-hidden inline-block relative pr-2 pb-1">
                      <span
                        className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isHeaderVisible ? "translate-y-0" : "translate-y-[120%]"
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

      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 w-full pt-8 md:pt-12">
        
        {/* LEFT: Sticky Slot Machine Number */}
        <div className="hidden md:flex col-span-5 sticky top-32 h-[0.8em] overflow-hidden text-[22vw] font-normal leading-[0.8] text-[#7e766c] tracking-tighter">
          <span>0</span>
          <div 
            className="flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateY(calc(-${activeIndex} * 0.8em))` }}
          >
            {projects.map((_, i) => (
              <span key={i} className="h-[0.8em] block flex-shrink-0">
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Scrolling Project Cards */}
        <aside className="col-span-12 md:col-span-7 flex flex-col gap-y-20 md:gap-y-32 pb-32">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              project={project}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
            />
          ))}
        </aside>

      </div>
    </section>
  );
}
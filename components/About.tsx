"use client";

import { useEffect, useRef, useState } from "react";

// --- Sub-component for the Scribble / Scramble Text Effect ---
const SkillItem = ({ title, isVisible }: { title: string; isVisible: boolean }) => {
  const [displayText, setDisplayText] = useState(title);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        title
          .split("")
          .map((letter, index) => {
            if (index < iteration) return title[index];
            if (title[index] === " " || title[index] === ".") return title[index];
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= title.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; 
    }, 40); 
  };

  useEffect(() => {
    if (isVisible) scramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible]);

  return (
    <div 
      className="group relative block h-fit font-mono font-medium text-[#a9a9a9] cursor-default mb-3 text-sm md:text-base w-fit"
      onMouseEnter={scramble}
    >
      <span className="group-hover:text-[#c4ef81] transition-colors duration-300">
        {displayText}
      </span>
    </div>
  );
};


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  // States for the 3D Parallax Exit Transition
  const [scale, setScale] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  
  // Visibility States
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);

  // 1. The 3D Parallax "Shrink and Pull Up" Scroll Exit Transition
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the bottom of the section is passing above the bottom of the viewport
      if (rect.bottom <= windowHeight) {
        // Calculate how much of the section has scrolled past the viewport (0 to 1)
        const progress = (windowHeight - rect.bottom) / windowHeight; 
        
        // Match the HTML reference: Scale down to ~0.95, Translate up ~80px max
        const newScale = Math.max(0.95, 1 - progress * 0.05); 
        const newTranslateY = Math.max(-100, -progress * 150); // Adjust -150 to tune the speed of the slide up
        
        setScale(newScale);
        setTranslateY(newTranslateY);
      } else {
        setScale(1);
        setTranslateY(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Observer for Header and Skills animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current && entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
          if (entry.target === skillsRef.current && entry.isIntersecting) {
            setIsSkillsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => observer.disconnect();
  }, []);

  const headerLines = ["DEVELOPER", "MARKETER", "CREATOR/"];
  let charCount = 0;

  return (
    // Outer wrapper acts as the viewport mask for the shrinking section
    <div className="relative w-full bg-[#efeee9] overflow-hidden z-0">
      
      <section
        id="About"
        ref={sectionRef}
        style={{ 
          // EXACT MATCH to reference: translate3d and scale
          transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale}, ${scale})`,
          transformOrigin: "bottom center", 
          transition: "transform 0.05s linear", // Very fast linear transition to keep it snappy with scroll
          borderRadius: scale < 1 ? "0 0 3rem 3rem" : "0", 
        }}
        // Kept z-10 so it sits correctly in the stacking context
        className="relative z-10 w-full bg-[#080807] text-[#efeee9] px-4 py-24 md:px-10 pb-[15vh] border-b border-[#393632]"
      >
        
        {/* --- TOP ROW: Big Titles & Skills --- */}
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-y-16 gap-x-8 w-full mb-32">
          
          <div className="col-span-1 xl:col-span-6 flex flex-col justify-start" ref={headerRef}>
            <h2 className="text-[16vw] xl:text-[8vw] font-bold tracking-tighter text-[#d1d1c7] leading-[0.85] uppercase">
              {headerLines.map((line, lineIndex) => (
                <div key={lineIndex} className="overflow-hidden pb-2 md:pb-4">
                  {line.split("").map((char, charIndex) => {
                    const delay = charCount * 30; 
                    charCount++;
                    return (
                      <span key={charIndex} className="inline-block overflow-hidden relative">
                        <span
                          className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHeaderVisible ? "translate-y-0" : "translate-y-[110%]"
                          }`}
                          style={{ transitionDelay: `${delay}ms` }}
                        >
                          {char}
                        </span>
                      </span>
                    );
                  })}
                </div>
              ))}
            </h2>
          </div>

          <div className="col-span-1 xl:col-span-6 pt-4" ref={skillsRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#d1d1c7] tracking-tighter">Skills</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
              
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-[#d1d1c7] tracking-tight">Programming & Development</h3>
                <div className="flex flex-col gap-y-1">
                  {["Python", "SQL", "C++", "TypeScript", "JavaScript", "React", "Node.js", "Express.js","Git", "Postman"].map((skill) => (
                    <SkillItem key={skill} title={skill} isVisible={isSkillsVisible} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-[#d1d1c7] tracking-tight">Marketing & Growth</h3>
                <div className="flex flex-col gap-y-1">
                  {["Google Analytics", "Meta Business Suite", "Instagram Insights", "YouTube Analytics", "A/B Testing", "Performance Tracking", "Engagement Optimization"].map((skill) => (
                    <SkillItem key={skill} title={skill} isVisible={isSkillsVisible} />
                  ))}
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-[#d1d1c7] tracking-tight">Design & Creative</h3>
                <div className="flex flex-col gap-y-1">
                  {["Figma", "Canva", "Adobe After Effects", "DaVinci Resolve", "CapCut", "VN Editor","TailwindCSS"].map((skill) => (
                    <SkillItem key={skill} title={skill} isVisible={isSkillsVisible} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW: Image & About Me Text --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full mt-24 md:mt-40">
          
          <div className="col-span-1 md:col-span-4 aspect-[4/5] overflow-hidden rounded-xl bg-[#141414]">
            <img 
              src="/img22.jpeg" 
              alt="Workspace" 
              className="w-full h-full object-cover " 
            />
          </div>
          
          <div className="col-span-1 md:col-span-7 md:col-start-6 flex flex-col gap-12 pt-4">
            <h3 className="text-2xl md:text-3xl lg:text-[2.2rem] font-medium leading-snug text-[#d1d1c7] max-w-[30ch]">
             I’m a computer science student blending technology and marketing to build scalable, data-driven digital experiences.
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 pt-4 border-t border-[#393632]">
              <span className="font-mono text-sm md:text-base uppercase text-[#7e766c] md:mt-1 tracking-widest flex-shrink-0">
                (ABOUT ME)
              </span>
              
              <div className="flex flex-col gap-6 text-base md:text-lg font-medium leading-relaxed text-[#a9a9a9] max-w-[45ch]">
                <p>
                  I’m a student who’s really into the mix of tech and marketing. I like building things, putting them out there, and figuring out what actually works, whether that’s through code, content, or just testing different ideas.
                </p>
                <p>
                  Most of what I’ve done revolves around growth, running campaigns, making short-form content, and breaking down engagement to see why something clicks (or doesn’t). I enjoy that process of tweaking small things and seeing a big difference.
                        <br></br>
                        <br></br>
                        I’m not too hung up on doing things perfectly. I’d rather ship, learn, and improve as I go. Build it, test it, and make it better. That’s pretty much how I approach everything.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}
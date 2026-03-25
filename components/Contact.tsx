"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  
  const [translateY, setTranslateY] = useState(-20); 
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  // 1. The Scroll Parallax Reveal
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight) {
        const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / windowHeight));
        const newTranslateY = -150 * (1 - progress); 
        setTranslateY(newTranslateY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. The Intersection Observer for the Character Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headerWords = ["Let's", "Make", "It", "Happen"];
  let charCount = 0; 

  return (
    <div className="relative w-full bg-[#efeee9] pt-20 pb-40 px-4 md:px-10 z-0 overflow-hidden">
      
      <div 
        ref={containerRef}
        className="w-full relative z-0"
        style={{
          transform: `translate3d(0px, ${translateY}px, 0px)`,
          transition: "transform 0.1s linear" 
        }}
      >
        <div className="relative flex flex-col items-center justify-between rounded-3xl bg-gradient-to-t from-[#080807] to-[#1a1a1a] border border-white/10 shadow-2xl backdrop-blur-xl p-8 md:p-16 lg:p-24 overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-[#d1d1c7]/5 blur-[100px] pointer-events-none"></div>

          {/* --- ANIMATED HEADER --- */}
          <h2 
            ref={headerRef}
            className="flex flex-wrap justify-center max-w-[12ch] text-5xl md:text-7xl lg:text-[7rem] font-bold uppercase text-[#efeee9] tracking-tighter leading-[0.9] mb-16 md:mb-24 z-10 text-center"
          >
            {headerWords.map((word, wordIndex) => (
              <div key={wordIndex} className="overflow-hidden pb-4 pr-2 md:pr-4 flex">
                {word.split("").map((char, charIndex) => {
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

          {/* --- MINIMAL CONTACT LINKS SECTION --- */}
          <div id="Contact" className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between md:justify-around gap-16 relative z-10 px-8 sm:px-12 py-12 md:py-20 rounded-2xl backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            
            {/* Email Block */}
            <div className="flex flex-col gap-y-6 max-w-full">
              <span className="text-sm font-bold tracking-widest uppercase text-[#a9a9a9]">
                Direct Email
              </span>
              {/* FIX: Removed the invalid inline comment and added break-all */}
              <a 
                href="mailto:kushagrasavya.choudhary@gmail.com" 
                className="relative w-fit max-w-full break-all text-[#efeee9] hover:text-[#c4ef81] font-mono text-sm sm:text-base md:text-2xl transition-colors duration-300 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#c4ef81] after:transition-all after:duration-500 hover:after:w-full"
              >
                kushagrasavya.choudhary@gmail.com
              </a>
            </div>

            {/* Socials Block */}
            <div className="flex flex-col gap-y-6">
              <span className="text-sm font-bold tracking-widest uppercase text-[#a9a9a9]">
                Socials
              </span>
              <div className="flex flex-col gap-y-4">
                
                <a 
                  href="https://x.com/Kushagra_Savya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative w-fit text-[#efeee9] hover:text-[#c4ef81] font-mono text-lg md:text-2xl transition-colors duration-300 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#c4ef81] after:transition-all after:duration-500 hover:after:w-full"
                >
                  X
                </a>

                <a 
                  href="https://www.linkedin.com/in/kushagra-savya-choudhary-2b2152255/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative w-fit text-[#efeee9] hover:text-[#c4ef81] font-mono text-lg md:text-2xl transition-colors duration-300 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#c4ef81] after:transition-all after:duration-500 hover:after:w-full"
                >
                  LinkedIn
                </a>

                <a 
                  href="https://github.com/kushagrasavya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative w-fit text-[#efeee9] hover:text-[#c4ef81] font-mono text-lg md:text-2xl transition-colors duration-300 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#c4ef81] after:transition-all after:duration-500 hover:after:w-full"
                >
                  GitHub
                </a>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
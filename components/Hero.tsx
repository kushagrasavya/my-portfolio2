"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero() {
  const comp = useRef(null);
  const curve = useRef(null);

  // --- Scroll State for Backward Downward Transition ---
  const [scrollData, setScrollData] = useState({ scale: 1, y: 0, opacity: 1 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      if (scrollY <= vh) {
        const progress = scrollY / vh; 
        
        setScrollData({
          scale: 1 - progress * 0.05, 
          y: progress * (vh * 0.25),  
          opacity: 1 - progress * 0.8 
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. THE CURTAIN REVEAL
      tl.to(curve.current, {
        attr: { d: "M 0 0 L 100 0 L 100 100 Q 50 0 0 100 Z" },
        duration: 0.9,
        ease: "power3.in",
        delay: 0.3 
      })
      .to(curve.current, {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
        duration: 0.7,
        ease: "power3.out",
      })
      .set(".preloader-svg", { display: "none" })
      
      // 2. THE TEXT POP-UP 
      .from(".reveal-text", {
        y: 150,
        skewY: 10,
        stagger: 0.05, 
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.9")

      // 3. FADE IN THE UI
      .from(".fade-in", {
        opacity: 0,
        y: 15,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=1.0");

    }, comp);

    return () => ctx.revert();
  }, []);

  const renderWord = (word: string) => {
    return (
      <div className="flex">
        {word.split("").map((char, index) => (
          <div key={index} className="overflow-hidden">
            <span className="reveal-text inline-block whitespace-pre">
              {char}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main ref={comp} className="relative w-full min-h-screen bg-[#efeee9] overflow-hidden font-sans z-0">
      
      {/* THE PRELOADER SVG */}
      <div className="preloader-svg fixed inset-0 z-[9999] pointer-events-none w-full h-screen">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path
            ref={curve}
            fill="#1a1a1a"
            d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
          ></path>
        </svg>
      </div>

      <section 
        className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 py-6 md:px-10 md:py-8"
        style={{
          opacity: scrollData.opacity,
          transform: `translate3d(0px, ${scrollData.y}px, 0px) scale(${scrollData.scale})`,
          transformOrigin: "center center",
          willChange: "transform, opacity"
        }}
      >
        
        {/* Header - Name on Left, Nav on Right */}
        <header className="fade-in flex flex-col md:flex-row justify-between items-start md:items-center w-full relative z-10">
          <div className="text-gray-600 font-bold text-sm md:text-base uppercase tracking-widest">
            Kushagra Savya Choudhary
          </div>
          <nav className="mt-4 md:mt-0">
            <ul className="flex flex-wrap gap-4 md:gap-8 text-gray-600 font-medium text-sm md:text-base">
              {/* Added Anchor Tags with dynamic href based on the item name */}
              {['Services', 'Works', 'About', 'Contact'].map((item) => (
                <li key={item} className="cursor-pointer">
                  <a href={`#${item}`} className="group relative block h-fit overflow-hidden">
                    <span className="block w-full transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-0 group-hover:-translate-y-full">
                      {item}
                    </span>
                    <span aria-hidden="true" className="absolute top-0 left-0 w-full block transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-full group-hover:translate-y-0 text-[#1a1a1a]">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* --- CENTRAL AREA --- */}
        <div className="flex-grow flex flex-col md:flex-row items-center md:justify-center w-full px-2 md:px-10 my-16 md:my-0 relative z-10 md:gap-x-16 gap-y-12">
          <h1 className="flex flex-col items-start text-[14vw] md:text-[10vw] font-bold uppercase leading-[0.85] tracking-[-0.04em] text-[#1a1a1a]">
             {renderWord("GROWTH")}
             {renderWord("ANALYST")}
          </h1>
          <div className="fade-in w-full max-w-[180px] md:max-w-none md:w-auto md:h-[45vh] aspect-[3/4] rounded-2xl overflow-hidden bg-gray-300 shadow-xl relative z-10">
              <img 
                src="/img1.jpeg" 
                alt="Growth Analyst - Kushagra" 
                className="w-full h-full object-cover "
              />
          </div>
        </div>

        {/* Bottom Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full items-end gap-10 md:gap-0 pb-2 relative z-10">
          
          {/* Left Column */}
          <div className="fade-in col-span-1 md:col-span-6 flex flex-col gap-5 md:gap-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7a7a7a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-[#8c8c73]">
              <line x1="7" y1="7" x2="17" y2="17"></line>
              <polyline points="17 7 17 17 7 17"></polyline>
            </svg>
            <p className="max-w-[32ch] text-[#555] font-medium leading-snug text-[1.1rem] md:text-[1.25rem]">
              I drive growth through data-backed experimentation and build fast, scalable web experiences that boost user engagement.
            </p>
            
            {/* The Masterpiece Button - Changed from <button> to <a> */}
            <a href="#Contact" className="group pointer-events-auto relative flex h-[52px] w-fit items-center justify-center overflow-hidden rounded-full bg-[#393632] px-8 font-bold uppercase tracking-wide text-[#f1f0ed] text-[15px]">
              
              <span className="absolute inset-0 z-10 block overflow-hidden">
                <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8c8c73] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 group-hover:rounded-none"></span>
              </span>
              
              <span className="relative z-20 flex items-center gap-2 overflow-hidden transition-all">
                
                <span className="flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-[150%]">
                  CONTACT 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
                
                <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 text-white">
                  CONTACT
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
                
              </span>
            </a>
          </div>

          <div className="col-span-1 md:col-span-6 flex flex-col items-start md:items-end justify-end text-right">
            <span className="fade-in text-xs font-mono uppercase text-gray-500 tracking-widest mb-1 md:mb-2">
              Available for work
            </span>
            <div className="overflow-hidden">
              <span className="reveal-text inline-block text-6xl md:text-[5.5rem] font-bold uppercase tracking-[-0.05em] text-[#393632] leading-none">
                Mar'26
              </span>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
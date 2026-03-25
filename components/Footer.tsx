"use client";

import { useEffect, useState } from "react";

// --- Sub-component for the slide-up link hover effect ---
const FooterLink = ({ title, href }: { title: string; href: string }) => (
  <a 
    href={href} 
    // FIX: Reduced text size slightly and margin-bottom for a tighter list
    className="group relative block h-fit overflow-hidden font-medium text-[#7e766c] text-sm md:text-lg w-fit mb-1.5 md:mb-2"
  >
    <span className="block w-full transition-transform duration-500 ease-[cubic-bezier(0.51,0.92,0.24,1.15)] group-hover:-translate-y-full">
      {title}
    </span>
    <span className="absolute top-0 left-0 w-full block transition-transform duration-500 ease-[cubic-bezier(0.51,0.92,0.24,1.15)] translate-y-full group-hover:translate-y-0 text-[#080807]">
      {title}
    </span>
  </a>
);

// --- Simple SVG Arrow ---
const ArrowUp = () => (
  // FIX: Slightly smaller arrow icon for mobile
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#080807" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

export default function Footer() {
  const [time, setTime] = useState("");

  // Live clock for the "Local Time" section (set to IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }) + ", IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // FIX: Reduced overall padding (py-10) and gap (gap-y-12) for mobile
    <footer className="relative w-full bg-[#efeee9] px-4 py-10 md:py-16 md:px-10 z-10 flex flex-col gap-y-10 md:gap-y-16">
      
      {/* TOP ROW: Menu & Socials */}
      <div className="grid grid-cols-2 md:grid-cols-12 w-full gap-y-8 gap-x-4">
        
        {/* Menu Column */}
        {/* FIX: Changed col-span-2 to col-span-1 so they sit side-by-side on phones */}
        <div className="flex flex-col col-span-1 md:col-span-6 md:pr-24">
          {/* FIX: Tighter margins and padding around the heading */}
          <h3 className="mb-4 flex border-b border-[#a9a9a9] pb-2 font-bold text-[#080807] tracking-tight text-sm md:text-base">
            Menu
          </h3>
          <ul className="flex flex-col">
            <li><FooterLink title="Home" href="#" /></li>
            <li><FooterLink title="Services" href="#Services" /></li>
            <li><FooterLink title="Works" href="#Works" /></li>
            <li><FooterLink title="About" href="#About" /></li>
            <li><FooterLink title="Contact" href="#Contact" /></li>
          </ul>
        </div>

        {/* Socials Column */}
        {/* FIX: Changed col-span-2 to col-span-1 so they sit side-by-side on phones */}
        <div className="flex flex-col col-span-1 md:col-span-3 md:pr-12">
          <h3 className="mb-4 flex border-b border-[#a9a9a9] pb-2 font-bold text-[#080807] tracking-tight text-sm md:text-base">
            Socials
          </h3>
          <ul className="flex flex-col">
            <li><FooterLink title="Linkedin" href="https://www.linkedin.com/in/kushagra-savya-choudhary-2b2152255/" /></li>
            <li><FooterLink title="Instagram" href="https://instagram.com/kushagraa___" /></li>
            <li><FooterLink title="Github" href="https://github.com/kushagrasavya" /></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM ROW: Local Time & Arrow */}
      {/* FIX: Changed items-end to items-center to prevent uneven vertical stretching */}
      <div className="flex flex-row w-full items-center justify-between md:grid md:grid-cols-12">
        
        {/* Empty space for grid alignment */}
        <div className="hidden md:block md:col-span-6"></div>

        {/* Local Time */}
        <div className="flex flex-col md:col-span-3 justify-center flex-shrink-0">
          <span className="font-bold text-[10px] md:text-sm uppercase text-[#080807] mb-0.5 md:mb-1">
            Local time
          </span>
          <span className="font-mono text-[10px] md:text-sm font-medium uppercase tracking-widest text-[#7e766c]">
            {time || "LOADING..."}
          </span>
        </div>

        {/* Scroll to Top Arrow Button */}
        <div className="flex w-full justify-end md:col-span-3">
          {/* FIX: Shrunk the button size (w-12 h-12) down from 16 for mobile */}
          <button 
            onClick={scrollToTop}
            aria-label="Scroll to top" 
            className="group relative flex w-12 h-12 md:w-20 md:h-20 flex-col items-center justify-center overflow-hidden rounded-full bg-[#d1d1c7] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-90 shadow-sm"
          >
            <span className="absolute flex transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-16">
              <ArrowUp />
            </span>
            <span className="absolute flex translate-y-16 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
              <ArrowUp />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
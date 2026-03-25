"use client";

import { useState, useEffect } from "react";

// --- Sub-component for the menu links with the Underline Hover effect ---
const NavLink = ({ title, href, onClick }: { title: string; href: string; onClick: () => void }) => (
  <li className="relative flex w-fit cursor-pointer items-center overflow-hidden">
    <a 
      href={href} 
      onClick={onClick}
      className="relative inline-block text-[10vw] md:text-[5vw] lg:text-[4.5vw] font-bold uppercase text-[#efeee9] tracking-tighter leading-[1.1] pb-1 
        transition-colors duration-300 ease-out
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#efeee9] after:transition-all after:duration-500 hover:after:w-full"
    >
      {title}
    </a>
  </li>
);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // --- FIX: Bulletproof Scroll Lock without the Jump ---
  useEffect(() => {
    if (isOpen) {
      // 1. Save the current scroll position before locking
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // 2. Grab the saved scroll position
      const scrollY = document.body.style.top;
      
      // 3. Remove the lock
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      
      // 4. Temporarily disable CSS smooth scrolling
      const html = document.documentElement;
      html.style.scrollBehavior = "auto";
      
      // 5. Instantly jump back to the exact pixel where we left off
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
      
      // 6. Turn smooth scrolling back on for your normal links
      html.style.scrollBehavior = "";
    }
  }, [isOpen]);

  // Hide button in Hero section (shows after scrolling 200px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { title: "Home", href: "#" },
    { title: "Services", href: "#Services" },
    { title: "Works", href: "#Works" },
    { title: "About", href: "#About" },
    { title: "Contact", href: "#Contact" },
  ];

  // --- UPDATED: Social Links Array with real URLs ---
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kushagra-savya-choudhary-2b2152255/" }, // <-- Add your link
    { name: "Github", url: "https://github.com/kushagrasavya" },           // <-- Add your link
    { name: "X", url: "https://x.com/Kushagra_Savya" }        // <-- Add your link
  ];

  return (
    <>
      {/* --- THE DYNAMIC HAMBURGER / CLOSE BUTTON --- */}
      <button 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className={`fixed top-6 right-6 md:top-10 md:right-10 z-[9999999] w-12 h-12 md:w-14 md:h-14 rounded-full flex flex-col items-center justify-center 
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95
          ${isOpen ? "bg-[#d1d1c7] border border-[#1a1a1a] ring-1 ring-white/50" : "bg-[#d1d1c7] border-none ring-0"}
          ${showButton || isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-20px]'}
        `}
      >
        <div 
          className={`w-5 md:w-6 h-[1.5px] bg-[#080807] absolute transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <div 
          className={`w-5 md:w-6 h-[1.5px] bg-[#080807] absolute transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <div 
          className={`w-5 md:w-6 h-[1.5px] bg-[#080807] absolute transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </button>

      {/* --- THE FULL SCREEN OVERLAY MENU --- */}
      <div 
        className={`fixed inset-0 z-[999998] w-screen h-screen bg-black/10 backdrop-blur-2xl transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* --- DECORATIVE TOP-RIGHT OVERLAPPING CIRCLES --- */}
        <div className="absolute top-0 right-0 pointer-events-none overflow-hidden w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] z-0">
          <div className="absolute -top-[20%] -right-[20%] w-[100%] h-[100%] rounded-full bg-[#1c1c1c]/90 shadow-2xl"></div>
          <div className="absolute -top-[10%] -right-[10%] w-[75%] h-[75%] rounded-full bg-[#262626]/90 shadow-2xl"></div>
        </div>

        {/* --- MENU CONTENT (Shifted Layout) --- */}
        <div className="relative z-10 flex flex-col h-full w-full justify-center pl-[10%] sm:pl-[20%] md:pl-[45%] lg:pl-[50%]">
          
          <div className="flex flex-col items-start gap-y-12 md:gap-y-16">
            
            {/* Nav Links */}
            <nav>
              <ul className="flex flex-col gap-y-1 md:gap-y-2">
                {navLinks.map((link, i) => (
                  <NavLink 
                    key={i} 
                    title={link.title} 
                    href={link.href} 
                    onClick={closeMenu} 
                  />
                ))}
              </ul>
            </nav>

            {/* Footer of the Menu */}
            <div className="flex flex-col gap-y-8">
              
              {/* Email */}
              <div className="flex flex-col gap-y-2">
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#a9a9a9]">
                  Email Address
                </span>
                {/* FIX: mailto link updated to match the display text */}
                <a 
                  href="mailto:kushagrasavya.choudhary@gmail.com" 
                  className="font-mono font-medium text-xs md:text-sm text-[#efeee9] hover:text-[#d1d1c7] transition-colors duration-300"
                >
                  kushagrasavya.choudhary@gmail.com
                </a>
              </div>

              {/* Socials */}
              <div className="flex flex-wrap gap-x-4 font-mono text-xs md:text-sm font-medium text-[#efeee9]">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d1d1c7] transition-colors duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
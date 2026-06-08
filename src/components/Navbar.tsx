import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Menu, X, Phone, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBooking: () => void;
  openAuth: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openBooking, openAuth }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Nav items from the analyzed image
  const navItems = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'services', label: 'خدمات' },
    { id: 'gallery', label: 'گالری' },
    { id: 'about', label: 'درباره ما' },
    { id: 'contact', label: 'تماس با ما' },
    { id: 'blog', label: 'وبلاگ' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-berry/10" id="app-header">
      {/* Top micro-bar for quick contact info */}
      <div className="bg-brand-deep text-brand-cream text-xs py-1.5 px-4 hidden md:flex justify-between items-center dir-rtl">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Phone size={13} className="text-brand-berry" />
            <span>تلفن مشاوره: ۰۲۱-۱۲۳۴۵۶۷۸</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-brand-berry" />
            <span>ساعت کاری: ۱۰:۰۰ الی ۲۰:۰۰</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={13} className="text-brand-berry" />
          <span>تهران، خیابان فرشته، پاساژ فرشته، طبقه دوم</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO on Left Side (matching mockup) */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setActiveTab('home')}
          id="logo-container"
        >
          {/* Logo emblem */}
          <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-tr from-brand-berry to-brand-berry/80 text-white shadow-md shadow-brand-berry/20">
            {/* Elegant SVG Crown/Flower Symbol inside */}
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-brand-deep leading-none font-sans">
              BeautyQueen
            </h1>
            <p className="text-[10px] text-brand-text font-medium mt-0.5 tracking-wider uppercase">
              Hair Salon
            </p>
          </div>
        </div>

        {/* MIDDLE NAVIGATION (for desktop) */}
        <nav className="hidden lg:flex items-center gap-7" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`relative py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === item.id 
                  ? 'text-brand-berry' 
                  : 'text-brand-deep hover:text-brand-berry/80'
              }`}
              id={`nav-${item.id}`}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-berry rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* RIGHT BUNDLE: Reservation Button + Profile Icon (matching mockup layout) */}
        <div className="hidden sm:flex items-center gap-4" id="right-actions-pack">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openBooking}
            className="px-6 py-2.5 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-semibold text-sm rounded-xl shadow-md shadow-brand-berry/15 transition-all cursor-pointer"
            id="book-btn-navbar"
          >
            رزرو نوبت
          </motion.button>
          
          <button 
            onClick={openAuth}
            className="w-10 h-10 rounded-full border border-brand-berry/20 flex items-center justify-center text-brand-berry hover:bg-brand-berry/5 transition duration-200 cursor-pointer"
            id="profile-btn-navbar"
          >
            <User size={18} />
          </button>
        </div>

        {/* MOBILE NAVIGATION TRIGGER */}
        <div className="flex items-center gap-3 lg:hidden" id="mobile-nav-trigger-group">
          <button
            onClick={openBooking}
            className="px-4 py-2 bg-brand-berry text-brand-cream text-xs font-semibold rounded-lg cursor-pointer"
          >
            رزرو نوبت
          </button>
          <button
            onClick={openAuth}
            className="w-8 h-8 rounded-full border border-brand-berry/20 flex items-center justify-center text-brand-berry cursor-pointer"
          >
            <User size={14} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 px-2 rounded-lg text-brand-deep hover:bg-brand-berry/5 cursor-pointer"
            id="mobile-hamburger"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-brand-cream-dark border-t border-brand-berry/5 overflow-hidden"
            id="mobile-dropdown"
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`py-2 px-3 text-right text-sm font-semibold rounded-lg transition ${
                    activeTab === item.id 
                      ? 'bg-brand-berry/10 text-brand-berry' 
                      : 'text-brand-deep hover:bg-brand-berry/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

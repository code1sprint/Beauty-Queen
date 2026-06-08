import React from 'react';
import { motion } from 'motion/react';
import { Play, Users, Crown, Sparkles, ShieldCheck } from 'lucide-react';

const heroImage = '/src/assets/images/beauty_queen_hero_left_1780898369976.png';

interface HeroProps {
  openBooking: () => void;
  scrollToServices: () => void;
}

export default function Hero({ openBooking, scrollToServices }: HeroProps) {
  // exact floating pillars from photo
  const pillars = [
    {
      id: 4,
      icon: Users,
      title: 'کادر مجرب',
      desc: 'متخصص و حرفه ای',
    },
    {
      id: 3,
      icon: Crown,
      title: 'محصولات با کیفیت',
      desc: 'برندهای معتبر',
    },
    {
      id: 2,
      icon: Sparkles,
      title: 'تجهیزات مدرن',
      desc: 'پیشرفته ترین دستگاه ها',
    },
    {
      id: 1,
      icon: ShieldCheck,
      title: 'رعایت بهداشت',
      desc: 'ضمانت سلامت شما',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 bg-brand-cream min-h-[600px] lg:min-h-[720px] flex flex-col justify-between" id="hero-section">
      {/* FULL-SCREEN HERO BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beauty Queen Hero"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[25%_center] sm:object-left-top lg:object-left"
        />
        {/* Dual gradient overlay: vertical for mobile/tablet, horizontal for lg desktop screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-cream/80 to-brand-cream/20 lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-brand-cream/50 to-brand-cream" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* RIGHT COLUMN: TEXT & BUTTONS (Clean, readable, positioned perfectly over the right side in RTL) */}
          <div className="col-span-1 lg:col-span-7 space-y-8 flex flex-col items-start text-right lg:pr-8 relative" id="hero-text-container">
            {/* Dynamic backdrop vector ornament that rotates and is self-drawing */}
            <div className="absolute -top-32 -left-12 w-96 h-96 opacity-25 pointer-events-none z-0 hidden lg:block overflow-visible select-none">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-brand-gold">
                <motion.path
                  d="M 100,20 C 120,40 140,60 160,100 C 140,140 120,160 100,180 C 80,160 60,140 40,100 C 60,60 80,40 100,20 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, rotate: 0 }}
                  animate={{ pathLength: 1, rotate: 360 }}
                  transition={{ 
                    pathLength: { duration: 2.8, ease: "easeInOut" },
                    rotate: { duration: 55, repeat: Infinity, ease: "linear" }
                  }}
                />
                <motion.path
                  d="M 100,40 C 115,55 130,70 145,100 C 130,130 115,145 100,160 C 85,145 70,130 55,100 C 70,70 85,55 100,40 Z"
                  stroke="#9E3B54"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, rotate: 360 }}
                  animate={{ pathLength: 1, rotate: 0 }}
                  transition={{ 
                    pathLength: { duration: 2.8, ease: "easeInOut", delay: 0.4 },
                    rotate: { duration: 40, repeat: Infinity, ease: "linear" }
                  }}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 w-full z-10"
            >
              <div className="relative inline-block pr-1">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-deep leading-tight">
                  زیبایی، هنر ماست
                  <span className="block mt-2 text-brand-berry font-medium text-3xl sm:text-4xl lg:text-5xl">
                    در خدمت زیبایی شما
                  </span>
                </h2>
                
                {/* Hand-drawn elegant floral line-art tracing besides heading */}
                <div className="absolute top-1/2 -left-20 transform -translate-y-1/2 w-16 h-28 opacity-45 pointer-events-none hidden xl:block select-none">
                  <svg viewBox="0 0 50 100" fill="none" className="w-full h-full text-brand-berry">
                    <motion.path
                      d="M 10,90 C 20,70 25,40 45,30 C 35,25 20,40 15,65 C 15,45 10,25 5,10 C 10,25 20,35 15,55"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
                    />
                    <motion.circle
                      cx="45"
                      cy="30"
                      r="3"
                      fill="#D4AF37"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.2, type: "spring" }}
                    />
                    <motion.circle
                      cx="5"
                      cy="10"
                      r="2"
                      fill="#D4AF37"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.4, type: "spring" }}
                    />
                  </svg>
                </div>
              </div>
              <p className="text-base sm:text-lg text-brand-text max-w-lg lg:max-w-xl leading-relaxed mt-4">
                ارائه دهنده انواع خدمات آرایشی و زیبایی
                <span className="block font-semibold text-brand-berry">با بهترین متدهای روز دنیا</span>
              </p>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4 items-center justify-start w-full"
              id="hero-call-to-actions"
            >
              <button
                onClick={openBooking}
                className="px-8 py-3.5 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-bold text-base rounded-xl shadow-lg shadow-brand-berry/20 hover:shadow-xl transition-all cursor-pointer"
                id="hero-book-btn"
              >
                رزرو نوبت
              </button>
              
              <button
                onClick={scrollToServices}
                className="flex items-center gap-3 px-6 py-3.5 border border-brand-berry/30 hover:border-brand-berry text-brand-deep font-bold text-base rounded-xl transition-colors cursor-pointer group bg-brand-cream/40 backdrop-blur-sm"
                id="hero-services-btn"
              >
                <span>مشاهده خدمات</span>
                <span className="w-8 h-8 rounded-full bg-brand-berry/15 flex items-center justify-center text-brand-berry group-hover:bg-brand-berry group-hover:text-brand-cream transition-colors">
                  <Play size={14} fill="currentColor" className="mr-0.5" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* LEFT COLUMN: Empty on desktop so the woman on the left of the image is completely visible */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>

        {/* FLOATING PILLARS (The 4 pillars at the bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 lg:mt-24 bg-brand-cream-dark/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-brand-berry/5 grid grid-cols-2 md:grid-cols-4 gap-6 division-x dir-rtl"
          id="floating-features-bar"
        >
          {pillars.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex items-center gap-4 text-right ${
                index !== 3 ? 'border-l-0 md:border-l border-brand-berry/10' : ''
              } pl-2`}
              id={`pillar-${item.id}`}
            >
              {/* Icon round background */}
              <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-berry/10 flex items-center justify-center text-brand-berry">
                <item.icon size={22} className="stroke-1.5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-brand-deep">{item.title}</h4>
                <p className="text-xs text-brand-text mt-0.5 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

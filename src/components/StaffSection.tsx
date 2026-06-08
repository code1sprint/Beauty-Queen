import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldAlert, Award, CalendarClock } from 'lucide-react';
import { STAFF } from '../data';
import { Staff } from '../types';

interface StaffSectionProps {
  onSelectStaff: () => void;
}

export default function StaffSection({ onSelectStaff }: StaffSectionProps) {
  return (
    <section className="py-20 bg-brand-cream-dark/20" id="staff-technicians">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-berry px-3 py-1 bg-brand-berry/10 rounded-full">
            کادر مجرب و مدیران سالن زیبایی
          </span>
          <div className="relative inline-block">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-deep">
              ملاقات با کادر فوق تخصصی و مجرب ما
            </h3>
            
            {/* Elegant luxury hand-drawn wavy trace line under heading */}
            <div className="w-52 h-3 mx-auto mt-2 relative select-none">
              <svg className="w-full h-full text-brand-berry/75" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 5,4 Q 25,1 50,4 T 95,4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-brand-text leading-relaxed">
            تمامی مدیران و پرسنل فنی سالن بیوتی کوئین دارای مدارک بین المللی معتبر و سال‌ها تجربه درخشان در زمینه آرایش مو، کانتور صورت و فیشیال تخصصی پوست هستند.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="staff-grid">
          {STAFF.map((member, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover="hover"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={member.id}
              className="bg-brand-cream border border-brand-berry/10 hover:border-brand-berry/30 hover:shadow-xl rounded-2xl overflow-hidden p-4 text-center space-y-4 group transition-all relative"
            >
              {/* Self-drawing premium golden SVG border on Hover */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-20" fill="none">
                <motion.rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="16"
                  stroke="#D4AF37"
                  strokeWidth="1.8"
                  vectorEffect="non-scaling-stroke"
                  variants={{
                    hover: { pathLength: 1, opacity: 1 },
                  }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </svg>

              {/* Photo Ring wrapper */}
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-brand-berry p-1 group-hover:scale-105 transition-transform duration-300 z-10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro medal icon badge */}
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-brand-berry text-brand-cream flex items-center justify-center border border-brand-cream" title="دارای گواهی‌نامه ارشد">
                  <Award size={12} className="stroke-2" />
                </div>
              </div>

              {/* Text definitions */}
              <div className="space-y-1">
                <h4 className="font-bold text-brand-deep text-lg group-hover:text-brand-berry transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs font-bold text-brand-berry text-shadow-sm">
                  {member.role}
                </p>
                
                {/* Rating */}
                <div className="flex justify-center items-center gap-1 py-1">
                  <Star size={14} className="fill-amber-400 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-brand-deep">{member.rating}</span>
                  <span className="text-[10px] text-brand-text/70">(۱۲۰+ نظر)</span>
                </div>

                <p className="text-[11px] text-brand-text leading-relaxed line-clamp-2 pt-1 font-medium border-t border-brand-berry/5">
                  {member.specialty}
                </p>
              </div>

              {/* Individual book button trigger */}
              <button
                onClick={onSelectStaff}
                className="w-full py-2 bg-brand-cream-dark hover:bg-brand-berry hover:text-brand-cream text-brand-deep text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-brand-berry/10"
              >
                <CalendarClock size={13} />
                <span>رزرو نوبت با {member.name.split(' ')[0]}</span>
              </button>

            </motion.div>
          ))}
        </div>

        {/* Quality commitment ribbon */}
        <div className="mt-16 p-6 rounded-2xl bg-brand-deep text-brand-cream border border-brand-berry/20 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 text-right">
          <div className="w-12 h-12 rounded-full bg-brand-berry/30 flex items-center justify-center text-brand-berry shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-lg">تعهد صددرصدی به حفظ سلامت مراجعین:</h5>
            <p className="text-xs text-brand-cream/80 leading-relaxed font-light">
              تمام خدمات مو، ناخن و پوست در سالن ما با استفاده از متریال مرغوب کاملاً ایزوله، ضدعفونی مکرر کیت‌ها به کمک دستگاه اتوکلاو و مواد بارکددار برندهای اولاپلکس، لورال پرو و مَک ارائه می‌شود تا تندرستی شما مخدوش نگردد.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

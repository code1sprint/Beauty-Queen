import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Play,
  Users,
  Crown,
  Sparkles,
  ShieldCheck,
  Star,
  ChevronDown,
  CalendarHeart,
} from 'lucide-react';
import { images } from '../assets/images';

const heroImage = images.img4;

/** موقعیت دستی تصویر داخل فریم قوسی — مقادیر را تغییر دهید و نتیجه را ببینید
 *  X: 0% = چپ · 50% = وسط · 100% = راست
 *  Y: 0% = بالا · 50% = وسط · 100% = پایین
 */
const heroImagePosition = { x: '18%', y: '32%' };

interface HeroProps {
  openBooking: () => void;
  scrollToServices: () => void;
}

const pillars = [
  { id: 1, icon: ShieldCheck, title: 'رعایت بهداشت', desc: 'ضمانت سلامت شما' },
  { id: 2, icon: Sparkles, title: 'تجهیزات مدرن', desc: 'پیشرفته‌ترین دستگاه‌ها' },
  { id: 3, icon: Crown, title: 'محصولات با کیفیت', desc: 'برندهای معتبر' },
  { id: 4, icon: Users, title: 'کادر مجرب', desc: 'متخصص و حرفه‌ای' },
];

const stats = [
  { value: '۱۲+', label: 'سال تجربه' },
  { value: '۳۵+', label: 'خدمت تخصصی' },
  { value: '۴.۹', label: 'امتیاز مشتریان', icon: Star },
];

const headlineWords = ['زیبایی،', 'هنر', 'ماست'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ openBooking, scrollToServices }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[92vh] lg:min-h-screen flex flex-col"
      id="hero-section"
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 bg-brand-cream pointer-events-none">
        <div className="absolute inset-0 hero-dot-grid opacity-40" />
        <motion.div
          style={{ scale: orbScale }}
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-brand-berry/8 blur-3xl"
        />
        <motion.div
          style={{ scale: orbScale }}
          className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-3xl"
        />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-brand-cream to-transparent" />
      </div>

      {/* Decorative watermark */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(5rem,18vw,14rem)] font-extrabold text-brand-berry/[0.03] whitespace-nowrap select-none pointer-events-none tracking-widest"
      >
        BEAUTY QUEEN
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 lg:pt-16 pb-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center w-full">

          {/* Text column */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1 space-y-7 text-right">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-7"
            >
              {/* Live badge */}
              <motion.div variants={fadeUp} className="flex justify-start">
                <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-cream/80 backdrop-blur-md border border-brand-berry/15 shadow-sm text-sm font-semibold text-brand-deep">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <CalendarHeart size={15} className="text-brand-berry" />
                  همین الان باز است · نوبت‌گیری آنلاین
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} className="space-y-3">
                <div className="flex flex-wrap gap-x-3 gap-y-1 items-baseline">
                  {headlineWords.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 40, rotateX: -40 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.15] ${
                        i === 1
                          ? 'hero-gradient-text'
                          : 'text-brand-deep'
                      }`}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-medium text-brand-berry/90 pr-1"
                >
                  در خدمت زیبایی شما
                </motion.p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-brand-gold to-transparent" />
                  <Sparkles size={14} className="text-brand-gold shrink-0" />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-brand-text max-w-md leading-relaxed"
              >
                ارائه‌دهنده انواع خدمات آرایشی و زیبایی
                <span className="block mt-1 font-semibold text-brand-berry">
                  با بهترین متدهای روز دنیا
                </span>
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center" id="hero-call-to-actions">
                <button
                  onClick={openBooking}
                  className="group relative px-8 py-4 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-bold text-base rounded-2xl shadow-lg shadow-brand-berry/25 overflow-hidden cursor-pointer transition-colors"
                  id="hero-book-btn"
                >
                  <span className="absolute inset-0 hero-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    رزرو نوبت
                    <Crown size={17} className="group-hover:rotate-12 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={scrollToServices}
                  className="flex items-center gap-3 px-6 py-4 border-2 border-brand-berry/20 hover:border-brand-berry text-brand-deep font-bold text-base rounded-2xl transition-all cursor-pointer group bg-white/50 backdrop-blur-sm hover:bg-white/80"
                  id="hero-services-btn"
                >
                  <span>مشاهده خدمات</span>
                  <span className="w-9 h-9 rounded-full bg-brand-berry/10 flex items-center justify-center text-brand-berry group-hover:bg-brand-berry group-hover:text-brand-cream transition-colors">
                    <Play size={15} fill="currentColor" className="mr-0.5" />
                  </span>
                </button>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-6 pt-2"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    {stat.icon && (
                      <stat.icon size={16} className="text-brand-gold fill-brand-gold" />
                    )}
                    <span className="text-2xl font-extrabold text-brand-deep">{stat.value}</span>
                    <span className="text-xs text-brand-text font-medium">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image column — editorial arch frame */}
          <motion.div
            style={{ y: imageY }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
            id="hero-text-container"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-none lg:w-[105%] lg:-mr-8">

              {/* Rotating orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 sm:-inset-8 rounded-[3rem] border border-dashed border-brand-gold/25 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 sm:-inset-4 rounded-[2.5rem] border border-brand-berry/10 pointer-events-none"
              />

              {/* Floating accent chips */}
              {[
                { label: 'VIP', top: '8%', right: '-4%', delay: 0 },
                { label: 'میکاپ عروس', bottom: '22%', left: '-6%', delay: 0.5 },
                { label: 'کاشت ناخن', top: '45%', right: '-8%', delay: 1 },
              ].map((chip) => (
                <motion.span
                  key={chip.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { delay: 0.8 + chip.delay, duration: 0.5 },
                    scale: { delay: 0.8 + chip.delay, duration: 0.5 },
                    y: { delay: 1.5 + chip.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-brand-berry/10 shadow-lg text-xs font-bold text-brand-deep whitespace-nowrap"
                  style={{ top: chip.top, right: chip.right, bottom: chip.bottom, left: chip.left }}
                >
                  {chip.label}
                </motion.span>
              ))}

              {/* Arch-shaped image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative hero-arch-mask overflow-hidden shadow-2xl shadow-brand-berry/15 mb-16"
              >
                <img
                  src={heroImage}
                  alt="Beauty Queen Salon"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: `${heroImagePosition.x} ${heroImagePosition.y}` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-berry/20 via-transparent to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/10 via-transparent to-transparent" />
              </motion.div>

              {/* Crown badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-deep text-brand-cream shadow-xl border border-brand-gold/30"
              >
                <Crown size={18} className="text-brand-gold" />
                <span className="text-sm font-bold tracking-wide">Beauty Queen</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Pillars — floating glass cards ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 lg:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          id="floating-features-bar"
        >
          {pillars.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-lg border border-brand-berry/8 shadow-md hover:shadow-xl hover:border-brand-berry/20 transition-shadow text-right overflow-hidden"
              id={`pillar-${item.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-berry/0 to-brand-berry/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-brand-berry/10 flex items-center justify-center text-brand-berry group-hover:bg-brand-berry group-hover:text-brand-cream transition-colors">
                <item.icon size={22} className="stroke-[1.5]" />
              </div>
              <div className="relative min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-brand-deep truncate">{item.title}</h4>
                <p className="text-[11px] sm:text-xs text-brand-text mt-0.5 font-medium">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 flex justify-center pb-6"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-brand-text/60 hover:text-brand-berry transition-colors cursor-pointer"
          aria-label="اسکرول به پایین"
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase">کشف کنید</span>
          <ChevronDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareCode, Quote, ShieldCheck } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  // calculate stats
  const averageRating = 4.9;
  const totalReviewsCount = reviews.length + 140; // Simulated historical reviews

  return (
    <section className="py-20 bg-brand-cream-dark/35" id="reviews-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Segment */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-berry px-3 py-1 bg-brand-berry/10 rounded-full">
            نظرات واقعی مراجعین گران‌قدر سالن
          </span>
          <div className="relative inline-block">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-deep">
              رضایت شما، با ارزش‌ترین هدیه به ماست
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
            کشف کنید چرا صدها مراجع از نقاط مختلف تهران، سالن بیوتی کوئین فرشته را به عنوان انتخاب اول و دائم خود برای خدمات تخصصی ناخن، رنگ و میکاپ قلمداد می‌کنند.
          </p>
        </div>

        {/* Rating metrics summary toolbar */}
        <div className="bg-brand-cream border border-brand-berry/10 rounded-2xl p-6 mb-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-brand-berry/10 dir-rtl">
          <div className="space-y-1.5 pb-4 md:pb-0">
            <h5 className="text-sm font-bold text-brand-text">امتیاز کلی سالن زیبایی</h5>
            <div className="flex justify-center items-center gap-1">
              <span className="text-4xl font-black text-brand-deep font-sans">۴.۹</span>
              <span className="text-xs text-brand-text/80">از ۵</span>
            </div>
            <div className="flex justify-center gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map(num => (
                <Star key={num} size={15} fill="currentColor" />
              ))}
            </div>
          </div>

          <div className="space-y-1.5 py-4 md:py-0 px-2">
            <h5 className="text-sm font-bold text-brand-text">میزان رضایت مراجعان</h5>
            <p className="text-4xl font-black text-emerald-700 font-sans">۹۹.۴٪</p>
            <p className="text-xs text-brand-text/90 font-medium">بر اساس نظرسنجی دوره‌ای ۱۴۰۵</p>
          </div>

          <div className="space-y-1.5 pt-4 md:pt-0">
            <h5 className="text-sm font-bold text-brand-text">ضمانت تندرستی متریال</h5>
            <p className="text-4xl font-black text-brand-berry font-sans">۱۰۰٪</p>
            <p className="text-xs text-brand-text/90 font-medium flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
              <span>تمام متریال بارکددار ارگانیک</span>
            </p>
          </div>
        </div>

        {/* Testimonials grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover="hover"
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={review.id}
              className="bg-brand-cream border border-brand-berry/5 hover:border-brand-berry/20 hover:shadow-lg rounded-2xl p-5 shadow-sm transition-all relative flex flex-col justify-between overflow-hidden"
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

              {/* Quote visual element right-hand */}
              <div className="absolute top-4 left-4 text-brand-berry/15 transform -rotate-12">
                <Quote size={28} fill="currentColor" />
              </div>

              <div className="space-y-3">
                {/* Stars and date */}
                <div className="flex gap-1 items-center">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-[10px] text-brand-text/70 mr-1 font-medium">{review.date}</span>
                </div>

                {/* Review Message */}
                <p className="text-xs leading-relaxed text-brand-text min-h-16 font-medium">
                  "{review.text}"
                </p>
              </div>

              {/* Author widget */}
              <div className="pt-4 border-t border-brand-berry/5 mt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-berry/10 text-brand-berry font-bold text-xs flex items-center justify-center shrink-0">
                  {review.customerName[0] || 'م'}
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-brand-deep leading-none">{review.customerName}</p>
                  <p className="text-[9px] text-brand-berry font-semibold mt-1">خدمت: {review.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Suggestion banner */}
        <p className="text-center text-xs text-brand-text/80 mt-10 font-medium">
          کاربر گرامی، نظر شما برای ما سازنده است. شما نیز می‌توانید پس از دریافت نوبت و اتمام مراجعه با کلیک روی <span className="text-brand-berry font-bold">آیکون پروفایل منوی بالا</span> نظر ارزشمندتان را ثبت کنید!
        </p>

      </div>
    </section>
  );
}

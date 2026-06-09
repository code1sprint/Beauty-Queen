import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Scissors, Heart, Palette } from 'lucide-react';
import { images } from '../assets/images';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'hair' | 'makeup' | 'nail'>('all');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const beforeImg = images.img5;
  const afterImg = images.img1;

  const portfolioItems = [
    {
      id: 1,
      category: 'hair',
      title: 'بالیاژ رویال شنی دودی',
      desc: 'اجرا شده توسط مریم حسینی بر روی پایه دکلره ۹ بدون هیچ‌گونه سوختگی ساقه مو',
      image: images.img2
    },
    {
      id: 2,
      category: 'makeup',
      title: 'گریم VIP مونوکروم لایت عروس',
      desc: 'میکاپ اروپایی مات با ماندگاری ۲۴ ساعته و مژه‌های ابریشمی مجزا',
      image: images.img13
    },
    {
      id: 3,
      category: 'nail',
      title: 'طراحی بی نظیر لایه‌ای ژل ناخن',
      desc: 'کاشت کوتاه فرم گلدانی با شوگر بیوتی و فرنچ ظریف کلاسیک صورتی',
      image: images.img6
    },
    {
      id: 4,
      category: 'hair',
      title: 'کات شگی مجلسی فرانسوی',
      desc: 'مدل موی ترند به همراه براشینگ حرارتی حجم‌دهنده مراجع',
      image: images.img7
    },
    {
      id: 5,
      category: 'makeup',
      title: 'میکاپ کلاسیک رژ لب قرمز مخملی',
      desc: 'خط چشم گربه‌ای عمیق با گریم سه بعدی استخوان گونه و فک',
      image: images.img11
    },
    {
      id: 6,
      category: 'nail',
      title: 'مانیکور روسی و ژلیش کهکشانی',
      desc: 'کاشت لمینت طبیعی با افکت مگنتی سه‌بعدی چشم گربه‌ای جذاب',
      image: images.img8
    },
  ];

  const filteredItems = portfolioItems.filter(
    item => activeFilter === 'all' || item.category === activeFilter
  );

  const handleMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const position = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isSliding) {
      const container = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, container);
    }
  };

  return (
    <section className="py-20 bg-brand-cream" id="gallery-portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-berry px-3 py-1 bg-brand-berry/10 rounded-full">
            شو کیس تصاویر قبل و بعد و آلبوم نمونه کارها
          </span>
          <div className="relative inline-block">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-deep">
              تجلی هنر و ظرافت در آلبوم نمونه کارها
            </h3>
            
            {/* Elegant luxury hand-drawn wavy trace line under heading */}
            <div className="w-48 h-3 mx-auto mt-2 relative select-none">
              <svg className="w-full h-full text-brand-gold/80" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <p className="text-sm text-brand-text leading-relaxed mt-2">
            با کشیدن اسلایدر قبل و بعد به چپ و راست، تغییرات شگفت‌انگیز سلامت و فرم موها را به عینه مشاهده فرمایید.
          </p>
        </div>

        {/* 1. INTERACTIVE BEFORE/AFTER SLIDER */}
        <div className="max-w-2xl mx-auto mb-20">
          <h4 className="text-lg font-bold text-brand-deep mb-4 text-center">نمونه کار احیا و صافی مو (اسلایدر تعاملی)</h4>
          <div 
            className="relative h-[340px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-brand-berry/10"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsSliding(true)}
            onMouseUp={() => setIsSliding(false)}
            onMouseLeave={() => setIsSliding(false)}
            id="before-after-container"
          >
            {/* After Image (Background) */}
            <img 
              src={afterImg} 
              alt="موی احیا شده - بعد" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* After Label (Bottom Left) */}
            <div className="absolute bottom-4 left-4 bg-emerald-600 text-brand-cream text-xs font-extrabold py-1 px-3 rounded-lg shadow-md z-10">
              بعد از درمان
            </div>

            {/* Before Image (Clipping container) */}
            <div 
              className="absolute inset-y-0 right-0 overflow-hidden" 
              style={{ width: `${100 - sliderPosition}%` }}
              id="before-image-clipped-box"
            >
              <img 
                src={beforeImg} 
                alt="موی وز دار - قبل" 
                className="absolute top-0 right-0 w-[672px] h-[340px] sm:h-[400px] max-w-none object-cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
              {/* Before Label (Bottom Right) */}
              <div className="absolute bottom-4 right-4 bg-brand-berry text-brand-cream text-xs font-extrabold py-1 px-3 rounded-lg shadow-md z-10">
                قبل از درمان
              </div>
            </div>

            {/* Draggable Divider Line */}
            <div 
              className="absolute inset-y-0 w-1 bg-brand-cream cursor-ew-resize z-20 shadow-md"
              style={{ left: `${sliderPosition}%` }}
              id="slider-divider-line"
            >
              {/* Drag controller knob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-berry text-brand-cream flex items-center justify-center shadow-lg border-2 border-brand-cream">
                <Palette size={14} className="animate-pulse" />
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-brand-text/80 mt-3 font-medium">برای جابجایی تفاوت، نشانه را به چپ و راست بکشید</p>
        </div>

        {/* 2. PORTFOLIO FILTERABLE GRID */}
        <div>
          <h4 className="text-xl font-extrabold text-brand-deep text-center mb-6">آلبوم تخصصی کات، ناخن و میکاپ مراجعین</h4>
          
          {/* Filters */}
          <div className="flex gap-2 justify-center mb-10">
            {[
              { id: 'all', label: 'همه آلبوم' },
              { id: 'hair', label: 'کات و استایل مو' },
              { id: 'makeup', label: 'میکاپ عروس' },
              { id: 'nail', label: 'طراحی ناخن' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveFilter(item.id as any)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === item.id
                    ? 'bg-brand-berry text-brand-cream shadow'
                    : 'bg-brand-cream-dark text-brand-deep hover:bg-brand-berry/5 border border-brand-berry/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Grid Layout of results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover="hover"
                  transition={{ duration: 0.4 }}
                  className="bg-brand-cream-dark/50 border border-brand-berry/5 hover:border-brand-berry/20 rounded-2xl overflow-hidden group shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative"
                >
                  {/* Self-drawing custom organic berry border on Hover */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-20" fill="none">
                    <motion.rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      rx="16"
                      stroke="#9E3B54"
                      strokeWidth="1.8"
                      vectorEffect="non-scaling-stroke"
                      variants={{
                        hover: { pathLength: 1, opacity: 1 },
                      }}
                      initial={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </svg>

                  <div className="relative aspect-4/3 overflow-hidden z-10">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-brand-cream text-xs font-bold flex items-center gap-1">
                        <Eye size={14} />
                        <span>عکس با کیفیت بالا</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 text-right space-y-2 z-10">
                    <span className="text-[10px] font-bold text-brand-berry uppercase bg-brand-berry/10 px-2 py-0.5 rounded">
                      {item.category === 'hair' ? 'استایل مو' : item.category === 'makeup' ? 'میکاپ گریم' : 'لوکس ناخن'}
                    </span>
                    <h5 className="font-bold text-brand-deep text-base mt-2">{item.title}</h5>
                    <p className="text-xs text-brand-text/90 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

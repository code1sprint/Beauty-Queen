import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Clock, CircleDollarSign, CalendarDays } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'makeup' | 'nail' | 'skin'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'همه خدمات زیبایی' },
    { id: 'hair', label: 'مراقبت و استایل مو' },
    { id: 'makeup', label: 'میکاپ و کانتورینگ' },
    { id: 'nail', label: 'خدمات تخصصی ناخن' },
    { id: 'skin', label: 'فیشیال و سلامت پوست' },
  ];

  // Filtering services
  const filteredServices = useMemo(() => {
    return SERVICES.filter(service => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-20 bg-brand-cream-dark/40" id="services-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-berry px-3 py-1 bg-brand-berry/10 rounded-full">
            لیست خدمات با کیفیت مراجعین
          </span>
          <div className="relative inline-block">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-deep">
              کشف کنید چگونه شما را زیباتر می‌کنیم
            </h3>
            
            {/* Elegant luxury hand-drawn wavy trace line under heading */}
            <div className="w-56 h-3 mx-auto mt-2 relative select-none">
              <svg className="w-full h-full text-brand-berry/75" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 10,6 Q 50,1 100,6 T 190,6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-brand-text leading-relaxed mt-2">
            ما ترکیبی متمایز از مهارت کادر مجرب، مجهزترین دستگاه‌های پوستی و با کیفیت‌ترین متریال جهانی فاقد آمونیاک و سولفات را برای درخشندگی طبیعی شما بکار می‌گیریم.
          </p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-brand-berry/10 pb-6 mb-8 dir-rtl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`py-2 px-4 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-berry text-brand-cream shadow-md shadow-brand-berry/15'
                    : 'bg-brand-cream hover:bg-brand-berry/5 text-brand-deep border border-brand-berry/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 font-medium">
            <input
              type="text"
              placeholder="جستجو در نام یا شرح خدمات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-berry/20 bg-brand-cream focus:border-brand-berry focus:outline-none"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-brand-berry" />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid-wrapper">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover="hover"
                transition={{ duration: 0.4, delay: index * 0.04 }}
                key={service.id}
                className="bg-brand-cream border border-brand-berry/10 hover:border-brand-berry/30 hover:shadow-xl shadow-sm rounded-2xl p-5 flex flex-col justify-between transition-all group relative overflow-hidden"
              >
                {/* Self-drawing premium golden SVG border on Hover */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-0" fill="none">
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

                {/* Popular luxury ribbon backdrop */}
                {service.popular && (
                  <div className="absolute top-0 left-0 bg-brand-berry text-brand-cream font-bold text-[9px] px-3.5 py-1 rounded-br-2xl shadow z-10">
                    پشنهاد ویژه عروس
                  </div>
                )}

                <div className="space-y-3 relative z-10">
                  <span className="text-[10px] font-extrabold text-brand-berry uppercase tracking-wide bg-brand-berry/5 px-2.5 py-1 rounded-lg inline-block">
                    {service.category === 'hair' ? 'مراقبت و کات سلیقه‌ای مو' : 
                     service.category === 'makeup' ? 'میکاپ و کانتور کانتینال' :
                     service.category === 'nail' ? 'خدمات روسی دست و پا' : 'فیشیال پاکسازی عمقی'}
                  </span>

                  <h4 className="text-lg font-bold text-brand-deep group-hover:text-brand-berry transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-xs text-brand-text/90 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-brand-berry/5 pt-4 mt-5 space-y-3 shrink-0 relative z-10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-1.5 text-brand-text font-medium">
                      <Clock size={14} className="text-brand-berry" />
                      <span>مدت تقریبی: {service.duration}</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800 font-extrabold text-base">
                      <CircleDollarSign size={14} className="text-brand-berry" />
                      <span>{service.price}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-berry/10 hover:bg-brand-berry text-brand-berry hover:text-brand-cream font-bold text-xs rounded-xl cursor-pointer transition-all"
                  >
                    <CalendarDays size={14} />
                    <span>رزرو سریع نوبت حضوری</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredServices.length === 0 && (
            <div className="col-span-full py-12 text-center text-brand-text font-medium bg-brand-cream/60 rounded-2xl border border-dashed border-brand-berry/20">
              موردی متناسب با واژه جستجو شده در لیست خدمات یافت نشد. کلمه‌ای دیگر را بررسی کنید.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

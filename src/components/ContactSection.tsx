import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Mail, CheckCircle2, Send, HeartHandshake } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('لطفاً تمامی فیلدهای فرم تماس را تکمیل نمایید.');
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setName('');
      setPhone('');
      setMessage('');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-brand-cream" id="salon-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 1. INFORMATIONAL SIDE */}
          <div className="col-span-1 lg:col-span-6 space-y-8 text-right pr-0 lg:pr-6" id="contact-details">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-berry px-3 py-1 bg-brand-berry/10 rounded-full">
                اطلاعات تماس، آدرس و زمان حضور
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-deep">
                با ما در ارتباط باشید
              </h3>
              
              {/* Elegant wavy dynamic trace-line under header */}
              <div className="w-40 h-3 relative select-none">
                <svg className="w-full h-full text-brand-berry/75" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M 5,4 Q 25,1 50,4 T 95,4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              <p className="text-sm text-brand-text leading-relaxed">
                آیا مایلید مشاوره رایگان مو داشته باشید یا در خصوص خدمات ویژه عروسی سوال بپرسید؟ تیم روابط عمومی ما در هر ساعت کاری آماده پاسخگویی گرم و مهربانانه به شماست.
              </p>
            </div>

            {/* Quick cards */}
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl border border-brand-berry/10 bg-brand-cream-dark/50 hover:bg-brand-cream-dark transition duration-300">
                <div className="w-11 h-11 bg-brand-berry/10 text-brand-berry rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-deep text-base">نشانی سالن زیبایی:</h4>
                  <p className="text-xs text-brand-text mt-1">تهران، خیابان فرشته، نرسیده به میدان تختی، پاساژ فرشته، طبقه دوم، واحد ۲۴</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl border border-brand-berry/10 bg-brand-cream-dark/50 hover:bg-brand-cream-dark transition duration-300">
                <div className="w-11 h-11 bg-brand-berry/10 text-brand-berry rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-deep text-base">تلفن‌های ثابت رزرو و مشاوره:</h4>
                  <p className="text-xs text-brand-text mt-1 font-mono">۰۲۱-۱۲۳۴۵۶۷۸  |  ۰۲۱-۸۷۶۵۴۳۲۱</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl border border-brand-berry/10 bg-brand-cream-dark/50 hover:bg-brand-cream-dark transition duration-300">
                <div className="w-11 h-11 bg-brand-berry/10 text-brand-berry rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-deep text-base">ساعات کاری و بهداشتی سالن:</h4>
                  <p className="text-xs text-brand-text mt-1">شنبه تا پنج‌شنبه: ۱۰:۰۰ صبح الی ۲۰:۰۰ شب (ایام تعطیل با هماهنگی قبلی)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. INTERACTIVE CONTACT FORM */}
          <motion.div 
            whileHover="hover"
            className="col-span-1 lg:col-span-6 bg-brand-cream-dark/60 border border-brand-berry/10 p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden" 
            id="contact-form-block"
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

            {/* background circle decor */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-brand-berry/5 rounded-br-full" />
            
            <div className="relative space-y-6 z-10">
              <div className="text-right border-b border-brand-berry/5 pb-4">
                <h4 className="text-lg font-bold text-brand-deep flex items-center gap-2">
                  <HeartHandshake size={20} className="text-brand-berry" />
                  <span>پیام بفرستید (مشاوره و پشتیبانی)</span>
                </h4>
                <p className="text-xs text-brand-text mt-1">تیم پشتیبانی ما پیام شما را بررسی کرده و ظرف ۲ ساعت به تلفن همراهتان پیامک خواهند داد.</p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 text-center space-y-4"
                  >
                    <CheckCircle2 size={40} className="mx-auto text-emerald-600 animate-bounce" />
                    <h5 className="font-bold text-lg">بسیار سپاسگزاریم!</h5>
                    <p className="text-xs leading-relaxed text-emerald-950 font-medium">پشتیبانان سالن بیوتی کوئین به زودی پاسخ پرسش شما را به شماره همراه ثبت شده اطلاع رسانی خواهند کرد.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-4 text-right">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-deep block">نام و نام خانوادگی:</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: مریم کریمی"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-2.5 sm:p-3 text-xs rounded-xl border border-brand-berry/20 bg-brand-cream focus:border-brand-berry focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-deep block">شماره تلفن همراه:</label>
                        <input
                          type="tel"
                          required
                          placeholder="مثال: 09121111111"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-2.5 sm:p-3 text-xs rounded-xl border border-brand-berry/20 bg-brand-cream focus:border-brand-berry focus:outline-none text-left font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-deep block">شرح سوال یا درخواست شما:</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="درخواست تعیین وقت ویژه عروس، تخفیف‌های عید یا مشخصات مواد مورد نظرتان را اینجا بنویسید..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2.5 sm:p-3 text-xs rounded-xl border border-brand-berry/20 bg-brand-cream focus:border-brand-berry focus:outline-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3 bg-brand-berry hover:bg-brand-berry-hover disabled:bg-brand-text/50 text-brand-cream font-bold text-sm rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-2 shadow"
                    >
                      <Send size={15} />
                      <span>{status === 'submitting' ? 'در حال ارسال پیام...' : 'ارسال درخواست مشاوره'}</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

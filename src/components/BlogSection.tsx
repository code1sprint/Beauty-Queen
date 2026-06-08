import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, User, ArrowLeft, ArrowRight, Clock, MessageSquareQuote } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-20 bg-brand-cream" id="blog-articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-berry px-3 py-1 bg-brand-berry/10 rounded-full">
            مجله زیبایی بیوت‌کوئین - آخرین مطالب علمی آموزش آرایش
          </span>
          <div className="relative inline-block">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-deep">
              دانش زیبایی خود را افزایش دهید
            </h3>
            
            {/* Elegant wavy dynamic trace-line */}
            <div className="w-48 h-3 mx-auto mt-2 relative select-none">
              <svg className="w-full h-full text-brand-berry/75" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 5,4 Q 25,1 50,4 T 95,4"
                  stroke="currentColor"
                  strokeWidth="2.2"
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
            مطالب و مقالات تهیه‌شده توسط کارشناسان ارشد سالن در حوزه سلامت مو، ترفندهای میکاپ لایت و مراقبت اصولی از پوست صورت را دنبال کنید.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blog-grid">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover="hover"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={post.id}
              className="bg-brand-cream-dark/40 border border-brand-berry/5 hover:border-brand-berry/20 hover:shadow-xl rounded-2xl overflow-hidden shadow-md flex flex-col group transition-all h-full justify-between relative"
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

              <div className="relative h-48 overflow-hidden shrink-0 z-10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 bg-brand-berry text-brand-cream text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {post.category}
                </span>
              </div>

              <div className="p-6 text-right space-y-3 flex-1 flex flex-col justify-between z-10">
                <div className="space-y-3">
                  {/* metadata */}
                  <div className="flex gap-4 items-center text-[11px] text-brand-text/80 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-brand-berry" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-brand-berry" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h4 className="font-extrabold text-brand-deep text-base leading-snug group-hover:text-brand-berry transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-brand-text leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-berry/5 flex justify-between items-center mt-4">
                  <span className="text-[11px] font-bold text-brand-deep flex items-center gap-1">
                    <User size={12} className="text-brand-berry" />
                    <span>نویسنده: {post.author}</span>
                  </span>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold text-brand-berry hover:text-brand-berry-hover flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>ادامه مطلب</span>
                    <ArrowLeft size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FULL ARTICLE DRAWER POPUP */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-deep/60 backdrop-blur-sm" id="blog-drawer-portal">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-brand-cream border border-brand-berry/10 max-w-2xl w-full rounded-2xl shadow-2xl p-6 text-right relative space-y-6 max-h-[85vh] overflow-y-auto dir-rtl"
              >
                <div className="flex justify-between items-start border-b border-brand-berry/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-berry tracking-wider bg-brand-berry/5 px-2.5 py-1 rounded-lg">
                      {selectedPost.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-brand-deep mt-1 leading-snug">
                      {selectedPost.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1 rounded-lg bg-brand-cream-dark border border-brand-berry/10 text-brand-deep hover:text-brand-berry cursor-pointer transition"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* Cover photo */}
                <div className="h-56 w-full rounded-xl overflow-hidden border border-brand-berry/10">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Authoring information card */}
                <div className="flex gap-4 items-center text-xs text-brand-text/90 font-bold bg-brand-cream-dark p-3.5 rounded-xl border border-brand-berry/5 bg-brand-berry/5">
                  <div className="w-9 h-9 rounded-full bg-brand-berry text-brand-cream flex items-center justify-center font-extrabold text-sm">
                    {selectedPost.author[0]}
                  </div>
                  <div>
                    <p className="text-brand-deep">{selectedPost.author}</p>
                    <p className="text-[10px] text-brand-berry/80 mt-0.5">کارشناس و متخصص ارشد مراقبت‌های سالن بیوتی کوئین - {selectedPost.date}</p>
                  </div>
                </div>

                {/* Written text content */}
                <div className="text-sm font-light text-brand-text leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedPost.content}
                </div>

                {/* Quote section */}
                <div className="p-4 bg-brand-cream-dark/80 rounded-xl border-r-4 border-brand-berry flex items-start gap-3 mt-4 text-xs font-semibold italic text-brand-deep">
                  <MessageSquareQuote size={20} className="text-brand-berry shrink-0" />
                  <p>توصیه سالن زیبایی بیوتی کوئین این است که قبل از بکارگیری خودسرانه متدهای درمان خانوادگی موی وز، یک جلسه رایگان مشاوره تندرستی و سم‌زدایی ساقه مو با متخصصین ارشد ما سپری فرمایید.</p>
                </div>

                <div className="pt-4 border-t border-brand-berry/10 flex justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="py-2.5 px-6 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-bold text-xs rounded-xl cursor-pointer"
                  >
                    بستن مقاله
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

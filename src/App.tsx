import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Clock, Mail, ShieldAlert, Heart, CalendarPlus, MapPin, Instagram, Facebook } from 'lucide-react';

// Data Types
import { Review } from './types';
import { REVIEWS } from './data';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import ServiceRecommender from './components/ServiceRecommender';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import StaffSection from './components/StaffSection';
import ReviewsSection from './components/ReviewsSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [prefilledServiceId, setPrefilledServiceId] = useState<string | undefined>(undefined);
  
  // Reviews state with persistence inside local storage
  const [reviewsList, setReviewsList] = useState<Review[]>([]);

  // On mount, load default or saved reviews
  useEffect(() => {
    const saved = localStorage.getItem('beauty_salon_reviews');
    if (saved) {
      try {
        setReviewsList(JSON.parse(saved));
      } catch (err) {
        setReviewsList(REVIEWS);
      }
    } else {
      setReviewsList(REVIEWS);
      localStorage.setItem('beauty_salon_reviews', JSON.stringify(REVIEWS));
    }
  }, []);

  // Handler to inject a new review from the profile panel
  const handleAddNewReview = (newReview: { customerName: string; rating: number; text: string; service: string }) => {
    const formattedReview: Review = {
      id: 'rev_' + Math.random().toString(36).substr(2, 9),
      customerName: newReview.customerName,
      rating: newReview.rating,
      text: newReview.text,
      date: 'امروز',
      service: newReview.service
    };
    const updated = [formattedReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('beauty_salon_reviews', JSON.stringify(updated));
  };

  const triggerSpecificBooking = (serviceId: string) => {
    setPrefilledServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const triggerGeneralBooking = () => {
    setPrefilledServiceId(undefined);
    setIsBookingOpen(true);
  };

  // Render tab content inside responsive container with smooth translation transitions
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div key="home-full-page" className="space-y-4">
            <Hero 
              openBooking={triggerGeneralBooking} 
              scrollToServices={() => setActiveTab('services')} 
            />
            {/* Intelligent service recommendation tool */}
            <ServiceRecommender onSelectService={triggerSpecificBooking} />
            {/* Embedded sections in home page for elite overview experience */}
            <ServicesSection onSelectService={triggerSpecificBooking} />
            <GallerySection />
            <StaffSection onSelectStaff={triggerGeneralBooking} />
            <ReviewsSection reviews={reviewsList} />
            <BlogSection />
            <ContactSection />
          </div>
        );
      case 'services':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            key="services-page"
          >
            <ServicesSection onSelectService={triggerSpecificBooking} />
          </motion.div>
        );
      case 'gallery':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            key="gallery-page"
          >
            <GallerySection />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            key="about-page"
          >
            <StaffSection onSelectStaff={triggerGeneralBooking} />
          </motion.div>
        );
      case 'blog':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            key="blog-page"
          >
            <BlogSection />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            key="contact-page"
          >
            <ContactSection />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-deep selection:bg-brand-berry selection:text-brand-cream overflow-x-hidden" id="app-main-root">
      
      {/* Top Header navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBooking={triggerGeneralBooking} 
        openAuth={() => setIsAuthOpen(true)} 
      />

      {/* Main container */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </main>

      {/* LUXURIOUS FOOTER */}
      <footer className="bg-brand-deep text-brand-cream border-t border-brand-berry/20 py-16 px-4 md:px-8 dir-rtl" id="app-footer-bar">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-berry flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold">BeautyQueen</h4>
                <p className="text-[10px] text-brand-cream/60 uppercase">Hair Salon & Spa</p>
              </div>
            </div>
            <p className="text-xs text-brand-cream/70 leading-relaxed max-w-sm">
              مجموعه فوق تخصصی زیبایی و سلامت آرایشی بیوتی کوئین فرشته، مجهز به پیشرفته‌ترین تکنولوژی‌های بهداشتی با گواهینامه معتبر جهانی.
            </p>
          </div>

          {/* Col 2: High-Level Navigation Services categories */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-brand-berry text-sm">خدمات اصلی سالن:</h5>
            <ul className="space-y-2 text-xs text-brand-cream/80">
              <li>• کات و شینیون‌های ژورنال اروپایی</li>
              <li>• رنگ، آمبره و دکلره تخصصی فاقد آمونیاک</li>
              <li>• کاشت و دیزاین ژل ناخن روسی</li>
              <li>• میکاپ و کانتور سه بعدی VIP عروس</li>
              <li>• فیشیال و درمان غدد سباسه پوست</li>
            </ul>
          </div>

          {/* Col 3: Direct Navigation links */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-brand-berry text-sm">پیوندهای راهنما:</h5>
            <div className="grid grid-cols-2 gap-2 text-xs text-brand-cream/80 font-bold">
              <button onClick={() => setActiveTab('home')} className="text-right hover:text-brand-berry transition">صفحه اصلی</button>
              <button onClick={() => setActiveTab('services')} className="text-right hover:text-brand-berry transition">منوی خدمات</button>
              <button onClick={() => setActiveTab('gallery')} className="text-right hover:text-brand-berry transition">آلبوم تصاویر</button>
              <button onClick={() => setActiveTab('about')} className="text-right hover:text-brand-berry transition">کادر متخصصین</button>
              <button onClick={() => setActiveTab('blog')} className="text-right hover:text-brand-berry transition">مجله فرشته</button>
              <button onClick={() => setActiveTab('contact')} className="text-right hover:text-brand-berry transition">تماس با ما</button>
            </div>
          </div>

          {/* Col 4: Contact details and social references */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-brand-berry text-sm">اشتراک گذاری و شبکه‌های اجتماعی:</h5>
            <p className="text-xs text-brand-cream/70 leading-relaxed">ما را در فضای مجازی دنبال کنید و از قرعه‌کشی‌ها و هدیه‌های جذاب هفتگی ما با خبر شوید.</p>
            <div className="flex gap-3">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-brand-cream/10 flex items-center justify-center hover:bg-brand-berry transition text-brand-cream">
                <Instagram size={15} />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-brand-cream/10 flex items-center justify-center hover:bg-brand-berry transition text-brand-cream">
                <Facebook size={15} />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-brand-cream/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-brand-cream/60">
          <p>© {new Date().getFullYear()} سالن زیبایی بیوتی کوئین (BeautyQueen). حقوق مادی و معنوی محفوظ است.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span>توسعه یافته منطبق بر دستورالعمل‌های بهداشتی ۱۴۰۵</span>
          </div>
        </div>
      </footer>

      {/* RENDER MODAL LAYERS */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialServiceId={prefilledServiceId}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLeaveReview={handleAddNewReview}
      />

    </div>
  );
}

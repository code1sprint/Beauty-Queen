import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, User, LogIn, Phone, CalendarDays, KeyRound, AlertTriangle, CheckCircle2, Star, Trash2 } from 'lucide-react';
import { Booking } from '../types';
import { SERVICES, STAFF } from '../data';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeaveReview: (review: { customerName: string; rating: number; text: string; service: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onLeaveReview }: AuthModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Custom Reviews State
  const [reviewService, setReviewService] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('beauty_salon_user');
    if (storedUser) {
      setIsLoggedIn(true);
      const user = JSON.parse(storedUser);
      setName(user.name);
      setPhone(user.phone);
    }

    // Load bookings
    const savedBookings = localStorage.getItem('beauty_salon_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, [isOpen]);

  const handleSendOtp = () => {
    if (!phone.trim() || phone.length < 10) {
      alert('لطفاً یک شماره همراه معتبر وارد کنید.');
      return;
    }
    setOtpSent(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('لطفاً نام خود را وارد کنید.');
      return;
    }
    
    const userObj = { name, phone };
    localStorage.setItem('beauty_salon_user', JSON.stringify(userObj));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('beauty_salon_user');
    setIsLoggedIn(false);
    setOtpSent(false);
    setOtp('');
    setPhone('');
    setName('');
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('آیا از لغو این نوبت اطمینان دارید؟')) {
      const updated = bookings.filter(b => b.id !== bookingId);
      setBookings(updated);
      localStorage.setItem('beauty_salon_bookings', JSON.stringify(updated));
    }
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !reviewService) {
      alert('لطفاً خدمت مورد نظر و متن نظر را به صورت کامل تکمیل کنید.');
      return;
    }
    onLeaveReview({
      customerName: name || 'مشتری عزیز سالن',
      rating: reviewRating,
      text: reviewText,
      service: reviewService
    });
    setReviewSuccess(true);
    setReviewText('');
    setReviewService('');
    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="auth-modal-portal">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-deep/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative transform overflow-hidden rounded-2xl bg-brand-cream text-right shadow-2xl transition-all w-full max-w-xl border border-brand-berry/10 max-h-[85vh] flex flex-col dir-rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-berry/10 bg-brand-cream-dark sticky top-0 z-10">
            <h3 className="text-xl font-bold text-brand-deep flex items-center gap-2">
              <User size={20} className="text-brand-berry" />
              <span>پروفایل و پیگیری هوشمند نوبت‌ها</span>
            </h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-brand-text hover:text-brand-berry hover:bg-brand-berry/5 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {!isLoggedIn ? (
              /* LOGIN SCREEN */
              <div className="space-y-6 max-w-sm mx-auto py-4" id="auth-login-screen">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-berry/10 flex items-center justify-center mx-auto text-brand-berry mb-3">
                    <LogIn size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-brand-deep">ورود مراجعین به سالن</h4>
                  <p className="text-xs text-brand-text mt-1">با ورود به پروفایل خود می‌توانید نوبت‌های فعال را رهگیری یا لغو نمایید.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-deep block">شماره تلفن همراه:</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="مثال: 09123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={otpSent}
                        className="w-full p-3 pl-10 rounded-xl border border-brand-berry/20 bg-brand-cream-dark focus:border-brand-berry focus:outline-none text-left"
                      />
                      <Phone size={16} className="absolute left-3.5 top-3.5 text-brand-berry" />
                    </div>
                  </div>

                  {otpSent ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-deep block">نام و نام خانوادگی:</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: نرگس فدایی"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-3 rounded-xl border border-brand-berry/20 bg-brand-cream-dark focus:border-brand-berry focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-deep block">کد تایید پیامکی (دریافت فرضی):</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="عدد ۴ رقمی دلخواه"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 pl-10 rounded-xl border border-brand-berry/20 bg-brand-cream-dark focus:border-brand-berry focus:outline-none text-center font-mono tracking-widest font-bold"
                          />
                          <KeyRound size={16} className="absolute left-3.5 top-3.5 text-brand-berry" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-bold rounded-xl transition cursor-pointer mt-2"
                      >
                        ورود به پنل کاربری
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-3 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-bold rounded-xl transition cursor-pointer"
                    >
                      ارسال پیامک کد یکبار مصرف
                    </button>
                  )}
                </form>
              </div>
            ) : (
              /* LOGGED IN USER PROFILE & APPOINTMENT HISTORY */
              <div className="space-y-8" id="auth-dashboard">
                {/* Profile Widget */}
                <div className="p-4 bg-brand-cream-dark border border-brand-berry/10 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-brand-berry text-brand-cream rounded-full flex items-center justify-center font-bold text-lg">
                      {name[0] || 'م'}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-deep text-base">{name}</h4>
                      <p className="text-xs text-brand-text font-mono mt-0.5">{phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 py-1.5 px-3 rounded-lg transition cursor-pointer"
                  >
                    خروج از حساب
                  </button>
                </div>

                {/* Bookings Tracker */}
                <div>
                  <h4 className="text-base font-bold text-brand-deep mb-3 flex items-center gap-2">
                    <CalendarDays size={18} className="text-brand-berry" />
                    <span>نوبت‌های فعال و سوابق مراجعه:</span>
                  </h4>

                  {bookings.length === 0 ? (
                    <div className="p-6 rounded-xl border border-brand-berry/5 text-center text-sm text-brand-text bg-brand-cream-dark/50">
                      هیچ نوبت رزرو شده‌ای برای شما ثبت نشده است. همین حالا می‌توانید از منوی اصلی اقدام به رزرو کنید.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map(item => {
                        const srv = SERVICES.find(s => s.id === item.serviceId);
                        const stf = STAFF.find(s => s.id === item.staffId);
                        return (
                          <div 
                            key={item.id} 
                            className="p-4 rounded-xl border border-brand-berry/10 bg-brand-cream-dark flex justify-between items-center"
                          >
                            <div className="space-y-1 text-right">
                              <h5 className="font-bold text-brand-deep">{srv?.name || 'خدمت سالن زیبایی'}</h5>
                              <p className="text-xs text-brand-text">متخصص: <span className="font-bold text-brand-berry">{stf?.name}</span></p>
                              <p className="text-xs text-brand-text/90">تاریخ حضور: <span className="font-bold">{item.date} ساعت {item.time}</span></p>
                              <div className="pt-1">
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                                  <CheckCircle2 size={10} />
                                  <span>تایید شده و آماده حضور</span>
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleCancelBooking(item.id)}
                              className="p-2 text-brand-text hover:text-red-700 hover:bg-red-100 rounded-lg transition shrink-0 cursor-pointer"
                              title="لغو نوبت"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Submittable Review section */}
                <div className="border-t border-brand-berry/15 pt-6">
                  <h4 className="text-base font-bold text-brand-deep mb-3">ثبت نظر و تجربه مراجعه به سالن:</h4>
                  
                  {reviewSuccess ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-100 text-center">
                      مشتری گرامی، نظر ارزشمند شما ثبت گردید و پس از تایید مدیریت در بخش دیدگاه‌ها نمایش داده خواهد شد!
                    </div>
                  ) : (
                    <form onSubmit={handleAddReviewSubmit} className="space-y-3 bg-brand-cream-dark p-4 rounded-xl border border-brand-berry/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-brand-deep block">خدمت دریافت شده:</label>
                          <select
                            value={reviewService}
                            onChange={(e) => setReviewService(e.target.value)}
                            className="w-full p-2 rounded-lg border border-brand-berry/20 bg-brand-cream focus:border-brand-berry focus:outline-none text-xs text-brand-deep"
                          >
                            <option value="">انتخاب نوع خدمت...</option>
                            {SERVICES.map(s => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-brand-deep block">امتیاز مربی و کیفیت (۱ تا ۵):</label>
                          <div className="flex gap-1 items-center py-1">
                            {[1, 2, 3, 4, 5].map(num => (
                              <button
                                type="button"
                                key={num}
                                onClick={() => setReviewRating(num)}
                                className="text-amber-500 hover:scale-110 transition cursor-pointer"
                              >
                                <Star size={20} fill={num <= reviewRating ? "currentColor" : "none"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-deep block">توضیحات و دیدگاه شما:</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="تجربه حضور خود در محیط سالن و تعامل با کادر فنی را بنویسید..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="w-full p-3 rounded-lg border border-brand-berry/20 bg-brand-cream focus:border-brand-berry focus:outline-none text-xs text-brand-deep"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-bold rounded-xl text-xs transition cursor-pointer"
                      >
                        ارسال بازخورد و دیدگاه
                      </button>
                    </form>
                  )}
                </div>

              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

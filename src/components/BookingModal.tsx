import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Check, Scissors, AlertCircle, ShoppingBag, ArrowLeft, ArrowRight, ClipboardCheck } from 'lucide-react';
import { SERVICES, STAFF } from '../data';
import { Booking, Service, Staff } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export default function BookingModal({ isOpen, onClose, initialServiceId }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<'hair' | 'makeup' | 'nail' | 'skin'>('hair');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Client details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  
  // State for loaded bookings
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);

  // Load existing bookings
  useEffect(() => {
    const saved = localStorage.getItem('beauty_salon_bookings');
    if (saved) {
      try {
        setExistingBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  // Handle pre-filled service
  useEffect(() => {
    if (initialServiceId) {
      const found = SERVICES.find(s => s.id === initialServiceId);
      if (found) {
        setSelectedService(found);
        setSelectedCategory(found.category);
        setStep(2); // Jump past service selection if requested from service button
      }
    }
  }, [initialServiceId, isOpen]);

  // Reset reservation state
  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStaff(null);
    setSelectedDate('');
    setSelectedTime('');
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    setErrorMsg('');
    setSuccessBooking(null);
  };

  // Close and reset
  const handleClose = () => {
    onClose();
    setTimeout(handleReset, 400); // Wait for anim animation
  };

  // Time Slot generator
  const timeSlots = [
    '۱۰:۰۰', '۱۱:۰۰', '۱۲:۰۰', '۱۳:۰۰', '۱۴:۳۰', '۱۵:۳۰', '۱۶:۳۰', '۱۷:۳۰', '۱۸:۳۰', '۱۹:۳۰'
  ];

  // Date Generator (next 7 days starting from today in solar Hijri format mock, or simple days)
  const getDates = () => {
    const dates = [];
    const daysOfWeek = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    
    // Simulate some Persian calendar dates
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = daysOfWeek[d.getDay()];
      // let's say they represent 19 to 25 Khordad
      const dayNum = 18 + i;
      dates.push({
        fullString: `${dayName} ${dayNum} خرداد`,
        shortDay: dayName,
        dayNum: dayNum.toString(),
      });
    }
    return dates;
  };

  const availableDates = getDates();

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1 && !selectedService) {
      setErrorMsg('لطفاً ابتدا خدمت مورد نظر خود را انتخاب کنید.');
      return;
    }
    if (step === 2 && !selectedStaff) {
      setErrorMsg('لطفاً یکی از متخصصین زیبایی ما را انتخاب کنید.');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      setErrorMsg('لطفاً تاریخ و ساعت نوبت را انتخاب فرمایید.');
      return;
    }
    setErrorMsg('');
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep(prev => prev - 1);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }
    if (!customerPhone.trim() || !/^[0-9+() \-]{10,15}$/.test(customerPhone)) {
      setErrorMsg('لطفاً یک شماره تلفن همراه معتبر وارد کنید (حداقل ۱۰ رقم).');
      return;
    }

    const newBooking: Booking = {
      id: 'bk_' + Math.random().toString(36).substr(2, 9),
      customerName,
      customerPhone,
      serviceId: selectedService!.id,
      staffId: selectedStaff!.id,
      date: selectedDate,
      time: selectedTime,
      notes,
      status: 'confirmed' // Pre-approved to facilitate mockup feel
    };

    const updated = [newBooking, ...existingBookings];
    setExistingBookings(updated);
    localStorage.setItem('beauty_salon_bookings', JSON.stringify(updated));
    setSuccessBooking(newBooking);
    setStep(5);
  };

  const categories = [
    { id: 'hair', label: 'مراقبت از مو' },
    { id: 'makeup', label: 'میکاپ و گریم' },
    { id: 'nail', label: 'خدمات ناخن' },
    { id: 'skin', label: 'پوست و فیشیال' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" id="booking-modal-portal">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-deep/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative transform overflow-hidden rounded-2xl bg-brand-cream text-right shadow-2xl transition-all w-full max-w-2xl border-2 border-brand-berry/10 max-h-[90vh] flex flex-col dir-rtl"
            id="modal-card"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-berry/10 bg-brand-cream-dark sticky top-0 z-20">
              <h3 className="text-xl font-bold text-brand-deep flex items-center gap-2">
                <Scissors size={20} className="text-brand-berry" />
                <span>سامانه رزرو آنلاین نوبت بیوتی‌کوئین</span>
              </h3>
              <button
                onClick={handleClose}
                className="rounded-lg p-1 text-brand-text hover:text-brand-berry hover:bg-brand-berry/5 transition cursor-pointer"
                id="close-booking-modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stepper indicator bar */}
            {step <= 4 && (
              <div className="bg-brand-cream border-b border-brand-berry/5 px-6 py-3 shrink-0">
                <div className="flex justify-between items-center text-xs font-semibold text-brand-text max-w-md mx-auto" id="booking-stepper">
                  <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-brand-berry font-bold' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      step > 1 ? 'bg-brand-berry text-brand-cream border-brand-berry' : 'border-brand-berry'
                    }`}>
                      {step > 1 ? <Check size={10} /> : '۱'}
                    </span>
                    <span>انتخاب خدمت</span>
                  </div>
                  <div className="h-0.5 bg-brand-berry/20 flex-1 mx-2" />
                  <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-brand-berry font-bold' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      step > 2 ? 'bg-brand-berry text-brand-cream border-brand-berry' : 'border-brand-text/30'
                    }`}>
                      {step > 2 ? <Check size={10} /> : '۲'}
                    </span>
                    <span>متخصص زیبایی</span>
                  </div>
                  <div className="h-0.5 bg-brand-berry/20 flex-1 mx-2" />
                  <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-brand-berry font-bold' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      step > 3 ? 'bg-brand-berry text-brand-cream border-brand-berry' : 'border-brand-text/30'
                    }`}>
                      {step > 3 ? <Check size={10} /> : '۳'}
                    </span>
                    <span>تاریخ و زمان</span>
                  </div>
                  <div className="h-0.5 bg-brand-berry/20 flex-1 mx-2" />
                  <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-brand-berry font-bold' : ''}`}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center border border-brand-text/30">
                      ۴
                    </span>
                    <span>ثبت مشخصات</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="mx-6 mt-4 p-3 bg-red-100 text-red-800 text-sm rounded-xl flex items-center gap-2 font-medium">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Modal Body (Scrollable container) */}
            <div className="p-6 overflow-y-auto flex-1 text-sm text-brand-text">
              
              {/* STEP 1: CHOOSE SERVICE */}
              {step === 1 && (
                <div className="space-y-6" id="booking-step-1">
                  <div>
                    <h4 className="text-base font-bold text-brand-deep mb-3">دسته بندی خدمات:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id as any)}
                          className={`py-3 px-4 rounded-xl text-center font-bold text-xs transition cursor-pointer ${
                            selectedCategory === cat.id
                              ? 'bg-brand-berry text-brand-cream'
                              : 'bg-brand-cream-dark text-brand-deep border border-brand-berry/10 hover:bg-brand-berry/5'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-brand-deep mb-3">خدمت مورد نظر را انتخاب کنید:</h4>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {SERVICES.filter(s => s.category === selectedCategory).map(srv => {
                        const isSelected = selectedService?.id === srv.id;
                        return (
                          <div
                            key={srv.id}
                            onClick={() => setSelectedService(srv)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center gap-4 ${
                              isSelected
                                ? 'bg-brand-berry/5 border-brand-berry shadow-inner'
                                : 'border-brand-berry/10 bg-brand-cream-dark hover:border-brand-berry/30'
                            }`}
                          >
                            <div className="space-y-1">
                              <h5 className="font-bold text-brand-deep flex items-center gap-1.5">
                                <span>{srv.name}</span>
                                {srv.popular && (
                                  <span className="bg-brand-berry text-brand-cream text-[9px] px-1.5 py-0.5 rounded-full font-normal">پرفروش</span>
                                )}
                              </h5>
                              <p className="text-xs text-brand-text/80 line-clamp-2 max-w-md">{srv.description}</p>
                            </div>

                            <div className="text-left shrink-0">
                              <p className="font-extrabold text-brand-berry">{srv.price}</p>
                              <p className="text-xs text-brand-text mt-0.5">{srv.duration}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE STAFF */}
              {step === 2 && (
                <div className="space-y-4" id="booking-step-2">
                  <h4 className="text-base font-bold text-brand-deep mb-2">متخصص خدمات زیبایی مورد نظر را انتخاب نمایید:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                    {STAFF.map(stf => {
                      const isSelected = selectedStaff?.id === stf.id;
                      return (
                        <div
                          key={stf.id}
                          onClick={() => setSelectedStaff(stf)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 ${
                            isSelected
                              ? 'bg-brand-berry/5 border-brand-berry'
                              : 'border-brand-berry/10 bg-brand-cream-dark hover:border-brand-berry/30'
                          }`}
                        >
                          <img
                            src={stf.image}
                            alt={stf.name}
                            className="w-14 h-14 rounded-full object-cover border border-brand-berry/20 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="text-right space-y-1">
                            <h5 className="font-bold text-brand-deep text-base">{stf.name}</h5>
                            <p className="text-xs text-brand-berry font-bold">{stf.role}</p>
                            <p className="text-xs text-brand-text/90 line-clamp-1">{stf.specialty}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE DATE & TIME */}
              {step === 3 && (
                <div className="space-y-6" id="booking-step-3">
                  <div>
                    <h4 className="text-base font-bold text-brand-deep mb-3 flex items-center gap-1.5">
                      <Calendar size={18} className="text-brand-berry" />
                      <span>تاریخ حضور شما:</span>
                    </h4>
                    <div className="flex gap-2 pb-2 overflow-x-auto pr-1">
                      {availableDates.map((dt, i) => {
                        const isSelected = selectedDate === dt.fullString;
                        return (
                          <div
                            key={i}
                            onClick={() => setSelectedDate(dt.fullString)}
                            className={`p-3 rounded-xl border text-center cursor-pointer transition-all min-w-[95px] shrink-0 ${
                              isSelected
                                ? 'bg-brand-berry text-brand-cream border-brand-berry shadow-md'
                                : 'bg-brand-cream-dark border-brand-berry/10 hover:border-brand-berry/30 text-brand-deep'
                            }`}
                          >
                            <span className="block text-xs opacity-80">{dt.shortDay}</span>
                            <span className="block text-xl font-bold mt-1">{dt.dayNum}</span>
                            <span className="block text-[10px] opacity-70 mt-0.5">خرداد</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-brand-deep mb-3 flex items-center gap-1.5">
                      <Clock size={18} className="text-brand-berry" />
                      <span>ساعات خالی مراجعین:</span>
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {timeSlots.map((ts, i) => {
                        const isSelected = selectedTime === ts;
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(ts)}
                            className={`py-2 px-1 rounded-xl text-center border font-bold text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-berry text-brand-cream border-brand-berry'
                                : 'bg-brand-cream-dark border-brand-berry/10 hover:border-brand-berry/30 text-brand-deep'
                            }`}
                          >
                            {ts}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT DATA */}
              {step === 4 && (
                <form onSubmit={handleSubmitBooking} className="space-y-4" id="booking-step-4">
                  <h4 className="text-base font-bold text-brand-deep mb-3 flex items-center gap-2">
                    <User size={18} className="text-brand-berry" />
                    <span>تکمیل اطلاعات فردی مراجع گرامی:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-deep block">نام و نام خانوادگی:</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: فاطمه احمدی"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-brand-berry/20 bg-brand-cream-dark focus:border-brand-berry focus:outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-deep block">شماره تلفن همراه:</label>
                      <input
                        type="tel"
                        required
                        placeholder="مثال: 09123456789"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-brand-berry/20 bg-brand-cream-dark focus:border-brand-berry focus:outline-none text-left"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 mt-2">
                    <label className="text-xs font-bold text-brand-deep block">توضیحات و نیازمندی‌های ویژه (اختیاری):</label>
                    <textarea
                      placeholder="اگر آلرژی خاصی دارید یا توضیحی برای آرایش موهایتان لازم است بنویسید..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full p-3 rounded-xl border border-brand-berry/20 bg-brand-cream-dark focus:border-brand-berry focus:outline-none"
                    />
                  </div>

                  <div className="p-4 bg-brand-bloom bg-brand-berry/5 rounded-xl border border-brand-berry/10 mt-3 flex gap-3 text-xs leading-relaxed text-brand-deep">
                    <AlertCircle size={18} className="text-brand-berry shrink-0" />
                    <p>پس از فشردن دکمه ثبت نهایی، رزرو شما تایید شده و پیامک آن برایتان ارسال خواهد شد. حضور ۱۵ دقیقه قبل از تایم تعیین شده در سالن الزامی است.</p>
                  </div>
                </form>
              )}

              {/* STEP 5: SUCCESS CONFIRMATION RECEIPT */}
              {step === 5 && successBooking && (
                <div className="text-center space-y-6 py-6" id="booking-step-5">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <ClipboardCheck size={36} />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-emerald-800">نوبت شما با موفقیت رزرو شد!</h4>
                    <p className="text-xs text-brand-text">کد رهگیری نوبت: <span className="font-mono text-brand-berry font-bold text-sm select-all">{successBooking.id}</span></p>
                  </div>

                  {/* Receipt design */}
                  <div className="bg-brand-cream-dark p-6 rounded-2xl border border-brand-berry/15 max-w-md mx-auto text-right space-y-3 shadow-inner">
                    <div className="flex justify-between border-b border-brand-berry/10 pb-2">
                      <span className="font-bold text-brand-text">خدمت انتخاب شده:</span>
                      <span className="font-extrabold text-brand-deep">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-berry/10 pb-2">
                      <span className="font-bold text-brand-text">متخصص زیبایی:</span>
                      <span className="font-bold text-brand-berry">{selectedStaff?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-berry/10 pb-2">
                      <span className="font-bold text-brand-text">تاریخ:</span>
                      <span className="font-bold text-brand-deep">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-berry/10 pb-2">
                      <span className="font-bold text-brand-text">زمان حضور:</span>
                      <span className="font-extrabold text-brand-berry">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-berry/10 pb-2">
                      <span className="font-bold text-brand-text">نام مراجع:</span>
                      <span className="font-bold text-brand-deep">{customerName}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-bold text-brand-text">مبلغ نهایی (پرداخت در محل):</span>
                      <span className="font-extrabold text-emerald-600 text-base">{selectedService?.price}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer / Navigation Buttons */}
            <div className="px-6 py-4 border-t border-brand-berry/10 bg-brand-cream-dark flex gap-3 justify-between shrink-0 z-20">
              {step === 5 ? (
                /* Done button in Step 5 */
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-brand-berry hover:bg-brand-berry-hover text-brand-cream font-bold rounded-xl transition cursor-pointer"
                >
                  فهمیدم، متشکرم
                </button>
              ) : (
                <>
                  {/* Cancel or back button */}
                  <div>
                    {step > 1 ? (
                      <button
                        onClick={handlePrevStep}
                        className="py-2.5 px-4 rounded-xl border border-brand-berry/20 text-brand-deep hover:bg-brand-berry/5 transition flex items-center gap-1 text-xs cursor-pointer font-bold"
                      >
                        <ArrowRight size={14} className="ml-1" />
                        <span>مرحله قبل</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleClose}
                        className="py-2.5 px-4 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 transition text-xs cursor-pointer"
                      >
                        انصراف
                      </button>
                    )}
                  </div>

                  {/* Next Step button */}
                  <div>
                    {step < 4 ? (
                      <button
                        onClick={handleNextStep}
                        className="py-2.5 px-5 rounded-xl bg-brand-berry hover:bg-brand-berry-hover text-brand-cream transition flex items-center gap-1 text-xs cursor-pointer font-bold"
                      >
                        <span>مرحله بعد</span>
                        <ArrowLeft size={14} className="mr-1" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitBooking}
                        className="py-2.5 px-6 rounded-xl bg-green-700 hover:bg-green-800 text-white transition flex items-center gap-1.5 text-xs cursor-pointer font-bold text-shadow-sm shadow-md"
                      >
                        <Check size={14} className="ml-1" />
                        <span>ثبت و تایید نهایی نوبت</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

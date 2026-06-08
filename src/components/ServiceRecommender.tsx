import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Check, ChevronLeft, ChevronRight, RefreshCw, 
  Clock, ShieldCheck, Compass, Heart, Award, ArrowLeft, Star 
} from 'lucide-react';
import { SERVICES, STAFF } from '../data';
import { Service } from '../types';

interface ServiceRecommenderProps {
  onSelectService: (serviceId: string) => void;
}

type Step = 'category' | 'preference' | 'skinType' | 'duration' | 'result';

export default function ServiceRecommender({ onSelectService }: ServiceRecommenderProps) {
  const [currentStep, setCurrentStep] = useState<Step>('category');
  const [category, setCategory] = useState<'hair' | 'makeup' | 'nail' | 'skin' | null>(null);
  const [preference, setPreference] = useState<string>('');
  const [skinType, setSkinType] = useState<string>('');
  const [durationPref, setDurationPref] = useState<'fast' | 'deep' | null>(null);
  
  // Custom navigation history to allow flawless "back" actions
  const stepsOrder: Step[] = ['category', 'preference', 'skinType', 'duration', 'result'];

  const handleRestart = () => {
    setCategory(null);
    setPreference('');
    setSkinType('');
    setDurationPref(null);
    setCurrentStep('category');
  };

  const getStepNumber = (step: Step) => {
    return stepsOrder.indexOf(step) + 1;
  };

  // Safe navigation back
  const handlePrev = () => {
    const idx = stepsOrder.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(stepsOrder[idx - 1]);
    }
  };

  // Safe navigation forward based on completed choices
  const handleNext = () => {
    const idx = stepsOrder.indexOf(currentStep);
    if (idx < stepsOrder.length - 1) {
      setCurrentStep(stepsOrder[idx + 1]);
    }
  };

  // Dynamic selector options for Step 2 depending on chosen category
  const getPreferenceOptions = () => {
    switch (category) {
      case 'hair':
        return [
          { value: 'recovery', label: 'احیا، کراتینه و بازسازی موهای دکلره شده و سست', icon: '✨' },
          { value: 'color', label: 'رنگ، بالیاژ، دکلره و لایت‌های مجلل ژورنالی', icon: '🎨' },
          { value: 'cut', label: 'کوپ، هیرکات مدرن و فرم‌دهی ژورنالی جدید مو', icon: '✂️' },
          { value: 'style', label: 'شینیون، آرایش مو فشن و استایل‌های خاص مجلسی', icon: '👑' },
        ];
      case 'makeup':
        return [
          { value: 'vip', label: 'گریم سه بعدی سینمایی و پکیج رویایی هدیه عروس', icon: '💍' },
          { value: 'light', label: 'میکاپ لایت نچرال و ملایم ماندگار کلاسیک', icon: '💄' },
          { value: 'lashes', label: 'اکستنشن مژه ابریشمی والیوم ضدحساسیت', icon: '👁️' },
        ];
      case 'nail':
        return [
          { value: 'powder', label: 'کاشت تخصصی ناخن با دوام فولادی به همراه مانیکور', icon: '💅' },
          { value: 'design', label: 'ژلیش و طراحی مینیاتوری فانتزی روی ناخن طبیعی', icon: '🖌️' },
          { value: 'spa', label: 'پدیکور درمانی، ماساژ با روغن داغ و پارافین تراپی', icon: '🛁' },
        ];
      case 'skin':
      default:
        return [
          { value: 'cleaning', label: 'پاکسازی عمیق پوست، تخلیه جوش‌های سرسیاه و چربی', icon: '🧖‍♀️' },
          { value: 'moist', label: 'هیالورونیک‌تراپی و آبرسانی سلولی ضدچروک پوست', icon: '💧' },
        ];
    }
  };

  // Algorithms to compute matching service based on selected telemetry
  const computeRecommendation = (): { service: Service; specialist: typeof STAFF[0] } => {
    let targetServiceId = 'h1'; // sensible fallback

    if (category === 'hair') {
      if (preference === 'recovery') targetServiceId = 'h3'; // کراتینه و احیای مو
      else if (preference === 'color') targetServiceId = 'h2'; // رنگ و لایت تخصصی
      else if (preference === 'style') targetServiceId = 'h4'; // شینیون و استایل مو
      else targetServiceId = 'h1'; // کوپ و هیرکات ژورنالی
    } else if (category === 'makeup') {
      if (preference === 'vip') targetServiceId = 'm1'; // میکاپ و گریم VIP عروس
      else if (preference === 'lashes') targetServiceId = 'm3'; // کاشت و اکستنشن مژه
      else targetServiceId = 'm2'; // میکاپ مجلسی و لایت
    } else if (category === 'nail') {
      if (preference === 'design') targetServiceId = 'n2'; // ژلیش و طراحی ناخن
      else if (preference === 'spa') targetServiceId = 'n3'; // پدیکور و مانیکور VIP
      else targetServiceId = 'n1'; // کاشت پودر و ژل ناخن
    } else if (category === 'skin') {
      if (preference === 'moist' || skinType === 'dry') targetServiceId = 's2'; // آبرسانی و جوانسازی
      else targetServiceId = 's1'; // پاکسازی و فیشیال تخصصی پوست
    }

    // Find the actual service object
    const service = SERVICES.find(s => s.id === targetServiceId) || SERVICES[0];

    // Perfect specialist mapping
    let specialist = STAFF[0];
    if (service.category === 'hair') {
      specialist = STAFF.find(st => st.id === 'st1') || STAFF[0];
    } else if (service.category === 'makeup' && service.id === 'm1') {
      specialist = STAFF.find(st => st.id === 'st2') || STAFF[1];
    } else if (service.category === 'makeup') {
      specialist = STAFF.find(st => st.id === 'st3') || STAFF[2];
    } else if (service.category === 'nail') {
      specialist = STAFF.find(st => st.id === 'st4') || STAFF[3];
    } else if (service.category === 'skin') {
      specialist = STAFF.find(st => st.id === 'st5') || STAFF[4];
    }

    return { service, specialist };
  };

  const recommendation = currentStep === 'result' ? computeRecommendation() : null;

  return (
    <section className="py-16 bg-gradient-to-b from-brand-cream to-brand-cream-dark/40 relative overflow-hidden dir-rtl" id="smart-recommender-section">
      {/* Dynamic Background SVG geometric line-art tracing */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden select-none">
        <svg fill="none" className="w-full h-full text-brand-berry" viewBox="0 0 1000 1000">
          <motion.path 
            d="M 100,-100 Q 300,400 900,100 T 1100,900" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="750" 
            cy="250" 
            r="120" 
            stroke="#D4AF37" 
            strokeWidth="1" 
            strokeDasharray="6 6"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-berry px-3 py-1 bg-brand-berry/10 rounded-full inline-flex items-center gap-1.5">
            <Sparkles size={13} className="text-brand-gold animate-pulse" />
            سیستم مشاوره مجازی بیوتی کوئین
          </span>
          <div className="relative inline-block">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
              پیشنهاد دهنده هوشمند خدمات اختصاصی شما
            </h3>
            
            {/* Elegant wavy drawing trace-line */}
            <div className="w-44 h-2 mx-auto mt-2 relative select-none">
              <svg className="w-full h-full text-brand-berry/75" viewBox="0 0 100 8" fill="none">
                <motion.path
                  d="M 5,4 Q 25,1 50,4 T 95,4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
            با تکمیل ۴ فاکتور ساده زیر، بهترین پکیج مجهز به توصیه‌های بهداشتی شخصی‌سازی شده و هیر آرتیست مناسب خود را در کمتر از ۱ دقیقه تعیین فرمایید.
          </p>
        </div>

        {/* Outer Consultation Card Container with Premium Soft Shadows */}
        <div className="bg-brand-cream border border-brand-berry/10 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden" id="recommender-card">
          
          {/* Internal background glow */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-brand-berry/5 rounded-full filter blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-brand-gold/5 rounded-full filter blur-2xl pointer-events-none" />

          {/* Stepper progress indicator bar */}
          <div className="mb-8 relative z-10">
            <div className="flex justify-between items-center text-xs text-brand-text mb-3">
              <span className="font-bold">مرحله {getStepNumber(currentStep)} از ۵</span>
              <span className="font-medium text-brand-berry">
                {currentStep === 'category' && 'انتخاب حوزه‌ی خدمات مورد نیاز'}
                {currentStep === 'preference' && 'تعیین اولویت و سبک آرایشی'}
                {currentStep === 'skinType' && 'نوع پوست و حساسیت'}
                {currentStep === 'duration' && 'ترجیح بازه زمانی و عمق خدمات'}
                {currentStep === 'result' && 'نسخه پیشنهادی رسمی سالن فرشته'}
              </span>
            </div>
            
            {/* Real progression bar line */}
            <div className="w-full bg-brand-cream-dark h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className="bg-brand-berry h-full"
                initial={{ width: '20%' }}
                animate={{ 
                  width: `${(getStepNumber(currentStep) / 5) * 100}%` 
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Main Interactive Questionnaire wrapper */}
          <div className="relative z-10 min-h-[320px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: CATEGORY SELECTION */}
              {currentStep === 'category' && (
                <motion.div
                  key="step-category"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-grow"
                >
                  <p className="text-sm font-bold text-brand-deep text-center mb-6">
                    بخش مورد نظر خود را جهت دریافت مشاوره و سرویس یابی دقیق انتخاب فرمایید:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* OPTION: HAIR */}
                    <button
                      onClick={() => { setCategory('hair'); setCurrentStep('preference'); }}
                      className={`flex items-center gap-4 p-5 rounded-2xl border text-right transition-all group ${
                        category === 'hair' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <div className="w-12 h-12 bg-brand-berry/10 text-brand-berry rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                        💇‍♀️
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-brand-deep text-sm">مراقبت، کات و رنگ تخصصی مو</h4>
                        <p className="text-[11px] text-brand-text mt-1">رنگ فاقد آمونیاک، احیاء پروتئین، استایلینگ ژورنالی</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${category === 'hair' ? 'border-brand-berry bg-brand-berry text-brand-cream' : 'border-brand-berry/20'}`}>
                        {category === 'hair' && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>

                    {/* OPTION: MAKEUP */}
                    <button
                      onClick={() => { setCategory('makeup'); setCurrentStep('preference'); }}
                      className={`flex items-center gap-4 p-5 rounded-2xl border text-right transition-all group ${
                        category === 'makeup' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <div className="w-12 h-12 bg-brand-berry/10 text-brand-berry rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                        💄
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-brand-deep text-sm">گریم، کانتور و میکاپ تخصصی</h4>
                        <p className="text-[11px] text-brand-text mt-1">میکاپ VIP مجلسی، کاشت مژه سبک، کانتورینگ سه بعدی عروس</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${category === 'makeup' ? 'border-brand-berry bg-brand-berry text-brand-cream' : 'border-brand-berry/20'}`}>
                        {category === 'makeup' && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>

                    {/* OPTION: NAIL */}
                    <button
                      onClick={() => { setCategory('nail'); setCurrentStep('preference'); }}
                      className={`flex items-center gap-4 p-5 rounded-2xl border text-right transition-all group ${
                        category === 'nail' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <div className="w-12 h-12 bg-brand-berry/10 text-brand-berry rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                        💅
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-brand-deep text-sm">کاشت، دیزاین و اسپا تخصصی ناخن</h4>
                        <p className="text-[11px] text-brand-text mt-1">مانیکور روسی عمیق، ژلیش ۴۰۰ رنگ، پدیکور گیاهی و کف‌سابی</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${category === 'nail' ? 'border-brand-berry bg-brand-berry text-brand-cream' : 'border-brand-berry/20'}`}>
                        {category === 'nail' && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>

                    {/* OPTION: SKIN */}
                    <button
                      onClick={() => { setCategory('skin'); setCurrentStep('preference'); }}
                      className={`flex items-center gap-4 p-5 rounded-2xl border text-right transition-all group ${
                        category === 'skin' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <div className="w-12 h-12 bg-brand-berry/10 text-brand-berry rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                        🧖‍♀️
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-brand-deep text-sm">پاکسازی، فیشیال ارگانیک و آبرسانی</h4>
                        <p className="text-[11px] text-brand-text mt-1">تخلیه سلول مرده، هیالورونیک عمیق، درمااف و هایفرکوئنسی</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${category === 'skin' ? 'border-brand-berry bg-brand-berry text-brand-cream' : 'border-brand-berry/20'}`}>
                        {category === 'skin' && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>

                  </div>
                </motion.div>
              )}

              {/* STEP 2: PREFERENCE / STYLE OPTION */}
              {currentStep === 'preference' && (
                <motion.div
                  key="step-preference"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-grow animate-duration-150"
                >
                  <p className="text-sm font-bold text-brand-deep text-center mb-6">
                    هدف و ترجیح اساسی شما از انتخاب این خدمات چیست؟
                  </p>

                  <div className="grid grid-cols-1 gap-3.5">
                    {getPreferenceOptions().map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setPreference(opt.value); setCurrentStep('skinType'); }}
                        className={`flex items-center gap-4 p-4 rounded-xl border text-right transition-all ${
                          preference === opt.value 
                          ? 'border-brand-berry bg-brand-berry/5 shadow-sm' 
                          : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/10'
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="flex-1 font-semibold text-brand-deep text-xs sm:text-sm">{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${preference === opt.value ? 'border-brand-berry bg-brand-berry text-brand-cream' : 'border-brand-berry/20'}`}>
                          {preference === opt.value && <Check size={10} strokeWidth={3} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SKIN TYPE */}
              {currentStep === 'skinType' && (
                <motion.div
                  key="step-skin"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-grow"
                >
                  <p className="text-sm font-bold text-brand-deep text-center mb-2">
                    وضعیت یا تیپ عمومی پوست صورت شما به چه شکل است؟
                  </p>
                  <p className="text-[11px] text-brand-text text-center mb-6 leading-relaxed">
                    این فاکتور به آرتیست ما کمک می‌کند تا سازگارترین فلوئید، پرایمر، یا کرم آبرسان فاقد چربی یا غنی را جهت جلوگیری از آلرژی تنظیم نماید.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Skin 1 */}
                    <button
                      onClick={() => { setSkinType('dry'); setCurrentStep('duration'); }}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all gap-3 ${
                        skinType === 'dry' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <span className="text-3xl">🏜️</span>
                      <div>
                        <h4 className="font-extrabold text-brand-deep text-xs sm:text-sm">پوست نسبتاً خشک و پوسته پوسته</h4>
                        <p className="text-[10px] text-brand-text mt-1">احساس کشش شدید، نیازمند هیدراتاسیون غلیظ هیالورونیک</p>
                      </div>
                    </button>

                    {/* Skin 2 */}
                    <button
                      onClick={() => { setSkinType('oily'); setCurrentStep('duration'); }}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all gap-3 ${
                        skinType === 'oily' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <span className="text-3xl">🧼</span>
                      <div>
                        <h4 className="font-extrabold text-brand-deep text-xs sm:text-sm">پوست چرب، مختلط یا با آکنه</h4>
                        <p className="text-[10px] text-brand-text mt-1">براق‌تر شدن نواحی پیشانی و بینی، نیازمند پاکسازی و فلومترهای مات</p>
                      </div>
                    </button>

                    {/* Skin 3 */}
                    <button
                      onClick={() => { setSkinType('normal'); setCurrentStep('duration'); }}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all gap-3 ${
                        skinType === 'normal' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <span className="text-3xl">🌸</span>
                      <div>
                        <h4 className="font-extrabold text-brand-deep text-xs sm:text-sm">پوست معمولی، معتدل یا متعادل</h4>
                        <p className="text-[10px] text-brand-text mt-1">بدون حساسیت ملموس، به دنبال شادابی و درخشندگی نرمال</p>
                      </div>
                    </button>

                  </div>
                </motion.div>
              )}

              {/* STEP 4: DURATION */}
              {currentStep === 'duration' && (
                <motion.div
                  key="step-duration"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex-grow"
                >
                  <p className="text-sm font-bold text-brand-deep text-center mb-6">
                    ترجیح شما برای صرف زمان و سبک پکیج چگونه است؟
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Fast */}
                    <button
                      onClick={() => { setDurationPref('fast'); setCurrentStep('result'); }}
                      className={`flex flex-col items-center justify-center p-8 rounded-2xl border text-center transition-all gap-4 ${
                        durationPref === 'fast' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <div className="w-12 h-12 bg-brand-berry/10 text-brand-berry rounded-full flex items-center justify-center">
                        <Clock size={22} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-brand-deep text-sm">سریع، کاربردی و بهینه</h4>
                        <p className="text-[11px] text-brand-text mt-1">تمرکز روی فاکتورهای کلیدی، اتمام کار تا حدود ۴۵ الی ۹۰ دقیقه</p>
                      </div>
                    </button>

                    {/* Deep */}
                    <button
                      onClick={() => { setDurationPref('deep'); setCurrentStep('result'); }}
                      className={`flex flex-col items-center justify-center p-8 rounded-2xl border text-center transition-all gap-4 ${
                        durationPref === 'deep' 
                        ? 'border-brand-berry bg-brand-berry/5 shadow-md' 
                        : 'border-brand-berry/10 bg-brand-cream hover:border-brand-berry/40 hover:bg-brand-cream-dark/20'
                      }`}
                    >
                      <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center">
                        <Award size={22} className="text-brand-berry" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-brand-deep text-sm">پکیج عمیق، غنی و VIP با حوصله</h4>
                        <p className="text-[11px] text-brand-text mt-1">شامل جزئیات درمانی جانبی، مانیکورهای هدیه و زمان تفصیلی بالای ۱۲۰ دقیقه</p>
                      </div>
                    </button>

                  </div>
                </motion.div>
              )}

              {/* STEP 5: RECOMMENDATION RESULTS */}
              {currentStep === 'result' && recommendation && (
                <motion.div
                  key="step-result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="bg-brand-cream-dark/40 border-2 border-dashed border-brand-berry/20 rounded-2xl p-6 relative overflow-hidden">
                    
                    {/* Elegant Golden Seal Design SVG backdrop */}
                    <div className="absolute top-4 left-4 w-16 h-16 opacity-30 select-none hidden sm:block">
                      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-brand-berry">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                        <path d="M 50,20 L 60,40 L 80,45 L 65,60 L 70,80 L 50,70 L 30,80 L 35,60 L 20,45 L 40,40 Z" fill="currentColor" />
                      </svg>
                    </div>

                    <div className="text-center sm:text-right space-y-1.5 mb-6">
                      <span className="text-[10px] font-extrabold text-brand-berry tracking-wider uppercase bg-brand-berry/10 px-2.5 py-0.5 rounded-md inline-block">
                        نسخه رسمی مشاوره زیبایی شماره {Math.floor(1000 + Math.random() * 9000)}
                      </span>
                      <h4 className="text-xl font-extrabold text-brand-deep">
                        خدمت پیشنهادی مطابق با فیزیولوژی و نیاز شما:
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left side details */}
                      <div className="md:col-span-8 space-y-4">
                        <div>
                          <h3 className="text-2xl font-extrabold text-brand-berry">
                            {recommendation.service.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-brand-text leading-relaxed mt-2">
                            {recommendation.service.description}
                          </p>
                        </div>

                        {/* Badges details info columns */}
                        <div className="flex flex-wrap gap-4 text-xs">
                          <div className="flex items-center gap-1.5 bg-brand-cream px-3 py-1.5 rounded-lg border border-brand-berry/5 text-brand-deep font-bold">
                            <Clock size={14} className="text-brand-berry" />
                            <span>مدت تقریبی: {recommendation.service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-brand-cream px-3 py-1.5 rounded-lg border border-brand-berry/5 text-brand-deep font-bold">
                            <Star size={14} className="text-brand-gold fill-brand-gold" />
                            <span>محبوبیت: عالی</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-brand-cream px-3 py-1.5 rounded-lg border border-brand-berry/5 text-brand-deep font-bold">
                            <ShieldCheck size={14} className="text-green-600" />
                            <span>تضمین سلامت با برند معتبر</span>
                          </div>
                        </div>

                        {/* Extra Personalized advice depending on skinType */}
                        <div className="text-[11px] text-brand-deep bg-brand-berry/5 border-l-4 border-brand-berry px-3.5 py-2.5 rounded-r-md leading-relaxed">
                          <span className="font-bold block text-xs text-brand-berry mb-0.5">💡 توصیه بهداشتی مشاور زیبایی:</span>
                          {skinType === 'dry' && 'با توجه به خشکی پوست صورتتان، ما از فرمولاسیون فلوئید آبرسان عمیق حاوی مولکول‌های فعال گلیسیرین در کنار پودر فیکس هولوگرافی استفاده می‌کنیم تا چهره کدر به کلی رفع شود.'}
                          {skinType === 'oily' && 'به دلیل چربی مستعد در ناحیه T-Zone، پرسنل ما از لایه‌بردارهای سالیسیلیک اسید سبک طبیعی قبل از میکاپ استفاده نموده و متریال صد درصد اویل‌فری برند مک برای آرایشتان برمی‌گزینند.'}
                          {(skinType === 'normal' || skinType === '') && 'پوست با طراوت شما بستری ایده‌آل برای جذب کلاژن‌های ویتامینه فیشیال است. استفاده از رطوبت‌رسان ابریشمی قبل از کار، شادابی بی‌نظیری ایجاد خواهد کرد.'}
                        </div>
                      </div>

                      {/* Right side specialist details */}
                      <div className="md:col-span-4 bg-brand-cream p-4 rounded-xl border border-brand-berry/10 text-center space-y-3">
                        <span className="text-[9px] font-bold text-brand-text block uppercase">آرتیست متخصص و پیشنهادی شما:</span>
                        <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-brand-berry">
                          <img 
                            src={recommendation.specialist.image} 
                            alt={recommendation.specialist.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-brand-deep text-sm">{recommendation.specialist.name}</h5>
                          <p className="text-[10px] text-brand-berry mt-0.5">{recommendation.specialist.role}</p>
                        </div>
                        <div className="text-[10px] text-brand-text bg-brand-cream-dark px-2 py-1 rounded">
                          {recommendation.specialist.specialty}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <button
                      onClick={() => onSelectService(recommendation.service.id)}
                      className="px-8 py-3.5 bg-brand-berry hover:bg-brand-berry/90 text-brand-cream font-bold text-sm rounded-xl transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} className="text-brand-gold animate-bounce" />
                      <span>رزرو آنلاین نوبت فوق تخصصی این خدمت</span>
                    </button>
                    
                    <button
                      onClick={handleRestart}
                      className="px-6 py-3.5 border border-brand-berry/30 hover:border-brand-berry text-brand-deep font-bold text-sm rounded-xl transition-colors bg-brand-cream hover:bg-brand-cream-dark/30 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={14} />
                      <span>شروع مجدد آزمون مشاوره</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* General Navigation Toolbar if not results step */}
            {currentStep !== 'result' && (
              <div className="flex justify-between items-center border-t border-brand-cream-dark pt-5 mt-8 relative z-10 text-xs sm:text-sm">
                
                {/* Back button */}
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 'category'}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-bold transition-colors ${
                    currentStep === 'category' 
                    ? 'text-brand-text/30 cursor-not-allowed' 
                    : 'text-brand-deep hover:bg-brand-cream-dark/40 cursor-pointer'
                  }`}
                >
                  <ChevronRight size={16} />
                  <span>مرحله قبل</span>
                </button>

                {/* Progress dot indicator circles */}
                <div className="hidden sm:flex gap-1.5">
                  {stepsOrder.slice(0, 4).map((step, idx) => (
                    <div 
                      key={step}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        stepsOrder.indexOf(currentStep) >= idx ? 'bg-brand-berry' : 'bg-brand-cream-dark'
                      }`}
                    />
                  ))}
                </div>

                {/* Forward button (shows only if choice made) */}
                <button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 'category' && !category) ||
                    (currentStep === 'preference' && !preference) ||
                    (currentStep === 'skinType' && !skinType) ||
                    (currentStep === 'duration' && !durationPref)
                  }
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-bold transition-colors ${
                    ((currentStep === 'category' && !category) ||
                     (currentStep === 'preference' && !preference) ||
                     (currentStep === 'skinType' && !skinType) ||
                     (currentStep === 'duration' && !durationPref))
                    ? 'text-brand-text/30 cursor-not-allowed' 
                    : 'text-brand-berry hover:bg-brand-berry/10 cursor-pointer'
                  }`}
                >
                  <span>مرحله بعد</span>
                  <ChevronLeft size={16} />
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

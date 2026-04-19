import { useEffect, useState, useRef } from 'react';
import { Clock, GraduationCap, Star } from 'lucide-react';

export default function ExperienceWidget() {
  const [displayHours, setDisplayHours] = useState(0);
  const [targetHours, setTargetHours] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const animationCompleted = useRef(false);

  // Constants
  const START_DATE = new Date('2016-09-01T00:00:00');
  const HOURS_PER_DAY = 10;
  const START_HOUR = 8;
  const END_HOUR = 18;

  const calculateHours = () => {
    const now = new Date();
    const currentDayStart = new Date(now);
    currentDayStart.setHours(0, 0, 0, 0);
    
    const oneDay = 24 * 60 * 60 * 1000;
    // Calculate full days passed since start date until yesterday (inclusive of yesterday)
    // Actually, simple diff in days from start date to today 00:00
    const diffDays = Math.floor((currentDayStart.getTime() - START_DATE.getTime()) / oneDay);
    
    // Count Sundays in the full day range
    let sundays = 0;
    for (let i = 0; i < diffDays; i++) {
        const d = new Date(START_DATE.getTime() + i * oneDay);
        if (d.getDay() === 0) sundays++;
    }
    
    let totalHours = (diffDays - sundays) * HOURS_PER_DAY;

    // Add today's hours if not Sunday
    if (now.getDay() !== 0) {
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();
        const currentSec = now.getSeconds();
        
        if (currentHour >= END_HOUR) {
            totalHours += HOURS_PER_DAY;
        } else if (currentHour >= START_HOUR) {
            const hoursPassed = currentHour - START_HOUR;
            const minutesPassed = currentMin;
            const secondsPassed = currentSec;
            
            totalHours += hoursPassed + (minutesPassed / 60) + (secondsPassed / 3600);
        }
        // If < START_HOUR, add 0 (already accounted for by not adding anything)
    }
    
    return totalHours;
  };

  // Intersection Observer to detect when widget is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate initial target and set up interval
  useEffect(() => {
    setTargetHours(calculateHours());
    const interval = setInterval(() => {
        setTargetHours(calculateHours());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Keep targetHoursRef in sync and handle post-animation updates
  const targetHoursRef = useRef(0);
  useEffect(() => {
    targetHoursRef.current = targetHours;
    if (animationCompleted.current) {
        setDisplayHours(targetHours);
    }
  }, [targetHours]);

  // Animation effect
  useEffect(() => {
    if (!isVisible) return;
    
    // If we've already animated in this session, don't restart
    if (animationCompleted.current) {
        setDisplayHours(targetHoursRef.current);
        return;
    }

    let startTime: number;
    let animationFrame: number;
    const duration = 2000; // 2 seconds animation
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentVal = targetHoursRef.current * ease;
      setDisplayHours(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationCompleted.current = true;
        setDisplayHours(targetHoursRef.current);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible]);

  return (
    <div ref={widgetRef} className="relative w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-blue-100 transform hover:scale-[1.01] transition-all duration-300 animate-fade-in flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-xl">
          <GraduationCap className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Experience Journey</h3>
          <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hours of study & practice
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-mono">
          {Math.floor(displayHours).toLocaleString()}
        </span>
      </div>
      
      <div className="absolute -top-2 -right-2">
        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" />
      </div>
    </div>
  );
}

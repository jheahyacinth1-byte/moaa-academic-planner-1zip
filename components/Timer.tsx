import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, ChevronDown } from 'lucide-react';
import { SUBJECTS } from '../constants';
import { formatTime, saveSession } from '../services/academicService';
import { Subject } from '../types';

interface TimerProps {
  onSessionComplete: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onSessionComplete }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(SUBJECTS[0]);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load state from local storage to prevent loss on refresh (simple persistence)
  useEffect(() => {
    const savedStart = localStorage.getItem('moaa_timer_start');
    const savedSubId = localStorage.getItem('moaa_timer_sub');
    
    if (savedStart && savedSubId) {
      const start = parseInt(savedStart);
      const sub = SUBJECTS.find(s => s.id === savedSubId) || SUBJECTS[0];
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);
      
      setStartTime(start);
      setSelectedSubject(sub);
      setSeconds(elapsed);
      setIsActive(true);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => {
    if (!isActive) {
      // Start
      const now = Date.now();
      setStartTime(now);
      setIsActive(true);
      localStorage.setItem('moaa_timer_start', now.toString());
      localStorage.setItem('moaa_timer_sub', selectedSubject.id);
    } else {
      // Pause (logic here is simplified for demo, usually we split sessions on pause)
      setIsActive(false);
      localStorage.removeItem('moaa_timer_start');
      localStorage.removeItem('moaa_timer_sub');
    }
  };

  const stopTimer = () => {
    if (seconds > 0 && startTime) {
      saveSession({
        id: crypto.randomUUID(),
        subjectId: selectedSubject.id,
        startTime: startTime,
        durationSeconds: seconds,
      });
      onSessionComplete();
    }
    
    setIsActive(false);
    setSeconds(0);
    setStartTime(null);
    localStorage.removeItem('moaa_timer_start');
    localStorage.removeItem('moaa_timer_sub');
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-md mx-auto">
      {/* Subject Selector */}
      <div className="relative mb-8">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Select Subject
        </label>
        <div className="relative">
          <select
            disabled={isActive}
            value={selectedSubject.id}
            onChange={(e) => {
              const sub = SUBJECTS.find(s => s.id === e.target.value);
              if (sub) setSelectedSubject(sub);
            }}
            className="block w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-blue-500 font-semibold transition-colors disabled:opacity-50"
          >
            {SUBJECTS.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.code} - {sub.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-8">
        <div 
          className="text-7xl font-mono font-bold tracking-tighter transition-colors duration-300"
          style={{ color: isActive ? selectedSubject.color : '#cbd5e1' }}
        >
          {formatTime(seconds)}
        </div>
        <p className="text-sm text-gray-400 mt-2 font-medium">
          {isActive ? 'Session in progress...' : 'Ready to focus'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-6">
        <button
          onClick={toggleTimer}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform transition-all active:scale-95
            ${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-slate-900 hover:bg-slate-800'}
          `}
        >
          {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
        </button>

        {isActive && (
           <button
           onClick={stopTimer}
           className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg transform transition-all active:scale-95"
         >
           <Square size={24} fill="currentColor" />
         </button>
        )}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { calculateStats } from './services/academicService';
import { SUBJECTS, MOCK_SCHEDULE, GOAT_IMAGE_URL } from './constants';
import { AggregatedStats } from './types';
import { GoatProgress } from './components/GoatProgress';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { LayoutGrid, Timer as TimerIcon, Calendar, BookOpen, Menu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timer' | 'schedule'>('dashboard');
  const [stats, setStats] = useState<AggregatedStats>({
    totalSeconds: 0,
    totalCredits: 0,
    progressPercentage: 0,
    subjectBreakdown: []
  });

  const refreshStats = () => {
    const data = calculateStats(SUBJECTS);
    setStats(data);
  };

  useEffect(() => {
    refreshStats();
  }, []);

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-24 bg-slate-50">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
               <img src={GOAT_IMAGE_URL} className="w-full h-full object-cover" alt="logo" />
           </div>
           <span className="font-bold text-blue-950 tracking-tight">MOAA</span>
        </div>
        <button className="text-slate-600"><Menu size={24} /></button>
      </div>

      {/* Navigation (Sidebar on Desktop, Bottom bar on Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full md:w-24 md:h-full bg-white border-t md:border-t-0 md:border-r border-slate-200 z-30 flex md:flex-col justify-around md:justify-center items-center py-4 md:gap-12 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-none">
        
        {/* Logo in Sidebar */}
        <div className="hidden md:flex absolute top-8 flex-col items-center">
             <div className="w-12 h-12 rounded-full overflow-hidden mb-2 bg-slate-100 border-2 border-slate-100 shadow-sm">
                <img src={GOAT_IMAGE_URL} className="w-full h-full object-cover" alt="logo" />
             </div>
             <span className="font-extrabold text-blue-950 text-[10px] tracking-widest">MOAA</span>
        </div>

        <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<LayoutGrid size={24} />} 
            label="Home" 
        />
        <NavButton 
            active={activeTab === 'timer'} 
            onClick={() => setActiveTab('timer')} 
            icon={<TimerIcon size={24} />} 
            label="Timer" 
        />
        <NavButton 
            active={activeTab === 'schedule'} 
            onClick={() => setActiveTab('schedule')} 
            icon={<Calendar size={24} />} 
            label="Plan" 
        />
      </nav>

      {/* Main Content Area */}
      <main className="max-w-xl mx-auto md:max-w-4xl p-6">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center md:text-left mt-4">
              <h1 className="text-3xl font-extrabold text-blue-950 tracking-tight">MOAA IS THE GOAT</h1>
              <p className="text-slate-500 font-medium">Semester Target: 810 Hours (30 sp)</p>
            </div>

            {/* The GOAT Ring */}
            <GoatProgress 
                percentage={stats.progressPercentage} 
                currentSp={stats.totalCredits} 
            />

            {/* Subject Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUBJECTS.map(sub => {
                const subStat = stats.subjectBreakdown.find(s => s.subjectId === sub.id);
                const hrs = subStat ? (subStat.seconds / 3600) : 0;
                const percent = (hrs / (sub.targetCredits * 27)) * 100;
                
                return (
                  <div key={sub.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-slate-800 text-lg">{sub.code}</span>
                       <span className="text-xs px-2 py-1 rounded-full bg-slate-50 text-slate-600 font-medium border border-slate-100">{hrs.toFixed(1)}h</span>
                    </div>
                    <div className="text-xs font-medium text-slate-400 mb-4 uppercase tracking-wide">{sub.name}</div>
                    
                    {/* Mini Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: sub.color }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats Chart */}
            <Stats data={stats} />
          </div>
        )}

        {activeTab === 'timer' && (
          <div className="flex flex-col h-[80vh] justify-center animate-fade-in">
             <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-blue-950">Focus Mode</h2>
                 <p className="text-slate-500 font-medium">Every second fills the GOAT</p>
             </div>
             <Timer onSessionComplete={refreshStats} />
             
             <div className="mt-12 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex gap-4 items-start shadow-sm">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                    <BookOpen size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-blue-950 text-sm uppercase tracking-wide">Strategy Tip</h4>
                    <p className="text-blue-800 text-sm mt-1 leading-relaxed">
                        Consistency is key. Try to study for at least 45 minutes before taking a break to maintain deep work flow.
                    </p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="animate-fade-in space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-blue-950">Week 34 Schedule</h2>
                <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">Fall 2024</span>
             </div>
             
             <div className="space-y-3">
                {MOCK_SCHEDULE.map(event => {
                    const sub = SUBJECTS.find(s => s.code === event.subjectCode);
                    return (
                        <div key={event.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-slate-300 transition-colors flex gap-4 items-center group">
                            <div 
                                className="w-1.5 h-12 rounded-full group-hover:scale-y-110 transition-transform" 
                                style={{ backgroundColor: sub?.color || '#ccc' }}
                            ></div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-800">{event.subjectCode}</span>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{event.day}</span>
                                </div>
                                <div className="text-sm text-slate-600 mt-1 font-medium">{sub?.name}</div>
                                <div className="flex gap-4 mt-2 text-xs text-slate-400 font-medium">
                                    <span className="flex items-center gap-1.5"><TimerIcon size={12} /> {event.time}</span>
                                    <span className="flex items-center gap-1.5">📍 {event.location}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Helper Subcomponent for Nav
const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-blue-700' : 'text-slate-400 hover:text-slate-600'}`}
    >
        <div className={`p-2.5 rounded-xl transition-all duration-300 ${active ? 'bg-blue-50 scale-110 shadow-sm' : 'hover:bg-slate-50'}`}>
            {icon}
        </div>
        <span className={`text-[10px] font-bold tracking-wide ${active ? 'text-blue-900' : ''}`}>{label}</span>
    </button>
);

export default App;

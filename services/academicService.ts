import { AggregatedStats, HOURS_PER_CREDIT, SEMESTER_GOAL_HOURS, StudySession, Subject } from '../types';

const STORAGE_KEY = 'moaa_study_sessions';

export const saveSession = (session: StudySession) => {
  const existing = getSessions();
  const updated = [...existing, session];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getSessions = (): StudySession[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const calculateStats = (subjects: Subject[]): AggregatedStats => {
  const sessions = getSessions();
  
  let totalSeconds = 0;
  const breakdown = subjects.map(sub => {
    const subSessions = sessions.filter(s => s.subjectId === sub.id);
    const subSeconds = subSessions.reduce((acc, curr) => acc + curr.durationSeconds, 0);
    const subCredits = subSeconds / 3600 / HOURS_PER_CREDIT;
    
    totalSeconds += subSeconds;
    
    return {
      subjectId: sub.id,
      seconds: subSeconds,
      credits: subCredits
    };
  });

  const totalHours = totalSeconds / 3600;
  const totalCredits = totalHours / HOURS_PER_CREDIT;
  const progressPercentage = Math.min((totalHours / SEMESTER_GOAL_HOURS) * 100, 100);

  return {
    totalSeconds,
    totalCredits,
    progressPercentage,
    subjectBreakdown: breakdown
  };
};

export const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const formatSp = (val: number) => val.toFixed(2);

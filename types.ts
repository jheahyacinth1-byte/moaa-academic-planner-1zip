export interface Subject {
  id: string;
  code: string;
  name: string;
  color: string; // Tailwind class prefix or hex
  targetCredits: number; // usually 10 for this specific module
}

export interface StudySession {
  id: string;
  subjectId: string;
  startTime: number; // Unix timestamp
  durationSeconds: number;
}

export interface ScheduleEvent {
  id: string;
  subjectCode: string;
  day: string;
  time: string;
  location: string;
  week: number;
}

export interface AggregatedStats {
  totalSeconds: number;
  totalCredits: number; // Studiepoeng
  progressPercentage: number;
  subjectBreakdown: {
    subjectId: string;
    seconds: number;
    credits: number;
  }[];
}

// Configuration Constants
export const HOURS_PER_CREDIT = 27; // 1 sp = 27 hours
export const SEMESTER_GOAL_HOURS = 810; // 30 sp total (3 subjects * 10 sp)

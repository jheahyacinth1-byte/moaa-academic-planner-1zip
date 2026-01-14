import { ScheduleEvent, Subject } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'mat202',
    code: 'MAT202',
    name: 'Discrete Mathematics',
    color: '#0d9488', // Teal-600 (Matches Logo Green/Teal)
    targetCredits: 10,
  },
  {
    id: 'mas130',
    code: 'MAS130',
    name: 'Applied Mechanics',
    color: '#ca8a04', // Yellow-600 (Matches Logo Gold)
    targetCredits: 10,
  },
  {
    id: 'mas141',
    code: 'MAS141',
    name: 'Fluid Mechanics',
    color: '#1e3a8a', // Blue-900 (Matches Logo Blue)
    targetCredits: 10,
  },
];

export const MOCK_SCHEDULE: ScheduleEvent[] = [
  { id: '1', subjectCode: 'MAT202', day: 'Monday', time: '08:15 - 10:00', location: 'Auditorium A', week: 34 },
  { id: '2', subjectCode: 'MAS130', day: 'Monday', time: '12:15 - 14:00', location: 'Lab 3', week: 34 },
  { id: '3', subjectCode: 'MAS141', day: 'Tuesday', time: '10:15 - 12:00', location: 'Room 204', week: 34 },
  { id: '4', subjectCode: 'MAT202', day: 'Wednesday', time: '14:15 - 16:00', location: 'Auditorium B', week: 34 },
  { id: '5', subjectCode: 'MAS130', day: 'Thursday', time: '09:15 - 11:00', location: 'Lab 3', week: 34 },
];

// Cartoonish Goat Image
export const GOAT_IMAGE_URL = "https://cdn-icons-png.flaticon.com/512/616/616430.png";
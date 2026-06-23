export interface WorkoutStats {
  duration: string;
  kcal: number;
  exercises: number;
}

export interface Workout {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  calories: string;
  duration: string;
  image: string;
  liked: boolean;
  level: string;
  description: string;
  stats: WorkoutStats;
}

export interface WorkoutData {
  categories: string[];
  workouts: Workout[];
}

export type Screen = 'loading' | 'onboarding' | 'home' | 'details';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import WorkoutCard from './WorkoutCard';
import type { Workout } from '../types';
import workoutData from '../data/workouts.json';

interface HomeScreenProps {
  onWorkoutPress: (workout: Workout) => void;
}

export default function HomeScreen({ onWorkoutPress }: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [workouts, setWorkouts] = useState<Workout[]>(workoutData.workouts);

  const filteredWorkouts = useMemo(() => {
    if (selectedCategory === 'All') return workouts;
    return workouts.filter((w) => w.category === selectedCategory);
  }, [selectedCategory, workouts]);

  const toggleLike = (id: number) => {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, liked: !w.liked } : w))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-pink-200 via-pink-100 to-rose-50"
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-lg">
              <img src="/avatar.jpg" alt="Robert Fox" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-xs text-[#6b7280]">Welcome back,</p>
              <h2 className="text-base font-bold text-[#1a1a2e]">Robert Fox</h2>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-lg text-[#1a1a2e] shadow-sm backdrop-blur-sm"
          >
            <i className="fa-regular fa-bell" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </motion.button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        {/* Pro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card relative overflow-hidden rounded-3xl p-5"
        >
          <div className="relative z-10 max-w-[55%]">
            <h3 className="text-lg font-bold text-[#1a1a2e]">Get Pro Access</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#6b7280]">
              Get 1 month Free and unlock all Pro Features
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="btn-black mt-4 rounded-full px-5 py-2.5 text-xs font-semibold text-white"
            >
              Upgrade Now
            </motion.button>
          </div>

          <div className="absolute -right-2 bottom-0 top-0 w-[55%]">
            <img
              src="/pro-banner.jpg"
              alt="Pro fitness"
              className="h-full w-full object-cover object-center"
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
            />
          </div>

          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-300/30" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-rose-300/25" />
        </motion.div>

        {/* Section header */}
        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#1a1a2e]">Today's best fit</h3>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-sm font-semibold text-[#6b7280] underline decoration-pink-300 underline-offset-4"
          >
            See All
          </motion.button>
        </div>

        {/* Category filters */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {workoutData.categories.map((category) => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`filter-chip whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${
                selectedCategory === category
                  ? 'active text-white'
                  : 'bg-white/60 text-[#6b7280]'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Workouts grid */}
        <div className="mt-4 grid grid-cols-2 gap-4 pb-4">
          {filteredWorkouts.map((workout, index) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onToggleLike={toggleLike}
              onPress={onWorkoutPress}
              index={index}
            />
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 text-2xl text-[#ff8fa3]">
              <i className="fa-solid fa-person-running" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#6b7280]">
              No workouts found in {selectedCategory}
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 pt-2">
        <div className="glass-card flex items-center justify-between rounded-full px-2 py-2 shadow-lg">
          <NavItem icon="fa-solid fa-house" label="Home" active />
          <NavItem icon="fa-solid fa-chart-simple" label="Stats" />
          <NavItem icon="fa-solid fa-calendar" label="Plan" />
          <NavItem icon="fa-solid fa-user" label="Profile" />
        </div>
      </div>
    </motion.div>
  );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-full py-2 transition-colors ${
        active ? 'text-[#ff6b85]' : 'text-[#9ca3af]'
      }`}
    >
      <i className={`${icon} text-lg`} />
      <span className="text-[9px] font-medium">{label}</span>
    </motion.button>
  );
}

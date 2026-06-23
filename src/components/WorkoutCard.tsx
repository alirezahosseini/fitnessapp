import { motion } from 'framer-motion';
import type { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
  onToggleLike: (id: number) => void;
  onPress: (workout: Workout) => void;
  index: number;
}

export default function WorkoutCard({ workout, onToggleLike, onPress, index }: WorkoutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => onPress(workout)}
      className="workout-card glass-card group relative flex flex-col overflow-hidden rounded-3xl p-3"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <img
          src={workout.image}
          alt={workout.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#1a1a2e] backdrop-blur-sm">
          {workout.calories}
        </span>
      </div>

      {/* Content */}
      <div className="mt-3 px-1">
        <h3 className="text-sm font-bold text-[#1a1a2e]">{workout.title}</h3>
        <p className="mt-0.5 text-[10px] text-[#6b7280]">{workout.subtitle}</p>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(workout.id);
            }}
            className={`heart-btn flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-sm ${
              workout.liked ? 'liked' : 'text-[#9ca3af]'
            }`}
          >
            <i className={`fa-${workout.liked ? 'solid' : 'regular'} fa-heart`} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onPress(workout);
            }}
            className="btn-black flex-1 rounded-full py-2 text-xs font-semibold text-white"
          >
            Play Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

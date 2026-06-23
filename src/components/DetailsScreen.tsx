import { motion } from 'framer-motion';
import type { Workout } from '../types';

interface DetailsScreenProps {
  workout: Workout;
  onBack: () => void;
}

export default function DetailsScreen({ workout, onBack }: DetailsScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-pink-200 via-pink-100 to-rose-50"
    >
      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 pt-12">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[#1a1a2e] shadow-sm backdrop-blur-md"
        >
          <i className="fa-solid fa-chevron-left" />
        </motion.button>

        <h2 className="text-lg font-bold text-[#1a1a2e]">Details</h2>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[#1a1a2e] shadow-sm backdrop-blur-md"
        >
          <i className="fa-solid fa-ellipsis" />
        </motion.button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[55%] w-full">
        <img
          src={workout.image}
          alt={workout.title}
          className="h-full w-full object-cover object-top"
          style={{ maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/40 via-transparent to-pink-100/90" />
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 -mt-16 flex flex-1 flex-col rounded-t-[40px] bg-white/75 px-6 pb-8 pt-8 shadow-[0_-10px_40px_rgba(255,107,133,0.12)] backdrop-blur-2xl"
      >
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e]">{workout.title}</h1>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-[#ff6b85]">
                  {workout.category}
                </span>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-[#6b7280]">
                  {workout.level}
                </span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              className={`heart-btn flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-lg ${
                workout.liked ? 'liked' : 'text-[#9ca3af]'
              }`}
            >
              <i className={`fa-${workout.liked ? 'solid' : 'regular'} fa-heart`} />
            </motion.button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#6b7280]">{workout.description}</p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <StatCard
              icon="fa-regular fa-clock"
              value={workout.stats.duration}
              label="Duration"
              color="text-pink-400"
              bg="bg-pink-50"
            />
            <StatCard
              icon="fa-solid fa-heart-pulse"
              value={workout.stats.kcal.toString()}
              label="Kcal"
              color="text-rose-500"
              bg="bg-rose-50"
            />
          </div>

          {/* Exercises preview */}
          <div className="mt-6">
            <h3 className="text-base font-bold text-[#1a1a2e]">Exercises ({workout.stats.exercises})</h3>
            <div className="mt-3 space-y-3">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/60 p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-[#ff6b85]">
                    <i className="fa-solid fa-person-walking" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1a1a2e]">Exercise {i}</p>
                    <p className="text-xs text-[#6b7280]">00:{30 + i * 15} min</p>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-[#9ca3af]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="btn-black mt-4 w-full rounded-full py-4 text-base font-semibold text-white shadow-lg"
        >
          Start now
        </motion.button>
      </motion.div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2">
        <div className="home-indicator" />
      </div>
    </motion.div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
  bg,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color}`}>
        <i className={`${icon} text-lg`} />
      </div>
      <div>
        <p className="text-lg font-bold text-[#1a1a2e]">{value}</p>
        <p className="text-xs text-[#6b7280]">{label}</p>
      </div>
    </div>
  );
}

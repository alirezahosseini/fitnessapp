import { motion } from 'framer-motion';

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onSkip: () => void;
}

export default function OnboardingScreen({ onGetStarted, onSkip }: OnboardingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-pink-200 via-pink-100 to-rose-50 px-6 pb-10 pt-12"
    >
      {/* Background decorative shapes */}
      <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute -left-16 bottom-40 h-48 w-48 rounded-full bg-rose-300/25 blur-3xl" />

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex flex-1 items-end justify-center"
      >
        <div className="absolute inset-x-0 bottom-0 top-0">
          <img
            src="/onboarding-hero.jpg"
            alt="Fitness woman"
            className="h-full w-full object-cover object-top"
            style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 -mt-8"
      >
        <h1 className="text-4xl font-extrabold leading-tight text-[#1a1a2e]">
          Your Fitness Journey
          <br />
          Begins Here
          <span className="ml-2 inline-flex gap-1">
            <i className="fa-solid fa-hand-back-fist text-[#ff8fa3]" />
            <i className="fa-solid fa-dumbbell text-[#ff8fa3]" />
          </span>
        </h1>

        <p className="mt-4 text-base leading-relaxed text-[#6b7280]">
          Fitness journey with the support and guidance our app provides.
        </p>

        <div className="mt-8 flex items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="btn-primary flex flex-1 items-center justify-center gap-3 rounded-full py-4 text-base font-semibold text-white"
          >
            <span>Get Started</span>
            <i className="fa-solid fa-arrow-right" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSkip}
            className="px-4 text-base font-semibold text-[#1a1a2e]"
          >
            Skip
          </motion.button>
        </div>
      </motion.div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div className="home-indicator" />
      </div>
    </motion.div>
  );
}

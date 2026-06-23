import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import type { Workout, Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('loading');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const handleLoadingComplete = () => {
    setScreen('onboarding');
  };

  const handleGetStarted = () => {
    setScreen('home');
  };

  const handleSkip = () => {
    setScreen('home');
  };

  const handleWorkoutPress = (workout: Workout) => {
    setSelectedWorkout(workout);
    setScreen('details');
  };

  const handleBack = () => {
    setScreen('home');
    setTimeout(() => setSelectedWorkout(null), 400);
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {screen === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {screen === 'onboarding' && (
          <OnboardingScreen
            key="onboarding"
            onGetStarted={handleGetStarted}
            onSkip={handleSkip}
          />
        )}

        {screen === 'home' && (
          <HomeScreen key="home" onWorkoutPress={handleWorkoutPress} />
        )}

        {screen === 'details' && selectedWorkout && (
          <DetailsScreen key="details" workout={selectedWorkout} onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}

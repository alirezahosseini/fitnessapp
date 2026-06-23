import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete,
          });
        },
      });

      tl.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
        .fromTo(
          bagRef.current,
          { y: -120, opacity: 0, rotation: -15 },
          { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: 'bounce.out' },
          '-=0.3'
        )
        .to(bagRef.current, {
          y: -15,
          duration: 0.5,
          yoyo: true,
          repeat: 3,
          ease: 'power1.inOut',
        })
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=1.5'
        )
        .to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200"
    >
      <div
        ref={circleRef}
        className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white/60 shadow-[0_20px_60px_rgba(255,107,133,0.25)] backdrop-blur-xl"
      >
        <svg
          ref={bagRef}
          className="shopping-bag h-24 w-24"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bag body */}
          <path
            d="M30 45H90L95 105H25L30 45Z"
            fill="url(#bagGradient)"
            stroke="#1a1a2e"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Bag flap/top */}
          <path
            d="M30 45H90V55C90 60 85 65 60 65C35 65 30 60 30 55V45Z"
            fill="#ff8fa3"
            stroke="#1a1a2e"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Handles */}
          <path
            d="M45 45V32C45 22 52 15 60 15C68 15 75 22 75 32V45"
            stroke="#1a1a2e"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Decorative heart */}
          <path
            d="M60 88C60 88 48 78 48 69C48 64 51 60 56 60C58.5 60 60 61.5 60 61.5C60 61.5 61.5 60 64 60C69 60 72 64 72 69C72 78 60 88 60 88Z"
            fill="white"
            stroke="#1a1a2e"
            strokeWidth="2"
          />
          {/* Sparkles */}
          <path
            d="M22 35L25 28L28 35L35 38L28 41L25 48L22 41L15 38L22 35Z"
            fill="#ffb3c1"
            stroke="#1a1a2e"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M92 30L94 25L96 30L101 32L96 34L94 39L92 34L87 32L92 30Z"
            fill="#ffb3c1"
            stroke="#1a1a2e"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="bagGradient" x1="30" y1="45" x2="90" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff8fa3" />
              <stop offset="1" stopColor="#ff6b85" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={textRef} className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-[#1a1a2e]">FitPro</h2>
        <p className="mt-2 text-sm font-medium text-[#6b7280]">Loading your fitness journey...</p>
      </div>

      {/* Animated dots */}
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-[#ff8fa3]"
            style={{
              animation: `pulse-soft 1s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

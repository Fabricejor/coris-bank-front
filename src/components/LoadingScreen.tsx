'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simuler un chargement progressif
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Attendre un peu avant de masquer le loader pour une transition plus fluide
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete();
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 50); // Ajuster la vitesse de chargement ici

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--main-color)]">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo UjuzAI */}
        <div className="w-48 h-auto">
          <Image
            src="/images/LOGO_UJUZAI_fond_sombre.png"
            alt="UjuzAI Logo"
            width={200}
            height={100}
            priority
            className="w-full h-auto"
          />
        </div>
        
        {/* Logo AFA Bank */}
        <div className="w-48 h-auto">
          <Image
            src="/images/AFA BANK.jpg"
            alt="AFA Bank Logo"
            width={200}
            height={100}
            priority
            className="w-full h-auto"
          />
        </div>
        
        {/* Barre de progression */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-white text-sm font-medium">
          Chargement... {progress}%
        </p>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Step1ApplicationSubmission } from './Step1ApplicationSubmission';
import { Step2ClarificationForm } from './Step2ClarificationForm';
import { Step3FinalReport } from './Step3FinalReport';

export function CreditApplicationFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStep1Complete = () => {
    setCurrentStep(2);
  };

  const handleStep2Complete = () => {
    setCurrentStep(3);
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-container)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center w-full">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-[var(--bg-main)] text-[var(--foreground)]' : 'bg-[var(--bg-gray)]  text-[var(--foreground)]'
                }`}>
                1
              </div>
              <div className={`h-1 w-16 md:w-full ${currentStep >= 2 ? 'bg-[var(--bg-main)]' : 'bg-[var(--bg-gray)]'
                }`}>
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-[var(--bg-second-main)] text-[var(--foreground)]' : 'bg-[var(--bg-gray)] text-[var(--foreground)]'
                }`}>
                2
              </div>
              <div className={`h-1 w-16 md:w-full ${currentStep >= 3 ? 'bg-[var(--bg-second-main)]' : 'bg-[var(--bg-gray)]'
                }`}>
              </div>
            </div>

            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-[var(--bg-main)] text-[var(--foreground)]' : 'bg-[var(--bg-gray)] text-[var(--foreground)]'
                }`}>
                3
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2 w-full">
            <div className="text-center w-24 md:w-40">
              <p className={`text-sm font-medium ${currentStep === 1 ? 'text-[var(--text-main)]' : ''}`}>Dépôt</p>
            </div>
            <div className="text-center w-24 md:w-40">
              <p className={`text-sm font-medium ${currentStep === 2 ? 'text-[var(--text-second-main)]' : ''}`}>Clarifications</p>
            </div>
            <div className="text-center w-24 md:w-40">
              <p className={`text-sm font-medium ${currentStep === 3 ? 'text-[var(--text-main)]' : ''}`}>Rapport</p>
            </div>
          </div>
        </div>

        {/* Current Step */}
        {currentStep === 1 && <Step1ApplicationSubmission onComplete={handleStep1Complete} />}
        {currentStep === 2 && <Step2ClarificationForm onComplete={handleStep2Complete} />}
        {currentStep === 3 && <Step3FinalReport onReset={handleReset} />}
      </div>
    </div>
  );
} 
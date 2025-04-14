'use client';

import { useState } from 'react';
import { FiCheck, FiLoader } from 'react-icons/fi';
import toast  from 'react-hot-toast';
import { FileUpload } from './FileUpload';

interface Step2Props {
  onComplete: () => void;
}

export function Step2ClarificationForm({ onComplete }: Step2Props) {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });

  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update progress based on filled fields
    updateProgress();
  };

  const handleFileChange = (file: File | null) => {
    setIdentityDoc(file);
    
    // Update progress based on uploaded document
    updateProgress();
  };

  const updateProgress = () => {
    // Count filled form fields
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    
    // Calculate progress (80% for form fields, 20% for document)
    const formProgress = (filledFields / totalFields) * 80;
    const docProgress = identityDoc ? 20 : 0;
    
    setProgress(Math.round(formProgress + docProgress));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = Object.keys(formData);
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error('Veuillez répondre à toutes les questions');
      return;
    }
    
    // Check required document
    if (!identityDoc) {
      toast.error('Veuillez fournir votre pièce d\'identité');
      return;
    }
    
    // Mock submission
    setIsLoading(true);
    
    // Simulate API call with progress updates
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 10;
      if (uploadProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        toast.success('Informations soumises avec succès!');
        onComplete();
      }
    }, 400);
  };

  return (
    <>
    <div className="max-w-3xl mx-auto bg-[var(--background)] border border-[var(--border-main)] rounded-xl shadow-md overflow-hidden">
      <div className="bg-second-main p-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Clarifications</h2>
        <p className="text-[var(--foreground)]/80 mt-1">
          Veuillez répondre aux questions suivantes concernant votre demande de crédit
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="px-6 pt-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Progression</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-[var(--main-color)] rounded-full h-2.5">
          <div 
            className="bg-second-main h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Question 1 */}
          <div>
            <label htmlFor="question1" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Quel est le montant exact du crédit que vous souhaitez obtenir?
            </label>
            <input
              type="text"
              id="question1"
              name="question1"
              value={formData.question1}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="Ex: 50.000.000 FCFA"
            />
          </div>
          
          {/* Question 2 */}
          <div>
            <label htmlFor="question2" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Quelle est la durée de remboursement souhaitée (en mois)?
            </label>
            <input
              type="text"
              id="question2"
              name="question2"
              value={formData.question2}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="Ex: 36 mois"
            />
          </div>
          
          {/* Question 3 */}
          <div>
            <label htmlFor="question3" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Quel est votre revenu mensuel net?
            </label>
            <input
              type="text"
              id="question3"
              name="question3"
              value={formData.question3}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="Ex: 3.500.000 FCFA"
            />
          </div>
          
          {/* Question 4 */}
          <div>
            <label htmlFor="question4" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Avez-vous d&apos;autres crédits en cours? Si oui, quel est le montant total des mensualités?
            </label>
            <input
              type="text"
              id="question4"
              name="question4"
              value={formData.question4}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="Ex: Oui, 800.000 FCFA par mois"
            />
          </div>
          
          {/* Question 5 */}
          <div>
            <label htmlFor="question5" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Quel est l&apos;objectif principal de ce crédit?
            </label>
            <textarea
              id="question5"
              name="question5"
              value={formData.question5}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="Ex: Achat d'une voiture"
            ></textarea>
          </div>
          
          {/* Identity Document Upload */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Pièce d&apos;identité</h3>
            <p className="text-sm text-gray-500 mb-3">
              Veuillez fournir une pièce d&apos;identité valide (carte d&apos;identité, passeport, permis de conduire)
            </p>
            <FileUpload onFileChange={handleFileChange} />
          </div>
          
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-secondary flex items-center justify-center gap-2 py-3"
            >
              {isLoading ? (
                <>
                  <FiLoader className="h-5 w-5 animate-spin" />
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <>
                  <span>Soumettre les informations</span>
                  <FiCheck className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
} 
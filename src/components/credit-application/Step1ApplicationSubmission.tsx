'use client';

import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { FiFileText, FiArrowRight, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Step1Props {
  onComplete: () => void;
}

export function Step1ApplicationSubmission({ onComplete }: Step1Props) {
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState<'file' | 'text' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email.trim()) {
      toast.error('Veuillez saisir votre adresse email');
      return;
    }
    
    if (!phone.trim()) {
      toast.error('Veuillez saisir votre numéro de téléphone');
      return;
    }
    
    if (submissionMethod === 'file' && !file) {
      toast.error('Veuillez télécharger un fichier avant de soumettre');
      return;
    }
    
    if (submissionMethod === 'text' && !textInput.trim()) {
      toast.error('Veuillez saisir votre demande avant de soumettre');
      return;
    }
    
    // Mock API call
    setIsLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Votre demande a été acceptée pour analyse!');
      onComplete();
    }, 2000);
  };

  return (
    <>
    <div className="max-w-3xl mx-auto bg-[var(--background)] border border-[var(--border-main)] rounded-xl shadow-md overflow-hidden">
      <div className="bg-main p-6">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Dépôt de la Demande de Crédit</h2>
        <p className="text-[var(--foreground)]/80 mt-1">
          Veuillez soumettre votre demande de crédit en utilisant l&apos;une des méthodes ci-dessous
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
          
          {/* Method Selection */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setSubmissionMethod('file')}
              className={`flex-1 p-4 border rounded-lg flex items-center gap-3 hover:border-[var(--border-main)] transition-colors
                ${submissionMethod === 'file' ? 'border-[var(--border-main)] bg-main/5' : 'border-gray-200'}`}
            >
              <FiFileText className="h-6 w-6 text-main" />
              <div className="text-left">
                <div className="font-medium">Télécharger un fichier</div>
                <p className="text-sm text-gray-500">PDF, Word, ou texte</p>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setSubmissionMethod('text')}
              className={`flex-1 p-4 border rounded-lg flex items-center gap-3 hover:border-[var(--border-main)] transition-colors
                ${submissionMethod === 'text' ? 'border-[var(--border-main)] bg-main/5' : 'border-gray-200'}`}
            >
              <FiFileText className="h-6 w-6 text-main" />
              <div className="text-left">
                <div className="font-medium">Saisir votre demande</div>
                <p className="text-sm text-gray-500">Décrire votre besoin en détail</p>
              </div>
            </button>
          </div>
          
          {/* File Upload */}
          {submissionMethod === 'file' && (
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-3">Télécharger votre fichier</h3>
              <FileUpload onFileChange={setFile} />
            </div>
          )}
          
          {/* Text Input */}
          {submissionMethod === 'text' && (
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-3">Saisir votre demande</h3>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Décrivez votre demande de crédit en détail (objet, montant, durée souhaitée, etc.)"
                className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
              />
            </div>
          )}
          
          {/* Submit Button */}
          {submissionMethod && (
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-5 w-5 animate-spin" />
                    <span>Analyse en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Soumettre la demande</span>
                    <FiArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
    </>
  );
} 
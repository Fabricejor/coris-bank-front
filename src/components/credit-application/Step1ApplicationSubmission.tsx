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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
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
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-main p-6">
        <h2 className="text-2xl font-bold text-white">Dépôt de la Demande de Crédit</h2>
        <p className="text-white/80 mt-1">
          Veuillez soumettre votre demande de crédit en utilisant l'une des méthodes ci-dessous
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Method Selection */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setSubmissionMethod('file')}
              className={`flex-1 p-4 border rounded-lg flex items-center gap-3 hover:border-main transition-colors
                ${submissionMethod === 'file' ? 'border-main bg-main/5' : 'border-gray-200'}`}
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
              className={`flex-1 p-4 border rounded-lg flex items-center gap-3 hover:border-main transition-colors
                ${submissionMethod === 'text' ? 'border-main bg-main/5' : 'border-gray-200'}`}
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
  );
} 
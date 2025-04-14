'use client';

import { useState } from 'react';
import { FiCheck, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { FileUpload } from './FileUpload';

interface Step2Props {
  onComplete: () => void;
}

export function Step2ClarificationForm({ onComplete }: Step2Props) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    creditAmount: '',
    purpose: '',
    duration: '12',
    employmentStatus: '',
    monthlyIncome: '',
  });

  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    identityDoc: null,
    proofOfIncome: null,
    bankStatements: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update progress based on filled fields
    updateProgress();
  };

  const handleFileChange = (fileType: string, file: File | null) => {
    setDocuments(prev => ({ ...prev, [fileType]: file }));
    
    // Update progress based on uploaded documents
    updateProgress();
  };

  const updateProgress = () => {
    // Count filled form fields
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    
    // Count uploaded documents
    const totalDocs = Object.keys(documents).length;
    const uploadedDocs = Object.values(documents).filter(doc => doc !== null).length;
    
    // Calculate overall progress (60% for form fields, 40% for documents)
    const formProgress = (filledFields / totalFields) * 60;
    const docsProgress = (uploadedDocs / totalDocs) * 40;
    
    setProgress(Math.round(formProgress + docsProgress));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['fullName', 'email', 'phone', 'creditAmount', 'purpose', 'employmentStatus'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Check required documents
    const requiredDocs = ['identityDoc', 'proofOfIncome'];
    const missingDocs = requiredDocs.filter(doc => !documents[doc]);
    
    if (missingDocs.length > 0) {
      toast.error('Veuillez fournir tous les documents requis');
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
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-second-main p-6">
        <h2 className="text-2xl font-bold text-white">Informations Complémentaires</h2>
        <p className="text-white/80 mt-1">
          Veuillez fournir les informations supplémentaires nécessaires à l&apos;analyse de votre demande
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="px-6 pt-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Progression</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-second-main h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Informations Personnelles</h3>
          </div>
          
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="john.doe@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          
          {/* Credit Information */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-medium mb-4">Informations sur le Crédit</h3>
          </div>
          
          <div>
            <label htmlFor="creditAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Montant du crédit souhaité <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="creditAmount"
              name="creditAmount"
              value={formData.creditAmount}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="10 000 €"
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Durée (en mois) <span className="text-red-500">*</span>
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
            >
              <option value="12">12 mois</option>
              <option value="24">24 mois</option>
              <option value="36">36 mois</option>
              <option value="48">48 mois</option>
              <option value="60">60 mois</option>
              <option value="72">72 mois</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
              Objet du crédit <span className="text-red-500">*</span>
            </label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="Décrivez l'objet de votre demande de crédit"
            ></textarea>
          </div>
          
          {/* Financial Information */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-medium mb-4">Informations Financières</h3>
          </div>
          
          <div>
            <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Statut professionnel <span className="text-red-500">*</span>
            </label>
            <select
              id="employmentStatus"
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
            >
              <option value="">Sélectionnez votre statut</option>
              <option value="salaried">Salarié(e)</option>
              <option value="self-employed">Travailleur indépendant</option>
              <option value="retired">Retraité(e)</option>
              <option value="unemployed">Sans emploi</option>
              <option value="student">Étudiant(e)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-1">
              Revenu mensuel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-second-main focus:border-transparent"
              placeholder="3 000 €"
            />
          </div>
          
          {/* Documents Upload */}
          <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-medium mb-4">Documents Justificatifs</h3>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pièce d&apos;identité <span className="text-red-500">*</span>
            </label>
            <FileUpload onFileChange={(file) => handleFileChange('identityDoc', file)} />
          </div>
          
          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Justificatif de revenus <span className="text-red-500">*</span>
            </label>
            <FileUpload onFileChange={(file) => handleFileChange('proofOfIncome', file)} />
          </div>
          
          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Relevés bancaires (3 derniers mois)
            </label>
            <FileUpload onFileChange={(file) => handleFileChange('bankStatements', file)} />
          </div>
          
          {/* Submit Button */}
          <div className="md:col-span-2 mt-6">
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
  );
} 
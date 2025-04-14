'use client';

import { useState } from 'react';
import { FiDownload, FiCheckCircle, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

type CreditStatus = 'approved' | 'rejected' | 'review';

interface CriteriaScore {
  name: string;
  score: number;
  maxScore: number;
  comment: string;
}

interface Step3Props {
  onReset: () => void;
}

export function Step3FinalReport({ onReset }: Step3Props) {
  // Static data for demo purposes
  const [status] = useState<CreditStatus>('approved');
  const [totalScore] = useState(78);
  const [criteriaScores] = useState<CriteriaScore[]>([
    { 
      name: 'Capacité de remboursement', 
      score: 85, 
      maxScore: 100,
      comment: 'Revenu mensuel suffisant pour couvrir le prêt et les dépenses courantes.' 
    },
    { 
      name: 'Historique de crédit', 
      score: 72, 
      maxScore: 100,
      comment: 'Bonne gestion des crédits précédents, quelques retards de paiement mineurs.' 
    },
    { 
      name: 'Stabilité professionnelle', 
      score: 90, 
      maxScore: 100,
      comment: 'Position stable depuis plus de 5 ans.' 
    },
    { 
      name: 'Ratio d\'endettement', 
      score: 65, 
      maxScore: 100,
      comment: 'Le niveau d\'endettement actuel est acceptable mais à surveiller.' 
    },
  ]);

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF
    toast.success('Téléchargement du rapport en cours...');
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'approved':
        return (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center gap-2">
            <FiCheckCircle className="h-5 w-5" />
            <span className="font-medium">Approuvé</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full flex items-center gap-2">
            <FiAlertCircle className="h-5 w-5" />
            <span className="font-medium">Rejeté</span>
          </div>
        );
      case 'review':
        return (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full flex items-center gap-2">
            <FiHelpCircle className="h-5 w-5" />
            <span className="font-medium">À revoir</span>
          </div>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-3xl mx-auto bg-[var(--background)] border border-[var(--border-main)] rounded-xl shadow-md overflow-hidden">
      <div className="bg-main p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Rapport d&apos;Analyse de Crédit</h2>
            <p className="text-white/80 mt-1">
              Résultats de l&apos;analyse automatisée de votre demande
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="p-6">
        {/* Overall Score */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              
              {/* Score circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={status === 'approved' ? '#164B35' : status === 'rejected' ? '#EF4444' : '#F59E0B'}
                strokeWidth="8"
                strokeDasharray={`${totalScore * 2.83} 283`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-3xl font-bold ${getScoreColor(totalScore)}`}>{totalScore}</span>
              <span className="text-sm text-gray-500">sur 100</span>
            </div>
          </div>
          <h3 className="text-xl font-medium">Score Global</h3>
          <p className="text-center text-gray-600 mt-1 max-w-md">
            {status === 'approved' 
              ? 'Félicitations! Votre demande de crédit a été approuvée.' 
              : status === 'rejected'
                ? 'Votre demande de crédit n\'a pas pu être approuvée à ce stade.'
                : 'Votre demande nécessite une revue complémentaire par nos équipes.'}
          </p>
        </div>
        
        {/* Detailed Scores */}
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4">Analyse Détaillée</h3>
          
          <div className="space-y-6">
            {criteriaScores.map((criteria, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{criteria.name}</span>
                  <span className={`font-medium ${getScoreColor(criteria.score)}`}>
                    {criteria.score}/{criteria.maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      criteria.score >= 80 ? 'bg-green-600' :
                      criteria.score >= 60 ? 'bg-yellow-500' : 'bg-red-600'
                    }`}
                    style={{ width: `${(criteria.score / criteria.maxScore) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{criteria.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="mt-10 bg-[var(--background)] p-6 rounded-lg border border-[var(--border-main)]">
          <h3 className="text-lg font-medium mb-2">Prochaines étapes</h3>
          {status === 'approved' ? (
            <p className="text-[var(--foreground)]">
              Un conseiller vous contactera sous 48h pour finaliser votre dossier de crédit et vous proposer les meilleures conditions.
            </p>
          ) : status === 'rejected' ? (
            <p className="text-[var(--foreground)]">
              Nous vous invitons à consulter les raisons du refus dans l&apos;analyse détaillée ci-dessus. Vous pouvez soumettre une nouvelle demande après avoir amélioré ces points.
            </p>
          ) : (
            <p className="text-[var(--foreground)]">
              Des informations complémentaires sont nécessaires pour finaliser l&apos;étude de votre dossier. Un conseiller vous contactera prochainement.
            </p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownloadReport}
            className="btn-primary flex items-center justify-center gap-2 py-3 flex-1"
          >
            <FiDownload className="h-5 w-5" />
            <span>Télécharger le rapport</span>
          </button>
          
          <button
            onClick={onReset}
            className="border border-[var(--border-main)] bg-[var(--bg-container)] hover:bg-[var(--main-color)] hover:text-[var(--bg-container)] text-[var(--foreground)] px-4 py-3 rounded-md font-medium flex-1"
          >
            Nouvelle demande
          </button>
        </div>
      </div>
    </div>
  );
} 
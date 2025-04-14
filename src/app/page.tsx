import { CreditApplicationFlow } from "@/components/credit-application/CreditApplicationFlow";

export default function Home() {
  return (
    <main>
      <header className="bg-main text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">CorisBank</h1>
            <div className="hidden md:block">
              <nav className="flex space-x-6">
                <a href="#" className="hover:underline">Accueil</a>
                <a href="#" className="hover:underline">Nos Services</a>
                <a href="#" className="hover:underline">À Propos</a>
                <a href="#" className="hover:underline">Contact</a>
              </nav>
            </div>
            <button className="bg-white text-main px-4 py-2 rounded-md font-medium hover:bg-gray-100">
              Espace Client
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4">
        <CreditApplicationFlow />
      </div>
      
      <footer className="bg-gray-900 text-white py-10 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CorisBank</h3>
              <p className="text-gray-400">
                Votre partenaire financier de confiance pour tous vos projets.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Nos Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Demande de Crédit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Crédit Personnel</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Crédit Immobilier</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Crédit Auto</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Épargne</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Avenue Principale</li>
                <li>Dakar, Sénégal</li>
                <li>contact@corisbank.com</li>
                <li>+221 33 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CorisBank. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

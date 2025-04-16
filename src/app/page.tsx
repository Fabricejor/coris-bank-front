import { CreditApplicationFlow } from "@/components/credit-application/CreditApplicationFlow";

export default function Home() {
  return (
    <main>
      <header className="bg-[var(--bg-main)] text-[var(--foreground)] py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <img src="/images/LOGO_UJUZAI_fond_sombre.png" alt="logo" className="w-20 h-auto" />
            </div>
            <div className="bg-white">
              <img src="/images/AFA BANK.jpg" alt="logo" className="w-20 h-auto" />
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4">
        <CreditApplicationFlow />
      </div>
      
      <footer className="bg-[var(--main-color)] text-[var(--foreground)] py-10 mt-20">
        <div className="container mx-auto px-4">
        <div className="flex justify-between items-center w-full">
            <div>
              <img src="/images/LOGO_UJUZAI_fond_sombre.png" alt="logo" className="w-40 h-auto" />
            </div>
            <div className="bg-white">
              <img src="/images/AFA BANK.jpg" alt="logo" className="w-40 h-auto" />
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} &copy; Gainde Talent Provider 2025. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/images/logo.jpg" alt="Association Amal Ait Sadden Logo" className="h-12 sm:h-16 mr-2 sm:mr-3" />
            <div>
              <h1 className={`text-sm sm:text-lg md:text-xl font-bold primary-green ${language === 'ar' ? 'font-amiri rtl' : ''}`}>
                {translations[language].ngoName}
              </h1>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="language-selector mb-4 md:mb-0 md:mr-6">
              <div className="flex space-x-2">
                <button 
                  className={`lang-btn p-1 rounded hover:bg-gray-100 ${language === 'ar' ? 'ring-2 ring-primary-green' : ''}`}
                  onClick={() => setLanguage('ar')}
                >
                  <img src="/images/flags/ma.svg" alt="Arabic" className="w-6 h-6" />
                </button>
                <button 
                  className={`lang-btn p-1 rounded hover:bg-gray-100 ${language === 'fr' ? 'ring-2 ring-primary-green' : ''}`}
                  onClick={() => setLanguage('fr')}
                >
                  <img src="/images/flags/fr.svg" alt="French" className="w-6 h-6" />
                </button>
                <button 
                  className={`lang-btn p-1 rounded hover:bg-gray-100 ${language === 'de' ? 'ring-2 ring-primary-green' : ''}`} 
                  onClick={() => setLanguage('de')}
                >
                  <img src="/images/flags/de.svg" alt="German" className="w-6 h-6" />
                </button>
                <button 
                  className={`lang-btn p-1 rounded hover:bg-gray-100 ${language === 'en' ? 'ring-2 ring-primary-green' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  <img src="/images/flags/gb.svg" alt="English" className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#about" className="nav-link text-gray-600 hover:text-primary-green transition-colors">
                {translations[language].nav.about}
              </a>
              <a href="#activities" className="nav-link text-gray-600 hover:text-primary-green transition-colors">
                {translations[language].nav.activities}
              </a>
              <a href="#team" className="nav-link text-gray-600 hover:text-primary-green transition-colors">
                {translations[language].nav.team}
              </a>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile menu toggle button */}
      <div className="md:hidden fixed right-4 top-4 z-50">
        <button 
          onClick={toggleMobileMenu} 
          className="bg-primary-green text-white p-2 rounded-full shadow-lg"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
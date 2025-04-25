import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center text-center">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-600 text-2xl"
      >
        <i className="fas fa-times"></i>
      </button>
      
      <div className="language-selector mb-8">
        <div className="flex space-x-4 justify-center">
          <button 
            className={`lang-btn p-2 ${language === 'de' ? 'ring-2 ring-primary-green' : ''}`}
            onClick={() => setLanguage('de')}
          >
            <img src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/de.svg" alt="German" className="w-8 h-8" />
          </button>
          <button 
            className={`lang-btn p-2 ${language === 'fr' ? 'ring-2 ring-primary-green' : ''}`}
            onClick={() => setLanguage('fr')}
          >
            <img src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/fr.svg" alt="French" className="w-8 h-8" />
          </button>
          <button 
            className={`lang-btn p-2 ${language === 'ar' ? 'ring-2 ring-primary-green' : ''}`}
            onClick={() => setLanguage('ar')}
          >
            <img src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/ma.svg" alt="Arabic" className="w-8 h-8" />
          </button>
          <button 
            className={`lang-btn p-2 ${language === 'en' ? 'ring-2 ring-primary-green' : ''}`}
            onClick={() => setLanguage('en')}
          >
            <img src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/gb.svg" alt="English" className="w-8 h-8" />
          </button>
        </div>
      </div>
      
      <nav className="flex flex-col space-y-6 text-xl">
        <a 
          href="#about" 
          className={`hover:text-primary-green ${language === 'ar' ? 'font-amiri' : ''}`}
          onClick={onClose}
        >
          {translations[language].nav.about}
        </a>
        <a 
          href="#activities" 
          className={`hover:text-primary-green ${language === 'ar' ? 'font-amiri' : ''}`}
          onClick={onClose}
        >
          {translations[language].nav.activities}
        </a>
        <a 
          href="#team" 
          className={`hover:text-primary-green ${language === 'ar' ? 'font-amiri' : ''}`}
          onClick={onClose}
        >
          {translations[language].nav.team}
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;

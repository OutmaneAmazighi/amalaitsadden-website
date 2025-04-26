import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  return (
    <div className="fixed top-20 right-4 z-50 bg-white rounded-lg p-2 shadow-md md:hidden">
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
  );
};

export default LanguageSelector;
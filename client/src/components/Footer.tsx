import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';
import logo from '@assets/logo.jpg';

const Footer: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-dark-green text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <img src={logo} alt="Association Amal Ait Sadden Logo" className="h-16 mb-4" />
            <p className={language === 'ar' ? 'font-amiri rtl' : ''}>
              {translations[language].ngoName}
            </p>
          </div>
          
          <div className="mb-8 md:mb-0">
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-amiri' : ''}`}>
              {translations[language].footer.contact}
            </h3>
            
            <div className="flex items-center mb-3">
              <i className="fas fa-envelope mr-3"></i>
              <span>info@amal-aitsadden.org</span>
            </div>
            <div className="flex items-center mb-3">
              <i className="fas fa-phone mr-3"></i>
              <span>+212 621-783035</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt mr-3"></i>
              <span className={language === 'ar' ? 'font-amiri' : ''}>
                {translations[language].footer.location}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-amiri' : ''}`}>
              {translations[language].footer.followUs}
            </h3>
            
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/profile.php?id=100069741199883" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-yellow transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className={language === 'ar' ? 'font-amiri rtl' : ''}>
            {translations[language].footer.copyright.replace('{year}', currentYear.toString())}
          </p>
          
          <p className={`mt-3 md:mt-0 ${language === 'ar' ? 'font-amiri rtl' : ''}`}>
            {translations[language].footer.developedBy}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

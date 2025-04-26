import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';
import { AmazighColorfulPattern } from '../lib/patterns';

const About: React.FC = () => {
  const { language } = useContext(LanguageContext);
  
  return (
    <section id="about" className="py-12 sm:py-16" style={{ background: AmazighColorfulPattern }}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 max-w-4xl mx-auto">
          <h2 className={`text-2xl sm:text-3xl font-bold primary-green mb-4 sm:mb-6 text-center ${language === 'ar' ? 'font-amiri' : ''}`}>
            {translations[language].sections.about.title}
          </h2>
          
          <div className={`text-gray-700 text-sm sm:text-base leading-relaxed ${language === 'ar' ? 'rtl font-amiri' : ''}`}>
            {translations[language].sections.about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index < translations[language].sections.about.paragraphs.length - 1 ? 'mb-3 sm:mb-4' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

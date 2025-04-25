import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';
import { AmazighPattern } from '../lib/patterns';

const About: React.FC = () => {
  const { language } = useContext(LanguageContext);
  
  // Removed all the intersection observer and animation code that was causing the section to disappear
  
  return (
    <section id="about" className="py-16" style={{ background: AmazighPattern }}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold primary-green mb-6 text-center ${language === 'ar' ? 'font-amiri' : ''}`}>
            {translations[language].sections.about.title}
          </h2>
          
          <div className={`text-gray-700 leading-relaxed ${language === 'ar' ? 'rtl font-amiri' : ''}`}>
            {translations[language].sections.about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index < translations[language].sections.about.paragraphs.length - 1 ? 'mb-4' : ''}>
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

import { useContext, useEffect, useRef } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';
import { AmazighPattern } from '../lib/patterns';

const About: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="py-16 opacity-0" style={{ background: AmazighPattern }}>
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

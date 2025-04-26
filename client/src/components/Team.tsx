import { useContext, useRef, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';
import { teamMembers } from '../lib/data';
import { AmazighSymbolPattern } from '../lib/patterns';

const Team: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const teamRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    teamRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      teamRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <section id="team" className="py-12 sm:py-16" style={{ background: AmazighSymbolPattern }}>
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl sm:text-3xl font-bold primary-green mb-6 sm:mb-10 text-center ${language === 'ar' ? 'font-amiri' : ''}`}>
          {translations[language].sections.team.title}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              ref={el => (teamRefs.current[index] = el as HTMLDivElement)}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 opacity-0 w-[120px] sm:w-[150px] text-center"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Amazigh-inspired decorative border top */}
              <div className="h-2 w-full bg-gradient-to-r from-primary-green via-primary-yellow to-primary-red"></div>
              
              <div className="flex justify-center pt-3 sm:pt-4">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-primary-green"
                />
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-semibold primary-dark-green mb-1">{member.name}</h3>
                <p className={`text-[10px] sm:text-xs primary-red ${language === 'ar' ? 'font-amiri' : ''}`}>
                  {member.role[language]}
                </p>
                {/* Amazigh-inspired decorative element */}
                <div className="flex justify-center mt-1">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,1 L12,11 M7,6 L17,6" stroke="rgba(76, 175, 80, 0.6)" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

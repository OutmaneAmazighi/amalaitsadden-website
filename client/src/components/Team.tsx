import { useContext, useRef, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';
import { teamMembers } from '../lib/data';

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
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold primary-green mb-10 text-center ${language === 'ar' ? 'font-amiri' : ''}`}>
          {translations[language].sections.team.title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              ref={el => (teamRefs.current[index] = el as HTMLDivElement)}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 opacity-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={member.photo} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold primary-dark-green mb-1">{member.name}</h3>
                <p className={`primary-red mb-4 ${language === 'ar' ? 'font-amiri' : ''}`}>
                  {member.role[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

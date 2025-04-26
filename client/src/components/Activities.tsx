import { useContext, useState, useRef, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../lib/translations';
import { getProcessedEvents, formatDate, ProcessedEvent } from '../utils/events-helper';

interface ActivitiesProps {
  openLightbox: (imageSrc: string) => void;
}

const Activities: React.FC<ActivitiesProps> = ({ openLightbox }) => {
  const { language } = useContext(LanguageContext);
  const [expandedGalleries, setExpandedGalleries] = useState<Record<string, boolean>>({});
  const activityRefs = useRef<HTMLDivElement[]>([]);
  
  // Get event data with translations
  const events: ProcessedEvent[] = getProcessedEvents();
  
  const toggleGallery = (activityId: string) => {
    setExpandedGalleries(prev => ({
      ...prev,
      [activityId]: !prev[activityId]
    }));
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    activityRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      activityRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <section id="activities" className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl sm:text-3xl font-bold primary-green mb-6 sm:mb-10 text-center ${language === 'ar' ? 'font-amiri' : ''}`}>
          {translations[language].sections.activities.title}
        </h2>
        
        {events.map((event, index) => (
          <div 
            key={event.id}
            ref={el => (activityRefs.current[index] = el as HTMLDivElement)}
            className="mb-16 opacity-0 transform translate-y-4 transition-all duration-700"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 activity-img-container mb-6 md:mb-0 md:mr-6">
                    <img 
                      src={event.mainImage} 
                      alt={event.title[language]} 
                      className="rounded-lg h-full w-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className={`bg-primary-green text-white px-4 py-1 rounded-full text-sm mb-2 sm:mb-0 ${language === 'ar' ? 'font-amiri' : ''}`}>
                        {formatDate(event.date, language)}
                      </div>
                      <div className={`text-gray-500 ${language === 'ar' ? 'font-amiri' : ''}`}>
                        <i className={`fas fa-map-marker-alt ${language === 'ar' ? 'ml-1' : 'mr-1'}`}></i> {event.location[language]}
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-semibold primary-dark-green mb-3 ${language === 'ar' ? 'font-amiri rtl' : ''}`}>
                      {event.title[language]}
                    </h3>
                    
                    <p className={`text-gray-700 mb-6 ${language === 'ar' ? 'rtl font-amiri' : ''}`}>
                      {event.description[language]}
                    </p>
                    
                    <button 
                      className={`bg-primary-yellow hover:bg-primary-dark-yellow text-white py-2 px-4 rounded-md flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                      onClick={() => toggleGallery(event.id)}
                    >
                      <span className={language === 'ar' ? 'font-amiri' : ''}>
                        {translations[language].sections.activities.viewMorePhotos}
                      </span>
                      <i className={`fas fa-chevron-${expandedGalleries[event.id] ? 'up' : 'down'} ${language === 'ar' ? 'mr-2' : 'ml-2'}`}></i>
                    </button>
                  </div>
                </div>
                
                <div 
                  className="gallery-container mt-6"
                  style={{ maxHeight: expandedGalleries[event.id] ? '1000px' : '0' }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((image, i) => (
                      <img 
                        key={i}
                        src={image} 
                        alt={`${event.title[language]} - Image ${i+1}`} 
                        className="rounded-lg shadow h-48 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(image)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;

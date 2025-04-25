import { createContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'fr' | 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'fr', // Default to French as fallback
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

// Function to detect browser language
const detectBrowserLanguage = (): Language => {
  // Get browser language
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  
  // Check if browser language is one of our supported languages
  if (['de', 'fr', 'ar', 'en'].includes(browserLang)) {
    return browserLang as Language;
  }
  
  // Default to French if not supported
  return 'fr';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr'); // Default to French

  useEffect(() => {
    // First check localStorage for saved preference
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    
    if (savedLanguage && ['de', 'fr', 'ar', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // If no saved preference, detect browser language
      const browserLanguage = detectBrowserLanguage();
      setLanguage(browserLanguage);
      // Save the detected language
      localStorage.setItem('preferredLanguage', browserLanguage);
    }
    
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
    // Update document language for accessibility
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

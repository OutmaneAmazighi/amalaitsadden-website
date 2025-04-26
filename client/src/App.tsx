import { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Activities from "./components/Activities";
import Team from "./components/Team";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
import Lightbox from "./components/Lightbox";
import { LanguageProvider } from "./components/LanguageContext";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };
  
  const closeLightbox = () => {
    setLightboxImage(null);
  };
  
  // Smooth scrolling for anchor navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth',
          });
          
          // Close mobile menu if open
          if (mobileMenuOpen) {
            closeMobileMenu();
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [mobileMenuOpen]);
  
  return (
    <LanguageProvider>
      <div className="font-sans text-gray-800 bg-white">
        <Header toggleMobileMenu={toggleMobileMenu} />
        <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
        
        <main className="pt-24">
          <About />
          <Activities openLightbox={openLightbox} />
          <Team />
        </main>
        
        <Footer />
        
        {lightboxImage && <Lightbox imageSrc={lightboxImage} onClose={closeLightbox} />}
      </div>
    </LanguageProvider>
  );
}

export default App;

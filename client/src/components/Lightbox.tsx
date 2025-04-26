import { useEffect } from 'react';

interface LightboxProps {
  imageSrc: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageSrc, onClose }) => {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = ''; // Restore scrolling when lightbox is closed
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <button 
        className="absolute top-4 right-8 text-white text-4xl hover:text-gray-300 focus:outline-none" 
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <img 
        src={imageSrc} 
        alt="Enlarged view" 
        className="max-w-[90%] max-h-[90%] object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          console.error(`Failed to load lightbox image: ${target.src}`);
          target.onerror = null;
          target.src = '/images/logo.jpg'; // Fallback image
        }}
      />
    </div>
  );
};

export default Lightbox;

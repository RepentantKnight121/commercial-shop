import { useState, useEffect, ReactNode } from 'react';

const HideOnScroll = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setIsVisible(currentPosition < prevScrollPos);
      prevScrollPos = currentPosition;
    };

    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>{children}</div>
  );
};

export default HideOnScroll;
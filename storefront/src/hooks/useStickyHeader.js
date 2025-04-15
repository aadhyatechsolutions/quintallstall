import { useState, useEffect } from 'react';

export const useStickyHeader = (offset = 10) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > offset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { isSticky };
};
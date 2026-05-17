'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Scripts() {
  useEffect(() => {
    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const modal = document.querySelector('.popv-main-wrapper');
      
      if (target.textContent?.trim().toLowerCase() === 'discover more' || target.closest('div')?.textContent?.trim().toLowerCase() === 'discover more') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target.closest('#video-popup-btn')) {
        e.preventDefault();
        modal?.classList.add('active');
      } else if (target.closest('.popv-close') || target.closest('.popv-bg')) {
        e.preventDefault();
        modal?.classList.remove('active');
        // Pause video on close by resetting src to stop playback sound
        const iframe = modal?.querySelector('iframe') as HTMLIFrameElement | null;
        if (iframe) {
          const src = iframe.src;
          iframe.src = '';
          iframe.src = src;
        }
      }
    };
    
    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  return (
    <>
      <Script src="/js/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <Script src="/js/purecounter.js" strategy="afterInteractive" />
      <Script
        src="/js/aos.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
        }}
      />
      <Script src="/js/swiper.min.js" strategy="beforeInteractive" />
      <Script src="/js/plugins.js" strategy="afterInteractive" />
      <Script
        src="/js/main.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (typeof PureCounter !== 'undefined') new PureCounter();
        }}
      />
    </>
  );
}

'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import FooterTwo from './FooterTwo';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  if (isAuthPage) return null;
  const isHome = pathname === '/';
  return isHome ? <Footer /> : <FooterTwo />;
}

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mediaUrl } from '@/lib/media';

export default function HeaderTwo() {
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  return (
    <header className="absolute top-0 left-0 z-[9999] w-full">
      {/* Top Bar */}
      <div className="lg:block hidden top-bar-wrapper w-full bg-primary-500 h-[50px]">
        <div className="theme-container mx-auto h-full px-5">
          <div className="w-full h-full flex justify-between items-center">
            <div className="flex space-x-9 items-center">
              <div className="flex items-center space-x-2.5">
                <span>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 0C0.65625 0 0 0.6875 0 1.5C0 2 0.21875 2.4375 0.59375 2.71875L7.375 7.8125C7.75 8.09375 8.21875 8.09375 8.59375 7.8125L15.375 2.71875C15.75 2.4375 16 2 16 1.5C16 0.6875 15.3125 0 14.5 0H1.5ZM0 3.5V10C0 11.125 0.875 12 2 12H14C15.0938 12 16 11.125 16 10V3.5L9.1875 8.625C8.46875 9.15625 7.5 9.15625 6.78125 8.625L0 3.5Z" fill="white" />
                  </svg>
                </span>
                <p className="text-base text-white">info@example.com</p>
              </div>
              <div className="flex items-center space-x-2.5">
                <span>
                  <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.71875 15.625C8.34375 13.5938 12 8.75 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.75 3.65625 13.5938 5.25 15.625C5.625 16.0938 6.34375 16.0938 6.71875 15.625ZM6 8C4.875 8 4 7.125 4 6C4 4.90625 4.875 4 6 4C7.09375 4 8 4.90625 8 6C8 7.125 7.09375 8 6 8Z" fill="white" />
                  </svg>
                </span>
                <p className="text-base text-white">6391 Elgin St. Celina, 10299</p>
              </div>
              <div className="flex items-center space-x-2.5">
                <span>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.125 1.78125C4.90625 1.1875 4.25 0.90625 3.65625 1.0625L0.90625 1.8125C0.375 1.96875 0 2.4375 0 3C0 10.75 6.25 17 14 17C14.5625 17 15.0312 16.625 15.1875 16.0938L15.9375 13.3438C16.0938 12.75 15.8125 12.0938 15.2188 11.875L12.2188 10.625C11.7188 10.4062 11.125 10.5312 10.7812 10.9688L9.5 12.5C7.3125 11.4688 5.53125 9.6875 4.5 7.5L6.03125 6.21875C6.46875 5.875 6.59375 5.28125 6.375 4.78125L5.125 1.78125Z" fill="white" />
                  </svg>
                </span>
                <p className="text-base text-white">(629) 555-0129</p>
              </div>
            </div>
            <div className="flex space-x-6 items-center">
              <a href="#" className="text-white hover:text-primary-900 transition-colors">FB</a>
              <a href="#" className="text-white hover:text-primary-900 transition-colors">IG</a>
              <a href="#" className="text-white hover:text-primary-900 transition-colors">TW</a>
              <a href="#" className="text-white hover:text-primary-900 transition-colors">LN</a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={`navigation-wrapper navigation-wrapper-two-two w-full !bg-[#004C3F] h-[90px] ${isSticky ? 'fixed top-0 left-0 shadow-lg animate-[slideDown_0.3s_ease-in-out]' : ''}`}>
        <div className="theme-container h-full mx-auto px-5">
          <div className="w-full h-full flex justify-between items-center">
            <Link href="/">
              <img src={mediaUrl('logo-2.svg')} alt="logo" />
            </Link>
            
            <nav className="nav-wrapper nav-wrapper-2 lg:block hidden">
              <ul className="flex space-x-7 items-center text-white h-full">
                <li className="relative group h-full flex items-center">
                  <Link href="/" className="flex items-center space-x-1.5 group-hover:text-green-400 transition-colors h-full">
                    <span>Home</span>
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                      <path d="M3.1377 3.85938L0.637695 1.35938C0.43457 1.17188 0.43457 0.84375 0.637695 0.65625C0.825195 0.453125 1.15332 0.453125 1.34082 0.65625L3.49707 2.79688L5.6377 0.65625C5.8252 0.453125 6.15332 0.453125 6.34082 0.65625C6.54395 0.84375 6.54395 1.17188 6.34082 1.35938L3.84082 3.85938C3.65332 4.0625 3.3252 4.0625 3.1377 3.85938Z" />
                    </svg>
                  </Link>
                  <ul className="absolute left-0 top-[90px] w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[70px] transition-all duration-300 ease-in-out z-50 rounded-b-lg border-t-2 border-primary-500 text-gray-800 font-medium py-2">
                    <li><Link href="/" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Home Default</Link></li>
                    <li><Link href="/home-2" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Home Two</Link></li>
                  </ul>
                </li>
                <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
                <li className="relative group h-full flex items-center">
                  <Link href="/services" className="flex items-center space-x-1.5 group-hover:text-green-400 transition-colors h-full">
                    <span>Services</span>
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                      <path d="M3.1377 3.85938L0.637695 1.35938C0.43457 1.17188 0.43457 0.84375 0.637695 0.65625C0.825195 0.453125 1.15332 0.453125 1.34082 0.65625L3.49707 2.79688L5.6377 0.65625C5.8252 0.453125 6.15332 0.453125 6.34082 0.65625C6.54395 0.84375 6.54395 1.17188 6.34082 1.35938L3.84082 3.85938C3.65332 4.0625 3.3252 4.0625 3.1377 3.85938Z" />
                    </svg>
                  </Link>
                  <ul className="absolute left-0 top-[90px] w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[70px] transition-all duration-300 ease-in-out z-50 rounded-b-lg border-t-2 border-primary-500 text-gray-800 font-medium py-2">
                    <li><Link href="/services" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Services</Link></li>
                    <li><Link href="/services/risk-assessment" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Services Details</Link></li>
                  </ul>
                </li>
                <li><Link href="/projects" className="hover:text-green-400 transition-colors">Projects</Link></li>
                <li><Link href="/blog" className="hover:text-green-400 transition-colors">Blogs</Link></li>
                <li><Link href="/faq" className="hover:text-green-400 transition-colors">Pages</Link></li>
                <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link href="/account/policies" className="ml-4 px-4 py-2 bg-[#028835] hover:bg-white hover:text-primary-900 text-white font-bold rounded-lg text-sm common-trans shadow-sm">
                        Portal
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm common-trans shadow-sm"
                      >
                        Log out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/login" className="ml-4 px-5 py-2 bg-[#028835] hover:bg-white hover:text-primary-900 text-white font-bold rounded-lg text-sm common-trans shadow-sm">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="space-x-[52px] items-center xl:flex hidden">
              <button type="button" className="text-white hover:text-primary-500 transition-colors">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.25 8.625C16.25 10.4219 15.6641 12.1016 14.6875 13.4297L19.6094 18.3906C20.1172 18.8594 20.1172 19.6797 19.6094 20.1484C19.1406 20.6562 18.3203 20.6562 17.8516 20.1484L12.8906 15.1875C11.5625 16.2031 9.88281 16.75 8.125 16.75C3.63281 16.75 0 13.1172 0 8.625C0 4.17188 3.63281 0.5 8.125 0.5C12.5781 0.5 16.25 4.17188 16.25 8.625ZM8.125 14.25C11.2109 14.25 13.75 11.75 13.75 8.625C13.75 5.53906 11.2109 3 8.125 3C5 3 2.5 5.53906 2.5 8.625C2.5 11.75 5 14.25 8.125 14.25Z" fill="white" />
                </svg>
              </button>

              <Link href="/contact" className="px-[30px] py-5 border border-white rounded-lg text-white font-semibold flex space-x-2.5 items-center capitalize hover:bg-white hover:text-primary-900 common-trans">
                <span>Get a quote</span>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                  <path d="M13.6875 7.71875C14.0938 7.34375 14.0938 6.6875 13.6875 6.3125L8.6875 1.3125C8.3125 0.90625 7.65625 0.90625 7.28125 1.3125C6.875 1.6875 6.875 2.34375 7.28125 2.71875L10.5625 6H1C0.4375 6 0 6.46875 0 7C0 7.5625 0.4375 8 1 8H10.5625L7.28125 11.3125C6.875 11.6875 6.875 12.3438 7.28125 12.7188C7.65625 13.125 8.3125 13.125 8.6875 12.7188L13.6875 7.71875Z" />
                </svg>
              </Link>
            </div>

            {/* Mobile Button */}
            <button type="button" className="w-[77px] h-full flex lg:hidden justify-center items-center text-white">
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 11H0" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21H0" stroke="currentColor" strokeWidth="2" />
                <path d="M20 1H0" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

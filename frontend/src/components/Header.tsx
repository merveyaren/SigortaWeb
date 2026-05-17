'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mediaUrl } from '@/lib/media';

interface HeaderProps {
  variant?: 'light' | 'dark';
}

export default function Header({ variant = 'dark' }: HeaderProps) {
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

  const isLight = variant === 'light';
  const topBarBg = isLight ? 'bg-white border-b border-primaryBorder' : 'bg-[#028835]';
  const topBarText = isLight ? 'text-primary-100' : 'text-white';
  const topBarIconFill = isLight ? '#028835' : 'white';
  const topBarSocialText = isLight ? 'text-gray-800' : 'text-white';

  const navBg = isLight ? 'bg-white border-b border-primaryBorder' : '!bg-[#004C3F]';
  const navText = isLight ? 'text-primary-900 font-semibold' : 'text-white font-semibold';
  const searchFill = isLight ? '#004C3F' : 'white';
  const logoStyle = isLight ? {} : { filter: 'brightness(0) invert(1)' };

  const dropdownArrow = (
    <span><svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M3.1377 3.85938L0.637695 1.35938C0.43457 1.17188 0.43457 0.84375 0.637695 0.65625C0.825195 0.453125 1.15332 0.453125 1.34082 0.65625L3.49707 2.79688L5.6377 0.65625C5.8252 0.453125 6.15332 0.453125 6.34082 0.65625C6.54395 0.84375 6.54395 1.17188 6.34082 1.35938L3.84082 3.85938C3.65332 4.0625 3.3252 4.0625 3.1377 3.85938Z" /></svg></span>
  );

  return (
    <>
    <header className="absolute top-0 left-0 z-[9999] w-full">
      {/* Top Bar */}
      <div className={`top-bar lg:block hidden w-full h-[50px] ${topBarBg}`}>
        <div className="theme-container mx-auto w-full h-full flex justify-between items-center">
          <div className="flex space-x-6 items-center h-full">
            {/* Email */}
            <div className="flex items-center space-x-2">
              <span>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 0C15.2969 0 16 0.703125 16 1.5C16 2 15.75 2.4375 15.375 2.71875L8.59375 7.8125C8.21875 8.09375 7.75 8.09375 7.375 7.8125L0.59375 2.71875C0.21875 2.4375 0 2 0 1.5C0 0.703125 0.65625 0 1.5 0H14.5ZM6.78125 8.625C7.5 9.15625 8.46875 9.15625 9.1875 8.625L16 3.5V10C16 11.125 15.0938 12 14 12H2C0.875 12 0 11.125 0 10V3.5L6.78125 8.625Z" fill={topBarIconFill} />
                </svg>
              </span>
              <p className={`text-sm ${topBarText}`}>info@example.com</p>
            </div>
            {/* Address */}
            <div className="flex items-center space-x-2">
              <span>
                <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.71875 15.625C6.34375 16.0938 5.625 16.0938 5.25 15.625C3.65625 13.5938 0 8.75 0 6C0 2.6875 2.6875 0 6 0C9.3125 0 12 2.6875 12 6C12 8.75 8.34375 13.5938 6.71875 15.625ZM6 8C7.09375 8 8 7.125 8 6C8 4.90625 7.09375 4 6 4C4.875 4 4 4.90625 4 6C4 7.125 4.875 8 6 8Z" fill={topBarIconFill} />
                </svg>
              </span>
              <p className={`text-sm ${topBarText}`}>6391 Elgin St. Celina, 10299</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16C3.5625 16 0 12.4375 0 8C0 3.59375 3.5625 0 8 0C12.4062 0 16 3.59375 16 8C16 12.4375 12.4062 16 8 16ZM7.25 3.75V8C7.25 8.25 7.375 8.5 7.5625 8.625L10.5625 10.625C10.9062 10.875 11.375 10.7812 11.625 10.4375C11.8438 10.0938 11.75 9.625 11.4062 9.375L8.75 7.625V3.75C8.75 3.34375 8.40625 3 8 3C7.5625 3 7.25 3.34375 7.25 3.75Z" fill={topBarIconFill} /></svg>
              </span>
              <p className={`text-sm ${topBarText}`}>Sunday - Friday: <span className="font-bold">9 am - 8 pm</span></p>
            </div>
          </div>
          {/* Social Icons */}
          <div className="flex items-center h-full">
            <div className="flex items-center space-x-4 h-full px-4 border-r border-primaryBorder">
              {[
                { href: 'https://www.facebook.com/', d: 'M8.17383 9.3125H5.97656V15.875H3.04688V9.3125H0.644531V6.61719H3.04688V4.53711C3.04688 2.19336 4.45312 0.875 6.5918 0.875C7.61719 0.875 8.70117 1.08008 8.70117 1.08008V3.39453H7.5C6.32812 3.39453 5.97656 4.09766 5.97656 4.85938V6.61719H8.58398L8.17383 9.3125Z', vb: '0 0 9 16' },
                { href: 'https://www.instagram.com/', d: 'M7.5625 4.00586C9.4082 4.00586 10.9316 5.5293 10.9316 7.375C10.9316 9.25 9.4082 10.7441 7.5625 10.7441C5.6875 10.7441 4.19336 9.25 4.19336 7.375C4.19336 5.5293 5.6875 4.00586 7.5625 4.00586ZM7.5625 9.57227C8.76367 9.57227 9.73047 8.60547 9.73047 7.375C9.73047 6.17383 8.76367 5.20703 7.5625 5.20703C6.33203 5.20703 5.36523 6.17383 5.36523 7.375C5.36523 8.60547 6.36133 9.57227 7.5625 9.57227ZM11.8398 3.88867C11.8398 3.44922 11.4883 3.09766 11.0488 3.09766C10.6094 3.09766 10.2578 3.44922 10.2578 3.88867C10.2578 4.32812 10.6094 4.67969 11.0488 4.67969C11.4883 4.67969 11.8398 4.32812 11.8398 3.88867ZM14.0664 4.67969C14.125 5.76367 14.125 9.01562 14.0664 10.0996C14.0078 11.1543 13.7734 12.0625 13.0117 12.8535C12.25 13.6152 11.3125 13.8496 10.2578 13.9082C9.17383 13.9668 5.92188 13.9668 4.83789 13.9082C3.7832 13.8496 2.875 13.6152 2.08398 12.8535C1.32227 12.0625 1.08789 11.1543 1.0293 10.0996C0.970703 9.01562 0.970703 5.76367 1.0293 4.67969C1.08789 3.625 1.32227 2.6875 2.08398 1.92578C2.875 1.16406 3.7832 0.929688 4.83789 0.871094C5.92188 0.8125 9.17383 0.8125 10.2578 0.871094C11.3125 0.929688 12.25 1.16406 13.0117 1.92578C13.7734 2.6875 14.0078 3.625 14.0664 4.67969ZM12.6602 11.2422C13.0117 10.3926 12.9238 8.3418 12.9238 7.375C12.9238 6.4375 13.0117 4.38672 12.6602 3.50781C12.4258 2.95117 11.9863 2.48242 11.4297 2.27734C10.5508 1.92578 8.5 2.01367 7.5625 2.01367C6.5957 2.01367 4.54492 1.92578 3.69531 2.27734C3.10938 2.51172 2.66992 2.95117 2.43555 3.50781C2.08398 4.38672 2.17188 6.4375 2.17188 7.375C2.17188 8.3418 2.08398 10.3926 2.43555 11.2422C2.66992 11.8281 3.10938 12.2676 3.69531 12.502C4.54492 12.8535 6.5957 12.7656 7.5625 12.7656C8.5 12.7656 10.5508 12.8535 11.4297 12.502C11.9863 12.2676 12.4551 11.8281 12.6602 11.2422Z', vb: '0 0 15 14' },
                { href: 'https://twitter.com/', d: 'M13.4473 3.32812C13.4473 3.47461 13.4473 3.5918 13.4473 3.73828C13.4473 7.81055 10.3711 12.4688 4.7168 12.4688C2.95898 12.4688 1.34766 11.9707 0 11.0918C0.234375 11.1211 0.46875 11.1504 0.732422 11.1504C2.16797 11.1504 3.48633 10.6523 4.54102 9.83203C3.19336 9.80273 2.05078 8.92383 1.66992 7.69336C1.875 7.72266 2.05078 7.75195 2.25586 7.75195C2.51953 7.75195 2.8125 7.69336 3.04688 7.63477C1.64062 7.3418 0.585938 6.11133 0.585938 4.61719V4.58789C0.996094 4.82227 1.49414 4.93945 1.99219 4.96875C1.14258 4.41211 0.615234 3.47461 0.615234 2.41992C0.615234 1.83398 0.761719 1.30664 1.02539 0.867188C2.54883 2.71289 4.83398 3.94336 7.38281 4.08984C7.32422 3.85547 7.29492 3.62109 7.29492 3.38672C7.29492 1.6875 8.67188 0.310547 10.3711 0.310547C11.25 0.310547 12.041 0.662109 12.627 1.27734C13.3008 1.13086 13.9746 0.867188 14.5605 0.515625C14.3262 1.24805 13.8574 1.83398 13.2129 2.21484C13.8281 2.15625 14.4434 1.98047 14.9707 1.74609C14.5605 2.36133 14.0332 2.88867 13.4473 3.32812Z', vb: '0 0 15 13' },
                { href: 'https://www.linkedin.com/', d: 'M12.1875 0.8125C12.6855 0.8125 13.125 1.25195 13.125 1.7793V13C13.125 13.5273 12.6855 13.9375 12.1875 13.9375H0.908203C0.410156 13.9375 0 13.5273 0 13V1.7793C0 1.25195 0.410156 0.8125 0.908203 0.8125H12.1875ZM3.95508 12.0625V5.82227H2.02148V12.0625H3.95508ZM2.98828 4.94336C3.60352 4.94336 4.10156 4.44531 4.10156 3.83008C4.10156 3.21484 3.60352 2.6875 2.98828 2.6875C2.34375 2.6875 1.8457 3.21484 1.8457 3.83008C1.8457 4.44531 2.34375 4.94336 2.98828 4.94336ZM11.25 12.0625V8.63477C11.25 6.96484 10.8691 5.64648 8.90625 5.64648C7.96875 5.64648 7.32422 6.17383 7.06055 6.67188H7.03125V5.82227H5.18555V12.0625H7.11914V8.98633C7.11914 8.16602 7.26562 7.375 8.29102 7.375C9.28711 7.375 9.28711 8.3125 9.28711 9.01562V12.0625H11.25Z', vb: '0 0 14 14' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className={`${topBarSocialText} hover:opacity-75 common-trans`}>
                  <svg width="14" height="14" viewBox={s.vb} fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
            <Link href="/contact" className="w-[155px] h-full flex justify-center items-center bg-primary-500 hover:bg-primary-900 text-white common-trans text-sm font-semibold spline-sans space-x-2">
              <span>Get a quote</span>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M13.6875 7.71875C14.0938 7.34375 14.0938 6.6875 13.6875 6.3125L8.6875 1.3125C8.3125 0.90625 7.65625 0.90625 7.28125 1.3125C6.875 1.6875 6.875 2.34375 7.28125 2.71875L10.5625 6H1C0.4375 6 0 6.46875 0 7C0 7.5625 0.4375 8 1 8H10.5625L7.28125 11.3125C6.875 11.6875 6.875 12.3438 7.28125 12.7188C7.65625 13.125 8.3125 13.125 8.6875 12.7188L13.6875 7.71875Z" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={`navigation-wrapper w-full h-[90px] ${navBg} ${isSticky ? 'fixed top-0 left-0 shadow-lg animate-[slideDown_0.3s_ease-in-out]' : ''}`}>
        <div className="theme-container h-full mx-auto">
          <div className="w-full h-full flex justify-between items-center">
            <div className="h-full flex items-center space-x-[72px]">
              <Link href="/">
                <div className="logo-area w-[180px] h-[55px]">
                  <img src={mediaUrl('logo.svg')} alt="insucom" className="w-full h-full object-contain" style={logoStyle} />
                </div>
              </Link>
              {/* Desktop Nav */}
              <nav className={`nav-wrapper ${!isLight ? 'nav-wrapper-2' : ''} lg:block hidden h-full`}>
                <ul className="flex space-x-7 items-center h-full">
                  <li className="relative group h-full flex items-center">
                    <Link href="/" className={`${navText} flex items-center space-x-1 h-full`}><span>Home</span>{dropdownArrow}</Link>
                    <ul className="absolute left-0 top-[90px] w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[70px] transition-all duration-300 ease-in-out z-50 rounded-b-lg border-t-2 border-primary-500 text-gray-800 font-medium py-2">
                      <li><Link href="/" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Home One</Link></li>
                      <li><Link href="/home-2" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Home Two</Link></li>
                    </ul>
                  </li>
                  <li className="h-full flex items-center"><Link href="/about" className={`${navText} h-full flex items-center whitespace-nowrap`}><span>About Us</span></Link></li>
                  <li className="relative group h-full flex items-center">
                    <Link href="/services" className={`${navText} flex items-center space-x-1 h-full`}><span>Services</span>{dropdownArrow}</Link>
                    <ul className="absolute left-0 top-[90px] w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[70px] transition-all duration-300 ease-in-out z-50 rounded-b-lg border-t-2 border-primary-500 text-gray-800 font-medium py-2">
                      <li><Link href="/services" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Services</Link></li>
                      <li><Link href="/services/risk-assessment" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Service Details</Link></li>
                    </ul>
                  </li>
                  <li className="relative group h-full flex items-center">
                    <Link href="/projects" className={`${navText} flex items-center space-x-1 h-full`}><span>Projects</span>{dropdownArrow}</Link>
                    <ul className="absolute left-0 top-[90px] w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[70px] transition-all duration-300 ease-in-out z-50 rounded-b-lg border-t-2 border-primary-500 text-gray-800 font-medium py-2">
                      <li><Link href="/projects" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Projects</Link></li>
                      <li><Link href="/projects/coverage-pro" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Project Details</Link></li>
                    </ul>
                  </li>
                  <li className="relative group h-full flex items-center">
                    <Link href="/blog" className={`${navText} flex items-center space-x-1 h-full`}><span>Blogs</span>{dropdownArrow}</Link>
                    <ul className="absolute left-0 top-[90px] w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[70px] transition-all duration-300 ease-in-out z-50 rounded-b-lg border-t-2 border-primary-500 text-gray-800 font-medium py-2">
                      <li><Link href="/blog" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Blogs</Link></li>
                      <li><Link href="/blog" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Blog Details</Link></li>
                    </ul>
                  </li>
                  <li className="relative group h-full flex items-center">
                    <span className={`${navText} flex items-center space-x-1 cursor-pointer h-full`}><span>Pages</span>{dropdownArrow}</span>
                    <ul className="absolute left-0 top-[90px] w-[200px] bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[70px] transition-all duration-300 ease-in-out z-50 rounded-b-lg border-t-2 border-primary-500 text-gray-800 font-medium py-2">
                      <li><Link href="/faq" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">FAQ</Link></li>
                      <li><Link href="/contact" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Support</Link></li>
                      <li><Link href="/projects" className="block px-5 py-2.5 hover:bg-gray-50 hover:text-primary-500">Projects</Link></li>
                    </ul>
                  </li>
                  <li className="h-full flex items-center"><Link href="/contact" className={`${navText} h-full flex items-center`}><span>Contact</span></Link></li>
                  {isLoggedIn ? (
                    <>
                      <li className="h-full flex items-center ml-4">
                        <Link href="/account/policies" className="px-5 py-2 bg-[#004C3F] hover:bg-[#028835] text-white rounded-lg text-sm font-bold common-trans flex items-center shadow-sm shadow-black/10">
                          Portal
                        </Link>
                      </li>
                      <li className="h-full flex items-center ml-2">
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold common-trans flex items-center shadow-sm shadow-black/10"
                        >
                          Log out
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="h-full flex items-center ml-4">
                      <Link href="/login" className="px-5 py-2 bg-[#028835] hover:bg-[#004C3F] text-white rounded-lg text-sm font-bold common-trans flex items-center shadow-sm shadow-black/10">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>

              {/* Mobile Nav */}
              <nav className="nav-wrapper mobile-nav-wrapper block lg:hidden">
                <div className="mobile-drawer">
                  <div className="mobile-wid w-[310px] bg-white fixed top-0 h-full px-8 pt-10" style={{ zIndex: 99999 }}>
                    <div className="flex justify-center mb-10"><div className="logo-area w-[180px] h-[55px]"><img src={mediaUrl('logo.svg')} alt="insucom" className="w-full h-full object-contain" /></div></div>
                    <ul className="flex flex-col mb-10">
                      <li><Link href="/"><span>Home</span></Link></li>
                      {isLoggedIn ? (
                        <>
                          <li><Link href="/account/policies"><span className="font-bold text-[#028835]">Portal</span></Link></li>
                          <li>
                            <button onClick={handleLogout} className="text-left w-full py-1">
                              <span className="font-bold text-red-600">Log out</span>
                            </button>
                          </li>
                        </>
                      ) : (
                        <li><Link href="/login"><span className="font-bold text-[#028835]">Login / Portal</span></Link></li>
                      )}
                      <li><Link href="/about"><span>About Us</span></Link></li>
                      <li><Link href="/services"><span>Services</span></Link></li>
                      <li><Link href="/projects"><span>Projects</span></Link></li>
                      <li><Link href="/blog"><span>Blogs</span></Link></li>
                      <li><Link href="/faq"><span>FAQ</span></Link></li>
                      <li><Link href="/contact"><span>Contact</span></Link></li>
                    </ul>
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col">
                        <span className="spline-sans text-sm text-gray-900 font-medium">Requesting A Call:</span>
                        <span className="text-base font-bold text-gray-900">(629) 555-0129</span>
                      </div>
                    </div>
                  </div>
                  <div id="drawer-away" className="drawer-away w-full h-full fixed bg-black bg-opacity-80 z-30 left-0 top-0"></div>
                </div>
              </nav>
            </div>

            <div className="h-full items-center xl:flex hidden">
              {/* Phone Call Box from Template */}
              <div className="flex items-center space-x-2">
                <span>
                  <svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.8159 16.8074C53.1826 25.1215 47.9291 49.5303 46.7752 54.5301C46.6562 55.0456 46.172 55.3582 45.6532 55.2543C40.6218 54.2471 16.2152 48.9838 10.8484 40.6697C4.85702 31.3878 8.27544 18.5215 18.4837 11.9321C28.692 5.34276 41.8245 7.5255 47.8159 16.8074Z" fill="#FBF7ED" />
                    <path d="M28.125 23.7812L27.1867 24.127L27.1939 24.1466L27.2019 24.1659L28.125 23.7812ZM29.375 26.7812L28.4519 27.1659L28.4553 27.174L28.4588 27.1821L29.375 26.7812ZM29.0312 28.2188L28.4134 27.4324L28.4013 27.4419L28.3895 27.4518L29.0312 28.2188ZM27.5 29.5L26.8583 28.7331L26.2664 29.2283L26.5955 29.9264L27.5 29.5ZM32.5 34.5L32.0736 35.4045L32.7717 35.7336L33.2669 35.1417L32.5 34.5ZM33.7812 32.9688L34.5482 33.6105L34.5581 33.5987L34.5676 33.5866L33.7812 32.9688ZM35.2188 32.625L34.8179 33.5412L34.826 33.5447L34.8341 33.5481L35.2188 32.625ZM38.2188 33.875L37.8341 34.7981L37.8534 34.8061L37.873 34.8133L38.2188 33.875ZM38.9375 35.3438L39.9023 35.6069L39.9046 35.5982L38.9375 35.3438ZM38.1875 38.0938L39.1469 38.3759L39.1497 38.3664L39.1523 38.3569L38.1875 38.0938ZM23.9062 23.8125L23.6431 22.8477L23.6336 22.8503L23.6241 22.8531L23.9062 23.8125ZM26.6562 23.0625L26.4017 22.0954L26.3931 22.0977L26.6562 23.0625ZM27.2019 24.1659L28.4519 27.1659L30.2981 26.3966L29.0481 23.3966L27.2019 24.1659ZM28.4588 27.1821C28.5082 27.295 28.4672 27.3902 28.4134 27.4324L29.6491 29.0051C30.4703 28.3598 30.6793 27.2675 30.2912 26.3804L28.4588 27.1821ZM28.3895 27.4518L26.8583 28.7331L28.1417 30.2669L29.673 28.9857L28.3895 27.4518ZM26.5955 29.9264C27.7257 32.324 29.676 34.2743 32.0736 35.4045L32.9264 33.5955C30.949 32.6632 29.3368 31.051 28.4045 29.0736L26.5955 29.9264ZM33.2669 35.1417L34.5482 33.6105L33.0143 32.327L31.7331 33.8583L33.2669 35.1417ZM34.5676 33.5866C34.6098 33.5328 34.705 33.4918 34.8179 33.5412L35.6196 31.7088C34.7325 31.3207 33.6402 31.5297 32.9949 32.3509L34.5676 33.5866ZM34.8341 33.5481L37.8341 34.7981L38.6034 32.9519L35.6034 31.7019L34.8341 33.5481ZM37.873 34.8133C37.903 34.8244 37.9318 34.8461 37.9546 34.8945C37.9799 34.9485 37.9886 35.0202 37.9704 35.0893L39.9046 35.5982C40.173 34.5781 39.7085 33.3581 38.5645 32.9367L37.873 34.8133ZM37.9727 35.0806L37.2227 37.8306L39.1523 38.3569L39.9023 35.6069L37.9727 35.0806ZM37.2281 37.8116C37.2086 37.878 37.1725 37.9255 37.1342 37.9551C37.0977 37.9834 37.0539 38 37 38V40C38.0326 40 38.8731 39.3068 39.1469 38.3759L37.2281 37.8116ZM37 38C29.8023 38 24 32.1977 24 25H22C22 33.3023 28.6977 40 37 40V38ZM24 25C24 24.9461 24.0166 24.9023 24.0449 24.8658C24.0745 24.8275 24.122 24.7914 24.1884 24.7719L23.6241 22.8531C22.6932 23.1269 22 23.9674 22 25H24ZM24.1694 24.7773L26.9194 24.0273L26.3931 22.0977L23.6431 22.8477L24.1694 24.7773ZM26.9107 24.0296C26.9798 24.0114 27.0515 24.0201 27.1055 24.0454C27.1539 24.0682 27.1756 24.097 27.1867 24.127L29.0633 23.4355C28.6419 22.2915 27.4219 21.827 26.4018 22.0954L26.9107 24.0296Z" fill="#028835" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className={`spline-sans text-sm ${isLight ? 'text-gray-900' : 'text-white'} font-medium`}>Requesting A Call:</span>
                  <span className={`text-base font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>(629) 555-0129</span>
                </div>
              </div>

              {/* Search Icon Wrapper matches HTML border-l border-r */}
              <div className="search-bar-wrapper xl:block hidden w-[77px] h-[90px] relative ml-7">
                <button type="button" className="w-full h-full flex justify-center items-center border-primaryBorder border-l border-r">
                  <span className={`${isLight ? 'text-primary-900' : 'text-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </span>
                </button>
                <div className="search-form w-[400px] p-5 bg-white shadow-2xl absolute -left-[300px] top-full z-30 hidden group-hover:block">
                  {/* Placeholder hidden, would require JS toggle, keeping original layout presence */}
                  <form><div className="relative">
                    <input type="search" className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-primary-50 focus:outline-none text-black focus:ring-0" placeholder="Search..." />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-primary-500 hover:bg-primary-900 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                  </div></form>
                </div>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button type="button" id="drawer-btn" className="w-[77px] h-full flex lg:hidden xl:hidden justify-center items-center">
              <span className={navText}>
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28 11H0" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 21H0" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 1H0" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
    {/* Spacer to prevent content overlapping hidden by fixed header */}
    <div className="h-[90px] lg:h-[140px] w-full" />
    </>
  );
}

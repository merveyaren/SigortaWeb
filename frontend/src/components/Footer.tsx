import Link from 'next/link';
import { mediaUrl } from '@/lib/media';

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper w-full bg-primary-900 pt-[90px] overflow-hidden relative">
        <div className="theme-container mx-auto">
          <div className="relative z-10">
            <div className="w-full grid grid-cols-12 gap-10 lg:gap-0 pb-[60px]">
              {/* Logo & Social */}
              <div className="sm:col-span-4 col-span-12">
                <div className="footer-logo mb-[30px]">
                  <img src={mediaUrl('logo-white.svg')} alt="Insucom" />
                </div>
                <p className="text-base leading-7 text-white mb-10">
                  Lorem ipsum dolor sit amet consectetur. <br />Faucibus proin eu ullamcorper.
                </p>
                <div className="flex space-x-2.5 items-center">
                  {/* Facebook */}
                  <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <div className="w-[30px] h-[30px] rounded bg-primary-500 flex justify-center items-center hover:bg-white text-white hover:text-primary-900 common-trans">
                      <span><svg className="fill-current" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.71875 9L9.15625 6.125H6.375V4.25C6.375 3.4375 6.75 2.6875 8 2.6875H9.28125V0.21875C9.28125 0.21875 8.125 0 7.03125 0C4.75 0 3.25 1.40625 3.25 3.90625V6.125H0.6875V9H3.25V16H6.375V9H8.71875Z" /></svg></span>
                    </div>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                    <div className="w-[30px] h-[30px] rounded bg-primary-500 flex justify-center items-center hover:bg-white text-white hover:text-primary-900 common-trans">
                      <span><svg width="14" className="fill-current" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.125 15H0.21875V5.65625H3.125V15ZM1.65625 4.40625C0.75 4.40625 0 3.625 0 2.6875C0 1.40625 1.375 0.59375 2.5 1.25C3.03125 1.53125 3.34375 2.09375 3.34375 2.6875C3.34375 3.625 2.59375 4.40625 1.65625 4.40625ZM13.9688 15H11.0938V10.4688C11.0938 9.375 11.0625 8 9.5625 8C8.0625 8 7.84375 9.15625 7.84375 10.375V15H4.9375V5.65625H7.71875V6.9375H7.75C8.15625 6.21875 9.09375 5.4375 10.5 5.4375C13.4375 5.4375 14 7.375 14 9.875V15H13.9688Z" /></svg></span>
                    </div>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <div className="w-[30px] h-[30px] rounded bg-primary-500 flex justify-center items-center hover:bg-white text-white hover:text-primary-900 common-trans">
                      <span><svg width="15" className="fill-current" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3.40625C9.96875 3.40625 11.5938 5.03125 11.5938 7C11.5938 9 9.96875 10.5938 8 10.5938C6 10.5938 4.40625 9 4.40625 7C4.40625 5.03125 6 3.40625 8 3.40625ZM8 9.34375C9.28125 9.34375 10.3125 8.3125 10.3125 7C10.3125 5.71875 9.28125 4.6875 8 4.6875C6.6875 4.6875 5.65625 5.71875 5.65625 7C5.65625 8.3125 6.71875 9.34375 8 9.34375ZM12.5625 3.28125C12.5625 2.8125 12.1875 2.4375 11.7188 2.4375C11.25 2.4375 10.875 2.8125 10.875 3.28125C10.875 3.75 11.25 4.125 11.7188 4.125C12.1875 4.125 12.5625 3.75 12.5625 3.28125ZM14.9375 4.125C15 5.28125 15 8.75 14.9375 9.90625C14.875 11.0312 14.625 12 13.8125 12.8438C13 13.6562 12 13.9062 10.875 13.9688C9.71875 14.0312 6.25 14.0312 5.09375 13.9688C3.96875 13.9062 3 13.6562 2.15625 12.8438C1.34375 12 1.09375 11.0312 1.03125 9.90625C0.96875 8.75 0.96875 5.28125 1.03125 4.125C1.09375 3 1.34375 2 2.15625 1.1875C3 0.375 3.96875 0.125 5.09375 0.0625C6.25 0 9.71875 0 10.875 0.0625C12 0.125 13 0.375 13.8125 1.1875C14.625 2 14.875 3 14.9375 4.125ZM13.4375 11.125C13.8125 10.2188 13.7188 8.03125 13.7188 7C13.7188 6 13.8125 3.8125 13.4375 2.875C13.1875 2.28125 12.7188 1.78125 12.125 1.5625C11.1875 1.1875 9 1.28125 8 1.28125C6.96875 1.28125 4.78125 1.1875 3.875 1.5625C3.25 1.8125 2.78125 2.28125 2.53125 2.875C2.15625 3.8125 2.25 6 2.25 7C2.25 8.03125 2.15625 10.2188 2.53125 11.125C2.78125 11.75 3.25 12.2188 3.875 12.4688C4.78125 12.8438 6.96875 12.75 8 12.75C9 12.75 11.1875 12.8438 12.125 12.4688C12.7188 12.2188 13.2188 11.75 13.4375 11.125Z" /></svg></span>
                    </div>
                  </a>
                  {/* Twitter */}
                  <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                    <div className="w-[30px] h-[30px] rounded bg-primary-500 flex justify-center items-center hover:bg-white text-white hover:text-primary-900 common-trans">
                      <span><svg width="16" className="fill-current" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.3438 3.75C14.3438 3.90625 14.3438 4.03125 14.3438 4.1875C14.3438 8.53125 11.0625 13.5 5.03125 13.5C3.15625 13.5 1.4375 12.9688 0 12.0312C0.25 12.0625 0.5 12.0938 0.78125 12.0938C2.3125 12.0938 3.71875 11.5625 4.84375 10.6875C3.40625 10.6562 2.1875 9.71875 1.78125 8.40625C2 8.4375 2.1875 8.46875 2.40625 8.46875C2.6875 8.46875 3 8.40625 3.25 8.34375C1.75 8.03125 0.625 6.71875 0.625 5.125V5.09375C1.0625 5.34375 1.59375 5.46875 2.125 5.5C1.21875 4.90625 0.65625 3.90625 0.65625 2.78125C0.65625 2.15625 0.8125 1.59375 1.09375 1.125C2.71875 3.09375 5.15625 4.40625 7.875 4.5625C7.8125 4.3125 7.78125 4.0625 7.78125 3.8125C7.78125 2 9.25 0.53125 11.0625 0.53125C12 0.53125 12.8438 0.90625 13.4688 1.5625C14.1875 1.40625 14.9062 1.125 15.5312 0.75C15.2812 1.53125 14.7812 2.15625 14.0938 2.5625C14.75 2.5 15.4062 2.3125 15.9688 2.0625C15.5312 2.71875 14.9688 3.28125 14.3438 3.75Z" /></svg></span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Links */}
              <div className="sm:col-span-8 col-span-12">
                <div className="flex sm:flex-row flex-col justify-between flex-wrap xl:flex-nowrap gap-y-10 xl:gap-y-0">
                  {/* Quick Links */}
                  <div className="quick-links">
                    <div className="mb-[30px]">
                      <span className="text-lg text-white font-bold spline-sans leading-7 mb-2.5 block">Quick Links</span>
                      <div className="w-[52px] h-[2px] bg-primary-500"></div>
                    </div>
                    <div className="flex space-x-8">
                      <ul>
                        {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Service'], ['/projects', 'Portfolio'], ['/blog', 'Blogs']].map(([href, label]) => (
                          <li key={href} className="mb-2.5">
                            <Link href={href}><span className="text-white text-base leading-7 hover:underline common-trans capitalize">{label}</span></Link>
                          </li>
                        ))}
                      </ul>
                      <ul>
                        {[['/contact', 'Support'], ['/contact', 'Terms of Use'], ['/faq', 'Privacy Policy'], ['/contact', 'Help']].map(([href, label], i) => (
                          <li key={i} className="mb-2.5">
                            <Link href={href}><span className="text-white text-base leading-7 hover:underline common-trans capitalize">{label}</span></Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="service-links">
                    <div className="mb-[30px]">
                      <span className="text-lg text-white font-bold spline-sans leading-7 mb-2.5 block">Services</span>
                      <div className="w-[52px] h-[2px] bg-primary-500"></div>
                    </div>
                    <ul>
                      {['Risk Assessment', 'Coverage Review', 'Claims Management', 'Liability Protection'].map((s) => (
                        <li key={s} className="mb-2.5">
                          <Link href="/services"><span className="text-white text-base leading-7 hover:underline common-trans capitalize">{s}</span></Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="contact-links">
                    <div className="mb-[30px]">
                      <span className="text-lg text-white font-bold spline-sans leading-7 mb-2.5 block">Contact Us</span>
                      <div className="w-[52px] h-[2px] bg-primary-500"></div>
                    </div>
                    <ul>
                      <li className="mb-2.5">
                        <a href="tel:+8801234567890">
                          <div className="flex space-x-2.5 items-center">
                            <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.125 1.78125L6.375 4.78125C6.59375 5.28125 6.46875 5.875 6.03125 6.21875L4.5 7.5C5.53125 9.6875 7.3125 11.4688 9.5 12.5L10.7812 10.9688C11.125 10.5312 11.7188 10.4062 12.2188 10.625L15.2188 11.875C15.8125 12.0938 16.0938 12.75 15.9375 13.3438L15.1875 16.0938C15.0312 16.625 14.5625 17 14 17C6.25 17 0 10.75 0 3C0 2.4375 0.375 1.96875 0.90625 1.8125L3.65625 1.0625C4.25 0.90625 4.90625 1.1875 5.125 1.78125Z" fill="white" /></svg></span>
                            <span className="text-white text-base leading-7 hover:underline common-trans capitalize">+880 123 45 67 89</span>
                          </div>
                        </a>
                      </li>
                      <li className="mb-2.5">
                        <a href="mailto:info@insucom.com">
                          <div className="flex space-x-2.5 items-center">
                            <span><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0H14.5C15.3125 0 16 0.6875 16 1.5C16 2 15.75 2.4375 15.375 2.71875L8.59375 7.8125C8.21875 8.09375 7.75 8.09375 7.375 7.8125L0.59375 2.71875C0.21875 2.4375 0 2 0 1.5C0 0.6875 0.65625 0 1.5 0ZM0 3.5L6.78125 8.625C7.5 9.15625 8.46875 9.15625 9.1875 8.625L16 3.5V10C16 11.125 15.0938 12 14 12H2C0.875 12 0 11.125 0 10V3.5Z" fill="white" /></svg></span>
                            <span className="text-white text-base leading-7 hover:underline common-trans capitalize">info@insucom.com</span>
                          </div>
                        </a>
                      </li>
                      <li className="mb-2.5">
                        <div className="flex space-x-2.5 items-center">
                          <span><svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.71875 15.625C6.34375 16.0938 5.625 16.0938 5.25 15.625C3.65625 13.5938 0 8.75 0 6C0 2.6875 2.6875 0 6 0C9.3125 0 12 2.6875 12 6C12 8.75 8.34375 13.5938 6.71875 15.625ZM6 8C7.09375 8 8 7.125 8 6C8 4.90625 7.09375 4 6 4C4.875 4 4 4.90625 4 6C4 7.125 4.875 8 6 8Z" fill="white" /></svg></span>
                          <span className="text-white text-base leading-7 capitalize">1212, Las Vegas, The Veg <br />Street, USA</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full border-t border-[#E3E3E3] lg:py-[30px] py-3 flex items-center justify-between">
              <span className="lg:text-base text-sm text-white">© Insucom 2024 | All Rights Reserved</span>
              <ul className="sm:flex hidden space-x-[30px] items-center">
                <li><Link href="/faq"><span className="text-white lg:text-base text-sm leading-7 hover:underline common-trans capitalize">Terms &amp; Condition</span></Link></li>
                <li><Link href="/faq"><span className="text-white lg:text-base text-sm leading-7 hover:underline common-trans capitalize">Privacy Policy</span></Link></li>
                <li><Link href="/contact"><span className="text-white lg:text-base text-sm leading-7 hover:underline common-trans capitalize">Contact Us</span></Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Shape */}
        <div className="footer-shape absolute">
          <img src={mediaUrl('footer-shape.svg')} alt="" className="gear" />
        </div>
      </div>
    </footer>
  );
}

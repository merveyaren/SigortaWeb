'use client';
import Link from 'next/link';
import { mediaUrl } from '@/lib/media';

export default function FooterTwo() {
  return (
    <footer>
      <section className="footer-wrapper-two w-full bg-[#FBF7ED] relative">
        {/* Discover Area (CTA floating box) */}
        <div className="theme-container mx-auto relative">
          <div className="discover-area z-20 w-full sm:h-[253px] h-[300px] rounded-[10px] left-0 absolute -top-[125px] lg:px-[60px] p-5 sm:px-[42px] flex sm:flex-row flex-col space-y-14 sm:space-y-0 sm:justify-between sm:items-center bg-[#004C3F]">
            <div>
              <p className="text-base leading-7 text-white mb-1">
                For your car we will do everything
              </p>
              <h2 className="headline-default text-white">
                Let's get your insurance & <br className="sm:block hidden" />
                lead a secure life
              </h2>
            </div>
            <div>
              <a href="#">
                <div className="lg:px-10 hover:border-transparent inline lg:py-6 px-8 py-5 border border-white hover:bg-white common-trans rounded-lg text-lg font-semibold leading-4 spline-sans text-white hover:text-[#028835] cursor-pointer">
                  Discover More
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="theme-container mx-auto relative z-10">
          <div className="w-full pt-[210px]">
            {/* Contact Top Row */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-[30px] items-center lg:justify-between pb-[60px] mb-10 border-b border-[#E3E3E3]">
              {/* Logo */}
              <Link href="/" className="block">
                <img src={mediaUrl('logo.svg')} alt="Insucom" />
              </Link>
              
              {/* Address */}
              <div className="flex space-x-[17px] items-center">
                <div className="w-[60px] h-[60px] rounded-full flex justify-center items-center bg-white">
                  <span>
                    <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.5625 20.0312C4.53125 17.4922 0 11.4375 0 8C0 3.85938 3.32031 0.5 7.5 0.5C11.6406 0.5 15 3.85938 15 8C15 11.4375 10.4297 17.4922 8.39844 20.0312C7.92969 20.6172 7.03125 20.6172 6.5625 20.0312ZM7.5 10.5C8.86719 10.5 10 9.40625 10 8C10 6.63281 8.86719 5.5 7.5 5.5C6.09375 5.5 5 6.63281 5 8C5 9.40625 6.09375 10.5 7.5 10.5Z" fill="#028835" />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold spline-sans leading-[27px] mb-1.5 text-primary-900">
                    Our Address
                  </p>
                  <p className="text-base leading-[27px] text-primary-100">
                    Mirpur,USA
                  </p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex space-x-[17px] items-center">
                <div className="w-[60px] h-[60px] rounded-full flex justify-center items-center bg-white">
                  <span>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.9609 15.6172L19.0234 19.5625C18.9062 20.1484 18.4375 20.5391 17.8516 20.5391C8.00781 20.5 0 12.4922 0 2.64844C0 2.0625 0.351562 1.59375 0.9375 1.47656L4.88281 0.539062C5.42969 0.421875 6.01562 0.734375 6.25 1.24219L8.08594 5.5C8.28125 6.00781 8.16406 6.59375 7.73438 6.90625L5.625 8.625C6.95312 11.3203 9.14062 13.5078 11.875 14.8359L13.5938 12.7266C13.9062 12.3359 14.4922 12.1797 15 12.375L19.2578 14.2109C19.7656 14.4844 20.0781 15.0703 19.9609 15.6172Z" fill="#028835" />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold spline-sans leading-[27px] mb-1.5 text-primary-900">
                    Phone Number
                  </p>
                  <p className="text-base leading-[27px] text-primary-100">
                    +231 256 956
                  </p>
                </div>
              </div>
              
              {/* Socials */}
              <div className="flex lg:justify-end">
                <div className="flex space-x-2.5 items-center">
                  <a href="#" className="transform translate-y-0 hover:-translate-y-1 common-trans">
                    <div style={{ boxShadow: '0 4.8px 24.4px -6px rgba(19, 16, 34, 0.1), 0 4px 13px -2px rgba(19, 16, 34, 0.06)' }} className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                      <span>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.3438 3.75C14.3438 3.90625 14.3438 4.03125 14.3438 4.1875C14.3438 8.53125 11.0625 13.5 5.03125 13.5C3.15625 13.5 1.4375 12.9688 0 12.0312C0.25 12.0625 0.5 12.0938 0.78125 12.0938C2.3125 12.0938 3.71875 11.5625 4.84375 10.6875C3.40625 10.6562 2.1875 9.71875 1.78125 8.40625C2 8.4375 2.1875 8.46875 2.40625 8.46875C2.6875 8.46875 3 8.40625 3.25 8.34375C1.75 8.03125 0.625 6.71875 0.625 5.125V5.09375C1.0625 5.34375 1.59375 5.46875 2.125 5.5C1.21875 4.90625 0.65625 3.90625 0.65625 2.78125C0.65625 2.15625 0.8125 1.59375 1.09375 1.125C2.71875 3.09375 5.15625 4.40625 7.875 4.5625C7.8125 4.3125 7.78125 4.0625 7.78125 3.8125C7.78125 2 9.25 0.53125 11.0625 0.53125C12 0.53125 12.8438 0.90625 13.4688 1.5625C14.1875 1.40625 14.9062 1.125 15.5312 0.75C15.2812 1.53125 14.7812 2.15625 14.0938 2.5625C14.75 2.5 15.4062 2.3125 15.9688 2.0625C15.5312 2.71875 14.9688 3.28125 14.3438 3.75Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                  </a>
                  <a href="#" className="transform translate-y-0 hover:-translate-y-1 common-trans">
                    <div style={{ boxShadow: '0 4.8px 24.4px -6px rgba(19, 16, 34, 0.1), 0 4px 13px -2px rgba(19, 16, 34, 0.06)' }} className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                      <span>
                        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.71875 9L9.15625 6.125H6.375V4.25C6.375 3.4375 6.75 2.6875 8 2.6875H9.28125V0.21875C9.28125 0.21875 8.125 0 7.03125 0C4.75 0 3.25 1.40625 3.25 3.90625V6.125H0.6875V9H3.25V16H6.375V9H8.71875Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                  </a>
                  <a href="#" className="transform translate-y-0 hover:-translate-y-1 common-trans">
                    <div style={{ boxShadow: '0 4.8px 24.4px -6px rgba(19, 16, 34, 0.1), 0 4px 13px -2px rgba(19, 16, 34, 0.06)' }} className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                      <span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 3.40625C6 3.40625 4.40625 5.03125 4.40625 7C4.40625 9 6 10.5938 8 10.5938C9.96875 10.5938 11.5938 9 11.5938 7C11.5938 5.03125 9.96875 3.40625 8 3.40625ZM8 9.34375C6.71875 9.34375 5.65625 8.3125 5.65625 7C5.65625 5.71875 6.6875 4.6875 8 4.6875C9.28125 4.6875 10.3125 5.71875 10.3125 7C10.3125 8.3125 9.28125 9.34375 8 9.34375ZM12.5625 3.28125C12.5625 3.75 12.1875 4.125 11.7188 4.125C11.25 4.125 10.875 3.75 10.875 3.28125C10.875 2.8125 11.25 2.4375 11.7188 2.4375C12.1875 2.4375 12.5625 2.8125 12.5625 3.28125ZM14.9375 4.125C14.875 3 14.625 2 13.8125 1.1875C13 0.375 12 0.125 10.875 0.0625C9.71875 0 6.25 0 5.09375 0.0625C3.96875 0.125 3 0.375 2.15625 1.1875C1.34375 2 1.09375 3 1.03125 4.125C0.96875 5.28125 0.96875 8.75 1.03125 9.90625C1.09375 11.0312 1.34375 12 2.15625 12.8438C3 13.6562 3.96875 13.9062 5.09375 13.9688C6.25 14.0312 9.71875 14.0312 10.875 13.9688C12 13.9062 13 13.6562 13.8125 12.8438C14.625 12 14.875 11.0312 14.9375 9.90625C15 8.75 15 5.28125 14.9375 4.125ZM13.4375 11.125C13.2188 11.75 12.7188 12.2188 12.125 12.4688C11.1875 12.8438 9 12.75 8 12.75C6.96875 12.75 4.78125 12.8438 3.875 12.4688C3.25 12.2188 2.78125 11.75 2.53125 11.125C2.15625 10.2188 2.25 8.03125 2.25 7C2.25 6 2.15625 3.8125 2.53125 2.875C2.78125 2.28125 3.25 1.8125 3.875 1.5625C4.78125 1.1875 6.96875 1.28125 8 1.28125C9 1.28125 11.1875 1.1875 12.125 1.5625C12.7188 1.78125 13.1875 2.28125 13.4375 2.875C13.8125 3.8125 13.7188 6 13.7188 7C13.7188 8.03125 13.8125 10.2188 13.4375 11.125Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                  </a>
                  <a href="#" className="transform translate-y-0 hover:-translate-y-1 common-trans">
                    <div style={{ boxShadow: '0 4.8px 24.4px -6px rgba(19, 16, 34, 0.1), 0 4px 13px -2px rgba(19, 16, 34, 0.06)' }} className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                      <span>
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.375 0.21875C3.15625 0.21875 0 2.34375 0 5.8125C0 8 1.21875 9.25 1.96875 9.25C2.28125 9.25 2.46875 8.40625 2.46875 8.15625C2.46875 7.875 1.71875 7.25 1.71875 6.03125C1.71875 3.53125 3.625 1.75 6.09375 1.75C8.25 1.75 9.8125 2.96875 9.8125 5.1875C9.8125 6.84375 9.15625 9.9375 7 9.9375C6.21875 9.9375 5.53125 9.375 5.53125 8.59375C5.53125 7.40625 6.375 6.25 6.375 5.03125C6.375 2.96875 3.4375 3.34375 3.4375 5.84375C3.4375 6.375 3.5 6.9375 3.75 7.4375C3.3125 9.28125 2.4375 12.0625 2.4375 13.9688C2.4375 14.5625 2.5 15.125 2.5625 15.7188C2.65625 15.8438 2.625 15.8438 2.78125 15.7812C4.34375 13.625 4.3125 13.1875 5 10.375C5.40625 11.0938 6.375 11.5 7.1875 11.5C10.5 11.5 12 8.25 12 5.34375C12 2.25 9.3125 0.21875 6.375 0.21875Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Content Grid */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[30px] lg:gap-0 pb-[80px] border-b border-[#E3E3E3]">
              <div className="article">
                <p className="text-lg font-semibold text-primary-900 spline-sans mb-[30px]">
                  About Us
                </p>
                <p className="text-base text-primary-100 leading-[27px]">
                  Lorem Ipsum is simply dummy <br />
                  text of the prin and typesetting <br />
                  industry. Lorem Ipsum
                </p>
              </div>
              
              <div className="colum-1">
                <p className="text-lg font-semibold text-primary-900 spline-sans mb-[30px]">
                  Services
                </p>
                <ul className="flex flex-col space-y-2.5">
                  {['Business Credit industry', 'Finance industry', 'Software development'].map((item) => (
                    <li key={item}>
                      <Link href="/services" className="text-base text-primary-100 leading-[27px] hover:underline hover:text-gray-900 hover:font-medium transition-all duration-300">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="colum-2">
                <p className="text-lg font-semibold text-primary-900 spline-sans mb-[30px]">
                  Recent Work
                </p>
                <ul className="flex flex-col space-y-2.5">
                  {['Risk Assessment', 'Coverage Review', 'Claims Management', 'Liability Protection'].map((item) => (
                    <li key={item}>
                      <Link href="/projects" className="text-base text-primary-100 leading-[27px] hover:underline hover:text-gray-900 hover:font-medium flex space-x-2.5 items-center group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9766 6.37891L7.60156 10.7539C7.4375 10.918 7.21875 11 7 11C6.75391 11 6.53516 10.918 6.37109 10.7539C6.01562 10.4258 6.01562 9.85156 6.37109 9.52344L9.24219 6.625H0.875C0.382812 6.625 0 6.24219 0 5.75C0 5.28516 0.382812 4.875 0.875 4.875H9.24219L6.37109 2.00391C6.01562 1.67578 6.01562 1.10156 6.37109 0.773438C6.69922 0.417969 7.27344 0.417969 7.60156 0.773438L11.9766 5.14844C12.332 5.47656 12.332 6.05078 11.9766 6.37891Z" fill="#028835" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="colum-3">
                <p className="text-lg font-semibold text-primary-900 spline-sans mb-[30px]">
                  All Links
                </p>
                <ul className="flex flex-col space-y-2.5">
                  {['Credit industrys', 'Credit Consulting', 'Insure Pro'].map((item) => (
                    <li key={item}>
                      <Link href="/blog" className="text-base text-primary-100 leading-[27px] hover:underline hover:text-gray-900 hover:font-medium flex space-x-2.5 items-center group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9766 6.37891L7.60156 10.7539C7.4375 10.918 7.21875 11 7 11C6.75391 11 6.53516 10.918 6.37109 10.7539C6.01562 10.4258 6.01562 9.85156 6.37109 9.52344L9.24219 6.625H0.875C0.382812 6.625 0 6.24219 0 5.75C0 5.28516 0.382812 4.875 0.875 4.875H9.24219L6.37109 2.00391C6.01562 1.67578 6.01562 1.10156 6.37109 0.773438C6.69922 0.417969 7.27344 0.417969 7.60156 0.773438L11.9766 5.14844C12.332 5.47656 12.332 6.05078 11.9766 6.37891Z" fill="#028835" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Footer Bottom Bar */}
            <div className="w-full h-[90px] flex justify-between items-center">
              <p className="text-base leading-[27px] text-primary-900">
                © Insucom 2024 | All Rights Reserved
              </p>
              <ul className="lg:flex hidden space-x-[30px] items-center">
                <li>
                  <Link href="/faq" className="text-base leading-[27px] text-primary-900 hover:underline">
                    Terms & Condition
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-base leading-[27px] text-primary-900 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-base leading-[27px] text-primary-900 hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Background Shape */}
        <div className="absolute top-[250px] right-0 pointer-events-none">
          <img src={mediaUrl('footer-two-shape.png')} alt="" />
        </div>
      </section>
    </footer>
  );
}

'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import PageBanner from '@/components/PageBanner';
import { mediaUrl } from '@/lib/media';

const StarIcon = () => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9062 4.71875L16.375 5.375C16.75 5.4375 17.0625 5.6875 17.1875 6.0625C17.3125 6.40625 17.2188 6.8125 16.9375 7.0625L13.6875 10.2812L14.4688 14.8438C14.5312 15.2188 14.375 15.5938 14.0625 15.8125C13.75 16.0625 13.3438 16.0625 13 15.9062L9 13.75L4.96875 15.9062C4.65625 16.0625 4.21875 16.0625 3.9375 15.8125C3.625 15.5938 3.46875 15.2188 3.53125 14.8438L4.28125 10.2812L1.03125 7.0625C0.75 6.8125 0.65625 6.40625 0.78125 6.0625C0.90625 5.6875 1.21875 5.4375 1.59375 5.375L6.09375 4.71875L8.09375 0.5625C8.25 0.21875 8.59375 0 9 0C9.375 0 9.71875 0.21875 9.875 0.5625L11.9062 4.71875Z" fill="#FFBA08" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.3594 0.640625C17.8672 1.10938 17.8672 1.92969 17.3594 2.39844L7.35938 12.3984C6.89062 12.9062 6.07031 12.9062 5.60156 12.3984L0.601562 7.39844C0.09375 6.92969 0.09375 6.10938 0.601562 5.64062C1.07031 5.13281 1.89062 5.13281 2.35938 5.64062L6.5 9.74219L15.6016 0.640625C16.0703 0.132812 16.8906 0.132812 17.3594 0.640625Z" fill="#028835" />
  </svg>
);

const testimonials = [
  { img: mediaUrl('testimonial-4.png'), name: 'Jane Cooper', role: 'Human Resource' },
  { img: mediaUrl('testimonial-5.png'), name: 'Robert Fox', role: 'CEO, Tech Corp' },
  { img: mediaUrl('testimonial-6.png'), name: 'Eleanor Pena', role: 'Marketing Head' },
];

const faqs = [
  'What is insurance and why is it important?',
  'What are the different types of insurance?',
  'How do I choose the right insurance?',
  'What is the claims process?',
];

export default function AboutPage() {
  useEffect(() => {
    // Ensure swiper exists globally
    if (typeof window !== 'undefined' && (window as any).Swiper) {
      new (window as any).Swiper(".test-two-swiper-wrapper", {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 2000,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 3,
          },
        },
      });
    }
  }, []);

  return (
    <>
      <PageBanner title="About" breadcrumb="About" />

      <div className="about-us-page-wrapper lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        {/* About Section */}
        <section className="about-area w-full lg:pb-[120px] pb-[60px]">
          <div className="theme-container mx-auto">
            <div className="w-full grid xl:grid-cols-2 grid-cols-1 lg:gap-[66px] gap-[30px] items-center relative">
              <div>
                <div className="thumbnail-area 2xl:w-[721px] w-full 2xl:absolute 2xl:-left-[150px] -top-8 relative">
                  <img src={mediaUrl('about-thumb.png')} alt="about" className="relative z-10 w-full h-full" />
                  <div className="about-shape gear-2 xl:w-[385px] xl:h-[385px] md:w-[500px] md:h-[500px] w-[250px] h-[250px]"></div>
                  <div className="w-[250px] h-[94px] rounded-[16px] bg-primary-500 flex justify-center items-center absolute sm:top-[432px] top-[200px] sm:right-[156px] right-5 z-10">
                    <div>
                      <div className="flex space-x-6 items-center">
                        <span>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="white" />
                            <path d="M20 10C15 10 11 14 11 19C11 24 15 28 20 28C25 28 29 24 29 19C29 14 25 10 20 10Z" fill="#028835" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-white text-xl font-bold leading-[26px]">5000+</p>
                          <p className="text-base leading-5 text-white">Satisfied Client</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-article-area">
                <h2 className="headline-default text-primary-900 mb-10">Insurance that fits your <br className="lg:block hidden" />lifestyle</h2>
                <div className="xl:w-full max-w-4xl sm:p-[30px] p-5 border border-primaryBorder rounded-[10px] flex flex-col space-y-5 mb-5">
                  {[{ label: 'Fast Response Insurance', pct: '95%', w: '95%' }, { label: 'Awesome Auto Coverage', pct: '90%', w: '90%' }].map((item) => (
                    <div key={item.label} className="item sm:flex sm:space-x-5 sm:items-center">
                      <div className="w-[60px] h-[60px] bg-primary-50 sm:flex hidden justify-center items-center rounded">
                        <span><CheckIcon /></span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-lg text-gray-900 font-bold spline-sans">{item.label}</span>
                          <span className="text-lg text-gray-900 font-bold spline-sans">{item.pct}</span>
                        </div>
                        <div className="w-full relative overflow-hidden h-[5px] rounded-[10px] bg-gray-100">
                          <div style={{ width: item.w }} className="absolute left-0 top-0 bg-primary-500 h-full rounded-[10px]"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="xl:w-full max-w-4xl text-base text-primary-100 mb-14">
                  Lorem ipsum dolor sit amet consectetur. Gravida vulputate vel necsit nunc Hendrerit sagittis donec eleifend ipsum quam. A lectus sit enim euismod urna.
                </p>
                <div>
                  <Link href="/services/risk-assessment">
                    <div className="px-[42px] py-[23px] bg-primary-500 hover:bg-primary-900 common-trans rounded-lg inline">
                      <span className="text-lg text-white">Read More</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Fact Counters */}
        <section className="fun-fact-area-two relative">
          <div className="w-full lg:py-[150px] py-[60px] sm:h-[748px] h-full">
            <div className="theme-container mx-auto relative">
              <div className="grid sm:grid-cols-4 grid-cols-1 sm:gap-[30px] gap-[60px]">
                {[{ end: 200, suffix: '+', icon: 'counter-2.png', label: 'Team Member' }, { end: 20, suffix: '+', icon: 'counter-3.png', label: 'Years Experience' }, { end: 10, suffix: 'k+', icon: 'counter-4.png', label: 'Happy Clients' }, { end: 900, suffix: '+', icon: 'counter-1.png', label: 'Projects Done' }].map((item) => (
                  <div key={item.label} className="counter-item bg-white rounded flex justify-center items-center h-[150px] relative">
                    <div>
                      <h2 className="font-bold spline-sans lg:text-[44px] lg:leading-[55px] text-2xl text-primary-900 text-center mb-1.5">
                        <span className="purecounter" data-purecounter-duration="1" data-purecounter-end={item.end}></span>{item.suffix}
                      </h2>
                      <p className="text-base text-primary-100">{item.label}</p>
                    </div>
                    <div style={{ left: 'calc(50% - 32px)', bottom: 'calc(100% - 32px)' }} className="w-[64px] h-[64px] rounded-full bg-primary-500 flex justify-center items-center absolute">
                      <img src={mediaUrl(item.icon)} alt="ico" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section-main-wrapper w-full lg:-mt-[327px] sm:-mt-[466px] my-[60px] relative z-10">
          <div className="theme-container mx-auto">
            <div data-aos="fade-up" data-aos-duration="1000" className="faq-two xl:w-full w-full bg-white sm:p-[60px] p-5 rounded-[10px] flex xl:flex-row flex-col xl:space-x-[75px] space-y-[75px] xl:space-y-0 xl:items-center">
              <div className="sm:w-[525px] w-full xl:h-[741px] h-[500px] relative rounded-[10px] overflow-hidden">
                <img src={mediaUrl('fun-fact-thum.png')} alt="thumb" className="w-full h-full object-cover" />
                <div className="w-[268px] h-[87px] rounded-full p-3 bg-white absolute right-5 bottom-5" style={{ boxShadow: '0px 4.8px 24.4px -6px rgba(19,16,34,0.1), 0px 4px 13px -2px rgba(19,16,34,0.06)' }}>
                  <div className="flex space-x-[15px] items-center">
                    <div className="w-[63px] h-[63px] rounded-full bg-secondary flex justify-center items-center">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.4049 19.0345C33.6025 27.8649 25.8057 35.6541 16.9828 35.4717C8.388 35.5173 0.993959 28.5033 0.560759 19.9161C-0.123241 10.7588 7.8028 2.39958 16.9752 2.59718C17.188 2.59718 17.3552 2.77198 17.3552 2.97718V18.6545H33.0325C33.2377 18.6545 33.4049 18.8217 33.4049 19.0345Z" fill="#028835" />
                        <path d="M35.4816 16.9646C35.4816 17.1698 35.3144 17.337 35.1016 17.337H19.0443C18.8391 17.337 18.6719 17.1698 18.6719 16.9646V0.907344C18.6719 0.694544 18.8391 0.527344 19.0443 0.527344C28.1103 0.527344 35.4816 7.89858 35.4816 16.9646Z" fill="#004C3F" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-base font-bold text-gray-700 block">Daily Activity</span>
                      <span className="text-base text-gray-700 block">Lorem ipsum dolor</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-primary-500 font-bold sm:leading-8 spline-sans sm:text-xl text-md uppercase mb-2">Ask Anything</p>
                <h2 className="headline-default text-primary-900 mb-[60px]">Insurance that goes the <br className="sm:block hidden" />extra mile</h2>
                <div className="xl:w-[570px] w-full flex flex-col space-y-5">
                  {faqs.map((q, i) => (
                    <div key={i} className="faq-item active sm:px-[30px] sm:py-5 p-3 w-full overflow-hidden rounded bg-secondary">
                      <button type="button" className="faq-btn flex justify-between items-center w-full common-trans relative sm:text-center text-start">
                        <span className="sm:text-lg text-sm spline-sans font-semibold">{q}</span>
                        <span className="flex justify-center items-center sm:w-[47px] sm:h-[47px] w-8 h-8 bg-primary-500 text-white rounded absolute -right-3 sm:-right-6 sm:-top-3.5 -top-3">
                          <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                            <path d="M5.28125 15.6875L1.28125 11.6875C0.875 11.3125 0.875 10.6562 1.28125 10.2812C1.65625 9.875 2.3125 9.875 2.6875 10.2812L5 12.5625L5 1C5 0.4375 5.4375 0 6 0C6.59375 0 7 0.4375 7 1L7 12.5625L9.28125 10.2812C9.65625 9.875 10.3125 9.875 10.6875 10.2812C11.0937 10.6562 11.0937 11.3125 10.6875 11.6875L6.6875 15.6875C6.3125 16.0938 5.65625 16.0938 5.28125 15.6875Z" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-body w-full bg-secondary">
                        <p className="sm:text-base text-sm sm:leading-7 text-primary-100">Lorem ipsum dolor sit amet consectetur. Aliquam ullamcorper id pretium diam ame lacus. Et lectus sem vitae feugiat arcu velit massa.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonial-section-two w-full lg:py-[120px] py-[60px]">
          <div className="theme-container mx-auto">
            <div className="w-full relative">
              <h2 className="headline-default text-primary-900 mb-[60px] text-center">What our awesome <br />customers say</h2>
              <div className="test-two-swiper-wrapper w-full overflow-hidden">
                <div className="swiper-wrapper">
                  {testimonials.map((t, i) => (
                    <div key={i} className="swiper-slide">
                      <div className="testimonial-item sm:p-10 p-5 border border-primaryBorder rounded">
                        <p className="quote text-base leading-7 text-center mb-[30px]">
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text.
                        </p>
                        <div className="flex justify-center mb-5">
                          <div className="flex space-x-2 items-center">
                            {[...Array(5)].map((_, s) => <span key={s}><StarIcon /></span>)}
                          </div>
                        </div>
                        <div className="flex justify-center mb-5">
                          <img src={t.img} alt={t.name} />
                        </div>
                        <h2 className="quote-user text-lg leading-7 font-bold spline-sans text-center mb-1.5">{t.name}</h2>
                        <p className="quote-user-desig text-base text-center">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
import Link from 'next/link';
import { apiService } from '@/lib/api';
import { mediaUrl } from '@/lib/media';
import { ServiceListItem } from '@/types';

// Servisleri çeken fonksiyon
async function getServices(): Promise<ServiceListItem[]> {
  try {
    const res = await apiService.getServices();
    return (res.data as ServiceListItem[]).slice(0, 4);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  // 1. TÜM VERİ ÇEKME İŞLEMLERİNİ EN BAŞTA YAPIYORUZ
  const services = await getServices();

  let apiBlogs = [];
  try {
    const res = await apiService.getBlogs();
    apiBlogs = (res.data as any[]).slice(0, 3);
  } catch (err) {
    console.error("Failed to fetch blogs for homepage", err);
  }

  const blogs = apiBlogs.length > 0 ? apiBlogs : [
    { title: 'Never worry about accidents anymore', date: 'October 19, 2022', img: mediaUrl('blog-1.png'), slug: 'giving-power' },
    { title: 'The insurance company that you can trust', date: 'October 19, 2022', img: mediaUrl('blog-2.png'), slug: 'name-you-trust' },
    { title: 'The next big thing in the insurance industry', date: 'October 19, 2022', img: mediaUrl('blog-3.png'), slug: 'pathway-secure' }
  ];

  // 2. TEK BİR RETURN BLOKU İLE TÜM SAYFAYI DÖNÜYORUZ
  return (
    <>
      {/* Hero */}
      <section className="hero-area w-full relative">
        <div className="h-full flex xl:justify-center justify-start items-center relative z-20">
          <div className="theme-container xl:mx-auto">
            <h1 data-aos="fade-up" className="text-primary-900 xl:text-[96px] sm:text-6xl text-5xl font-bold xl:leading-[95px] mb-5">
              Secure your <br />future with us
            </h1>
            <p className="text-primary-900 text-base leading-7 mb-9">
              lorem ipsum dolor sit amet consectetur. Facilisi cursus vulputate<br />vestibulum etiam rhoncus
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-10 space-y-10 sm:space-y-0 sm:items-center">
              <Link href="/projects" className="px-[46px] py-[20px] bg-primary-500 rounded-lg text-white text-lg spline-sans leading-none hover:bg-primary-900 common-trans inline-block text-center">
                Get Started
              </Link>
              <button data-aos="fade-left" id="video-popup-btn" type="button" className="sm:flex hidden space-x-5 items-center">
                <div className="w-[55px] h-[55px] relative">
                  <div className="w-full h-full rounded-full flex justify-center items-center bg-primary-500 relative z-10">
                    <span>
                      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2812 6.71875C11.7188 7 12 7.5 12 8C12 8.53125 11.7188 9.03125 11.2812 9.28125L2.28125 14.7812C1.8125 15.0625 1.21875 15.0938 0.75 14.8125C0.28125 14.5625 0 14.0625 0 13.5V2.5C0 1.96875 0.28125 1.46875 0.75 1.21875C1.21875 0.9375 1.8125 0.9375 2.28125 1.25L11.2812 6.71875Z" fill="white" />
                      </svg>
                    </span>
                  </div>
                  <div className="button-outer-circle has-scale-animation"></div>
                  <div className="button-outer-circle has-scale-animation has-delay-short"></div>
                </div>
                <span className="font-semibold text-lg spline-sans text-primary-900">Watch Video</span>
              </button>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="1000" className="hero-image-1 w-full h-full absolute left-0 top-0 z-10 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${mediaUrl('hero-img.png')})` }}></div>
      </section>

      {/* About */}
      <section className="about-area w-full lg:py-[120px] py-[60px]">
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
                          <path d="M26.332 25.7943C25.544 25.5133 24.258 25.4943 23.688 25.2813C23.2492 25.1672 22.8347 24.974 22.465 24.7113C22.3097 24.0566 22.2424 23.3839 22.265 22.7113C22.558 22.4302 22.7955 22.0964 22.965 21.7273C23.1351 21.0941 23.2479 20.4468 23.302 19.7933C23.302 19.7933 23.766 19.9933 23.949 19.0623C24.104 18.2623 24.399 17.8393 24.322 17.2483C24.245 16.6573 23.914 16.7983 23.914 16.7983C24.273 15.9711 24.4135 15.0655 24.322 14.1683C24.245 12.9213 23.4 11.9 22.1 11.2C20.8 10.5 19.2 10.5 17.9 11.2C16.6 11.9 15.755 12.9213 15.677 14.1683C15.5865 15.0647 15.7241 15.9694 16.077 16.7983C16.077 16.7983 15.747 16.6573 15.669 17.2483C15.591 17.8393 15.881 18.2683 16.04 19.0683C16.223 20.0033 16.687 19.7993 16.687 19.7993C16.7418 20.4527 16.8545 21.1 17.024 21.7333C17.1936 22.1024 17.4311 22.4362 17.724 22.7173C17.7467 23.3899 17.6794 24.0626 17.524 24.7173C17.1554 24.9803 16.7405 25.1713 16.301 25.2803C15.739 25.4983 14.452 25.5263 13.657 25.8073C12.6985 26.1666 11.8745 26.8135 11.298 27.6594C10.7216 28.5053 10.4208 29.5088 10.437 30.5323H30.0C29.9807 29.5085 29.682 28.5038 29.1066 27.6567C28.5312 26.8097 27.7073 26.1618 26.748 25.8023L26.332 25.7943Z" fill="#028835" />
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
              <h2 className="headline-default text-primary-900 mb-10">
                Insurance that fits your <br className="lg:block hidden" />lifestyle
              </h2>
              <div className="xl:w-full max-w-4xl sm:p-[30px] p-5 border border-primaryBorder rounded-[10px] flex flex-col space-y-5 mb-5">
                <div className="item sm:flex sm:space-x-5 sm:items-center">
                  <div className="w-[60px] h-[60px] bg-primary-50 sm:flex hidden justify-center items-center rounded">
                    <span><svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3594 0.640625C17.8672 1.10938 17.8672 1.92969 17.3594 2.39844L7.35938 12.3984C6.89062 12.9062 6.07031 12.9062 5.60156 12.3984L0.601562 7.39844C0.09375 6.92969 0.09375 6.10938 0.601562 5.64062C1.07031 5.13281 1.89062 5.13281 2.35938 5.64062L6.5 9.74219L15.6016 0.640625C16.0703 0.132812 16.8906 0.132812 17.3594 0.640625Z" fill="#028835" /></svg></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-lg text-gray-900 font-bold spline-sans">Fast Response Insurance</span>
                      <span className="text-lg text-gray-900 font-bold spline-sans">95%</span>
                    </div>
                    <div className="w-full relative overflow-hidden h-[5px] rounded-[10px] bg-gray-100">
                      <div style={{ width: '95%' }} className="absolute left-0 top-0 bg-primary-500 h-full rounded-[10px]"></div>
                    </div>
                  </div>
                </div>
                <div className="item sm:flex sm:space-x-5 sm:items-center">
                  <div className="w-[60px] h-[60px] bg-primary-50 sm:flex hidden justify-center items-center rounded">
                    <span><svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3594 0.640625C17.8672 1.10938 17.8672 1.92969 17.3594 2.39844L7.35938 12.3984C6.89062 12.9062 6.07031 12.9062 5.60156 12.3984L0.601562 7.39844C0.09375 6.92969 0.09375 6.10938 0.601562 5.64062C1.07031 5.13281 1.89062 5.13281 2.35938 5.64062L6.5 9.74219L15.6016 0.640625C16.0703 0.132812 16.8906 0.132812 17.3594 0.640625Z" fill="#028835" /></svg></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-lg text-gray-900 font-bold spline-sans">Awesome Auto Coverage</span>
                      <span className="text-lg text-gray-900 font-bold spline-sans">90%</span>
                    </div>
                    <div className="w-full relative overflow-hidden h-[5px] rounded-[10px] bg-gray-100">
                      <div style={{ width: '90%' }} className="absolute left-0 top-0 bg-primary-500 h-full rounded-[10px]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="xl:w-full max-w-4xl text-base text-primary-100 mb-14">
                Lorem ipsum dolor sit amet consectetur. Gravida vulputate vel necsit nunc Hendrerit sagittis donec eleifend ipsum quam. A lectus sit enim euismod urna. Mattis aliquam ac eget sit pharetra diam.
              </p>
              <div>
                <Link href="/services" className="px-[42px] py-[23px] bg-primary-500 hover:bg-primary-900 common-trans rounded-lg inline-block text-white text-lg">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="service-area w-full lg:py-[120px] py-[60px]">
        <div className="theme-container mx-auto h-full items-center">
          <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-[60px] xl:gap-0 items-center">
            <div className="grid-item">
              <h2 className="headline-default text-primary-900 mb-5">Safeguarding your <br />future today</h2>
              <p className="text-base text-primary-100 mb-14">
                Lorem ipsum dolor sit amet consectetur. Sapien in adipiscing duis orci. Rhoncus nunc consectetur nibh auctor porta tincidunt ac porttitor amet.
              </p>
              <div>
                <Link href="/services" className="px-[42px] py-[23px] bg-primary-500 hover:bg-primary-900 common-trans rounded-lg inline-block text-white text-lg">
                  Read More
                </Link>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-[30px] gap-5">
                {services.length > 0 ? services.map((s, i) => (
                  <div key={s.id} data-aos="fade-up" data-aos-duration="1000" className="service-item p-[30px] rounded-[10px] bg-white group">
                    <Link href={`/services/${s.slug}`}>
                      <div className="flex justify-center mb-5">
                        <div className="w-[60px] h-[60px] rounded flex justify-center items-center bg-primary-50">
                          {s.icon_url ? <img src={s.icon_url} alt={s.title} /> : <img src={mediaUrl(`service-${i + 1}.svg`)} alt={s.title} />}
                        </div>
                      </div>
                      <h2 className="text-lg leading-7 font-bold spline-sans text-center text-primary-900 mb-5 group-hover:underline">{s.title}</h2>
                      <p className="text-base leading-7 text-center text-primary-100">{s.short_description}</p>
                    </Link>
                  </div>
                )) : (
                  ['Rock Solid Insurance', 'Reliable Protection', 'Value Insurance', 'Flexible Medsurance'].map((title, i) => (
                    <div key={i} data-aos="fade-up" data-aos-duration="1000" className="service-item p-[30px] rounded-[10px] bg-white group">
                      <Link href="/services">
                        <div className="flex justify-center mb-5">
                          <div className="w-[60px] h-[60px] rounded flex justify-center items-center bg-primary-50">
                            <img src={mediaUrl(`service-${i + 1}.svg`)} alt={title} />
                          </div>
                        </div>
                        <h2 className="text-lg leading-7 font-bold spline-sans text-center text-primary-900 mb-5 group-hover:underline">{title}</h2>
                        <p className="text-base leading-7 text-center text-primary-100">Lorem ipsum dolor sit amet consectetur. Nibh viverra dolor diam accumsan consequat.</p>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Insurance Slider */}
      <section className="life-insu-area w-full lg:py-[120px] pt-[60px] pb-[100px] overflow-hidden">
        <div className="text-center">
          <h2 className="headline-default text-primary-900 lg:mb-[60px] mb-[30px]">Fill your life with <br />security and joy</h2>
          <div className="insu-swiper relative">
            <div className="swiper-wrapper">
              {[mediaUrl('insu-1.png'), mediaUrl('insu-2.png'), mediaUrl('insu-3.png'), mediaUrl('insu-1.png')].map((src, i) => (
                <div key={i} className="swiper-slide">
                  <div className="w-full lg:h-[550px] h-[300px] flex justify-center items-center group" style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    <a href="#">
                      <div className="px-[30px] py-[20px] bg-primary-500 rounded text-lg spline-sans font-semibold text-white opacity-0 group-hover:opacity-100 common-trans">Life Insurance</div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      {/* Fun Fact */}
      <section className="fun-fact-area lg:pt-[120px] xl:pb-0 lg:pb-[120px] py-[60px] xl:min-h-[1000px] overflow-hidden" style={{ backgroundImage: `url(${mediaUrl('fun-fact-bg.png')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="theme-container mx-auto relative">
          <div className="w-full flex flex-wrap lg:flex-nowrap gap-[30px] lg:gap-0 justify-between items-center xl:mb-[100px] lg:mb-[60px] mb-[30px]">
            {[{ img: 'project.svg', end: 30, label: 'Complete Projects' }, { img: 'client.svg', end: 24, label: 'Client Satisfaction' }, { img: 'members.svg', end: 12, label: 'Active Members' }, { img: 'award.svg', end: 5, label: 'Winning Award' }].map((item) => (
              <div key={item.label} className="item flex space-x-5 items-center">
                <div className="xl:w-[80px] xl:h-[80px] w-16 h-16 rounded-full bg-primary-500 flex justify-center items-center">
                  <img src={mediaUrl(item.img)} alt="" />
                </div>
                <div className="flex-1">
                  <p className="xl:text-[40px] font-bold text-white text-2xl xl:leading-[55px]">
                    <span className="purecounter" data-purecounter-duration="1" data-purecounter-end={item.end}></span>K+
                  </p>
                  <p className="xl:text-base text-sm text-white leading-7">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="faq-wrapper w-full xl:absolute xl:flex items-center">
            <div className="w-[740px] xl:block hidden rounded-[10px]">
              <div className="w-full h-[888px]">
                <img src={mediaUrl('fun-fact-thum.png')} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <div data-aos="fade-up" data-aos-duration="1000" className="faq-main-wrapper xl:w-[630px] sm:px-[60px] sm:py-[80px] px-3 py-10 bg-white rounded xl:absolute top-20 xl:right-10">
                <h2 className="headline-default text-primary-900 mb-[42px]">For a secured lifetime</h2>
                <div className="w-full flex flex-col space-y-5">
                  {[
                    'What are some unique insurance slogan examples?',
                    'How does the insurance slogan generator work?',
                    'How do I come up with insurance slogan ideas?',
                    'Is the insurance slogan generator free?',
                  ].map((q, i) => (
                    <div key={i} className={`faq-item${i === 0 ? ' active' : ''} w-full overflow-hidden rounded border border-primaryBorder`}>
                      <button type="button" className="faq-btn p-5 flex justify-between group hover:bg-primary-500 items-center w-full common-trans sm:text-center text-start">
                        <span className="sm:text-lg text-sm spline-sans font-semibold group-hover:text-white">{q}</span>
                        <span className="group-hover:text-white"><svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M7.6875 7.6875C7.3125 8.09375 6.65625 8.09375 6.28125 7.6875L1.28125 2.6875C0.875 2.3125 0.875 1.65625 1.28125 1.28125C1.65625 0.875 2.3125 0.875 2.6875 1.28125L7 5.5625L11.2812 1.28125C11.6562 0.875 12.3125 0.875 12.6875 1.28125C13.0938 1.65625 13.0938 2.3125 12.6875 2.6875L7.6875 7.6875Z" /></svg></span>
                      </button>
                      <div className="faq-body w-full bg-secondary">
                        <p className="sm:text-base text-sm leading-7 text-primary-100">Lorem ipsum dolor sit amet consectetur. Aliquam ullamcorper id pretium diam ame lacus. Et lectus sem vitae feugiat arcu velit massa.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works / Process Section */}
      <section className="process-area w-full lg:py-[120px] py-[60px] relative z-10" style={{ backgroundImage: `url(${mediaUrl('progress-bg.svg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="theme-container mx-auto">
          <div className="text-center mb-[60px]">
            <h2 className="headline-default text-primary-900">
              Confident financially <br />while you age
            </h2>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[30px]">
            {[
              { num: '01', icon: mediaUrl('progress-1.svg'), title: 'Planning & Analysis', desc: 'This stage involves identifying the needs and requirements of the client.' },
              { num: '02', icon: mediaUrl('progress-2.svg'), title: 'Protector Insurance', desc: 'This stage involves identifying the needs and requirements of the client.' },
              { num: '03', icon: mediaUrl('progress-3.svg'), title: 'Trust Insured', desc: 'This stage involves identifying the needs and requirements of the client.' },
              { num: '04', icon: mediaUrl('progress-4.svg'), title: 'Secure Coverage', desc: 'This stage involves identifying the needs and requirements of the client.' },
            ].map((step, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={(i + 1) * 100} className="process-item relative p-[30px] rounded-[10px] bg-white border border-primaryBorder hover:shadow-xl common-trans group">
                <p className="xl:text-[80px] text-[60px] font-bold text-primary-50 leading-none absolute top-5 right-5 select-none">{step.num}</p>
                <div className="w-[60px] h-[60px] rounded-full bg-primary-50 flex justify-center items-center mb-5">
                  <img src={step.icon} alt={step.title} className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold spline-sans text-primary-900 mb-3">{step.title}</h3>
                <p className="text-base text-primary-100 leading-7">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-area w-full lg:py-[120px] py-[60px]">
        <div className="theme-container mx-auto relative">
          <div className="flex justify-between items-start mb-[60px]">
            <h2 className="headline-default text-primary-900">The road to financial <br />freedom</h2>
            <div className="lg:flex hidden space-x-5 items-center">
              <button type="button" className="testimonial-prev w-[67px] h-[67px] flex justify-center items-center bg-primary-50 text-primary-500 rounded-full hover:text-white hover:bg-primary-500 common-trans">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M1.29883 5.89453L6.61133 0.582031C7.00977 0.150391 7.70703 0.150391 8.10547 0.582031C8.53711 0.980469 8.53711 1.67773 8.10547 2.07617L4.61914 5.5625H14.8125C15.377 5.5625 15.875 6.06055 15.875 6.625C15.875 7.22266 15.377 7.6875 14.8125 7.6875H4.61914L8.10547 11.207C8.53711 11.6055 8.53711 12.3027 8.10547 12.7012C7.70703 13.1328 7.00977 13.1328 6.61133 12.7012L1.29883 7.38867C0.867188 6.99023 0.867188 6.29297 1.29883 5.89453Z" /></svg>
              </button>
              <button type="button" className="testimonial-next w-[67px] h-[67px] flex justify-center items-center bg-primary-50 text-primary-500 rounded-full hover:text-white hover:bg-primary-500 common-trans">
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M14.543 7.38867C14.9746 6.99023 14.9746 6.29297 14.543 5.89453L9.23047 0.582031C8.83203 0.150391 8.13477 0.150391 7.73633 0.582031C7.30469 0.980469 7.30469 1.67773 7.73633 2.07617L11.2227 5.5625H1.0625C0.464844 5.5625 0 6.06055 0 6.625C0 7.22266 0.464844 7.6875 1.0625 7.6875H11.2227L7.73633 11.207C7.30469 11.6055 7.30469 12.3027 7.73633 12.7012C8.13477 13.1328 8.83203 13.1328 9.23047 12.7012L14.543 7.38867Z" /></svg>
              </button>
            </div>
          </div>
          <div className="testimonial-swiper">
            <div className="swiper-wrapper">
              {[
                { name: 'Esther Howard', role: 'Ux Architect', img: mediaUrl('testimonial-1.png') },
                { name: 'Ralph Edwards', role: 'Ux Architect', img: mediaUrl('testimonial-2.png') },
                { name: 'Annette Black', role: 'Ux Architect', img: mediaUrl('testimonial-3.png') },
                { name: 'Esther Howard', role: 'Ux Architect', img: mediaUrl('testimonial-1.png') },
              ].map((t, i) => (
                <div key={i} className="swiper-slide">
                  <div className="item sm:p-10 p-5 border border-primaryBorder rounded">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex space-x-5 items-center">
                        <div className="w-[80px] h-[80px] rounded-full border border-primary-500">
                          <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2.5">
                            {[...Array(5)].map((_, s) => (
                              <span key={s}>
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10.418 4.87891L14.3281 5.45312C14.6562 5.50781 14.9297 5.72656 15.0391 6.05469C15.1484 6.35547 15.0664 6.71094 14.8203 6.92969L11.9766 9.74609L12.6602 13.7383C12.7148 14.0664 12.5781 14.3945 12.3047 14.5859C12.0312 14.8047 11.6758 14.8047 11.375 14.668L7.875 12.7812L4.34766 14.668C4.07422 14.8047 3.69141 14.8047 3.44531 14.5859C3.17188 14.3945 3.03516 14.0664 3.08984 13.7383L3.74609 9.74609L0.902344 6.92969C0.65625 6.71094 0.574219 6.35547 0.683594 6.05469C0.792969 5.72656 1.06641 5.50781 1.39453 5.45312L5.33203 4.87891L7.08203 1.24219C7.21875 0.941406 7.51953 0.75 7.875 0.75C8.20312 0.75 8.50391 0.941406 8.64062 1.24219L10.418 4.87891Z" fill="#FFDF00" />
                                </svg>
                              </span>
                            ))}
                          </div>
                          <h2 className="text-gray-700 text-lg spline-sans font-semibold">{t.name}</h2>
                          <span className="text-base leading-7 text-primary-100">{t.role}</span>
                        </div>
                      </div>
                      <span className="sm:inline-block hidden">
                        <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M35 16.125C35 21.3594 30.7812 25.5 25.625 25.5H25C23.5938 25.5 22.5 24.4062 22.5 23C22.5 21.6719 23.5938 20.5 25 20.5H25.625C27.9688 20.5 30 18.5469 30 16.125V15.5H25C22.1875 15.5 20 13.3125 20 10.5V5.5C20 2.76562 22.1875 0.5 25 0.5H30C32.7344 0.5 35 2.76562 35 5.5V8V10.5V16.125ZM15 16.125C15 21.3594 10.7812 25.5 5.625 25.5H5C3.59375 25.5 2.5 24.4062 2.5 23C2.5 21.6719 3.59375 20.5 5 20.5H5.625C7.96875 20.5 10 18.5469 10 16.125V15.5H5C2.1875 15.5 0 13.3125 0 10.5V5.5C0 2.76562 2.1875 0.5 5 0.5H10C12.7344 0.5 15 2.76562 15 5.5V8V10.5V16.125Z" fill="#028835" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-primary-100 text-base leading-7">
                      Lorem ipsum dolor sit amet consectetur. In non sodales elementum et te pus ac platea velit semper. Non morbi aliqu alesuada.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section xl:py-[120px] py-[60px]">
        <div className="theme-container mx-auto px-5">
          <div className="flex flex-wrap justify-between items-end mb-[60px]">
            <div>
              <p className="text-primary-500 font-bold text-xl uppercase mb-2">Our Blog</p>
              <h2 className="headline-default text-primary-900">Latest news & articles</h2>
            </div>
            <Link href="/blog" className="px-[30px] py-[14px] bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-900 transition-all lg:block hidden">
              View All Post
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
            {blogs.map((blog: any, i: number) => (
              <div key={i} data-aos="fade-up" data-aos-delay={(i + 1) * 100} className="blog-item group w-full overflow-hidden rounded bg-secondary hover:bg-white hover:shadow-2xl transition-all duration-300 ease-in-out border border-transparent hover:border-primaryBorder">
                <div className="w-full h-[286px] relative overflow-hidden">
                  <img src={blog.cover_image_url || blog.img} alt="blog" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="px-5 py-2.5 rounded bg-primary-500 absolute left-10 bottom-10 z-10 shadow-lg">
                    <div className="flex space-x-2.5 items-center text-white">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M7 8C4.78125 8 3 6.21875 3 4C3 1.8125 4.78125 0 7 0C9.1875 0 11 1.8125 11 4C11 6.21875 9.1875 8 7 8ZM5.5625 9.5H8.40625C11.5 9.5 14 12 14 15.0938C14 15.5938 13.5625 16 13.0625 16H0.90625C0.40625 16 0 15.5938 0 15.0938C0 12 2.46875 9.5 5.5625 9.5Z" /></svg>
                      <span className="text-lg font-semibold spline-sans">Admin</span>
                    </div>
                  </div>
                </div>
                <div className="xl:p-7 p-5">
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="xl:text-xl text-lg font-bold text-primary-900 mb-5 group-hover:text-primary-500 transition-colors leading-tight spline-sans">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-primary-100 mb-5 line-clamp-2 text-base leading-relaxed">
                    {blog.excerpt || 'Lorem ipsum dolor consectetur. Posue sem ultrices feugiat feugiat diam elementumm lacus lectus in lopren ipsum.'}
                  </p>
                  <div className="w-full h-[1px] bg-primaryBorder mb-5"></div>
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-2.5 text-primary-100">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75 2H9.25V0.75C9.25 0.34375 9.5625 0 10 0C10.4062 0 10.75 0.34375 10.75 0.75V2H12C13.0938 2 14 2.90625 14 4V14C14 15.125 13.0938 16 12 16H2C0.875 16 0 15.125 0 14V4C0 2.90625 0.875 2 2 2H3.25V0.75C3.25 0.34375 3.5625 0 4 0C4.40625 0 4.75 0.34375 4.75 0.75V2ZM1.5 7.75H4V6H1.5V7.75ZM1.5 9.25V11.25H4V9.25H1.5ZM5.5 9.25V11.25H8.5V9.25H5.5ZM10 9.25V11.25H12.5V9.25H10ZM12.5 6H10V7.75H12.5V6ZM12.5 12.75H10V14.5H12C12.25 14.5 12.5 14.2812 12.5 14V12.75ZM8.5 12.75H5.5V14.5H8.5V12.75ZM4 12.75H1.5V14C1.5 14.2812 1.71875 14.5 2 14.5H4V12.75ZM8.5 6H5.5V7.75H8.5V6Z" fill="#028835" /></svg>
                      <span className="text-base">{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : blog.date}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-primary-100">
                      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0C11.0625 0 14 2.46875 14 5.5C14 8.5625 11.0625 11 7.5 11C6.90625 11 6.34375 10.9375 5.78125 10.8125C4.84375 11.4062 3.46875 12 1.75 12C1.4375 12 1.15625 11.8438 1.0625 11.5312C0.9375 11.25 0.96875 10.9375 1.1875 10.6875C1.21875 10.6875 1.90625 9.9375 2.40625 8.9375C1.53125 8 1 6.8125 1 5.5C1 2.46875 3.90625 0 7.5 0ZM6.125 9.34375C6.59375 9.46875 7.03125 9.5 7.5 9.5C10.25 9.5 12.5 7.71875 12.5 5.5C12.5 3.3125 10.25 1.5 7.5 1.5C4.71875 1.5 2.5 3.3125 2.5 5.5C2.5 6.625 3.03125 7.4375 3.5 7.90625L4.25 8.6875L3.75 9.65625C3.625 9.84375 3.5 10.0625 3.375 10.2812C3.9375 10.125 4.46875 9.875 5 9.53125L5.53125 9.21875L6.125 9.34375ZM14.7812 4.03125C18.25 4.15625 21 6.5625 21 9.5C21 10.8125 20.4375 12 19.5625 12.9375C20.0625 13.9375 20.75 14.6875 20.7812 14.6875C21 14.9375 21.0312 15.25 20.9062 15.5312C20.8125 15.8438 20.5312 16 20.2188 16C18.5 16 17.125 15.4062 16.1875 14.8125C15.625 14.9375 15.0625 15 14.5 15C11.9375 15 9.71875 13.75 8.65625 11.9375C9.1875 11.875 9.71875 11.75 10.1875 11.5625C11.0625 12.75 12.6562 13.5 14.5 13.5C14.9375 13.5 15.375 13.4688 15.8438 13.3438L16.4375 13.2188L16.9688 13.5312C17.5 13.875 18.0312 14.125 18.5938 14.2812C18.4688 14.0625 18.3438 13.8438 18.2188 13.6562L17.7188 12.6875L18.4688 11.9062C18.9375 11.4375 19.5 10.625 19.5 9.5C19.5 7.4375 17.5 5.75 14.9688 5.53125L15 5.5C15 5 14.9062 4.5 14.7812 4.03125Z" fill="#028835" /></svg>
                      <span className="text-base">Comments (05)</span>
                    </div>
                  </div>
                  <Link href={`/blog/${blog.slug}`} className="px-[30px] py-[14px] border border-primary-500 rounded-lg text-primary-900 font-bold hover:bg-primary-500 hover:text-white transition-all inline-block spline-sans">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

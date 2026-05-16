export const dynamic = "force-dynamic";
import { mediaUrl } from '@/lib/media';

export default function HomeTwo() {
  return (
    <>
      <main>
        {/* Hero Area */}
        <section className="hero-area-2 w-full lg:h-[758px] py-20 relative overflow-hidden">
          <div className="theme-container h-full mx-auto px-5">
            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-[30px] h-full items-center">
              <div className="article-area" data-aos="fade-right">
                <h1 className="text-primary-900 xl:text-[70px] text-[50px] font-bold leading-[60px] xl:leading-[70px] mb-5 text-center lg:text-start">
                  Like a good <br className="lg:block hidden" />
                  neighbor State <br className="sm:block hidden" />
                  Farm is there
                </h1>
                <p className="text-primary-900 text-base leading-7 mb-9 text-center lg:text-start">
                  lorem ipsum dolor sit amet consectetur. Facilisi cursus vulputate <br /> vestibulum etiam rhoncus
                </p>
                <div className="flex justify-center lg:justify-start space-x-10 items-center">
                  <a href="/services" className="px-[46px] py-[20px] bg-primary-500 hover:bg-primary-900 common-trans rounded-lg text-white text-lg font-semibold leading-none">
                    Get Started
                  </a>
                  <button type="button" className="sm:flex hidden space-x-5 items-center group">
                    <div className="w-[55px] h-[55px] relative">
                      <div className="w-full h-full rounded-full flex justify-center items-center bg-primary-500 relative z-10">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2812 6.71875C11.7188 7 12 7.5 12 8C12 8.53125 11.7188 9.03125 11.2812 9.28125L2.28125 14.7812C1.8125 15.0625 1.21875 15.0938 0.75 14.8125C0.28125 14.5625 0 14.0625 0 13.5V2.5C0 1.96875 0.28125 1.46875 0.75 1.21875C1.21875 0.9375 1.8125 0.9375 2.28125 1.25L11.2812 6.71875Z" fill="white" />
                        </svg>
                      </div>
                      <div className="button-outer-circle has-scale-animation"></div>
                    </div>
                    <span className="font-semibold text-lg text-primary-900">Watch Video</span>
                  </button>
                </div>
              </div>
              <div className="thumb-area" data-aos="fade-left">
                <img src={mediaUrl('hero-img-2.png')} alt="Hero" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
          {/* Shapes */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
             <img src={mediaUrl('hero-shape-1.png')} className="absolute left-5 bottom-[314px]" alt="" />
             <img src={mediaUrl('hero-shape-2.png')} className="absolute left-[80px] bottom-[160px] opacity-100" alt="" />
             <img src={mediaUrl('hero-shape-3.png')} className="absolute left-5 bottom-5" alt="" />
             <img src={mediaUrl('hero-shape-4.png')} className="absolute left-[218px] bottom-5" alt="" />
          </div>
        </section>

        {/* About Section */}
        <section className="about-section-area w-full lg:py-[120px] py-[60px]">
          <div className="theme-container mx-auto px-5">
            <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-10 items-center">
              <div className="thumb-area relative" data-aos="fade-right">
                <img src={mediaUrl('about-thumb-2.png')} alt="About" className="rounded-lg shadow-xl" />
                <button type="button" className="w-[110px] h-[110px] rounded bg-primary-500 sm:flex hidden justify-center items-center absolute right-[80px] top-[315px] hover:bg-primary-900 transition-colors shadow-2xl">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <div className="article-area" data-aos="fade-left">
                <p className="text-primary-500 text-lg font-bold mb-2">About Our Company</p>
                <h2 className="text-primary-900 text-[40px] font-bold leading-[50px] mb-5">Making a difference for you & your loved ones</h2>
                <p className="text-primary-100 text-base leading-7 mb-8">
                   Don't just take our word for it hear what our customers have to say about how we have helped thousand people. don't just take our word for it hear what our customers have to say about how we have helped thousand people.
                </p>
                <div className="flex flex-col space-y-4 mb-10">
                   {['Comprehensive Protection', 'Tailored Coverage', '24/7 Support'].map(item => (
                     <div key={item} className="flex items-center space-x-3">
                       <div className="w-5 h-5 rounded-full bg-primary-500 flex justify-center items-center">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                       </div>
                       <span className="text-primary-900 font-bold">{item}</span>
                     </div>
                   ))}
                </div>
                <a href="#" className="px-[30px] py-4 border border-primary-900 rounded-lg text-primary-900 font-bold hover:bg-primary-900 hover:text-white transition-all">
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="service-section-area-2 w-full lg:py-[120px] py-[60px] bg-secondary">
          <div className="theme-container mx-auto px-5">
             <div className="text-center mb-[60px]">
                <p className="text-primary-500 text-lg font-bold mb-2">Our Services</p>
                <h2 className="text-primary-900 text-[40px] font-bold">What we offer for you</h2>
             </div>
             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                {[
                  { title: 'Family Insurance', icon: mediaUrl('service-1.svg') },
                  { title: 'Health Insurance', icon: mediaUrl('service-2.svg') },
                  { title: 'Home Insurance', icon: mediaUrl('service-3.svg') },
                  { title: 'Life Insurance', icon: mediaUrl('service-4.svg') },
                  { title: 'Car Insurance', icon: mediaUrl('service-5.svg') },
                  { title: 'Business Insurance', icon: mediaUrl('service-6.svg') }
                ].map((service, idx) => (
                  <div key={idx} className="bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-all group" data-aos="fade-up" data-aos-delay={idx * 100}>
                    <div className="w-[70px] h-[70px] mb-8 bg-primary-50 rounded-lg flex justify-center items-center group-hover:bg-primary-500 transition-colors">
                      <img src={service.icon} alt={service.title} className="w-10 h-10 group-hover:invert transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-900 mb-4">{service.title}</h3>
                    <p className="text-primary-100 mb-6">Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra.</p>
                    <a href="/services" className="text-primary-500 font-bold flex items-center space-x-2">
                       <span>Read More</span>
                       <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </a>
                  </div>
                ))}
             </div>
          </div>
        </section>
        {/* Fun Fact Area */}
        <section className="fun-fact-area-two relative">
          <div className="w-full lg:py-[150px] py-[60px] sm:h-[748px] h-full bg-primary-900">
            <div className="theme-container mx-auto relative px-5">
              <div className="grid sm:grid-cols-4 grid-cols-1 sm:gap-[30px] gap-[60px]">
                {[
                  { count: '200', label: 'Team member', icon: mediaUrl('counter-2.png') },
                  { count: '20', label: 'Team member', icon: mediaUrl('counter-3.png') },
                  { count: '10k', label: 'Team member', icon: mediaUrl('counter-4.png') },
                  { count: '900', label: 'Team member', icon: mediaUrl('counter-1.png') }
                ].map((item, idx) => (
                  <div key={idx} className="counter-item bg-white rounded flex justify-center items-center h-[150px] relative">
                    <div>
                      <h2 className="font-bold lg:text-[44px] text-2xl text-primary-900 text-center mb-1.5">
                        <span className="purecounter" data-purecounter-end={item.count.replace(/[^0-9]/g, '')}>{item.count}</span>
                        {item.count.includes('k') ? 'k+' : '+'}
                      </h2>
                      <p className="text-base text-primary-100">{item.label}</p>
                    </div>
                    <div className="w-[64px] h-[64px] rounded-full bg-primary-500 flex justify-center items-center absolute -top-8 left-1/2 -translate-x-1/2">
                      <img src={item.icon} alt="icon" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section-main-wrapper w-full lg:-mt-[327px] sm:-mt-[466px] my-[60px] relative z-10">
          <div className="theme-container mx-auto px-5">
            <div data-aos="fade-up" className="faq-two w-full bg-white sm:p-[60px] p-5 rounded-[10px] flex xl:flex-row flex-col xl:space-x-[75px] space-y-[75px] xl:space-y-0 items-center shadow-2xl">
              <div className="sm:w-[525px] w-full xl:h-[741px] h-[500px] relative rounded-[10px] overflow-hidden">
                <img src={mediaUrl('fun-fact-thum.png')} alt="FAQ Thumb" className="w-full h-full object-cover" />
                <div className="w-[268px] h-[87px] rounded-full p-3 bg-white absolute right-5 bottom-5 shadow-lg">
                  <div className="flex space-x-[15px] items-center">
                    <div className="w-[63px] h-[63px] rounded-full bg-secondary flex justify-center items-center">
                       <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M33.4049 19.0345C33.6025 27.8649 25.8057 35.6541 16.9828 35.4717C8.388 35.5173 0.993959 28.5033 0.560759 19.9161C-0.123241 10.7588 7.8028 2.39958 16.9752 2.59718" fill="#028835" /></svg>
                    </div>
                    <div>
                      <span className="text-base font-bold text-gray-700 block">Daily Activity</span>
                      <span className="text-base text-gray-100 block">Loream is ispam</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-primary-500 font-bold text-xl uppercase mb-2">Ask Anything</p>
                <h2 className="text-primary-900 text-[40px] font-bold leading-[50px] mb-[60px]">Insurance that goes the extra mile</h2>
                <div className="flex flex-col space-y-5">
                   {[
                     'What is insurance and why is it important?',
                     'What are the different types of insurance?',
                     'How do I choose the right insurance?',
                     'What is the claims process?'
                   ].map((q, i) => (
                     <div key={i} className="faq-item p-5 rounded bg-secondary group cursor-pointer">
                        <div className="flex justify-between items-center relative">
                           <span className="text-lg font-bold text-primary-900">{q}</span>
                           <span className="w-8 h-8 bg-primary-500 text-white rounded flex justify-center items-center transition-transform group-[.active]:rotate-180">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                           </span>
                        </div>
                        <div className="hidden group-[.active]:block pt-4">
                           <p className="text-primary-100">Lorem ipsum dolor sit amet consectetur. Aliquam ullamcorper id pretium diam ame lacus. Et lectus sem vitae feugiat arcu velit massa.</p>
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
           <div className="theme-container mx-auto px-5">
              <h2 className="text-primary-900 text-[40px] font-bold mb-[60px] text-center">What our awesome <br /> customers say</h2>
              <div className="grid lg:grid-cols-3 gap-[30px]">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="testimonial-item p-10 border border-primaryBorder rounded hover:shadow-lg transition-all">
                      <p className="text-primary-100 text-center mb-8 italic">"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem"</p>
                      <div className="flex justify-center mb-4">
                         <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                         </div>
                      </div>
                      <div className="flex flex-col items-center">
                         <img src={mediaUrl(`testimonial-${i + 3}.png`)} className="mb-4" alt="" />
                         <h3 className="text-lg font-bold text-primary-900">Jane Cooper</h3>
                         <p className="text-primary-100 text-sm">Human Resource</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Process Section */}
        <section className="process-section-two w-full lg:py-[120px] py-[60px] bg-secondary">
           <div className="theme-container mx-auto px-5">
              <h2 className="text-primary-900 text-[40px] font-bold mb-[60px] text-center">Protection that's <br /> personalized for you</h2>
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[30px]">
                 {[
                   { title: 'Sure Guard', step: '01', icon: mediaUrl('progress-1.svg') },
                   { title: 'Safe Haven', step: '02', icon: mediaUrl('progress-2.svg') },
                   { title: 'Secure Life', step: '03', icon: mediaUrl('progress-3.svg') },
                   { title: 'Total Cover', step: '04', icon: mediaUrl('progress-4.svg') }
                 ].map((p, idx) => (
                   <div key={idx} className="bg-white p-10 rounded border border-primaryBorder relative overflow-hidden group hover:bg-primary-500 transition-all" data-aos="fade-up" data-aos-delay={idx * 100}>
                      <div className="relative z-10">
                        <div className="flex justify-center mb-10">
                           <img src={p.icon} alt="" className="w-16 h-16 group-hover:invert transition-all" />
                        </div>
                        <p className="text-center text-primary-100 font-bold mb-4 group-hover:text-white opacity-20">{p.step}</p>
                        <h3 className="text-xl font-bold text-center text-primary-900 mb-4 group-hover:text-white transition-colors">{p.title}</h3>
                        <p className="text-center text-primary-100 group-hover:text-white transition-colors">Lorem Ipsum is simply dummy text of the prin and typesetting industry.</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
        {/* Blog Section */}
        <section className="blog-section-area-2 w-full lg:py-[120px] py-[60px]">
           <div className="theme-container mx-auto px-5">
              <div className="flex justify-between items-end mb-[60px]">
                 <div>
                    <p className="text-primary-500 font-bold text-xl uppercase mb-2">Our Blog</p>
                    <h2 className="text-primary-900 text-[40px] font-bold leading-[50px]">Latest news & articles</h2>
                 </div>
                 <a href="/blog" className="px-[30px] py-4 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-900 transition-all lg:block hidden">View All Post</a>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                 {[
                   { title: 'A Lifetime Insurance for your future', date: 'October 19, 2022', img: mediaUrl('blog-1.png') },
                   { title: 'Cyber Insurance Protection plan', date: 'October 20, 2022', img: mediaUrl('blog-2.png') },
                   { title: 'Business Liability Insurance', date: 'October 21, 2022', img: mediaUrl('blog-3.png') }
                 ].map((post, idx) => (
                   <div key={idx} className="blog-item group" data-aos="fade-up" data-aos-delay={idx * 100}>
                      <div className="w-full h-[250px] rounded-lg overflow-hidden mb-6 relative">
                         <img src={post.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded text-sm font-bold">Insurance</div>
                      </div>
                      <div className="flex items-center space-x-4 mb-4 text-primary-100 text-sm">
                         <span className="flex items-center space-x-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>{post.date}</span></span>
                         <span className="flex items-center space-x-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>By Admin</span></span>
                      </div>
                      <h3 className="text-xl font-bold text-primary-900 mb-4 group-hover:text-primary-500 transition-colors"><a href="/blog/giving-power">{post.title}</a></h3>
                      <a href="/blog/giving-power" className="text-primary-900 font-bold border-b-2 border-primary-500 hover:text-primary-500 transition-colors pb-1">Read More</a>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>
    </>
  );
}


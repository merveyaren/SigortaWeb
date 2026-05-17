export const dynamic = "force-dynamic";
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { apiService } from '@/lib/api';
import { BlogListItem } from '@/types';
import ClientSlider from '@/components/ClientSlider';
import { mediaUrl } from '@/lib/media';

async function getBlogs() {
  try {
    const res = await apiService.getBlogs();
    return res.data as BlogListItem[];
  } catch {
    return [];
  }
}

const staticBlogs = [
  { 
    title: 'Giving You the Power to Protect Your Loved Ones and Secure Your Financial Future', 
    category: 'Insurance', 
    date: 'October 19, 2022', 
    img: mediaUrl('blog-b-1.png'), 
    slug: 'giving-power', 
    excerpt: 'Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra .Aliquam eros justo, posuere Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra.'
  },
  { 
    title: 'A Name You Can Trust in Insurance, With a Proven Track Record of Excellence and Reliability', 
    category: 'Life', 
    date: 'October 20, 2022', 
    img: mediaUrl('blog-b-2.png'), 
    slug: 'name-you-trust', 
    excerpt: 'Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra .Aliquam eros justo, posuere Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra.'
  },
  { 
    title: 'Your Pathway to a More Secure and Protected Life with Comprehensive Insurance Coverage', 
    category: 'Claims', 
    date: 'October 21, 2022', 
    img: mediaUrl('blog-b-3.png'), 
    slug: 'pathway-secure', 
    excerpt: 'Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra .Aliquam eros justo, posuere Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra.'
  },
];

export default async function BlogPage() {
  const apiBlogs = await getBlogs();
  const blogs = apiBlogs.length > 0 ? apiBlogs : null;

  // Dynamic handler fallback logic for display mapping
  const displayList = blogs ? blogs.map(b => ({
    id: b.id,
    title: b.title,
    category: typeof b.category === 'object' ? (b.category as any).name : b.category,
    date: b.published_at ? new Date(b.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'October 19, 2022',
    img: b.cover_image_url || mediaUrl('blog-b-1.png'),
    slug: b.slug,
    excerpt: 'Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra .Aliquam eros justo, posuere Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra.'
  })) : staticBlogs.map((s, i) => ({ ...s, id: i }));

  return (
    <>
      <PageBanner title="Blogs" breadcrumb="Blogs" />
      
      <div className="lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        <div className="theme-container mx-auto">
          <div className="lg:grid grid-cols-12 lg:gap-[30px]">
            {/* Main Feed */}
            <div className="body-content-wrapper lg:col-span-8 col-span-12 mb-[80px] lg:mb-0">
              <div className="w-full flex flex-col space-y-[80px] mb-[80px]">
                {displayList.map((item) => (
                  <div key={item.id} className="w-full group">
                    <div className="w-full h-[440px]">
                      <div className="w-full h-full overflow-hidden rounded">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 common-trans"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:px-[30px] -mt-[30px] relative z-10">
                      <div
                        style={{
                          boxShadow: "0px 4.8px 24.4px -6px rgba(19, 16, 34, 0.1), 0px 4px 13px -2px rgba(19, 16, 34, 0.06)"
                        }}
                        className="w-full sm:p-10 p-5 bg-white rounded border border-gray-50"
                      >
                        <Link href={`/blog/${item.slug}`}>
                          <p className="sm:text-[30px] font-semibold spline-sans sm:leading-9 text-2xl text-primary-900 mb-2 hover:text-primary-500 common-trans">
                            {item.title}
                          </p>
                        </Link>
                        <ul className="flex space-x-5 items-center mb-5">
                          <li>
                            <span className="sm:text-base sm:leading-[27px] text-sm text-primary-100">By Admin</span>
                          </li>
                          <li className="flex sm:space-x-5 space-x-2.5 items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                            <span className="sm:text-base sm:leading-[27px] text-sm text-primary-100">{item.category}</span>
                          </li>
                          <li className="flex sm:space-x-5 space-x-2.5 items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                            <span className="sm:text-base sm:leading-[27px] text-sm text-primary-100">{item.date}</span>
                          </li>
                        </ul>
                        <p className="sm:text-base text-primary-100 text-sm sm:leading-[27px] mb-[30px]">
                          {item.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <Link href={`/blog/${item.slug}`}>
                            <div className="px-[46px] py-[20px] bg-primary-500 rounded-lg text-white text-lg font-semibold spline-sans leading-none hover:bg-primary-900 common-trans cursor-pointer inline-block">
                              Read More
                            </div>
                          </Link>
                          <div className="w-[50px] h-[50px] rounded-full bg-secondary flex justify-center items-center hover:bg-primary-500 text-primary-500 common-trans hover:text-white cursor-pointer">
                            <span>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                                <path d="M11 6C12.6562 6 14 4.65625 14 3C14 1.34375 12.6562 0 11 0C9.34375 0 8 1.34375 8 3C8 3.125 8 3.25 8 3.375L5.0625 4.84375C4.53125 4.34375 3.78125 4 3 4C1.34375 4 0 5.34375 0 7C0 8.65625 1.34375 10 3 10C3.78125 10 4.53125 9.6875 5.0625 9.1875L8 10.6562C8 10.75 8 10.875 8 11C8 12.6562 9.34375 14 11 14C12.6562 14 14 12.6562 14 11C14 9.34375 12.6562 8 11 8C10.1875 8 9.4375 8.34375 8.90625 8.84375L5.96875 7.375C5.96875 7.25 6 7.15625 6 7C6 6.875 5.96875 6.75 5.96875 6.65625L8.90625 5.1875C9.4375 5.6875 10.1875 6 11 6Z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aside Sidebar */}
            <aside className="aside-wrapper lg:col-span-4 col-span-12">
              {/* Search */}
              <div className="w-full mb-[30px]">
                <div className="search-bar w-full h-[50px] bg-secondary rounded flex justify-between items-center">
                  <div className="flex-1 h-full">
                    <input
                      type="text"
                      placeholder="Search Blogs . . ."
                      className="w-full h-full focus:outline-none focus:ring-0 px-5 bg-transparent placeholder:text-primary-100 text-primary-900"
                    />
                  </div>
                  <button type="button" className="w-[60px] h-full flex justify-center items-center hover:bg-primary-500 rounded-r transition-all group">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-white fill-[#028835] transition-colors">
                      <path d="M16.625 14.875L12.875 11.125C13.7188 9.875 14.1562 8.3125 13.9375 6.625C13.5312 3.75 11.1875 1.4375 8.34375 1.0625C4.09375 0.53125 0.5 4.125 1.03125 8.375C1.40625 11.2188 3.71875 13.5625 6.59375 13.9688C8.28125 14.1875 9.84375 13.75 11.125 12.9062L14.8438 16.6562C15.3438 17.125 16.125 17.125 16.625 16.6562C17.0938 16.1562 17.0938 15.375 16.625 14.875ZM3.46875 7.5C3.46875 5.3125 5.25 3.5 7.46875 3.5C9.65625 3.5 11.4688 5.3125 11.4688 7.5C11.4688 9.71875 9.65625 11.5 7.46875 11.5C5.25 11.5 3.46875 9.71875 3.46875 7.5Z" />
                    </svg>
                  </button>
                </div>
              </div>


              {/* Related Post Slider Container */}
              <div className="related-post-slider w-full mb-[60px]">
                <div className="w-full flex justify-between items-center mb-[20px] relative">
                  <span className="text-lg leading-7 spline-sans font-bold text-primary-900 capitalize">Related post</span>
                  <div className="flex space-x-5 items-center">
                    <button type="button" className="swiper-button-next text-primary-100 hover:text-primary-500 focus:text-primary-500 common-trans">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current transform rotate-180"><path d="M13.6875 7.71875L8.6875 12.7188C8.5 12.9062 8.25 13 8 13C7.71875 13 7.46875 12.9062 7.28125 12.7188C6.875 12.3438 6.875 11.6875 7.28125 11.3125L10.5625 8H1C0.4375 8 0 7.5625 0 7C0 6.46875 0.4375 6 1 6H10.5625L7.28125 2.71875C6.875 2.34375 6.875 1.6875 7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L13.6875 6.3125C14.0938 6.6875 14.0938 7.34375 13.6875 7.71875Z"/></svg>
                    </button>
                    <button type="button" className="swiper-button-prev text-primary-100 hover:text-primary-500 focus:text-primary-500 common-trans">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M13.6875 7.71875L8.6875 12.7188C8.5 12.9062 8.25 13 8 13C7.71875 13 7.46875 12.9062 7.28125 12.7188C6.875 12.3438 6.875 11.6875 7.28125 11.3125L10.5625 8H1C0.4375 8 0 7.5625 0 7C0 6.46875 0.4375 6 1 6H10.5625L7.28125 2.71875C6.875 2.34375 6.875 1.6875 7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L13.6875 6.3125C14.0938 6.6875 14.0938 7.34375 13.6875 7.71875Z"/></svg>
                    </button>
                  </div>
                </div>
                <ClientSlider type="related-post-slider-wrap">
                  <div className="related-post-slider-wrap overflow-hidden">
                    <div className="swiper-wrapper">
                      {[1, 2].map((num) => (
                        <div key={num} className="swiper-slide">
                          <div 
                            style={{ backgroundImage: `url(${mediaUrl(`blog-sidebar-thumb-${num}.png`)})` }}
                            className="w-full h-[268px] rounded flex items-end bg-no-repeat bg-cover p-[30px] mt-5 relative"
                          >
                            <div className="absolute inset-0 bg-black/20 rounded"></div>
                            <div className="relative z-10">
                              <div className="flex space-x-1.5 items-center mb-2.5">
                                <span><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.875 7.46875L14.875 13.4688C14.7188 13.8125 14.375 14 13.9688 14H2C0.875 14 0 13.125 0 12V2C0 0.90625 0.875 0 2 0H5.65625C6.1875 0 6.6875 0.21875 7.0625 0.59375L8.59375 2H13C14.0938 2 15 2.90625 15 4V5H13.5V4C13.5 3.75 13.25 3.5 13 3.5H8L6 1.65625C5.90625 1.5625 5.78125 1.5 5.65625 1.5H2C1.71875 1.5 1.5 1.75 1.5 2V11L3.71875 6.5625C3.875 6.21875 4.21875 6 4.59375 6H17C17.7188 6 18.2188 6.78125 17.875 7.46875Z" fill="white" /></svg></span>
                                <span className="text-base text-white leading-[27px]">Designing</span>
                              </div>
                              <p className="text-lg font-bold text-white leading-[27px]">Protect what matters most</p>
                            </div>
                            <div className="px-5 py-2.5 rounded bg-primary-500 absolute -top-2 left-[40px] z-20 flex items-center space-x-2.5">
                              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C4.78125 8 3 6.21875 3 4C3 1.8125 4.78125 0 7 0C9.1875 0 11 1.8125 11 4C11 6.21875 9.1875 8 7 8ZM5.5625 9.5H8.40625C11.5 9.5 14 12 14 15.0938C14 15.5938 13.5625 16 13.0625 16H0.90625C0.40625 16 0 15.5938 0 15.0938C0 12 2.46875 9.5 5.5625 9.5Z" fill="white" /></svg>
                              <span className="text-base font-semibold text-white">Admin</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ClientSlider>
              </div>

              {/* Categories */}
              <div className="w-full mb-[60px]">
                <p className="text-lg leading-7 spline-sans font-bold text-primary-900 mb-[30px]">Category</p>
                <ul>
                  {['Life Insurance', 'Employment Practices', 'Travel Insurance', 'Homeowners'].map((cat) => (
                    <li key={cat}>
                      <Link href="/blog" className="flex py-5 justify-between items-center border-b border-primaryBorder group">
                        <span className="text-primary-100 block group-hover:text-primary-500 text-base group-hover:font-medium common-trans">
                          {cat}
                        </span>
                        <span className="text-primary-500 text-base">02</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="w-full mb-[60px]">
                <p className="text-lg leading-7 spline-sans font-bold text-primary-900 mb-[30px]">Recent Post</p>
                <ul className="flex flex-col space-y-5">
                  {displayList.slice(0, 3).map((blog: any, i: number) => (
                    <li key={i}>
                      <div className="w-full group">
                        <div className="flex space-x-2.5 items-center mb-2.5">
                          <span>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.75 2H9.25V0.75C9.25 0.34375 9.5625 0 10 0C10.4062 0 10.75 0.34375 10.75 0.75V2H12C13.0938 2 14 2.90625 14 4V14C14 15.125 13.0938 16 12 16H2C0.875 16 0 15.125 0 14V4C0 2.90625 0.875 2 2 2H3.25V0.75C3.25 0.34375 3.5625 0 4 0C4.40625 0 4.75 0.34375 4.75 0.75V2ZM1.5 7.75H4V6H1.5V7.75ZM1.5 9.25V11.25H4V9.25H1.5ZM5.5 9.25V11.25H8.5V9.25H5.5ZM10 9.25V11.25H12.5V9.25H10ZM12.5 6H10V7.75H12.5V6ZM12.5 12.75H10V14.5H12C12.25 14.5 12.5 14.2812 12.5 14V12.75ZM8.5 12.75H5.5V14.5H8.5V12.75ZM4 12.75H1.5V14C1.5 14.2812 1.71875 14.5 2 14.5H4V12.75ZM8.5 6H5.5V7.75H8.5V6Z" fill="#028835" />
                            </svg>
                          </span>
                          <span className="text-base text-primary-100">{blog.date}</span>
                        </div>
                        <p className="text-gray-700 text-lg font-bold spline-sans leading-7 group-hover:text-primary-500 common-trans">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { apiService } from '@/lib/api';
import ClientSlider from '@/components/ClientSlider';
import { mediaUrl } from '@/lib/media';

async function getBlog(slug: string) {
  try {
    const res = await apiService.getBlogBySlug(slug);
    return res.data;
  } catch { return null; }
}

const recentPosts = [
  { img: mediaUrl('blog-sidebar-thumb-1.png'), title: 'Aliquam eros justo, posuere loborti viverra', date: 'Oct 19, 2022' },
  { img: mediaUrl('blog-sidebar-thumb-2.png'), title: 'Aliquam eros justo, posuere loborti viverra', date: 'Oct 20, 2022' },
  { img: mediaUrl('blog-sidebar-thumb-1.png'), title: 'Aliquam eros justo, posuere loborti viverra', date: 'Oct 21, 2022' },
];
const tags = ['Insurance', 'Life Insurance', 'Health', 'Property', 'Auto', 'Business', 'Cyber', 'Claims'];

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const title = blog?.title || 'Giving You the Power to Protect Your Loved Ones and Secure Your Financial Future';
  const content = blog?.content || 'Aliquam eros posuere loborti viverra laoree ullamcorper posuere viverra eros justo, posuere lobo viverra laoreet augue mattis fermentum ullamcorper viverra. Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam eros justo, posuere lobortis non, viverra laoreet augue mattis fermentum ullamcorper viverra.';
  const img = blog?.cover_image_url || mediaUrl('blog-details-1.png');
  const author = blog?.author || 'Admin';
  const date = blog?.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'October 19, 2022';
  const category = blog?.category ? (typeof blog.category === 'object' ? blog.category.name : blog.category) : 'Insurance';


  return (
    <>
      <PageBanner title="Blog Details" breadcrumb="Blog Details" />
      <div className="lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        <div className="theme-container mx-auto">
          <div className="lg:grid grid-cols-12 lg:gap-[30px]">
            {/* Main Content */}
            <div className="body-content-wrapper lg:col-span-8 col-span-12 mb-[80px] lg:mb-0">
              <div className="pb-[60px] border-b border-primaryBorder">
                <p className="sm:text-[30px] font-semibold spline-sans sm:leading-9 text-2xl text-primary-900 mb-2">{title}</p>
                <ul className="flex space-x-5 items-center mb-[30px]">
                  <li><span className="text-base leading-[27px] text-primary-100">By {author}</span></li>
                  <li className="flex space-x-2 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                    <span className="text-base leading-[27px] text-primary-100">{category}</span>
                  </li>
                  <li className="flex space-x-2 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                    <span className="text-base leading-[27px] text-primary-100">{date}</span>
                  </li>
                </ul>
                <div className="w-full h-[438px] mb-[30px] overflow-hidden rounded">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                </div>
                <p className="text-base leading-[27px] text-primary-100 mb-2.5">{content}</p>
                {/* Blockquote */}
                <div className="border-l-4 border-primary-500 bg-primary-50 pl-6 pr-4 py-5 my-8 rounded-r">
                  <p className="text-lg text-primary-900 font-semibold spline-sans leading-8 italic">
                    &ldquo;Insurance is not just about protecting assets — it&apos;s about securing peace of mind and enabling you to live life fully without fear of the unexpected.&rdquo;
                  </p>
                  <span className="text-sm text-primary-500 font-bold mt-2 block">— Insurance Expert</span>
                </div>
                <p className="text-base leading-[27px] text-primary-100 mb-[60px]">Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam eros justo, posuere lobortis non, viverra laoreet augue mattis fermentum ullamcorper viverra laoreet.</p>
                <div className="sm:flex sm:space-x-[30px] mb-5">
                  <div className="sm:w-2/3 mb-5 sm:mb-0">
                    <img src={mediaUrl('blog-details-2.png')} alt="" className="w-full h-[380px] object-cover" />
                  </div>
                  <div className="sm:w-1/3 flex flex-col space-y-[30px]">
                    <img src={mediaUrl('blog-details-3.png')} alt="" className="w-full h-[175px] object-cover" />
                    <img src={mediaUrl('blog-details-4.png')} alt="" className="w-full h-[175px] object-cover" />
                  </div>
                </div>
                <p className="text-base leading-[27px] text-primary-100 mb-10">Aliquam eros posuere loborti viverra laoree ullamcorper posuere viverra eros justo, posuere lobo viverra laoreet augue mattis fermentum ullamcorper viverra.</p>
                <div className="flex space-x-[15px] mb-5">
                  <div className="w-1/2">
                    <p className="text-lg text-gray-700 spline-sans font-semibold leading-[27px]">Covering You When You Need it Most Trust Us to Keep You Covered</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-base leading-[27px] text-primary-100">Aliquam eros justo, posuere loborti viverra laoreematti ullamcorper posuere viverra .Aliquam eros just.</p>
                  </div>
                </div>
                <p className="text-base leading-[27px] text-primary-100 mb-[80px]">Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis, viverra laoreet augue mattis fermentum ullamcorper viverra laoreet.</p>
                {/* Author card */}
                <div className="w-full sm:h-[180px] p-5 sm:p-0 border border-primaryBorder rounded sm:flex items-center sm:space-x-[30px] mb-[30px]">
                  <div className="w-[180px] h-full mb-5 sm:mb-0 overflow-hidden">
                    <img src={mediaUrl('blog-details-person.png')} alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pr-5">
                    <p className="text-lg text-gray-700 spline-sans font-semibold leading-[27px] mb-2.5">Stanio lainto</p>
                    <p className="text-base leading-[27px] text-gray-700">Ished fact that a reader will be distrol acted bioii the. ished fact th reader will be distrol ac laoreet Aliquam fact that a reader will be distrol acted.</p>
                  </div>
                </div>
                {/* Social Share */}
                <div className="flex space-x-2.5 items-center">
                  <span className="text-lg spline-sans font-bold leading-7 text-primary-900">Share:</span>
                  {[
                    { id: 'facebook', w: 10, h: 16, vb: '0 0 10 16', d: 'M8.71875 9L9.15625 6.125H6.375V4.25C6.375 3.4375 6.75 2.6875 8 2.6875H9.28125V0.21875C9.28125 0.21875 8.125 0 7.03125 0C4.75 0 3.25 1.40625 3.25 3.90625V6.125H0.6875V9H3.25V16H6.375V9H8.71875Z' },
                    { id: 'twitter', w: 16, h: 14, vb: '0 0 16 14', d: 'M14.3438 3.75C14.3438 3.90625 14.3438 4.03125 14.3438 4.1875C14.3438 8.53125 11.0625 13.5 5.03125 13.5C3.15625 13.5 1.4375 12.9688 0 12.0312C0.25 12.0625 0.5 12.0938 0.78125 12.0938C2.3125 12.0938 3.71875 11.5625 4.84375 10.6875C3.40625 10.6562 2.1875 9.71875 1.78125 8.40625C2 8.4375 2.1875 8.46875 2.40625 8.46875C2.6875 8.46875 3 8.40625 3.25 8.34375C1.75 8.03125 0.625 6.71875 0.625 5.125V5.09375C1.0625 5.34375 1.59375 5.46875 2.125 5.5C1.21875 4.90625 0.65625 3.90625 0.65625 2.78125C0.65625 2.15625 0.8125 1.59375 1.09375 1.125C2.71875 3.09375 5.15625 4.40625 7.875 4.5625C7.8125 4.3125 7.78125 4.0625 7.78125 3.8125C7.78125 2 9.25 0.53125 11.0625 0.53125C12 0.53125 12.8438 0.90625 13.4688 1.5625C14.1875 1.40625 14.9062 1.125 15.5312 0.75C15.2812 1.53125 14.7812 2.15625 14.0938 2.5625C14.75 2.5 15.4062 2.3125 15.9688 2.0625C15.5312 2.71875 14.9688 3.28125 14.3438 3.75Z' },
                    { id: 'instagram', w: 15, h: 15, vb: '0 0 15 15', d: 'M8 3.40625C6 3.40625 4.40625 5.03125 4.40625 7C4.40625 9 6 10.5938 8 10.5938C9.96875 10.5938 11.5938 9 11.5938 7C11.5938 5.03125 9.96875 3.40625 8 3.40625ZM8 9.34375C6.71875 9.34375 5.65625 8.3125 5.65625 7C5.65625 5.71875 6.6875 4.6875 8 4.6875C9.28125 4.6875 10.3125 5.71875 10.3125 7C10.3125 8.3125 9.28125 9.34375 8 9.34375ZM12.5625 3.28125C12.5625 3.75 12.1875 4.125 11.7188 4.125C11.25 4.125 10.875 3.75 10.875 3.28125C10.875 2.8125 11.25 2.4375 11.7188 2.4375C12.1875 2.4375 12.5625 2.8125 12.5625 3.28125ZM14.9375 4.125C14.875 3 14.625 2 13.8125 1.1875C13 0.375 12 0.125 10.875 0.0625C9.71875 0 6.25 0 5.09375 0.0625C3.96875 0.125 3 0.375 2.15625 1.1875C1.34375 2 1.09375 3 1.03125 4.125C0.96875 5.28125 0.96875 8.75 1.03125 9.90625C1.09375 11.0312 1.34375 12 2.15625 12.8438C3 13.6562 3.96875 13.9062 5.09375 13.9688C6.25 14.0312 9.71875 14.0312 10.875 13.9688C12 13.9062 13 13.6562 13.8125 12.8438C14.625 12 14.875 11.0312 14.9375 9.90625C15 8.75 15 5.28125 14.9375 4.125ZM13.4375 11.125C13.2188 11.75 12.7188 12.2188 12.125 12.4688C11.1875 12.8438 9 12.75 8 12.75C6.96875 12.75 4.78125 12.8438 3.875 12.4688C3.25 12.2188 2.78125 11.75 2.53125 11.125C2.15625 10.2188 2.25 8.03125 2.25 7C2.25 6 2.15625 3.8125 2.53125 2.875C2.78125 2.28125 3.25 1.8125 3.875 1.5625C4.78125 1.1875 6.96875 1.28125 8 1.28125C9 1.28125 11.1875 1.1875 12.125 1.5625C12.7188 1.78125 13.1875 2.28125 13.4375 2.875C13.8125 3.8125 13.7188 6 13.7188 7C13.7188 8.03125 13.8125 10.2188 13.4375 11.125Z' }
                  ].map((s) => (
                    <a key={s.id} href="#" className="w-[50px] h-[50px] rounded flex justify-center items-center text-primary-900 bg-primary-50 hover:text-white hover:bg-primary-900 common-trans">
                      <svg width={s.w} height={s.h} viewBox={s.vb} fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={s.d} /></svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Prev / Next */}
              <div className="flex justify-between items-center py-10 border-b border-primaryBorder mb-[60px]">
                <div className="flex space-x-[30px] items-center">
                  <Link href="/blog">
                    <div className="w-[60px] h-[60px] rounded-full bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white common-trans flex justify-center items-center">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                        <path d="M14.9688 7C14.9688 7.5625 14.5312 8 14 8H4.40625L7.6875 11.3125C8.09375 11.6875 8.09375 12.3438 7.6875 12.7188C7.5 12.9062 7.25 13 7 13C6.71875 13 6.46875 12.9062 6.28125 12.7188L1.28125 7.71875C0.875 7.34375 0.875 6.6875 1.28125 6.3125L6.28125 1.3125C6.65625 0.90625 7.3125 0.90625 7.6875 1.3125C8.09375 1.6875 8.09375 2.34375 7.6875 2.71875L4.40625 6H14C14.5312 6 14.9688 6.46875 14.9688 7Z" />
                      </svg>
                    </div>
                  </Link>
                  <div className="sm:block hidden">
                    <p className="text-base text-primary-100 mb-1.5">Previous post</p>
                    <p className="text-lg text-primary-900 spline-sans font-semibold">Insure your peace of mind</p>
                  </div>
                </div>
                <div className="flex space-x-[30px] items-center">
                  <div className="sm:block hidden">
                    <p className="text-base text-primary-100 mb-1.5 text-end">Next post</p>
                    <p className="text-lg text-primary-900 spline-sans font-semibold text-end">Insure your peace of mind</p>
                  </div>
                  <Link href="/blog">
                    <div className="w-[60px] h-[60px] rounded-full bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white common-trans flex justify-center items-center">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                        <path d="M0.03125 6C0.03125 5.4375 0.46875 5 1 5L10.5938 5L7.3125 1.6875C6.90625 1.3125 6.90625 0.65625 7.3125 0.28125C7.5 0.09375 7.75 0 8 0C8.28125 0 8.53125 0.09375 8.71875 0.28125L13.7188 5.28125C14.125 5.65625 14.125 6.3125 13.7188 6.6875L8.71875 11.6875C8.34375 12.0938 7.6875 12.0938 7.3125 11.6875C6.90625 11.3125 6.90625 10.6562 7.3125 10.2812L10.5938 7L1 7C0.46875 7 0.03125 6.53125 0.03125 6Z" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Comment form */}
              <p className="sm:text-[30px] font-semibold spline-sans sm:leading-9 text-2xl text-primary-900 mb-2">Leave a comment</p>
              <p className="sm:text-base sm:leading-[27px] text-sm text-primary-100 mb-10">By using this form you agree with the message storage, you can contact us directly now.</p>
              <div className="sm:grid grid-cols-2 gap-[30px] mb-[30px]">
                <div className="flex flex-col space-y-5 mb-5 sm:mb-0">
                  <input type="text" placeholder="Your Name" className="w-full h-[68px] rounded border border-primaryBorder focus:outline-none focus:ring-0 px-5 placeholder:text-primary-100 text-black" />
                  <input type="email" placeholder="E-mail" className="w-full h-[68px] rounded border border-primaryBorder focus:outline-none focus:ring-0 px-5 placeholder:text-primary-100 text-black" />
                  <input type="text" placeholder="Phone Number" className="w-full h-[68px] rounded border border-primaryBorder focus:outline-none focus:ring-0 px-5 placeholder:text-primary-100 text-black" />
                </div>
                <textarea placeholder="Write your message" className="w-full h-full rounded border border-primaryBorder focus:outline-none focus:ring-0 p-5 placeholder:text-primary-100 text-black min-h-[200px]"></textarea>
              </div>
              <div className="mb-[60px]">
                <button className="rounded border border-primaryBorder hover:border-transparent hover:bg-primary-500 common-trans group w-full sm:h-[68px] h-[50px] text-black flex justify-center items-center">
                  <span className="sm:text-lg text-sm font-semibold spline-sans text-gray-800 group-hover:text-white common-trans">Submit Now</span>
                </button>
              </div>

              {/* Missing Post Items Under Submit From HTML */}
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-[30px]">
                {[5, 6].map((num) => (
                  <div key={num} className="item group">
                    <div className="w-full">
                      <div className="w-full h-[275px] rounded overflow-hidden relative mb-5">
                        <img src={mediaUrl(`blog-details-${num}.png`)} alt="" className="w-full h-full object-cover" />
                        <div className="w-full h-full flex justify-center bg-primary-500 bg-opacity-80 items-center absolute left-0 top-0 opacity-0 group-hover:opacity-100 common-trans">
                          <Link href="/blog">
                            <div className="w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center">
                              <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6875 7.71875L8.6875 12.7188C8.5 12.9062 8.25 13 8 13C7.71875 13 7.46875 12.9062 7.28125 12.7188C6.875 12.3438 6.875 11.6875 7.28125 11.3125L10.5625 8H1C0.4375 8 0 7.5625 0 7C0 6.46875 0.4375 6 1 6H10.5625L7.28125 2.71875C6.875 2.34375 6.875 1.6875 7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L13.6875 6.3125C14.0938 6.6875 14.0938 7.34375 13.6875 7.71875Z" fill="#028835"></path></svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <ul className="flex space-x-5 items-center mb-5">
                        <li><span className="text-base leading-[27px] text-primary-100">By Admin</span></li>
                        <li className="flex space-x-2 items-center"><div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div><span className="text-base leading-[27px] text-primary-100">Category</span></li>
                      </ul>
                      <Link href="/blog"><h2 className="xl:text-lg xl:leading-7 text-md font-bold spline-sans text-primary-900 mb-5 hover:text-primary-500 common-trans">Protecting What Matters Most: Secure Your Future Today</h2></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="aside-wrapper lg:col-span-4 col-span-12">
              {/* Search */}
              <div className="w-full mb-[30px]">
                <div className="search-bar w-full h-[50px] bg-secondary rounded flex justify-between items-center overflow-hidden">
                  <input type="text" placeholder="Search Blogs . . ." className="flex-1 h-full focus:outline-none focus:ring-0 px-5 bg-transparent placeholder:text-primary-100 text-black text-sm" />
                  <button className="w-[50px] h-full bg-primary-500 hover:bg-primary-900 common-trans flex justify-center items-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.25 8.625C16.25 10.4219 15.6641 12.1016 14.6875 13.4297L19.6094 18.3906C20.1172 18.8594 20.1172 19.6797 19.6094 20.1484C19.1406 20.6562 18.3203 20.6562 17.8516 20.1484L12.8906 15.1875C11.5625 16.2031 9.88281 16.75 8.125 16.75C3.63281 16.75 0 13.1172 0 8.625C0 4.17188 3.63281 0.5 8.125 0.5C12.5781 0.5 16.25 4.17188 16.25 8.625ZM8.125 14.25C11.2109 14.25 13.75 11.75 13.75 8.625C13.75 5.53906 11.2109 3 8.125 3C5 3 2.5 5.53906 2.5 8.625C2.5 11.75 5 14.25 8.125 14.25Z" fill="white" /></svg>
                  </button>
                </div>
              </div>

              {/* Related Post Slider Backfilled from Root Blog View */}
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
              <div className="w-full mb-[30px]">
                <p className="text-lg leading-7 spline-sans font-bold text-primary-900 mb-[30px]">Categories</p>
                <div className="flex flex-col space-y-2">
                  {[
                    { name: 'Life Insurance', count: 5 },
                    { name: 'Travel Insurance', count: 3 },
                    { name: 'Health Insurance', count: 7 },
                    { name: 'Property Protection', count: 4 },
                    { name: 'Auto Insurance', count: 6 },
                  ].map((cat) => (
                    <a key={cat.name} href="#" className="flex justify-between items-center px-4 py-3 border border-primaryBorder rounded hover:bg-primary-500 hover:border-primary-500 group common-trans">
                      <span className="text-sm text-primary-900 group-hover:text-white font-medium common-trans">{cat.name}</span>
                      <span className="text-xs text-primary-100 group-hover:text-white common-trans">({cat.count})</span>
                    </a>
                  ))}
                </div>
              </div>
              {/* Recent Posts */}
              <div className="w-full mb-[30px]">
                <p className="text-lg leading-7 spline-sans font-bold text-primary-900 mb-[30px]">Recent Post</p>
                <div className="flex flex-col space-y-5">
                  {recentPosts.map((p, i) => (
                    <div key={i} className="flex space-x-[15px] items-center">
                      <div className="w-[80px] h-[80px] rounded overflow-hidden flex-shrink-0">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                    <Link href={`/blog/${p.title.toLowerCase().replace(/ /g, '-')}`}>
                          <p className="text-sm font-semibold spline-sans text-primary-900 hover:text-primary-500 common-trans leading-5 mb-1">{p.title}</p>
                        </Link>
                        <p className="text-xs text-primary-100">{p.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mini Contact Sidebar Banner */}
              <div className="mini-contact w-full h-[304px] flex justify-center items-center mb-[60px]">
                <div>
                  <p className="text-white leading-[27px] text-base text-center mb-[45px]">
                    Aliquam sto, posuere loborti <br />
                    viverra atti ullamcorper
                  </p>
                  <div className="flex justify-center">
                    <Link href="/contact">
                      <div className="px-[42px] py-5 border border-white rounded text-lg font-semibold spline-sans text-white leading-none hover:bg-white hover:text-primary-500 common-trans">
                        <span>Contact Us</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="w-full mb-[30px]">
                <p className="text-lg leading-7 spline-sans font-bold text-primary-900 mb-[30px]">Tags</p>
                <div className="flex flex-wrap gap-2.5">
                  {tags.map((tag) => (
                    <a key={tag} href="#" className="px-4 py-2 border border-primaryBorder rounded text-sm text-primary-100 hover:bg-primary-500 hover:text-white hover:border-primary-500 common-trans">{tag}</a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

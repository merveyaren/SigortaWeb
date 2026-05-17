export const dynamic = 'force-dynamic';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { apiService } from '@/lib/api';
import { notFound } from 'next/navigation';
import { mediaUrl } from '@/lib/media';

const CircleCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8C0 3.59375 3.5625 0 8 0C12.4062 0 16 3.59375 16 8C16 12.4375 12.4062 16 8 16C3.5625 16 0 12.4375 0 8ZM11.5938 6.625C11.9375 6.28125 11.9375 5.75 11.5938 5.40625C11.25 5.0625 10.7188 5.0625 10.375 5.40625L7 8.78125L5.59375 7.40625C5.25 7.0625 4.71875 7.0625 4.375 7.40625C4.03125 7.75 4.03125 8.28125 4.375 8.625L6.375 10.625C6.71875 10.9688 7.25 10.9688 7.59375 10.625L11.5938 6.625Z" fill="#028835" />
  </svg>
);

const ArrowRight = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.6875 7.71875L8.6875 12.7188C8.5 12.9062 8.25 13 8 13C7.71875 13 7.46875 12.9062 7.28125 12.7188C6.875 12.3438 6.875 11.6875 7.28125 11.3125L10.5625 8H1C0.4375 8 0 7.5625 0 7C0 6.46875 0.4375 6 1 6H10.5625L7.28125 2.71875C6.875 2.34375 6.875 1.6875 7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L13.6875 6.3125C14.0938 6.6875 14.0938 7.34375 13.6875 7.71875Z" fill="#028835" />
  </svg>
);

const categories = ['Cyber Insurance', 'Professional Liability', 'Employment Practices', 'Errors and Omissions (E&O)', 'Laboratory', 'Elder Services', 'Directors and Officers (D&O)', 'Earthquake Insurance', 'Compensation Insurance'];

const subServices = [
  { title: 'Cost Optimization', img: mediaUrl('blog-1.png'), icon: mediaUrl('service-1.svg') },
  { title: 'Strategic Protection', img: mediaUrl('blog-2.png'), icon: mediaUrl('service-2.svg') },
  { title: 'Standard Setup', img: mediaUrl('blog-3.png'), icon: mediaUrl('service-3.svg') },
  { title: 'Regular Update', img: mediaUrl('blog-6.png'), icon: mediaUrl('service-4.svg') },
];

async function getService(slug: string) {
  try {
    const res = await apiService.getServiceBySlug(slug);
    return res.data;
  } catch {
    return null;
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);

  const title = service?.title || 'Risk Assessment';
  const description = service?.description || 'Aliquam eros justo, posuere loborti viverra laoreet ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis non viverra laoreet augue mattis fermentum ullamcorper viverra laoreet.';
  const img = service?.icon_url || mediaUrl('service-details-1.png');

  return (
    <>
      <PageBanner title="Service Details" breadcrumb="Service Details" />
      <div className="lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        <div className="theme-container mx-auto">
          <div className="lg:grid grid-cols-12 gap-[30px] mb-[60px] sm:mb-0">
            {/* Main Content */}
            <div className="body-content-wrapper lg:col-span-8 mb-10 lg:mb-0">
              <div className="border-b border-primaryBorder pb-[60px] mb-[60px]">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-[30px] items-center mb-[60px]">
                  <div className="article-area">
                    <p className="sm:text-xl sm:leading-8 text-lg font-bold spline-sans text-primary-500 mb-2">What we offer</p>
                    <h2 className="headline-default text-primary-900 mb-5">Future for your made insurance business</h2>
                    <p className="text-base leading-[27px] text-primary-100 mb-[60px]">{description}</p>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-[30px]">
                      {[{ label: 'Comprehensive', desc: 'Will be distrol acte bioiiy desig is fact that a reader will acted' }, { label: 'Holistic Risk', desc: 'Will be distrol acte bioiiy desig is fact that a reader will acted' }].map((item) => (
                        <div key={item.label}>
                          <p className="flex space-x-2.5 items-center">
                            <span><CircleCheck /></span>
                            <span className="text-lg font-bold spline-sans leading-7 text-primary-900">{item.label}</span>
                          </p>
                          <p className="text-base leading-[27px] text-primary-100">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="thumb">
                    <div className="w-full h-[400px] rounded overflow-hidden">
                      <img src={img} alt={title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <p className="text-base leading-[27px] text-primary-100 mb-2.5">Aliquam eros justo, posuere loborti viverra laoreet ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis no viverra laoreet augue mattis fermentum ullamcorper viverra laoreet Aliquam eros justo.</p>
                <p className="text-base leading-[27px] text-primary-100">Aliquam eros justo, posuere loborti viverra laorko matti ullamcor posuere viverra .Aliquam erosto, posuere lobortis non viverra laoreet augue mis fermentum ullamcorper viverra lao Aliquam eros justo.</p>
              </div>

              {/* Sub-service cards */}
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-[30px]">
                {subServices.map((s) => (
                  <div key={s.title} className="w-full rounded overflow-hidden border border-primaryBorder group">
                    <div className="w-full px-10 pt-10 pb-[50px]">
                      <h2 className="font-bold text-gray-900 spline-sans text-lg leading-7 mb-2.5">{s.title}</h2>
                      <p className="text-base leading-[27px] text-primary-100">Don&apos;t just take our word for it hear what our customers have to say about how we have helped thousand people.</p>
                    </div>
                    <div className="w-full h-[275px] relative">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                      <div className="w-[60px] h-[60px] border border-primaryBorder rounded flex justify-center items-center absolute left-10 -top-[30px] bg-white z-10">
                        <img src={s.icon} alt="" />
                      </div>
                      <div className="w-full h-full flex justify-center bg-primary-500 bg-opacity-80 items-center absolute left-0 top-0 opacity-0 group-hover:opacity-100 common-trans">
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center">
                          <span><ArrowRight /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="aside-wrapper lg:col-span-4">
              {/* Categories */}
              <div className="w-full mb-[60px]">
                <p className="text-lg leading-7 spline-sans font-bold text-primary-900 mb-[30px]">Category</p>
                <ul>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link href="/services">
                        <span className="py-5 border-b border-primaryBorder text-primary-100 block hover:text-primary-500 text-base hover:font-medium">{c}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini CTA */}
              <div 
                className="mini-contact w-full h-[304px] flex justify-center items-center mb-[60px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${mediaUrl('min-contact-bg.png')})` }}
              >
                <div>
                  <h2 className="text-white text-lg spline-sans leading-7 font-bold text-center mb-2.5">Work with us</h2>
                  <p className="text-white leading-[27px] text-base text-center mb-[45px]">Aliquam sto, posuere loborti <br />viverra atti ullamcorper</p>
                  <div className="flex justify-center">
                    <Link href="/contact">
                      <div className="px-[42px] py-5 border border-white rounded text-lg font-semibold spline-sans text-white leading-none hover:bg-white hover:text-primary-500 common-trans">
                        <span>Contact Us</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar form */}
              <div className="w-full mb-[60px]">
                <p className="text-lg leading-7 spline-sans font-bold text-primary-900 mb-[20px]">Information</p>
                <form>
                  <label className="block mb-5">
                    <input placeholder="Full name" type="text" className="focus:outline-none focus:ring-0 w-full h-[50px] rounded border-primaryBorder border placeholder:text-primary-100 text-black text-base px-5" />
                  </label>
                  <label className="block mb-5">
                    <input placeholder="Phone Number" type="text" className="focus:outline-none focus:ring-0 w-full h-[50px] rounded border-primaryBorder border placeholder:text-primary-100 text-black text-base px-5" />
                  </label>
                  <button type="button" className="w-full h-[50px] rounded bg-primary-500 text-white text-lg font-semibold spline-sans hover:bg-primary-900 common-trans">
                    Submit Now
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

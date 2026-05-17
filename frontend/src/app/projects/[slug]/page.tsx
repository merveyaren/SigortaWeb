export const dynamic = 'force-dynamic';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { apiService } from '@/lib/api';
import { mediaUrl } from '@/lib/media';

const CircleCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8C0 3.59375 3.5625 0 8 0C12.4062 0 16 3.59375 16 8C16 12.4375 12.4062 16 8 16C3.5625 16 0 12.4375 0 8ZM11.5938 6.625C11.9375 6.28125 11.9375 5.75 11.5938 5.40625C11.25 5.0625 10.7188 5.0625 10.375 5.40625L7 8.78125L5.59375 7.40625C5.25 7.0625 4.71875 7.0625 4.375 7.40625C4.03125 7.75 4.03125 8.28125 4.375 8.625L6.375 10.625C6.71875 10.9688 7.25 10.9688 7.59375 10.625L11.5938 6.625Z" fill="#028835" />
  </svg>
);

async function getProject(slug: string) {
  try {
    const res = await apiService.getProjectBySlug(slug);
    return res.data;
  } catch {
    return null;
  }
}

const features = [
  { num: '01', title: 'Safe Haven Insurance', desc: 'Oshed fact that a reader will be distrol acted bioiiy desig.' },
  { num: '02', title: 'Guardian Coverage', desc: 'Oshed fact that a reader will be distrol acted bioiiy desig.' },
  { num: '03', title: 'Protect Shield', desc: 'Oshed fact that a reader will be distrol acted bioiiy desig.' },
  { num: '04', title: 'Coverage Care', desc: 'Oshed fact that a reader will be distrol acted bioiiy desig.' },
];

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  const title = project?.title || 'A Lifetime Insurance';
  const description = project?.description || 'Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra.';
  const img = project?.cover_image_url || mediaUrl('project-details-thumb-1.png');
  const category = project?.category ? (typeof project.category === 'object' ? project.category.name : project.category) : 'Insurance';
  const date = project?.created_at ? new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'November 19, 2022';

  return (
    <>
      <PageBanner title="Project Details" breadcrumb="Project Details" />
      <div className="lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        <div className="theme-container mx-auto">
          <div className="lg:grid grid-cols-12 gap-[30px] mb-[80px]">
            <div className="col-span-7 mb-10 lg:mb-0">
              <div className="w-full h-[440px] rounded overflow-hidden">
                <img src={img} alt={title} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="col-span-5 relative">
              <h2 className="headline-default text-primary-900 mb-2.5">{title}</h2>
              <p className="text-base leading-[27px] text-primary-100 mb-2.5">{description}</p>
              <p className="text-base leading-[27px] text-primary-100 xl:mb-[60px] mb-10">Aliquam eros justo, posuere loborti viverra .Aliquam eros justo, posuere lobortis non.</p>
              <div style={{ backgroundImage: `url(${mediaUrl('Info-project-details.png')})` }} className="lg:w-[583px] w-full xl:h-[218px] h-[200px] bg-no-repeat lg:bg-contain bg-cover lg:absolute -left-20 flex justify-center items-center px-5 sm:px-[60px]">
                <div className="grid grid-cols-2 justify-between gap-y-[30px] w-full">
                  {[{ label: 'Client', val: 'Sandi leo rakiul' }, { label: 'Category', val: category }, { label: 'Amount', val: '45,000$' }, { label: 'Date', val: date }].map((item) => (
                    <div key={item.label} className="flex sm:space-x-[30px] space-x-5 items-center">
                      <div className="w-[1px] h-[36px] bg-white bg-opacity-20"></div>
                      <div>
                        <p className="text-white text-base leading-[27px]">{item.label}</p>
                        <p className="text-white text-lg font-semibold spline-sans leading-[27px]">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="text-base leading-[27px] text-primary-100 mb-5">Sliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam eros justo, posuere lobortis, aoreet augue mattis ferment ullamcorper viverra laoreet.</p>
          <p className="text-base leading-[27px] text-primary-100 mb-[60px]">Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra. Aliquam erosto, posuere lobortis non, viverra laoreet augue mis fermentum ullamcorper viverra laoreet.</p>
          <h2 className="text-[30px] font-bold leading-[36px] spline-sans text-primary-900 mb-5">Your backup plan for life</h2>
          <p className="text-base leading-[27px] text-primary-100 mb-10">Aliquam eros justo, posuere loborti vive rra laoreet matti ullamc orper posu ere viverra. Aliquam eros justo, posuere lobor, viverra laoreet augue mattis fermentum.</p>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-[100px] gap-y-[60px] w-full lg:pb-[120px] pb-[60px] border-b border-primaryBorder">
            {features.map((f) => (
              <div key={f.num} className="lg:flex items-end lg:space-x-[50px]">
                <div className="mb-5 lg:mb-0">
                  <p className="flex space-x-2.5 items-center mb-2.5">
                    <span><CircleCheck /></span>
                    <span className="text-lg font-bold spline-sans leading-7 text-primary-900">{f.title}</span>
                  </p>
                  <p className="text-base leading-[27px] text-primary-100">{f.desc}</p>
                </div>
                <span className="font-bold spline-sans text-[70px] text-[#E3E3E3] leading-[63px] inline">{f.num}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-10 border-b border-primaryBorder mb-[60px]">
            <div className="flex space-x-[30px] items-center">
              <Link href="/projects">
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
              <Link href="/projects">
                <div className="w-[60px] h-[60px] rounded-full bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white common-trans flex justify-center items-center">
                  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                    <path d="M0.03125 6C0.03125 5.4375 0.46875 5 1 5L10.5938 5L7.3125 1.6875C6.90625 1.3125 6.90625 0.65625 7.3125 0.28125C7.5 0.09375 7.75 0 8 0C8.28125 0 8.53125 0.09375 8.71875 0.28125L13.7188 5.28125C14.125 5.65625 14.125 6.3125 13.7188 6.6875L8.71875 11.6875C8.34375 12.0938 7.6875 12.0938 7.3125 11.6875C6.90625 11.3125 6.90625 10.6562 7.3125 10.2812L10.5938 7L1 7C0.46875 7 0.03125 6.53125 0.03125 6Z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

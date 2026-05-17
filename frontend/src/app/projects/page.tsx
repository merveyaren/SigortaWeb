export const dynamic = "force-dynamic";
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { apiService } from '@/lib/api';
import { ProjectListItem } from '@/types';
import { mediaUrl } from '@/lib/media';

async function getProjects() {
  try {
    const res = await apiService.getProjects();
    return res.data as ProjectListItem[];
  } catch {
    return [];
  }
}

const staticProjects = [
  { title: 'Coverage Pro', category: 'Insurance', img: mediaUrl('blog-4.png'), slug: 'coverage-pro' },
  { title: 'Securely', category: 'Health', img: mediaUrl('blog-5.png'), slug: 'securely' },
  { title: 'Risk Proof', category: 'Life', img: mediaUrl('blog-1.png'), slug: 'risk-proof' },
  { title: 'Life Guard', category: 'Property', img: mediaUrl('blog-1.png'), slug: 'life-guard' },
  { title: 'Auto Safe', category: 'Auto', img: mediaUrl('blog-4.png'), slug: 'auto-safe' },
  { title: 'Business Pro', category: 'Business', img: mediaUrl('blog-5.png'), slug: 'business-pro' },
];

export default async function ProjectsPage() {
  const apiProjects = await getProjects();
  const projects = apiProjects.length > 0 ? apiProjects : null;

  return (
    <>
      <PageBanner title="Projects" breadcrumb="Projects" />
      <div className="lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        <div className="theme-container mx-auto">
          <div className="w-full">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-y-[80px] gap-y-[60px] gap-x-[30px]">
              {projects ? projects.map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`}>
                  <div className="w-full relative group">
                    <div className="w-full h-[440px] rounded overflow-hidden">
                      <img
                        src={p.cover_image_url || mediaUrl('blog-4.png')}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full px-10 absolute -bottom-[34px]">
                      <div style={{ boxShadow: '0 0 60px rgba(0, 0, 0, 0.05)' }} className="w-full h-[68px] bg-white rounded flex justify-center items-center group-hover:bg-primary-500 common-trans">
                        <span className="text-lg font-bold spline-sans text-primary-900 group-hover:text-white common-trans">{p.title}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )) : staticProjects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                  <div className="w-full relative group">
                    <div className="w-full h-[440px] rounded overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full px-10 absolute -bottom-[34px]">
                      <div style={{ boxShadow: '0 0 60px rgba(0, 0, 0, 0.05)' }} className="w-full h-[68px] bg-white rounded flex justify-center items-center group-hover:bg-primary-500 common-trans">
                        <span className="text-lg font-bold spline-sans text-primary-900 group-hover:text-white common-trans">{p.title}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

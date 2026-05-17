export const dynamic = "force-dynamic";
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { apiService } from '@/lib/api';
import { ServiceListItem } from '@/types';
import { mediaUrl } from '@/lib/media';

const CheckArrow = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L6.6875 10.7188C6.3125 11.125 5.65625 11.125 5.28125 10.7188L1.28125 6.71875C0.875 6.34375 0.875 5.6875 1.28125 5.3125C1.65625 4.90625 2.3125 4.90625 2.6875 5.3125L5.96875 8.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125Z" fill="#028835" />
  </svg>
);

const staticServices = [
  { num: '01', icon: 'service-1.svg', title: 'Risk Assessment', features: ['Coverage Review', 'Coverage Review', 'Business Insurance'], slug: 'risk-assessment' },
  { num: '02', icon: 'service-2.svg', title: 'Claims Management', features: ['Life Insurance', 'Health Insurance', 'Property Protection'], slug: 'claims-management' },
  { num: '03', icon: 'service-3.svg', title: 'Liability Protection', features: ['Cyber Liability', 'Business Insurance', 'Life Insurance'], slug: 'liability-protection' },
  { num: '04', icon: 'service-4.svg', title: 'Coverage Review', features: ['Fast Coverage', 'Business Insurance', 'Life Insurance'], slug: 'coverage-review' },
  { num: '05', icon: 'service-1.svg', title: 'Financial Planning', features: ['Coverage Review', 'Coverage Review', 'Business Insurance'], slug: 'financial-planning' },
  { num: '06', icon: 'service-2.svg', title: 'Property Insurance', features: ['Life Insurance', 'Health Insurance', 'Property Protection'], slug: 'property-insurance' },
];

async function getServices() {
  try {
    const res = await apiService.getServices();
    return res.data as ServiceListItem[];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const apiServices = await getServices();
  const services = apiServices.length > 0 ? apiServices : null;

  return (
    <>
      <PageBanner title="Services" breadcrumb="Services" />
      <div className="lg:pt-[120px] lg:pb-[240px] pt-[60px] pb-[120px]">
        <div className="theme-container mx-auto">
          <div className="w-full grid sm:grid-cols-3 grid-cols-1 gap-[30px] pb-[60px] sm:pb-0">
            {services ? services.map((s, i) => (
              <Link key={s.id} href={`/services/${s.slug}`}>
                <div className="service-item bg-white w-full lg:p-10 p-6 rounded border border-primaryBorder h-full">
                  <p className="text-lg font-semibold text-gray-700 mb-9">Service 0{i + 1}</p>
                  <div className="mb-8">
                    {s.icon_url
                      ? <img src={s.icon_url} alt={s.title} width="58" height="62" />
                      : <img src={mediaUrl(`service-${(i % 4) + 1}.svg`)} alt={s.title} width="58" height="62" />}
                  </div>
                  <p className="lg:text-lg text-sm font-bold spline-sans sm:leading-7 text-primary-900 mb-5">{s.title}</p>
                  <p className="text-sm text-primary-100 mb-5">{s.short_description}</p>
                  <ul className="flex flex-col space-y-2.5">
                    {['Coverage Review', 'Business Insurance', 'Life Insurance'].map((f) => (
                      <li key={f} className="flex justify-between items-center">
                        <span className="lg:text-base text-sm text-primary-900">{f}</span>
                        <span><CheckArrow /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            )) : staticServices.map((s) => (
              <Link key={s.num} href={`/services/${s.slug}`}>
                <div className="service-item bg-white w-full lg:p-10 p-6 rounded border border-primaryBorder h-full">
                  <p className="text-lg font-semibold text-gray-700 mb-9">Service {s.num}</p>
                  <div className="mb-8">
                    <img src={mediaUrl(s.icon)} alt={s.title} width="58" height="62" />
                  </div>
                  <p className="lg:text-lg text-sm font-bold spline-sans sm:leading-7 text-primary-900 mb-5">{s.title}</p>
                  <ul className="flex flex-col space-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex justify-between items-center">
                        <span className="lg:text-base text-sm text-primary-900">{f}</span>
                        <span><CheckArrow /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

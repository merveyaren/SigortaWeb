import Link from 'next/link';
import { mediaUrl } from '@/lib/media';

interface PageBannerProps {
  title: string;
  breadcrumb: string;
}

export default function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <section 
      className="page-title-wrapper w-full h-[345px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${mediaUrl('inner-page-banner.png')})` }}
    >
      <div className="theme-container mx-auto h-full">
        <div
          className="w-full h-full flex sm:flex-row flex-col sm:justify-between justify-center space-y-3 sm:space-y-0 items-center"
        >
          <h2 className="headline-default text-primary-900">{title}</h2>
          <ul className="breadcrumb-wrapper flex space-x-5 items-center">
            <li className="breadcrumb-item">
              <Link href="/">
                <div className="flex space-x-5 items-center">
                  <span className="sm:text-lg text-primary-500 sm:leading-[27px] text-sm font-semibold spline-sans">Home</span>
                  <span className="ico">
                    <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12.5C1.71875 12.5 1.46875 12.4062 1.28125 12.2188C0.875 11.8438 0.875 11.1875 1.28125 10.8125L5.5625 6.5L1.28125 2.21875C0.875 1.84375 0.875 1.1875 1.28125 0.8125C1.65625 0.40625 2.3125 0.40625 2.6875 0.8125L7.6875 5.8125C8.09375 6.1875 8.09375 6.84375 7.6875 7.21875L2.6875 12.2188C2.5 12.4062 2.25 12.5 2 12.5Z" fill="#028835" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">
                <div className="flex space-x-5 items-center">
                  <span className="sm:text-lg text-primary-500 sm:leading-[27px] text-sm font-semibold spline-sans">{breadcrumb}</span>
                  <span className="ico">
                    <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12.5C1.71875 12.5 1.46875 12.4062 1.28125 12.2188C0.875 11.8438 0.875 11.1875 1.28125 10.8125L5.5625 6.5L1.28125 2.21875C0.875 1.84375 0.875 1.1875 1.28125 0.8125C1.65625 0.40625 2.3125 0.40625 2.6875 0.8125L7.6875 5.8125C8.09375 6.1875 8.09375 6.84375 7.6875 7.21875L2.6875 12.2188C2.5 12.4062 2.25 12.5 2 12.5Z" fill="#028835" />
                    </svg>
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

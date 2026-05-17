import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import Scripts from "@/components/Scripts";
import { mediaUrl } from "@/lib/media";
import AzureMonitoring from "@/lib/monitoring";


export const metadata: Metadata = {
  title: "Insucom - Insurance Agency",
  description: "Secure your future with us. Professional insurance solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" type="image/png" href={mediaUrl("favicon.png")} />
        <link rel="stylesheet" href="/css/swiper.min.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/output.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <AzureMonitoring />
        <div className="mouse-cursor cursor-outer"></div>
        <div className="mouse-cursor cursor-inner"></div>
        <HeaderWrapper />
        <main>{children}</main>
        <FooterWrapper />

        {/* Video Popup */}
        <div className="popv-main-wrapper">
          <div className="popv-bg popv-ready"></div>
          <div className="popv-wrap popv-close-btn-in popv-auto-cursor popv-ready" tabIndex={-1} style={{ overflow: 'hidden' }}>
            <div className="popv-container popv-s-ready popv-iframe-holder">
              <div className="popv-content">
                <div className="popv-iframe-scaler">
                  <button title="Close (Esc)" type="button" className="popv-close">×</button>
                  <iframe title="video" className="popv-iframe" src="https://www.youtube.com/embed/3ctoSEQsY54" frameBorder={0} allowFullScreen></iframe>
                </div>
              </div>
              <div className="popv-preloader">Loading...</div>
            </div>
          </div>
        </div>

        <Scripts />
      </body>
    </html>
  );
}

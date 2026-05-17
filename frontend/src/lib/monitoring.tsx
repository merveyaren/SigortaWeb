'use client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

// Azure Application Insights SDK Yapılandırması
export const appInsights = new ApplicationInsights({
    config: {
        // Grafana ile eşleşen Azure Monitor bağlantı dizgeniz
        connectionString: 'InstrumentationKey=8fecc5ca-aa73-4e6c-9807-1f4c866c8c3a;IngestionEndpoint=https://northeurope-2.in.applicationinsights.azure.com/;LiveEndpoint=https://northeurope.livediagnostics.monitor.azure.com/;ApplicationId=8880957f-3fb8-4a81-aad1-8d2d01be886d',
        enableAutoRouteTracking: true,
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
    }
});

// Sadece tarayıcı tarafında çalışacak şekilde tek seferlik yükleme
if (typeof window !== 'undefined') {
    try {
        appInsights.loadAppInsights();
    } catch (e) {
        console.error('Azure Application Insights yüklenirken hata oluştu:', e);
    }
}

function MonitoringHandler() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 🌟 1. KULLANICI DAVRANIŞI: Dinamik Sayfa Geçişi ve Ziyaretlerin Takibi
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
            
            // Sayfa gösterimini ve oturumu (Session) izler
            appInsights.trackPageView({
                name: pathname,
                uri: window.location.href,
                properties: {
                    url,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent
                }
            });
            console.log(`[Telemetry - User Behavior] Page Tracked: ${pathname}`);
        }
    }, [pathname, searchParams]);

    // 🌟 2. SAYFA YÜKLENME SÜRELERİ (Performance Navigation Timing API)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const trackPerformance = () => {
                // Modern tarayıcı performans API verilerini al
                const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
                if (entry) {
                    const pageLoadTime = entry.loadEventEnd - entry.startTime;
                    const domReadyTime = entry.domContentLoadedEventEnd - entry.startTime;
                    const dnsLookupTime = entry.domainLookupEnd - entry.domainLookupStart;

                    // Grafana metrik panellerinde çizdirilmek üzere özel performans olayı fırlat
                    appInsights.trackEvent({
                        name: 'PageLoadPerformance',
                        properties: {
                            pathname,
                            url: window.location.href,
                        },
                        measurements: {
                            pageLoadTimeMs: pageLoadTime,
                            domReadyTimeMs: domReadyTime,
                            dnsLookupTimeMs: dnsLookupTime
                        }
                    });
                    console.log(`[Telemetry - Performance] Load Time: ${pageLoadTime.toFixed(2)}ms | DOM Ready: ${domReadyTime.toFixed(2)}ms`);
                }
            };

            // Sayfa yüklemesi zaten bittiyse anında çalıştır, bitmediyse 'load' olayını bekle
            if (document.readyState === 'complete') {
                // Load event bittikten hemen sonra tetiklemesi için hafif bir delay verelim
                setTimeout(trackPerformance, 100);
            } else {
                window.addEventListener('load', trackPerformance);
                return () => window.removeEventListener('load', trackPerformance);
            }
        }
    }, [pathname]);

    return null;
}

// Next.js App Router uyumluluğu için Suspense ile sarmalıyoruz
export default function AzureMonitoring() {
    return (
        <Suspense fallback={null}>
            <MonitoringHandler />
        </Suspense>
    );
}

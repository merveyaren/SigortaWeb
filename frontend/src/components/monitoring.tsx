'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
        console.log("🚀 [Azure Telemetry] SDK başarıyla yüklendi.");
    } catch (e) {
        console.error('Azure Application Insights yüklenirken hata oluştu:', e);
    }
}

export default function AzureMonitoring() {
    const pathname = usePathname();

    // 🌟 1. KULLANICI DAVRANIŞI: Dinamik Sayfa Geçişlerinin Takibi
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                // Sayfa gösterimini ve oturumu (Session) izler
                appInsights.trackPageView({
                    name: pathname || '/',
                    uri: window.location.href,
                    properties: {
                        referrer: document.referrer,
                        userAgent: navigator.userAgent
                    }
                });
                console.log(`🚀 [Azure Telemetry] Sayfa Ziyareti Kaydedildi: ${pathname}`);
            } catch (err) {
                console.error("Azure Telemetry Sayfa Takip Hatası:", err);
            }
        }
    }, [pathname]);

    // 🌟 2. SAYFA YÜKLENME SÜRELERİ (Performance Navigation Timing API)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const trackPerformance = () => {
                try {
                    // Modern tarayıcı performans API verilerini al
                    const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
                    if (entry) {
                        const pageLoadTime = entry.loadEventEnd - entry.startTime;
                        const domReadyTime = entry.domContentLoadedEventEnd - entry.startTime;
                        const dnsLookupTime = entry.domainLookupEnd - entry.domainLookupStart;

                        // Grafana için özel performans olayı fırlat
                        appInsights.trackEvent({
                            name: 'PageLoadPerformance',
                            properties: {
                                pathname: pathname || '/',
                                url: window.location.href,
                            },
                            measurements: {
                                pageLoadTimeMs: pageLoadTime,
                                domReadyTimeMs: domReadyTime,
                                dnsLookupTimeMs: dnsLookupTime
                            }
                        });
                        console.log(`🚀 [Azure Telemetry] Performans Kaydedildi: ${pageLoadTime.toFixed(2)}ms`);
                    }
                } catch (err) {
                    console.error("Azure Telemetry Performans Takip Hatası:", err);
                }
            };

            // Sayfa yüklemesi zaten bittiyse anında çalıştır, bitmediyse 'load' olayını bekle
            if (document.readyState === 'complete') {
                setTimeout(trackPerformance, 100);
            } else {
                window.addEventListener('load', trackPerformance);
                return () => window.removeEventListener('load', trackPerformance);
            }
        }
    }, [pathname]);

    return null;
}

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
'use client';

export const appInsights = new ApplicationInsights({
    config: {
        // BURAYA: Azure'dan kopyaladığınız Connection String'i yapıştırın
        connectionString: 'InstrumentationKey=8fecc5ca-aa73-4e6c-9807-1f4c866c8c3a;IngestionEndpoint=https://northeurope-2.in.applicationinsights.azure.com/;LiveEndpoint=https://northeurope.livediagnostics.monitor.azure.com/;ApplicationId=8880957f-3fb8-4a81-aad1-8d2d01be886d',
        enableAutoRouteTracking: true, // Sayfa geçişlerini otomatik izler
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
    }
});

// Sadece tarayıcı tarafında çalışması için kontrol ekliyoruz
if (typeof window !== 'undefined') {
    appInsights.loadAppInsights();
    appInsights.trackPageView(); // İlk sayfa açılışını izler
}

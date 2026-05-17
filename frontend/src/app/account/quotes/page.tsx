'use client';
import { useEffect, useState } from 'react';
import { apiService } from '@/lib/api';
import { Quote } from '@/types';

const statusClass: Record<string, string> = {
  draft: 'badge-gray',
  sent: 'badge-yellow',
  accepted: 'badge-green',
  rejected: 'badge-red',
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiService.getMyQuotes()
      .then((res) => setQuotes(res.data as Quote[]))
      .catch(() => setError('Teklifler yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004C3F]">Tekliflerim</h1>
          <p className="text-[#677471] text-sm mt-1">Talep ettiğiniz sigorta teklifleri</p>
        </div>
        <span className="badge badge-green">{quotes.length} Teklif</span>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><div className="spinner" /></div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-16 text-[#677471]">
            <span className="text-5xl block mb-4">💼</span>
            <p>Henüz teklif talebiniz bulunmuyor.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Referans No</th>
                <th>Hizmet Türü</th>
                <th>Talep Tarihi</th>
                <th>Teklif Tutarı</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id}>
                  <td className="text-[#004C3F] font-semibold">{q.reference_code}</td>
                  <td>{q.product_type}</td>
                  <td>{new Date(q.created_at).toLocaleDateString('tr-TR')}</td>
                  <td className="font-semibold">{parseFloat(q.offered_premium.toString()).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                  <td>
                    <span className={`badge ${statusClass[q.status] ?? 'badge-gray'}`}>
                      {q.status === 'draft' ? 'Taslak' : q.status === 'sent' ? 'Gönderildi' : q.status === 'accepted' ? 'Kabul Edildi' : 'Reddedildi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

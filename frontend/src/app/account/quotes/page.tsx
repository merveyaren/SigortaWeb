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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productType, setProductType] = useState('Kasko Sigortası');
  const [offeredPremium, setOfferedPremium] = useState('4200.00');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiService.getMyQuotes()
      .then((res) => setQuotes(res.data as Quote[]))
      .catch(() => setError('Teklifler yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  const refreshQuotes = () => {
    apiService.getMyQuotes().then((res) => setQuotes(res.data as Quote[]));
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    apiService.createQuote({
      product_type: productType,
      offered_premium: parseFloat(offeredPremium) || 0,
      notes: notes
    })
      .then(() => {
        setIsModalOpen(false);
        setNotes('');
        refreshQuotes();
      })
      .catch(() => alert('Teklif oluşturulurken bir hata oluştu.'))
      .finally(() => setSubmitting(false));
  };

  const handleDeleteQuote = (id: number) => {
    if (confirm('Bu teklif talebini iptal etmek istediğinize emin misiniz?')) {
      apiService.deleteQuote(id)
        .then(() => refreshQuotes())
        .catch(() => alert('Teklif silinirken bir hata oluştu.'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004C3F]">Tekliflerim</h1>
          <p className="text-[#677471] text-sm mt-1">Talep ettiğiniz sigorta teklifleri</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="badge badge-green hover:opacity-90 transition-opacity"
            style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer', border: 'none' }}
          >
            + Yeni Teklif İste
          </button>
          <span className="badge badge-green">{quotes.length} Teklif</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card p-6" style={{ width: '450px', maxWidth: '90%' }}>
            <h2 className="text-xl font-bold text-[#004C3F] mb-4">Yeni Sigorta Teklifi İste</h2>
            <form onSubmit={handleCreateQuote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#677471] mb-1">Sigorta Türü</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full p-2 border rounded"
                  style={{ fontSize: '14px' }}
                >
                  <option value="Kasko Sigortası">Kasko Sigortası</option>
                  <option value="Özel Sağlık Sigortası">Özel Sağlık Sigortası</option>
                  <option value="Konut Sigortası">Konut Sigortası</option>
                  <option value="DASK Deprem Sigortası">DASK Deprem Sigortası</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#677471] mb-1">Bütçe Limiti (₺)</label>
                <input
                  type="number"
                  value={offeredPremium}
                  onChange={(e) => setOfferedPremium(e.target.value)}
                  className="w-full p-2 border rounded"
                  style={{ fontSize: '14px' }}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#677471] mb-1">Talebiniz / Notlar</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                  style={{ fontSize: '14px' }}
                  placeholder="Araç marka/model veya konut detayları..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 px-4 rounded border text-sm"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="p-2 px-4 rounded text-sm text-white"
                  style={{ backgroundColor: '#004C3F', fontWeight: 'bold' }}
                >
                  {submitting ? 'Gönderiliyor...' : 'Teklif İste'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <th>İşlem</th>
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
                  <td>
                    <button
                      onClick={() => handleDeleteQuote(q.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs"
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      İptal Et
                    </button>
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

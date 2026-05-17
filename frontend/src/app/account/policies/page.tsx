'use client';
import { useEffect, useState } from 'react';
import { apiService } from '@/lib/api';
import { Policy } from '@/types';

const statusClass: Record<string, string> = {
  active: 'badge-green',
  lapsed: 'badge-red',
  cancelled: 'badge-gray',
};

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('Kasko Sigortası');
  const [premiumAmount, setPremiumAmount] = useState('9500.00');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiService.getMyPolicies()
      .then((res) => setPolicies(res.data as Policy[]))
      .catch(() => setError('Poliçeler yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  const refreshPolicies = () => {
    apiService.getMyPolicies().then((res) => setPolicies(res.data as Policy[]));
  };

  const handleCreatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    apiService.createPolicy({
      product_name: productName,
      premium_amount: parseFloat(premiumAmount) || 0,
      currency: 'TRY',
      status: 'active'
    })
      .then(() => {
        setIsModalOpen(false);
        refreshPolicies();
      })
      .catch(() => alert('Poliçe oluşturulurken bir hata oluştu.'))
      .finally(() => setSubmitting(false));
  };

  const handleCancelPolicy = (id: number) => {
    if (confirm('Bu sigorta poliçesini iptal etmek istediğinize emin misiniz?')) {
      apiService.updatePolicy(id, { status: 'cancelled' })
        .then(() => refreshPolicies())
        .catch(() => alert('Poliçe iptal edilirken bir hata oluştu.'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004C3F]">Poliçelerim</h1>
          <p className="text-[#677471] text-sm mt-1">Aktif ve geçmiş poliçeleriniz</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="badge badge-green hover:opacity-90 transition-opacity"
            style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer', border: 'none' }}
          >
            + Yeni Poliçe Satın Al
          </button>
          <span className="badge badge-green">{policies.length} Poliçe</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card p-6" style={{ width: '450px', maxWidth: '90%' }}>
            <h2 className="text-xl font-bold text-[#004C3F] mb-4">Yeni Poliçe Satın Al</h2>
            <form onSubmit={handleCreatePolicy} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#677471] mb-1">Sigorta Türü</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
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
                <label className="block text-xs font-semibold text-[#677471] mb-1">Prim Tutarı (₺)</label>
                <input
                  type="number"
                  value={premiumAmount}
                  onChange={(e) => setPremiumAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  style={{ fontSize: '14px' }}
                  required
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
                  {submitting ? 'Hazırlanıyor...' : 'Satın Al'}
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
        ) : policies.length === 0 ? (
          <div className="text-center py-16 text-[#677471]">
            <span className="text-5xl block mb-4">📋</span>
            <p>Henüz poliçeniz bulunmuyor.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Poliçe No</th>
                <th>Tür</th>
                <th>Başlangıç</th>
                <th>Bitiş</th>
                <th>Prim</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((p) => (
                <tr key={p.id}>
                  <td className="font-mono text-[#004C3F] font-semibold">{p.policy_number}</td>
                  <td>{p.product_name}</td>
                  <td>{new Date(p.start_date).toLocaleDateString('tr-TR')}</td>
                  <td>{new Date(p.end_date).toLocaleDateString('tr-TR')}</td>
                  <td className="font-semibold">{parseFloat(p.premium_amount.toString()).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {p.currency}</td>
                  <td><span className={`badge ${statusClass[p.status] ?? 'badge-gray'}`}>{p.status === 'active' ? 'Aktif' : p.status === 'lapsed' ? 'Süresi Doldu' : 'İptal'}</span></td>
                  <td>
                    {p.status === 'active' ? (
                      <button
                        onClick={() => handleCancelPolicy(p.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold"
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        İptal Et
                      </button>
                    ) : (
                      <span className="text-xs text-[#677471] font-semibold">-</span>
                    )}
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

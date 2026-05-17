'use client';
import { useEffect, useState } from 'react';
import { apiService } from '@/lib/api';
import { Claim } from '@/types';

const statusClass: Record<string, string> = {
  open: 'badge-yellow',
  review: 'badge-yellow',
  closed: 'badge-green',
};

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiService.getMyClaims()
      .then((res) => setClaims(res.data as Claim[]))
      .catch(() => setError('Hasar kayıtları yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  const refreshClaims = () => {
    apiService.getMyClaims().then((res) => setClaims(res.data as Claim[]));
  };

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    apiService.createClaim({
      incident_date: incidentDate,
      description: description
    })
      .then(() => {
        setIsModalOpen(false);
        setDescription('');
        refreshClaims();
      })
      .catch(() => alert('Hasar kaydı oluşturulurken bir hata oluştu.'))
      .finally(() => setSubmitting(false));
  };

  const handleDeleteClaim = (id: number) => {
    if (confirm('Bu hasar kaydını silmek istediğinize emin misiniz?')) {
      apiService.deleteClaim(id)
        .then(() => refreshClaims())
        .catch(() => alert('Hasar kaydı silinirken bir hata oluştu.'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004C3F]">Hasar Kayıtlarım</h1>
          <p className="text-[#677471] text-sm mt-1">Bildirilen hasar ve talep kayıtlarınız</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="badge badge-green hover:opacity-90 transition-opacity"
            style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer', border: 'none' }}
          >
            + Hasar Bildir
          </button>
          <span className="badge badge-green">{claims.length} Kayıt</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card p-6" style={{ width: '450px', maxWidth: '90%' }}>
            <h2 className="text-xl font-bold text-[#004C3F] mb-4">Yeni Hasar Bildirimi Yap</h2>
            <form onSubmit={handleCreateClaim} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#677471] mb-1">Olay Tarihi</label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  style={{ fontSize: '14px' }}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#677471] mb-1">Hasar Açıklaması</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={4}
                  style={{ fontSize: '14px' }}
                  placeholder="Kaza veya hasarın oluş şekli, olay yeri detayları..."
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
                  {submitting ? 'Gönderiliyor...' : 'Bildirimi Kaydet'}
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
        ) : claims.length === 0 ? (
          <div className="text-center py-16 text-[#677471]">
            <span className="text-5xl block mb-4">🔧</span>
            <p>Hasar kaydınız bulunmuyor.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Hasar Dosya No</th>
                <th>Olay Tarihi</th>
                <th>Açıklama</th>
                <th>Kayıt Tarihi</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c) => (
                <tr key={c.id}>
                  <td className="text-[#004C3F] font-semibold">{c.claim_number}</td>
                  <td>{new Date(c.incident_date).toLocaleDateString('tr-TR')}</td>
                  <td className="max-w-xs truncate">{c.description}</td>
                  <td>{new Date(c.created_at).toLocaleDateString('tr-TR')}</td>
                  <td>
                    <span className={`badge ${statusClass[c.status] ?? 'badge-gray'}`}>
                      {c.status === 'open' ? 'Açık' : c.status === 'review' ? 'İncelemede' : 'Kapandı'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteClaim(c.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs"
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      Sil
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

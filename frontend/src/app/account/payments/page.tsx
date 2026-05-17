'use client';
import { useEffect, useState } from 'react';
import { apiService } from '@/lib/api';
import { Payment } from '@/types';

const statusClass: Record<string, string> = {
  paid: 'badge-green',
  pending: 'badge-yellow',
  overdue: 'badge-red',
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [payingId, setPayingId] = useState<number | null>(null);

  useEffect(() => {
    apiService.getMyPayments()
      .then((res) => setPayments(res.data as Payment[]))
      .catch(() => setError('Ödemeler yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  const handlePay = (id: number) => {
    setPayingId(id);
    apiService.updatePayment(id, { status: 'paid' })
      .then(() => {
        apiService.getMyPayments()
          .then((res) => setPayments(res.data as Payment[]));
      })
      .catch(() => alert('Ödeme işlemi sırasında bir hata oluştu.'))
      .finally(() => setPayingId(null));
  };

  const total = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + parseFloat(p.amount.toString()), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004C3F]">Ödemelerim</h1>
          <p className="text-[#677471] text-sm mt-1">Geçmiş ve bekleyen prim ödemeleriniz</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#677471]">Toplam Ödenen</p>
          <p className="text-xl font-bold text-[#028835]">{total.toFixed(2)} ₺</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><div className="spinner" /></div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : payments.length === 0 ? (
          <div className="text-center py-16 text-[#677471]">
            <span className="text-5xl block mb-4">💳</span>
            <p>Ödeme geçmişiniz bulunmuyor.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>İşlem ID</th>
                <th>Açıklama / Taksit</th>
                <th>Tutar</th>
                <th>Son Ödeme Tarihi</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="text-[#004C3F] font-semibold">#{p.id}</td>
                  <td>{p.description}</td>
                  <td className="font-semibold text-[#004C3F]">{parseFloat(p.amount.toString()).toFixed(2)} ₺</td>
                  <td>{new Date(p.due_date).toLocaleDateString('tr-TR')}</td>
                  <td>
                    <span className={`badge ${statusClass[p.status] ?? 'badge-gray'}`}>
                      {p.status === 'paid' ? 'Ödendi' : p.status === 'pending' ? 'Bekliyor' : 'Gecikmiş'}
                    </span>
                  </td>
                  <td>
                    {p.status === 'pending' ? (
                      <button
                        onClick={() => handlePay(p.id)}
                        disabled={payingId !== null}
                        className="btn-pay"
                        style={{
                          backgroundColor: '#028835',
                          color: '#fff',
                          fontSize: '12px',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          border: 'none',
                          boxShadow: '0 2px 4px rgba(2, 136, 53, 0.2)',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#016f2b')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#028835')}
                      >
                        {payingId === p.id ? 'Ödeniyor...' : 'Şimdi Öde'}
                      </button>
                    ) : (
                      <span className="text-xs text-[#028835] font-semibold">✓ Tamamlandı</span>
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

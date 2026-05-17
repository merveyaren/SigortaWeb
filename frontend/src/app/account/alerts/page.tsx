'use client';
import { useEffect, useState } from 'react';
import { apiService } from '@/lib/api';
import { Alert } from '@/types';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiService.getMyAlerts()
      .then((res) => setAlerts(res.data as Alert[]))
      .catch(() => setError('Bildirimler yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  const refreshAlerts = () => {
    apiService.getMyAlerts().then((res) => setAlerts(res.data as Alert[]));
  };

  const handleMarkAsRead = (id: number, isRead: boolean) => {
    if (!isRead) {
      apiService.updateAlert(id, { is_read: true })
        .then(() => refreshAlerts())
        .catch(() => alert('Bildirim güncellenirken bir hata oluştu.'));
    }
  };

  const handleDeleteAlert = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Avoid triggering mark as read
    if (confirm('Bu bildirimi silmek istediğinize emin misiniz?')) {
      apiService.deleteAlert(id)
        .then(() => refreshAlerts())
        .catch(() => alert('Bildirim silinirken bir hata oluştu.'));
    }
  };

  const unreadCount = alerts.filter((a) => !a.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004C3F]">Bildirimlerim</h1>
          <p className="text-[#677471] text-sm mt-1">Hesabınıza ait tüm bildirimler</p>
        </div>
        {unreadCount > 0 && (
          <span className="badge badge-yellow">{unreadCount} Okunmamış</span>
        )}
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="card flex justify-center py-16"><div className="spinner" /></div>
        ) : error ? (
          <div className="card text-center py-16 text-red-500">{error}</div>
        ) : alerts.length === 0 ? (
          <div className="card text-center py-16 text-[#677471]">
            <span className="text-5xl block mb-4">🔔</span>
            <p>Hiç bildiriminiz bulunmuyor.</p>
          </div>
        ) : (
          alerts.map((a) => (
            <div
              key={a.id}
              onClick={() => handleMarkAsRead(a.id, a.is_read)}
              className={`card p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-gray-50 ${
                !a.is_read ? 'border-l-4 border-[#028835]' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl ${
                !a.is_read ? 'bg-[#E6F3EB]' : 'bg-gray-100'
              }`}>
                🔔
              </div>
              <div className="flex-1">
                <p className={`text-base leading-6 ${!a.is_read ? 'text-[#004C3F] font-bold' : 'text-[#004C3F] font-semibold'}`}>
                  {a.title}
                </p>
                <p className="text-sm text-[#677471] mt-1 leading-relaxed">
                  {a.body}
                </p>
                <p className="text-xs text-[#9CA3AF] mt-2">{new Date(a.created_at).toLocaleString('tr-TR')}</p>
              </div>
              <div className="flex items-center gap-3">
                {!a.is_read && <span className="badge badge-green text-xs">Yeni</span>}
                <button
                  onClick={(e) => handleDeleteAlert(e, a.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-bold"
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';
export const dynamic = "force-dynamic";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/lib/api';
import { AuthTokens, LoginCredentials } from '@/types';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginCredentials>({ username: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await apiService.login(form);
      const tokens = res.data as AuthTokens;
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      router.push('/account/policies');
    } catch (err: unknown) {
      setStatus('error');
      const axiosErr = err as { response?: { status?: number }; message?: string };
      if (!axiosErr.response) {
        setErrorMsg('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
      } else if (axiosErr.response.status === 401) {
        setErrorMsg('Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.');
      } else {
        setErrorMsg('Giriş yapılamadı. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7ED] px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#028835]/10">
        <div className="p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold text-[#004C3F]">Insucom</span>
            </Link>
            <h1 className="text-2xl font-bold text-[#004C3F]">Hoş Geldiniz</h1>
            <p className="text-[#677471] text-sm mt-1">Poliçe ve hesap bilgilerinize erişin</p>
          </div>

          {/* Demo Hint */}
          <div className="bg-[#E6F3EB] border border-[#028835]/20 rounded-xl p-4 mb-8">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#028835]"></div>
              <p className="text-xs text-[#004C3F] font-bold uppercase tracking-wider">Demo Hesap Bilgileri</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-xs text-[#677471]">Kullanıcı: <span className="font-bold text-[#004C3F]">demo</span></div>
              <div className="text-xs text-[#677471]">Şifre: <span className="font-bold text-[#004C3F]">Demo12345!</span></div>
            </div>
          </div>

          <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#004C3F] mb-2 ml-1">Kullanıcı Adı</label>
              <input
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#028835] focus:ring-2 focus:ring-[#028835]/10 transition-all outline-none text-gray-700"
                placeholder="demo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#004C3F] mb-2 ml-1">Şifre</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#028835] focus:ring-2 focus:ring-[#028835]/10 transition-all outline-none text-gray-700"
                placeholder="••••••••"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm flex items-center space-x-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={status === 'loading'}
              style={{ backgroundColor: status === 'loading' ? '#004C3F' : '#028835' }}
              className="w-full h-12 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
            >
              {status === 'loading' ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-sm text-[#677471]">
              Hesabınız yok mu?{' '}
              <Link id="register-link" href="/register" className="text-[#028835] font-bold hover:underline">Kayıt Olun</Link>
            </p>
            <Link href="/" className="inline-block mt-4 text-xs text-[#677471] hover:text-[#028835] transition-colors">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

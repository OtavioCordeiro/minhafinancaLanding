import { useState } from 'react';

const API_URL = import.meta.env.PUBLIC_API_URL;
const APP_URL = import.meta.env.PUBLIC_APP_URL;

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || data?.detail || 'E-mail ou senha incorretos.');
        return;
      }

      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        id: data.userId,
        name: data.name,
        email: data.email,
        role: data.role,
        familyId: data.familyId ?? null,
        createdAt: new Date().toISOString(),
      }));

      window.location.href = `${APP_URL}/dashboard`;
    } catch {
      setError('Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-shrink-0 px-4 py-2 text-white text-base font-semibold rounded-full cursor-pointer transition-opacity hover:opacity-90"
        style={{ background: '#43BE17', border: '1px solid #E0E2E5', fontFamily: 'Inter, sans-serif' }}
      >
        Login
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src="/Logocortadaembaixo.png" alt="Minha Finança" className="h-10" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Entre na sua conta para continuar
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#43BE17]/40 focus:border-[#43BE17] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#43BE17]/40 focus:border-[#43BE17] transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: '#43BE17' }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Não tem conta?{' '}
              <a
                href={`${APP_URL}/registro`}
                className="text-[#43BE17] font-semibold hover:underline"
              >
                Criar conta grátis
              </a>
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-light leading-none"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

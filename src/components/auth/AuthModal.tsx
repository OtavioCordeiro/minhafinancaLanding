import { useState, useEffect, useRef } from 'react';

const API_URL = import.meta.env.PUBLIC_API_URL;
const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;

type AuthModalMode = 'login' | 'register' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: AuthModalMode;
  onModeChange: (mode: AuthModalMode) => void;
}

const APP_URL = import.meta.env.PUBLIC_APP_URL;

function buildCallbackUrl(data: {
  accessToken: string;
  refreshToken: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  familyId?: string;
}): string {
  const params = new URLSearchParams({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    userId: data.userId,
    name: data.name,
    email: data.email,
    role: data.role,
    ...(data.familyId ? { familyId: data.familyId } : {}),
  });
  return `${APP_URL}/auth/callback?${params.toString()}`;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (r: any) => void }) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [googleInitialized, setGoogleInitialized] = useState(false);
  const googleLoginRef = useRef<HTMLDivElement>(null);
  const googleRegisterRef = useRef<HTMLDivElement>(null);
  const reset = () => { setError(''); setSuccess(''); setLoading(false); };
  const changeMode = (m: AuthModalMode) => { reset(); onModeChange(m); };

  // Google: load script once
  useEffect(() => {
    if (googleScriptLoaded || !GOOGLE_CLIENT_ID) return;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleScriptLoaded(true);
    document.head.appendChild(script);
  }, [googleScriptLoaded]);

  // Google: initialize once after script loads — stable callback via ref
  useEffect(() => {
    if (!googleScriptLoaded || !GOOGLE_CLIENT_ID) return;
    const stableCallback = async (response: any) => {
      if (response.error) { setError('Erro na autenticação com Google.'); return; }
      try {
        const res = await fetch(`${API_URL}/api/Auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: response.credential }),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d?.message || d?.detail || 'Erro ao autenticar com Google.');
        }
        const data = await res.json();
        window.location.href = buildCallbackUrl(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro ao autenticar com Google.');
      }
    };
    const tryInit = (attempts = 0) => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: stableCallback });
        setGoogleInitialized(true);
      } else if (attempts < 10) {
        setTimeout(() => tryInit(attempts + 1), 100);
      }
    };
    tryInit();
  }, [googleScriptLoaded]); // intentionally excludes callback — stableCallback uses ref

  // Google: render button when mode or initialization changes
  useEffect(() => {
    if (!googleInitialized || !GOOGLE_CLIENT_ID) return;
    const ref = mode === 'login' ? googleLoginRef : googleRegisterRef;
    const timer = setTimeout(() => {
      const div = ref.current;
      if (!div || !window.google?.accounts?.id) return;
      div.innerHTML = '';
      window.google.accounts.id.renderButton(div, {
        theme: 'outline', size: 'large', width: Math.min(320, div.clientWidth || 300), locale: 'pt-BR',
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [mode, googleInitialized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'forgot-password') {
        const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d?.message || d?.detail || 'Erro ao enviar e-mail.');
        }
        setSuccess('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
        return;
      }

      if (mode === 'register') {
        if (password !== confirmPassword) throw new Error('As senhas não coincidem.');
        if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.');
        const res = await fetch(`${API_URL}/api/Auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || data?.detail || 'Erro ao criar conta.');
        window.location.href = buildCallbackUrl(data);
        return;
      }

      // login
      const res = await fetch(`${API_URL}/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || data?.detail || 'E-mail ou senha incorretos.');
      window.location.href = buildCallbackUrl(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'login' ? 'Entrar na sua conta'
    : mode === 'register' ? 'Criar conta grátis'
    : 'Recuperar senha';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light leading-none"
        >×</button>

        <div className="flex justify-center mb-5">
          <img src="/Logocortadaembaixo.png" alt="Minha Finança" className="h-9" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-1">{title}</h2>

        {mode !== 'forgot-password' && (
          <p className="text-sm text-gray-500 text-center mb-5">
            {mode === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
            <button
              onClick={() => changeMode(mode === 'login' ? 'register' : 'login')}
              className="text-primary font-semibold hover:underline"
            >
              {mode === 'login' ? 'Criar grátis' : 'Entrar'}
            </button>
          </p>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-3 py-2 mb-4">
            {success}
          </div>
        )}

        {/* Forgot password */}
        {mode === 'forgot-password' && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm text-gray-500 text-center">
              Informe seu e-mail e enviaremos instruções para redefinir sua senha.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
            {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold bg-primary hover:bg-primary/90 transition disabled:opacity-60"
            >
              {loading ? 'Aguarde...' : 'Enviar e-mail de recuperação'}
            </button>
            <button
              type="button"
              onClick={() => changeMode('login')}
              className="w-full text-center text-sm text-gray-500 hover:text-primary mt-1"
            >
              ← Voltar para o login
            </button>
          </form>
        )}

        {/* Login / Register */}
        {mode !== 'forgot-password' && (
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                required
                autoFocus={mode === 'login'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition pr-20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => changeMode('forgot-password')}
                  className="text-xs text-gray-500 hover:text-primary mt-1 hover:underline"
                >
                  Esqueci minha senha
                </button>
              )}
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold bg-primary hover:bg-primary/90 transition disabled:opacity-60"
            >
              {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>

            {GOOGLE_CLIENT_ID && (
              <>
                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-400">ou continue com</span>
                  </div>
                </div>
                <div
                  ref={mode === 'login' ? googleLoginRef : googleRegisterRef}
                  className="flex justify-center min-h-[44px]"
                />
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

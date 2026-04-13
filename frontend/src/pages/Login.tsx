import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userRole', 'ADMIN');
      addToast('Bienvenido, Administrador', 'success');
      navigate('/admin');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--color-surface-container)_0%,_var(--color-surface)_100%)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface-container-low p-10 rounded-3xl shadow-2xl border border-outline-variant/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-tertiary-container" />
        
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-6 text-primary">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black font-headline text-on-surface tracking-tighter">VIBE <span className="text-primary">PULSE</span></h1>
          <p className="text-on-surface-variant mt-2 font-medium">Panel de Control Administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Corporativo</label>
            <input 
              required
              type="email" 
              placeholder="admin@vibepulse.com"
              className="w-full bg-surface-container-highest border-none rounded-xl px-5 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Contraseña</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full bg-surface-container-highest border-none rounded-xl px-5 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={isLoading}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary-container to-primary text-on-primary font-black rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full"
              />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                ACCEDER AL SISTEMA
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-outline-variant/10 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Vibe Pulse Ecosystem © 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
}

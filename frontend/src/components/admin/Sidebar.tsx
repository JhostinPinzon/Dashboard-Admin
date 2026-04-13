import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  FileText,
  Loader2
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export default function Sidebar({ addToast }: { addToast: (msg: string, type?: any) => void }) {
  const navigate = useNavigate();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    addToast('Cerrando sesión...', 'info');
    setTimeout(() => navigate('/login'), 1000);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      addToast('Reporte generado exitosamente', 'success');
    }, 2000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'products', label: 'Productos', icon: Package, path: '/admin/products' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'users', label: 'Usuarios', icon: Users, path: '/admin/users' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low flex flex-col py-6 z-50 border-r border-outline-variant/10">
      <div className="px-6 mb-10 cursor-pointer" onClick={() => navigate('/admin')}>
        <h1 className="text-xl font-bold text-primary font-headline tracking-tight">El Directorio</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Vibe Pulse Admin</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
              isActive 
                ? "text-primary font-bold border-r-4 border-primary-container bg-surface-container-highest/50" 
                : "text-slate-400 font-medium hover:bg-surface-container-highest/30"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
                <span className="font-headline tracking-tight">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mb-6">
        <button 
          onClick={handleGenerateReport}
          disabled={isGeneratingReport}
          className="w-full py-3 bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold rounded-lg shadow-lg shadow-primary-container/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGeneratingReport ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          {isGeneratingReport ? 'Generando...' : 'Generar Reporte'}
        </button>
      </div>

      <div className="px-4 mt-auto space-y-2">
        <NavLink 
          to="/admin/settings"
          className={({ isActive }) => cn(
            "w-full flex items-center gap-3 px-4 py-2 font-medium rounded-lg transition-colors",
            isActive ? "text-primary bg-surface-container-highest/50" : "text-slate-400 hover:bg-surface-container-highest/30"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-headline tracking-tight">Configuración</span>
        </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 font-medium hover:bg-error/10 hover:text-error rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-headline tracking-tight">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

import { 
  Search, 
  Bell, 
  HelpCircle,
  ShoppingCart,
  Package,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addToast: (msg: string, type?: any) => void;
}

export default function Header({ searchQuery, setSearchQuery, addToast }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    addToast('Cerrando sesión...', 'info');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-surface/70 backdrop-blur-xl flex justify-between items-center px-8 py-4 shadow-xl shadow-black/20 border-b border-outline-variant/10">
      <div className="flex items-center gap-4 bg-surface-container-highest px-4 py-2 rounded-full w-96">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar métricas o pedidos..." 
          className="bg-transparent border-none text-sm focus:ring-0 text-on-surface w-full placeholder:text-slate-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-300">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn("hover:text-primary transition-colors relative p-2 rounded-full hover:bg-surface-container-highest", showNotifications && "text-primary bg-surface-container-highest")}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-surface-container-high rounded-xl shadow-2xl border border-outline-variant/10 overflow-hidden"
                >
                  <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center">
                    <h4 className="font-bold text-sm">Notificaciones</h4>
                    <button className="text-[10px] text-primary font-bold uppercase hover:underline">Limpiar</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <NotificationItem title="Nuevo pedido #VP-9021" time="Hace 2 min" icon={ShoppingCart} />
                    <NotificationItem title="Stock bajo: Hoodie Black" time="Hace 15 min" icon={Package} isAlert />
                    <NotificationItem title="Nuevo usuario registrado" time="Hace 1 hora" icon={Users} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => addToast('Centro de ayuda abierto', 'info')}
            className="hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 border-l border-outline-variant/30 pl-6 hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden lg:block">
              <p className="text-sm font-bold text-on-surface">Administrador</p>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">Senior Strategist</p>
            </div>
            <img 
              src="https://picsum.photos/seed/admin/100/100" 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
              referrerPolicy="no-referrer"
            />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-surface-container-high rounded-xl shadow-2xl border border-outline-variant/10 overflow-hidden"
              >
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container-highest rounded-lg transition-colors">Mi Perfil</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container-highest rounded-lg transition-colors">Actividad</button>
                  <div className="h-px bg-outline-variant/10 my-1" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function NotificationItem({ title, time, icon: Icon, isAlert = false }: any) {
  return (
    <div className="p-4 hover:bg-surface-container-highest transition-colors flex gap-3 cursor-pointer border-b border-outline-variant/5">
      <div className={cn("p-2 rounded-lg shrink-0", isAlert ? "bg-error/10 text-error" : "bg-primary/10 text-primary")}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-bold text-on-surface">{title}</p>
        <p className="text-[10px] text-on-surface-variant mt-0.5">{time}</p>
      </div>
    </div>
  );
}

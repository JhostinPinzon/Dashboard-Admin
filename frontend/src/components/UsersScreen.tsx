import { useState, useMemo } from 'react';
import { 
  Search, 
  UserPlus, 
  Shield, 
  MoreHorizontal, 
  Mail, 
  Calendar,
  Activity,
  UserCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useOutletContext } from 'react-router-dom';

export default function UsersScreen() {
  const { users, addToast, searchQuery }: any = useOutletContext();

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users.filter((u: any) => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query) || 
      u.role.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tighter text-on-surface">Usuarios y Roles</h2>
          <p className="text-on-surface-variant mt-1">Administra los accesos y permisos de la plataforma.</p>
        </div>
        <button 
          onClick={() => addToast('Formulario de nuevo usuario abierto', 'info')}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <UserPlus className="w-5 h-5" />
          Invitar Miembro
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserStatCard label="Total Usuarios" value={users.length.toString()} icon={UsersIcon} color="text-primary" />
        <UserStatCard label="Administradores" value="2" icon={Shield} color="text-tertiary" />
        <UserStatCard label="Sesiones Activas" value="5" icon={Activity} color="text-emerald-400" />
      </div>

      {/* Users List Container */}
      <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/5">
        <div className="p-6 border-b border-outline-variant/5 flex justify-between items-center">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o rol..." 
              className="w-full bg-surface-container-highest border-none text-on-surface text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary/30 outline-none"
              value={searchQuery}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredUsers.map((user: any) => (
            <div key={user.id} className="bg-surface-container-high/40 rounded-2xl p-6 border border-outline-variant/5 hover:border-primary/20 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <button className="text-slate-500 hover:text-on-surface transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-outline-variant/20" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-on-surface leading-tight">{user.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  {user.email}
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Se unió en {user.joined}
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold uppercase tracking-tighter">Cuenta Activa</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-outline-variant/5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 py-2 bg-surface-container-highest text-[10px] font-bold rounded-lg hover:bg-primary/20 hover:text-primary transition-all uppercase tracking-wider">Perfil</button>
                <button className="flex-1 py-2 bg-surface-container-highest text-[10px] font-bold rounded-lg hover:bg-error/10 hover:text-error transition-all uppercase tracking-wider">Suspender</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserStatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/5 flex items-center gap-5">
      <div className={cn("p-4 rounded-2xl bg-surface-container-highest", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-on-surface">{value}</p>
      </div>
    </div>
  );
}

function UsersIcon({ className }: any) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

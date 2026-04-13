import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  XCircle,
  MoreVertical,
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useOutletContext } from 'react-router-dom';

export default function OrdersScreen() {
  const { orders, setOrders, addToast, searchQuery }: any = useOutletContext();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orders;
    const query = searchQuery.toLowerCase();
    return orders.filter((o: any) => 
      o.client.toLowerCase().includes(query) || 
      o.id.toLowerCase().includes(query) || 
      o.status.toLowerCase().includes(query)
    );
  }, [orders, searchQuery]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const statusConfig: any = {
      'Pendiente': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'En proceso': 'bg-blue-500/10 text-blue-400 border-blue-400/20',
      'Enviado': 'bg-purple-500/10 text-purple-400 border-purple-400/20',
      'Entregado': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Cancelado': 'bg-rose-500/10 text-rose-400 border-rose-400/20'
    };

    setOrders(orders.map((o: any) => 
      o.id === orderId ? { ...o, status: newStatus, statusColor: statusConfig[newStatus] } : o
    ));
    addToast(`Pedido ${orderId} actualizado a ${newStatus}`, 'success');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tighter text-on-surface">Gestión de Pedidos</h2>
          <p className="text-on-surface-variant mt-1">Monitorea y actualiza el estado de las ventas en tiempo real.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => addToast('Exportando historial de pedidos...', 'info')}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-container-highest transition-all border border-outline-variant/10"
          >
            <Download className="w-4 h-4" />
            Descargar Reporte
          </button>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusSummaryCard label="Pendientes" count="12" icon={Clock} color="text-yellow-500" />
        <StatusSummaryCard label="En Proceso" count="08" icon={Truck} color="text-blue-400" />
        <StatusSummaryCard label="Entregados" count="45" icon={CheckCircle2} color="text-emerald-400" />
        <StatusSummaryCard label="Cancelados" count="03" icon={XCircle} color="text-rose-400" />
      </div>

      {/* Main Content Table */}
      <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/5">
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/5 bg-surface-container-low/50">
          <div className="flex gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar por cliente o ID..." 
                className="w-full bg-surface-container-highest border-none text-on-surface text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary/30 outline-none"
                value={searchQuery}
                readOnly
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-xs font-bold rounded-lg border border-outline-variant/10 hover:bg-surface-container-highest transition-colors">
              <Calendar className="w-3 h-3" />
              Últimos 30 días
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Updates Activo</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/30">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">ID Pedido</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Cliente</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fecha</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Estado</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {filteredOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-surface-container-highest/20 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-primary">{order.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black border border-primary/20">
                        {order.initials}
                      </div>
                      <span className="text-sm font-medium text-on-surface">{order.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">{order.date}</td>
                  <td className="px-6 py-5 text-sm font-black text-on-surface">{order.total}</td>
                  <td className="px-6 py-5">
                    <div className="relative group/status">
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1.5", order.statusColor)}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-surface-container-highest rounded-lg text-slate-400 hover:text-primary transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <div className="relative group/menu">
                        <button className="p-2 hover:bg-surface-container-highest rounded-lg text-slate-400 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-surface-container-high rounded-xl shadow-2xl border border-outline-variant/10 hidden group-hover/menu:block z-50 p-2">
                          <p className="text-[10px] font-bold text-slate-500 px-3 py-2 uppercase tracking-widest">Cambiar Estado</p>
                          {['Pendiente', 'En proceso', 'Enviado', 'Entregado', 'Cancelado'].map(status => (
                            <button 
                              key={status}
                              onClick={() => updateOrderStatus(order.id, status)}
                              className="w-full text-left px-3 py-2 text-xs hover:bg-surface-container-highest rounded-lg transition-colors"
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface-container-low w-full max-w-2xl rounded-3xl shadow-2xl border border-outline-variant/10 overflow-hidden relative z-10"
            >
              <div className="p-8 border-b border-outline-variant/10 flex justify-between items-start bg-gradient-to-br from-surface-container-low to-surface-container-high">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-black text-primary uppercase tracking-tighter">Pedido {selectedOrder.id}</span>
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border", selectedOrder.statusColor)}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-headline text-on-surface">{selectedOrder.client}</h3>
                  <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Realizado el {selectedOrder.date} a las 15:45
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 bg-surface-container-highest/50 hover:bg-error/20 hover:text-error rounded-full transition-all"
                >
                  <AlertCircle className="w-6 h-6 rotate-45" />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Resumen de Productos</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-on-surface-variant">1x Camiseta Oversize Black</span>
                        <span className="font-bold text-on-surface">$125.000</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-on-surface-variant">1x Jogger Cargo Tech</span>
                        <span className="font-bold text-on-surface">$189.900</span>
                      </div>
                      <div className="h-px bg-outline-variant/10 my-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-on-surface">Total pagado</span>
                        <span className="text-xl font-black text-primary">{selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Método de Pago</h4>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Tarjeta de Crédito (Visa **** 4242)
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Información de Envío</h4>
                    <div className="p-4 bg-surface-container-highest/30 rounded-2xl border border-outline-variant/5">
                      <p className="text-sm font-bold text-on-surface">Dirección de entrega</p>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Calle 100 #15-30, Edificio Skyline, Apto 502<br />
                        Bogotá D.C, Colombia
                      </p>
                      <p className="text-xs font-bold text-primary mt-3 cursor-pointer hover:underline flex items-center gap-1">
                        Ver en Google Maps <ArrowUpRight className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => addToast('Imprimiendo etiqueta...', 'info')}
                      className="flex-1 py-3 bg-surface-container-high text-xs font-bold rounded-xl hover:bg-surface-container-highest transition-all"
                    >
                      Imprimir Etiqueta
                    </button>
                    <button 
                      onClick={() => addToast('Enviando correo al cliente...', 'info')}
                      className="flex-1 py-3 bg-surface-container-high text-xs font-bold rounded-xl hover:bg-surface-container-highest transition-all"
                    >
                      Contactar Cliente
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusSummaryCard({ label, count, icon: Icon, color }: any) {
  return (
    <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/5 flex items-center gap-4">
      <div className={cn("p-3 rounded-xl bg-surface-container-highest", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black text-on-surface">{count}</p>
      </div>
    </div>
  );
}

function CreditCard({ className }: any) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect width="20" height="14" x="2" y="5" rx="2" strokeWidth="2"/>
      <path d="M2 10h20" strokeWidth="2"/>
    </svg>
  );
}

function ArrowUpRight({ className }: any) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>;
}

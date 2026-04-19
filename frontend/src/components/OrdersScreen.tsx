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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map((o: any) => 
        o.id === orderId ? { ...o, status: newStatus } : o
      ));
      addToast(`Pedido ${orderId} actualizado a ${newStatus}`, 'success');
    } catch (error) {
      addToast('Error al actualizar pedido', 'error');
    }
  };

  const getStatusColor = (status: string) => {
    const config: any = {
      'PENDING': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'SHIPPED': 'bg-purple-500/10 text-purple-400 border-purple-400/20',
      'DELIVERED': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'CANCELLED': 'bg-rose-500/10 text-rose-400 border-rose-400/20'
    };
    return config[status] || 'bg-slate-500/10 text-slate-400 border-slate-400/20';
  };

  return (
    <div className="space-y-8">
      {/* ... previous content ... */}
      <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/5">
        {/* ... filter bar ... */}
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
                    <span className="text-sm font-bold text-primary">{order.id.substring(0, 8)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black border border-primary/20">
                        {order.user?.email.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-on-surface">{order.user?.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5 text-sm font-black text-on-surface">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1.5", getStatusColor(order.status))}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                      {order.status}
                    </span>
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
                          {['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(status => (
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

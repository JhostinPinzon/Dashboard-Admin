import { 
  TrendingUp, 
  ShoppingBasket, 
  UserPlus, 
  Layers,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useNavigate, useOutletContext } from 'react-router-dom';

const salesData = [
  { name: 'Mayo', value: 1200000 },
  { name: 'Jun', value: 2100000 },
  { name: 'Jul', value: 1800000 },
  { name: 'Ago', value: 3500000 },
  { name: 'Sep', value: 2800000 },
  { name: 'Oct', value: 4320000 },
];

const orderStatusData = [
  { name: 'Entregado', value: 40, color: '#4361ee' },
  { name: 'En proceso', value: 20, color: '#bbc5eb' },
  { name: 'Pendiente', value: 15, color: '#ffb692' },
  { name: 'Otros', value: 25, color: '#8e8fa1' },
];

const recentOrders = [
  { id: 1, client: 'Carlos Ruiz', product: 'Audífonos Vibe Pro', status: 'Enviado', date: 'Hoy, 14:20', amount: '$245.000', statusColor: 'bg-primary-container/20 text-primary' },
  { id: 2, client: 'Elena Gomez', product: 'Smartwatch S1', status: 'Procesando', date: 'Hoy, 12:05', amount: '$512.000', statusColor: 'bg-secondary-container/20 text-secondary' },
  { id: 3, client: 'Marcos Torres', product: 'Pack Accesorios Premium', status: 'Cancelado', date: 'Ayer, 18:45', amount: '$89.000', statusColor: 'bg-error-container/20 text-error' },
];

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { addToast, metrics, orders, products, users }: any = useOutletContext();

  const displayMetrics = metrics?.metrics || {
    totalVentas: 0,
    totalPedidos: 0,
    totalUsuarios: 0,
    totalProductos: 0
  };

  const chartData = metrics?.salesData || salesData;

  const handleExport = () => {
    addToast('Generando reporte de ventas...', 'info');
    setTimeout(() => {
      addToast('Reporte de ventas exportado (PDF)', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight">Dashboard General</h2>
          <p className="text-on-surface-variant mt-1">Bienvenido de vuelta, esto es lo que está pasando hoy.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-surface-container-high text-xs font-bold text-primary rounded-lg border border-outline-variant/10">
            Hoy: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Ventas" 
          value={`$${displayMetrics.totalVentas.toLocaleString()}`} 
          change="+12%" 
          subtitle="VS. MES PASADO" 
          icon={TrendingUp} 
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <KPICard 
          title="Pedidos Totales" 
          value={displayMetrics.totalPedidos.toString()} 
          change="+5%" 
          subtitle="TRANSACCIONES EXITOSAS" 
          icon={ShoppingBasket} 
          iconColor="text-secondary"
          iconBg="bg-secondary/10"
          onClick={() => navigate('/admin/orders')}
        />
        <KPICard 
          title="Usuarios" 
          value={displayMetrics.totalUsuarios.toString()} 
          change="+8%" 
          subtitle="NUEVOS ESTE MES" 
          icon={UserPlus} 
          iconColor="text-tertiary"
          iconBg="bg-tertiary/10"
          onClick={() => navigate('/admin/users')}
        />
        <KPICard 
          title="Productos" 
          value={displayMetrics.totalProductos.toString()} 
          change="Activos" 
          subtitle="EN INVENTARIO" 
          icon={Layers} 
          iconColor="text-outline"
          iconBg="bg-outline/10"
          isNeutral
          onClick={() => navigate('/admin/products')}
        />
      </div>

      {/* Main Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-lg font-bold font-headline">Ventas Mensuales (COP)</h4>
              <p className="text-xs text-on-surface-variant">Rendimiento de los últimos 6 meses</p>
            </div>
            <button 
              onClick={handleExport}
              className="bg-surface-container-highest px-3 py-1 text-[10px] font-bold rounded hover:bg-primary/20 transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <Download className="w-3 h-3" />
              Exportar
            </button>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="5%" stopColor="#4361ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4361ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333348" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8e8fa1', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e32', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#bac3ff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4361ee" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 flex flex-col">
          <h4 className="text-lg font-bold font-headline mb-8">Pedidos por estado</h4>
          <div className="relative flex-1 flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e32', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black font-headline">128</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Total</span>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            {orderStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-on-surface-variant">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-lg font-bold font-headline uppercase tracking-tight">Últimos Pedidos</h4>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="text-primary text-xs font-bold hover:underline"
          >
            Ver todo el historial
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-slate-500 uppercase tracking-[0.1em] border-none">
                <th className="pb-4 font-bold">Cliente</th>
                <th className="pb-4 font-bold">Producto</th>
                <th className="pb-4 font-bold">Estado</th>
                <th className="pb-4 font-bold">Fecha</th>
                <th className="pb-4 font-bold text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-surface-container-highest/30 transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')}>
                  <td className="py-4 font-medium">{order.client}</td>
                  <td className="py-4 text-on-surface-variant">{order.product}</td>
                  <td className="py-4">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold", order.statusColor)}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-on-surface-variant">{order.date}</td>
                  <td className="py-4 text-right font-bold">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, subtitle, icon: Icon, iconColor, iconBg, isNeutral = false, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-surface-container-high p-6 rounded-xl flex flex-col justify-between transition-all hover:bg-surface-container-highest group border border-outline-variant/5",
        onClick && "cursor-pointer hover:scale-[1.02]"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-lg", iconBg, iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded flex items-center gap-1",
          isNeutral ? "text-slate-400 bg-slate-400/10" : "text-emerald-400 bg-emerald-400/10"
        )}>
          {!isNeutral && <ArrowUpRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm text-on-surface-variant font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-black font-headline text-on-surface tracking-tight">{value}</h3>
        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider">{subtitle}</p>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp, 
  AlertTriangle, 
  CreditCard, 
  Tag,
  X,
  Camera
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useOutletContext } from 'react-router-dom';

export default function ProductsScreen() {
  const { products, setProducts, addToast, searchQuery }: any = useOutletContext();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'TOP WEAR',
    price: '',
    stock: '',
    color: ''
  });

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter((p: any) => 
      p.name.toLowerCase().includes(query) || 
      p.id.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `VP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const product = {
      ...newProduct,
      id,
      image: `https://picsum.photos/seed/${id}/200/200`,
      stock: parseInt(newProduct.stock) || 0,
      price: `$${newProduct.price}`,
      lowStock: (parseInt(newProduct.stock) || 0) < 10
    };
    setProducts([product, ...products]);
    setShowAddModal(false);
    setNewProduct({ name: '', category: 'TOP WEAR', price: '', stock: '', color: '' });
    addToast('Producto añadido exitosamente', 'success');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p: any) => p.id !== id));
    setSelectedProduct(null);
    addToast('Producto eliminado', 'info');
  };

  return (
    <div className="space-y-8 relative">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tighter text-on-surface">Inventario de Productos</h2>
          <p className="text-on-surface-variant mt-1">Gestiona el catálogo central de Vibe Pulse.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => addToast('Filtros avanzados abiertos', 'info')}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-primary font-semibold rounded-lg hover:bg-surface-container-highest transition-all border border-outline-variant/10"
          >
            <Filter className="w-4 h-4" />
            Filtros Avanzados
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Productos" value={filteredProducts.length.toString()} icon={TrendingUp} trend="+12 nuevos este mes" trendColor="text-primary" />
        <MetricCard title="Stock Bajo" value={filteredProducts.filter((p: any) => p.lowStock).length.toString()} icon={AlertTriangle} trend="Requiere atención inmediata" trendColor="text-error" isError />
        <MetricCard title="Valor Inventario" value="$245.8M" icon={CreditCard} trend="Moneda: COP" trendColor="text-slate-400" />
        <MetricCard title="Categoría Top" value="Streetwear" icon={Tag} trend="65% de las ventas totales" trendColor="text-primary" />
      </div>

      {/* Table Container */}
      <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/5">
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/5">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar productos por nombre, SKU o categoría..." 
              className="w-full bg-surface-container-highest border-none text-on-surface text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary/30 outline-none"
              value={searchQuery}
              readOnly // Search is handled in Header
            />
          </div>
          <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium">
            Mostrando {filteredProducts.length} productos
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Imagen</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Nombre</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Categoría</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Precio (COP)</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {filteredProducts.map((product: any) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-surface-container-highest/30 transition-colors group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{product.id}</td>
                  <td className="px-6 py-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-on-surface">{product.name}</p>
                    <p className="text-xs text-slate-400">{product.color}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-secondary-container/30 text-secondary text-[10px] font-bold rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold">{product.price}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-medium">{product.stock}</span>
                      {product.lowStock && <AlertTriangle className="w-3 h-3 text-error fill-error/20" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-bold">Ver detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-surface-container-high/30 flex justify-between items-center border-t border-outline-variant/5">
          <p className="text-xs text-on-surface-variant font-medium">Página 1 de 1</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface-container-high text-on-surface text-xs rounded border border-outline-variant/10 hover:bg-surface-container-highest transition-colors">Anterior</button>
            <button className="px-3 py-1 bg-primary-container text-on-primary text-xs rounded font-bold">1</button>
            <button className="px-3 py-1 bg-surface-container-high text-on-surface text-xs rounded border border-outline-variant/10 hover:bg-surface-container-highest transition-colors">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container-low w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden relative z-10 p-8"
            >
              <h3 className="text-2xl font-bold font-headline mb-6">Nuevo Producto</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre</label>
                  <input 
                    required
                    type="text" 
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-2 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Categoría</label>
                    <select 
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-2 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option>TOP WEAR</option>
                      <option>BOTTOM WEAR</option>
                      <option>OUTERWEAR</option>
                      <option>DENIM</option>
                      <option>BASICS</option>
                      <option>ACCESORIOS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Color</label>
                    <input 
                      required
                      type="text" 
                      value={newProduct.color}
                      onChange={e => setNewProduct({...newProduct, color: e.target.value})}
                      className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-2 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio (COP)</label>
                    <input 
                      required
                      type="number" 
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-2 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Stock Inicial</label>
                    <input 
                      required
                      type="number" 
                      value={newProduct.stock}
                      onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                      className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-2 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="pt-6 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold rounded-lg shadow-lg shadow-primary/20"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Detail Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-surface-container-low shadow-2xl z-[70] flex flex-col border-l border-outline-variant/10"
            >
              <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="text-2xl font-bold font-headline text-on-surface">Detalle del Producto</h3>
                <button onClick={() => setSelectedProduct(null)} className="text-on-surface-variant hover:text-on-surface transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-highest relative group">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Categoría / {selectedProduct.category}</span>
                    <h4 className="text-3xl font-black font-headline text-on-surface mt-1">{selectedProduct.name}</h4>
                    <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
                      Producto premium diseñado para la comodidad diaria sin sacrificar el estilo urbano. Fabricado con materiales de alta calidad.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Precio Unitario</p>
                      <p className="text-xl font-black text-on-surface">{selectedProduct.price} COP</p>
                    </div>
                    <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Stock Disponible</p>
                      <p className={cn("text-xl font-black", selectedProduct.lowStock ? "text-error" : "text-on-surface")}>
                        {selectedProduct.stock} Unidades
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-sm font-bold text-on-surface uppercase tracking-tight">Especificaciones Técnicas</h5>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm py-2 border-b border-outline-variant/10">
                        <span className="text-slate-400">Material</span>
                        <span className="text-on-surface font-medium">Premium Cotton / Tech Fabric</span>
                      </li>
                      <li className="flex justify-between text-sm py-2 border-b border-outline-variant/10">
                        <span className="text-slate-400">Color</span>
                        <span className="text-on-surface font-medium">{selectedProduct.color}</span>
                      </li>
                      <li className="flex justify-between text-sm py-2 border-b border-outline-variant/10">
                        <span className="text-slate-400">SKU Central</span>
                        <span className="text-on-surface font-medium">{selectedProduct.id}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-8 border-t border-outline-variant/10 grid grid-cols-2 gap-4 bg-surface-container-low/50">
                <button 
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                  className="py-3 px-6 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-error/10 hover:text-error transition-all"
                >
                  Eliminar
                </button>
                <button 
                  onClick={() => addToast('Funcionalidad de edición en desarrollo', 'info')}
                  className="py-3 px-6 bg-gradient-to-r from-primary-container to-primary text-on-primary font-bold rounded-lg shadow-lg shadow-primary/20"
                >
                  Editar Producto
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend, trendColor, isError = false }: any) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 hover:border-outline-variant/20 transition-all">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">{title}</p>
      <p className={cn("text-3xl font-black font-headline", isError ? "text-error" : "text-on-surface")}>{value}</p>
      <div className={cn("mt-4 flex items-center gap-2 text-xs", trendColor)}>
        <Icon className="w-4 h-4" />
        <span>{trend}</span>
      </div>
    </div>
  );
}

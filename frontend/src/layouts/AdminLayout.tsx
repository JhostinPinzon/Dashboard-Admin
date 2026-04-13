import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Role Guard
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate]);

  // Shared Data State (You can move this to a separate context if it gets too big)
  const [products, setProducts] = useState([
    { id: 'VP-001', name: 'Camiseta Oversize Essential', color: 'Blanco Off-White', category: 'TOP WEAR', price: '$125.000', stock: 85, image: 'https://picsum.photos/seed/shirt1/200/200' },
    { id: 'VP-002', name: 'Jogger Cargo Tech', color: 'Gris Carbón', category: 'BOTTOM WEAR', price: '$189.900', stock: 12, image: 'https://picsum.photos/seed/pants1/200/200' },
    { id: 'VP-003', name: 'Hoodie Black Signature', color: 'Negro Mate', category: 'OUTERWEAR', price: '$210.000', stock: 4, image: 'https://picsum.photos/seed/hoodie1/200/200', lowStock: true },
    { id: 'VP-004', name: 'T-Shirt Graphic Abstract', color: 'Azul Cobalto', category: 'TOP WEAR', price: '$95.000', stock: 156, image: 'https://picsum.photos/seed/shirt2/200/200' },
  ]);

  const [orders, setOrders] = useState([
    { id: '#VP-9021', client: 'Laura Martínez', initials: 'LM', date: '24 Oct, 2023', total: '$450.000', status: 'Pendiente', statusColor: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    { id: '#VP-9022', client: 'Camilo Torres', initials: 'CT', date: '24 Oct, 2023', total: '$1.200.000', status: 'En proceso', statusColor: 'bg-blue-500/10 text-blue-400 border-blue-400/20' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Carlos Ruiz', email: 'carlos.ruiz@vibe.com', role: 'Admin', status: 'Activo', joined: 'Oct 2023', avatar: 'https://picsum.photos/seed/user1/100/100' },
    { id: 2, name: 'Elena Gomez', email: 'elena.gomez@gmail.com', role: 'Editor', status: 'Activo', joined: 'Sep 2023', avatar: 'https://picsum.photos/seed/user2/100/100' },
  ]);

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <Sidebar addToast={addToast} />

      <div className="ml-64 flex-1 flex flex-col">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          addToast={addToast} 
        />

        <main className="pt-24 px-8 pb-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet context={{ 
                products, setProducts, 
                orders, setOrders, 
                users, setUsers, 
                searchQuery, addToast 
              }} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

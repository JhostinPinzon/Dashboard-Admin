import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../lib/api';

export default function AdminLayout() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Shared Data State
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState(null);

  // Role Guard and Data Fetching
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [productsData, ordersData, usersData, metricsData] = await Promise.all([
          api.get('/products'),
          api.get('/orders'),
          api.get('/users'),
          api.get('/dashboard/metrics')
        ]);
        setProducts(productsData);
        setOrders(ordersData);
        setUsers(usersData);
        setMetrics(metricsData);
      } catch (error) {
        addToast('Error al cargar datos del servidor', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, addToast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
                metrics, setMetrics,
                searchQuery, addToast 
              }} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

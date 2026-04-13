import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Pages & Screens
import Login from './pages/Login';
import DashboardScreen from './components/DashboardScreen';
import ProductsScreen from './components/ProductsScreen';
import OrdersScreen from './components/OrdersScreen';
import UsersScreen from './components/UsersScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/admin" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardScreen />,
      },
      {
        path: 'products',
        element: <ProductsScreen />,
      },
      {
        path: 'orders',
        element: <OrdersScreen />,
      },
      {
        path: 'users',
        element: <UsersScreen />,
      },
      {
        path: 'settings',
        element: <div className="p-8 text-center text-on-surface-variant font-headline">Configuración en desarrollo...</div>,
      },
    ],
  },
]);

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

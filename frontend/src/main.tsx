// frontend/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx'; 
import AdminLayout from './layouts/AdminLayout.tsx';

// ✅ FIX: Update paths to point to the new 'pages' folder
import { AdminLogin } from './pages/Admin/AdminLogin.tsx';
import { AdminContacts } from './pages/Admin/AdminContacts.tsx';
import { AdminProjects } from './pages/Admin/AdminProjects.tsx';

// Placeholder Dashboard
const AdminDashboard = () => (
  <div className="p-8 bg-white dark:bg-gray-800 rounded shadow">
    <h2 className="text-2xl font-bold mb-4 dark:text-white">Welcome to your Dashboard!</h2>
    <p className="dark:text-gray-300">Select "Projects" or "Contact Messages" from the sidebar.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
  },
  {
    path: '/admin',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'contacts', element: <AdminContacts /> },
      { path: 'projects', element: <AdminProjects /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
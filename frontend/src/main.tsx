import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Public Layout (Your Portfolio)
import App from './App.tsx'; 

// Admin Layout (Protected Route Guard)
import AdminLayout from './layouts/AdminLayout.tsx';

// Admin Pages
import { AdminLogin } from './Admin/AdminLogin.tsx';
import { AdminContacts } from './Admin/AdminContacts.tsx';
import { AdminProjects } from './Admin/AdminProjects.tsx';

// Simple Placeholder for Dashboard Home
const AdminDashboard = () => (
  <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to the Dashboard!</h2>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      You are logged in as Admin. Use the sidebar to manage your portfolio.
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
        <h3 className="font-bold text-blue-700 dark:text-blue-400">Projects Manager</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Add, edit, or delete your portfolio projects.</p>
      </div>
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
        <h3 className="font-bold text-purple-700 dark:text-purple-400">Contact Messages</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">View messages sent from your website.</p>
      </div>
    </div>
  </div>
);

// Router Configuration
const router = createBrowserRouter([
  // 1. Public Route (The Main Portfolio Website)
  {
    path: '/',
    element: <App />, 
  },

  // 2. Admin Login Route (Unprotected entry point)
  {
    path: '/admin',
    element: <AdminLogin />,
  },

  // 3. Protected Admin Area (Guarded by AdminLayout)
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard', // URL: /admin/dashboard
        element: <AdminDashboard />, 
      },
      {
        path: 'contacts', // URL: /admin/contacts
        element: <AdminContacts />,
      },
      {
        path: 'projects', // URL: /admin/projects
        element: <AdminProjects />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
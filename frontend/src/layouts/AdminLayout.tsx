import React from 'react';
import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { isAdmin, clearAuthData } from '../utils/authUtils';
import { LayoutDashboard, FolderKanban, Contact, LogOut, UserCircle } from 'lucide-react';

const AdminLayout: React.FC = () => {
  // 1. Security Check
  if (!isAdmin()) {
    clearAuthData();
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    clearAuthData();
    window.location.href = '/admin'; 
  };

  // 2. Active Link Styler
  // This function checks if a link is active and applies the 'blue' style
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' // Active Style
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'    // Inactive Style
    }`;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Fixed) --- */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col shrink-0 transition-all duration-300 border-r border-gray-800 relative z-20">
        
        {/* Logo Area */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
             <span className="font-bold text-xl">P</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Portfolio</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>
          
          <NavLink to="/admin/dashboard" className={getLinkClass}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/projects" className={getLinkClass}>
            <FolderKanban size={20} />
            <span>Projects</span>
          </NavLink>

          <NavLink to="/admin/contacts" className={getLinkClass}>
            <Contact size={20} />
            <span>Contact Messages</span>
          </NavLink>
        </nav>

        {/* User Profile / Logout Area */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <UserCircle size={40} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">Administrator</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Scrollable) --- */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 relative">
        {/* Top Header for Mobile/Context (Optional) */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
             Overview
          </h2>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">Welcome back, Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
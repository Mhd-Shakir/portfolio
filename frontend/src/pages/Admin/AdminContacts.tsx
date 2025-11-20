import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/authUtils';
import { Trash2, Phone, Mail, AlertCircle } from 'lucide-react';
import { API_URL } from '../../utils/config'; 

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = getToken();
      // ✅ Use API_URL
      const response = await fetch(`${API_URL}/api/contact`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const token = getToken();
      // ✅ Use API_URL
      const res = await fetch(`${API_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts(contacts.filter(c => c._id !== id));
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleDeleteAll = async () => {
    if (contacts.length === 0) return;
    if (!window.confirm('WARNING: This will delete ALL messages. Are you sure?')) return;
    
    try {
      const token = getToken();
      // ✅ Use API_URL
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts([]);
        alert('All messages deleted successfully');
      }
    } catch (err) {
      alert('Failed to delete all');
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading messages...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Messages ({contacts.length})</h2>
        {contacts.length > 0 && (
          <button onClick={handleDeleteAll} className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors">
            <Trash2 size={16} /> Delete All
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm uppercase">
              <th className="p-4 border-b dark:border-gray-600">Date</th>
              <th className="p-4 border-b dark:border-gray-600">Name</th>
              <th className="p-4 border-b dark:border-gray-600">Contact Info</th>
              <th className="p-4 border-b dark:border-gray-600">Message</th>
              <th className="p-4 border-b dark:border-gray-600 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {contacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b dark:border-gray-700">
                <td className="p-4 whitespace-nowrap text-sm">{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-medium">{contact.name}</td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-blue-600 hover:underline text-sm"><Mail size={14} />{contact.email}</a>
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-green-600 hover:underline text-sm"><Phone size={14} />{contact.phone}</a>
                  </div>
                </td>
                <td className="p-4 text-sm max-w-xs" title={contact.message}><div className="truncate">{contact.message}</div></td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(contact._id)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr><td colSpan={5} className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2"><AlertCircle size={40} className="text-gray-300" />No messages found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
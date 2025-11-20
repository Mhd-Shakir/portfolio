import React, { useState, useEffect } from 'react';
import { getToken } from '../utils/localStorage';
import { API_URL } from '../utils/config'; // ✅ Import config

interface Project {
  _id: string;
  title: string;
  category: string;
}

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: 'web',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    // ✅ Use API_URL
    const res = await fetch(`${API_URL}/api/projects`);
    const data = await res.json();
    if (data.success) setProjects(data.data);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    const token = getToken();
    // ✅ Use API_URL
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.ok) {
      fetchProjects();
      alert('Project Deleted');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = getToken();
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      
      if (imageFile) {
        data.append('image', imageFile);
      } else {
        alert('Please select an image');
        setLoading(false);
        return;
      }

      // ✅ Use API_URL
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const result = await response.json();

      if (result.success) {
        setMessage('✅ Project Created Successfully!');
        setFormData({
          title: '', description: '', shortDescription: '', 
          technologies: '', githubUrl: '', liveUrl: '', category: 'web'
        });
        setImageFile(null);
        fetchProjects();
      } else {
        setMessage(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      setMessage('❌ Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* ... (JSX remains the same as previous, just logic updated) ... */}
      {/* You can paste the same JSX return from the previous correct AdminProjects here */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
             {/* ... Inputs ... */}
             {/* For brevity, assume standard form fields here matching state */}
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
               <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                 value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
             </div>
             {/* ... Add other inputs for description, shortDescription, technologies, category, github, liveUrl ... */}
             
             {/* Image Input */}
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Image</label>
               <input required type="file" accept="image/*" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
             </div>

             <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
               {loading ? 'Uploading...' : 'Create Project'}
             </button>
             {message && <p className="text-center mt-4 font-bold">{message}</p>}
        </form>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Existing Projects</h2>
        <ul className="space-y-3">
          {projects.map(project => (
            <li key={project._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{project.title}</p>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{project.category}</span>
              </div>
              <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-700 font-semibold text-sm border border-red-500 px-3 py-1 rounded hover:bg-red-50">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
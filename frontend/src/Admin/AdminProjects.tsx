import React, { useState, useEffect } from 'react';
// ✅ FIX: Changed path from '../../utils' to '../utils'
import { getToken } from '../utils/localStorage';
import { API_URL } from '../utils/config'; 

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
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error("Failed to fetch projects");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    const token = getToken();
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
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      
      // Append image if selected
      if (imageFile) {
        data.append('image', imageFile);
      } else {
        alert('Please select an image');
        setLoading(false);
        return;
      }

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
        // Reset Form
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
      {/* LEFT: Add New Project Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
            <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Description</label>
            <textarea required rows={3} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack</label>
              <input required placeholder="React, Node" type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                 value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                 <option value="web">Web Development</option>
                 <option value="fullstack">Full Stack</option>
                 <option value="mobile">Mobile App</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input placeholder="GitHub URL" type="url" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
            <input placeholder="Live Demo URL" type="url" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
          </div>

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

      {/* RIGHT: List Existing Projects */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Existing Projects</h2>
        <ul className="space-y-3">
          {projects.map(project => (
            <li key={project._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{project.title}</p>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{project.category}</span>
              </div>
              <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-700 font-semibold text-sm border border-red-500 px-3 py-1 rounded hover:bg-red-50">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/animations';
// ✅ FIX 1: Import the API URL configuration
import { API_URL } from '../utils/config';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', index * 0.1)}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden shrink-0">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, tagIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                className="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
            >
              <Github size={16} />
              Code
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group/btn"
            >
              <ExternalLink size={16} />
              Demo
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ✅ FIX 2: Use API_URL here to connect to Render Backend
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();
        
        if (data.success) {
          setProjects(data.data);
        } else {
          setError('Failed to load projects');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          <motion.h2
            variants={fadeIn('up')}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            variants={fadeIn('up', 0.2)}
            className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16"
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
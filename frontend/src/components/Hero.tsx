import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { TechIcons } from './TechIcons';
import { textVariant, fadeIn } from '../utils/animations';

const roles = ['MERN Stack Developer', 'Full Stack Engineer', 'React Specialist', 'Node.js Developer'];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleWhatsAppConnect = () => {
    // Replace with your WhatsApp number (include country code without + or spaces)
    const phoneNumber = '1234567890'; // Example: '919876543210' for India
    const message = encodeURIComponent('Hi! I would like to connect with you.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black pt-20 px-4 sm:px-6"
    >
      <motion.div
        className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 py-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={textVariant()} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-3 sm:px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold"
            >
              Welcome to my portfolio
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Shakir
              </span>
            </motion.h1>

            <div className="h-12 sm:h-14 lg:h-16 mb-6 sm:mb-8">
              <motion.h2
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300"
              >
                {roles[roleIndex]}
              </motion.h2>
            </div>

            <motion.p
              variants={fadeIn('up', 0.4)}
              initial="hidden"
              animate="show"
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Crafting scalable web applications with MongoDB, Express.js, React, and Node.js.
              Passionate about building seamless user experiences and robust backend solutions.
            </motion.p>

            <motion.div
              variants={fadeIn('up', 0.6)}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppConnect}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-semibold flex items-center gap-2 sm:gap-3 shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                <MessageCircle size={20} className="sm:w-5 sm:h-5" />
                Quick Connect
                <motion.span
                  className="inline-block text-lg sm:text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-8 lg:mt-0"
            style={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
          >
            <TechIcons />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
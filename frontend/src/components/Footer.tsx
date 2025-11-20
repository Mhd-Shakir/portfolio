import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { fadeIn } from '../utils/animations';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:john.doe@example.com', label: 'Email' },
];

export const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer
      ref={ref}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 py-12">
        <motion.div
          variants={fadeIn('up')}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Portfolio
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.2)}
            className="flex justify-center gap-6 mb-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.4)}
            className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
          >
            <span>Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <Heart className="text-red-500 fill-red-500" size={16} />
            </motion.div>
            <span>by John Doe</span>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.5)}
            className="mt-4 text-sm text-gray-500 dark:text-gray-500"
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

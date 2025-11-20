import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, staggerContainer } from '../utils/animations';

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'JavaScript/ES6+', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Redux', level: 80 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'RESTful APIs', level: 92 },
      { name: 'GraphQL', level: 75 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 80 },
      { name: 'Agile/Scrum', level: 85 },
      { name: 'Jest/Testing', level: 82 },
    ],
  },
];

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', index * 0.1)}
      whileHover={{ scale: 1.02, x: 10 }}
      className="group"
    >
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-blue-600 dark:text-blue-400 font-semibold">{level}%</span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full relative group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-300"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 blur-sm"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 transition-colors duration-300"
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
            Skills & Expertise
          </motion.h2>
          <motion.div
            variants={fadeIn('up', 0.2)}
            className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16"
          />

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={fadeIn('up', categoryIndex * 0.2)}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, index) => (
                      <SkillBar key={skill.name} {...skill} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

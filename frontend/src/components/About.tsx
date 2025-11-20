import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Briefcase, Award, Code } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/animations';
import profilePic from '../assets/my_img_2.jpg';

const stats = [
  { icon: Briefcase, label: 'Years Experience', value: 2.5, suffix: '+' },
  { icon: Award, label: 'Projects Completed', value: 10, suffix: '+' },
  { icon: Code, label: 'Technologies', value: 15, suffix: '+' },
  { icon: MapPin, label: 'Location', value: 0, suffix: '', text: 'Remote' },
];

const Counter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={fadeIn('up')}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={fadeIn('up', 0.2)}
            className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn('right', 0.3)}>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl border-gray-200 dark:border-gray-700">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                    <img className='w-full h-full object-cover rounded-full' src={profilePic} alt="shakir profile" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                    Muhammed Shakir
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                    MERN Stack Developer
                  </p>
                  <div className="flex justify-center items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} />
                    <span>Calicut, Kerala</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn('left', 0.3)} className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a passionate MERN Stack Developer with over 2.5 years of experience building
                modern web applications. I specialize in creating scalable, performant solutions
                using MongoDB, Express.js, React, and Node.js.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                My journey in web development started with a curiosity for how things work on the
                internet. Today, I'm focused on writing clean, maintainable code and staying
                updated with the latest technologies in the JavaScript ecosystem.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer(0.1, 0.5)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeIn('up', index * 0.1)}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 whitespace-nowrap">
                    {stat.text || (
                      <>
                        <Counter end={stat.value} />{stat.suffix}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
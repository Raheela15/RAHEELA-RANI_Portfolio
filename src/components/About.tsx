import React from 'react';
import { motion } from 'motion/react';
import { educationDetails, portfolioProfile } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#070B14]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Section Heading */}
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              01. About Me
            </p>
            <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-snug">
              Analytical thinking shaped by mathematics and clean code.
            </h2>
          </div>

          {/* Right Column: Editorial Prose & Focus Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-5 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {portfolioProfile.aboutParagraphs.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Quantitative Foundations
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                  {educationDetails.focusAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Current Focus &amp; Direction
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Building practical Python data cleaning pipelines, structured SQL queries, and
                  clear exploratory dashboards while strengthening core software engineering
                  habits with Django and Git.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

import React from 'react';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import {
  certificationsList,
  educationList,
  experienceList,
} from '../data/portfolioData';

export const Credentials: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-[#070B14]">
      {/* Section 05: Education */}
      <section
        id="education"
        className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4"
            >
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                05. Education
              </p>
              <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Academic background
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Currently pursuing MS Mathematics after completing BS Mathematical Sciences at
                FUUAST, building strong analytical precision and quantitative modeling discipline.
              </p>
            </motion.div>

            <div className="lg:col-span-8 relative pl-5 sm:pl-8 space-y-5 sm:space-y-6">
              {/* Animated Timeline Rail */}
              <motion.div
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'top' }}
                className="absolute left-1.5 sm:left-2 top-3 bottom-3 w-px bg-gradient-to-b from-indigo-500 via-blue-500/60 to-slate-300 dark:to-slate-800"
              />

              {educationList.map((edu, idx) => (
                <motion.article
                  key={edu.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-5 sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[21px] sm:-left-[33px] top-7 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-50 dark:ring-[#070B14]"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200 dark:border-slate-800/80">
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap
                          className="w-5 h-5 text-indigo-600 dark:text-indigo-300"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50">
                          {edu.degree}
                        </h3>
                        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-1">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 pl-[54px] sm:pl-0">
                      <p
                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 tabular-nums"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {edu.cgpa ? `CGPA ${edu.cgpa}` : edu.status}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                        {edu.period}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-5">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-300 mb-2.5">
                      Focus Areas
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {edu.focusAreas.map((area) => (
                        <div
                          key={area}
                          className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2 leading-relaxed"
                        >
                          <span
                            className="text-indigo-600 dark:text-indigo-400 select-none"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 06: Experience (Animated Timeline) */}
      <section
        id="experience"
        className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60 bg-slate-100/70 dark:bg-[#080D18]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4"
            >
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                06. Experience
              </p>
              <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Practical &amp; academic work
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Hands-on Python and data analysis work completed through self-directed
                repositories, teaching at APS, and undergraduate mathematical training.
              </p>
            </motion.div>

            <div className="lg:col-span-8 relative pl-5 sm:pl-8 space-y-5 sm:space-y-6">
              {/* Animated Vertical Timeline Line */}
              <motion.div
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'top' }}
                className="absolute left-1.5 sm:left-2 top-3 bottom-3 w-px bg-gradient-to-b from-indigo-500 via-blue-500/60 to-slate-300 dark:to-slate-800"
              />

              {experienceList.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-5 sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[21px] sm:-left-[33px] top-7 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-100 dark:ring-[#080D18]"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <Briefcase
                        className="w-4 h-4 text-indigo-600 dark:text-indigo-300 shrink-0 mt-1 sm:mt-0"
                        aria-hidden="true"
                      />
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item.role}
                      </h3>
                    </div>
                    <span
                      className="text-xs text-slate-500 dark:text-slate-400 tabular-nums shrink-0 pl-[26px] sm:pl-0"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <p className="text-xs text-indigo-600 dark:text-indigo-300/90 mb-3">
                    {item.context}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800/70">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span
                          className="text-indigo-600 dark:text-indigo-400 select-none"
                          aria-hidden="true"
                        >
                          —
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 07: Certifications */}
      <section
        id="certifications"
        className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-12"
          >
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              07. Certifications
            </p>
            <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Verified credentials &amp; learning record
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Verified academic achievement alongside dedicated credential slots ready to be
              updated with uploaded certificates in the portfolio configuration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {certificationsList.map((cert, idx) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className="rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 hover:border-indigo-500/40 p-5 sm:p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Award
                        className="w-4 h-4 text-indigo-600 dark:text-indigo-300"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {cert.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300/90 mb-3">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

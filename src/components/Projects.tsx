import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, FolderGit2, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectItem, projectsList } from '../data/portfolioData';
import { GitHubBrandIcon } from './SocialIcons';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

const ProjectCardImage: React.FC<{
  src: string;
  alt: string;
  title: string;
  onExpand: () => void;
}> = ({ src, alt, title, onExpand }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-[#0A101E] border-b border-slate-200 dark:border-slate-800/80">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-[#0D162B] dark:to-[#080D1A] text-center">
          <FolderGit2 className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mb-3" aria-hidden="true" />
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{title}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onExpand}
        aria-label={`Inspect ${title} details and full screenshot`}
        className="absolute bottom-3 right-3 min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900/85 dark:bg-[#070B14]/85 backdrop-blur-sm border border-slate-700/80 text-xs font-medium text-slate-100 hover:bg-indigo-600 hover:border-indigo-500 transition-colors cursor-pointer active:scale-95"
      >
        <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Inspect</span>
      </button>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  return (
    <section
      id="projects"
      className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60 bg-slate-100/70 dark:bg-[#080D18]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-9 sm:mb-12"
        >
          <div>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              04. Featured Projects
            </p>
            <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Data cleaning, analysis &amp; dashboard builds
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Selected Python and data analytics repositories published on GitHub. Tap any project
              to inspect the full problem statement, key features, and implementation details.
            </p>
          </div>
          <a
            href="https://github.com/Raheela15"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-200 transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <span>All repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          {projectsList.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-slate-300/80 to-slate-200/70 dark:from-slate-800/90 dark:to-slate-800/50 hover:from-indigo-500/70 hover:via-blue-500/40 hover:to-violet-500/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-950/10 dark:hover:shadow-indigo-950/40 flex"
            >
              <article className="w-full rounded-[15px] bg-white/90 dark:bg-[#0D1424]/85 backdrop-blur-md overflow-hidden flex flex-col">
                <ProjectCardImage
                  src={project.screenshotUrl}
                  alt={project.screenshotAlt}
                  title={project.title}
                  onExpand={() => onSelectProject(project)}
                />

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  {/* Quiet Unboxed Kicker */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span
                      className="text-indigo-600 dark:text-indigo-300 font-medium tabular-nums"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {project.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.subtitle}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.overview}
                  </p>

                  {/* Problem Statement Summary */}
                  <div className="pt-3 mb-4 border-t border-slate-200 dark:border-slate-800/70">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      Problem Statement
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      Key Features
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {project.keyFeatures.slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="leading-relaxed flex items-start gap-2">
                          <span
                            className="text-indigo-600 dark:text-indigo-400 select-none"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Used: Clean Unboxed Typographic Metadata */}
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800/70">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      <span className="text-slate-800 dark:text-slate-300 font-medium">
                        Stack:{' '}
                      </span>
                      {project.technologies.join(' · ')}
                    </p>

                    <div className="flex flex-col min-[360px]:flex-row flex-wrap items-stretch sm:items-center gap-2.5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 flex-1"
                      >
                        <GitHubBrandIcon className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 active:scale-[0.98] border border-slate-300 dark:border-slate-700 rounded-xl transition-all whitespace-nowrap shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#0A101E] hover:bg-slate-200 dark:hover:bg-slate-800/80 active:scale-[0.98] border border-slate-300 dark:border-slate-700/80 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex-1 min-[360px]:flex-initial"
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

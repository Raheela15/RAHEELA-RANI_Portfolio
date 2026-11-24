import React, { useEffect, useState } from 'react';
import { ExternalLink, FolderGit2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ProjectItem } from '../data/portfolioData';
import { GitHubBrandIcon } from './SocialIcons';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-950/75 dark:bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl max-h-[92svh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-700/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/95 dark:bg-[#0D1424]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 min-w-0">
                <span
                  className="text-indigo-600 dark:text-indigo-300 font-medium tabular-nums shrink-0"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {project.index}
                </span>
                <span aria-hidden="true" className="shrink-0">
                  ·
                </span>
                <span className="truncate">{project.subtitle}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="w-11 h-11 inline-flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Screenshot */}
            <div className="aspect-[16/10] w-full bg-slate-100 dark:bg-[#070B14] border-b border-slate-200 dark:border-slate-800/80 overflow-hidden">
              {!imgError ? (
                <img
                  src={project.screenshotUrl}
                  alt={project.screenshotAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <FolderGit2 className="w-10 h-10 text-indigo-500 dark:text-indigo-400 mb-3" aria-hidden="true" />
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">
                    {project.title}
                  </p>
                </div>
              )}
            </div>

            {/* Details Body */}
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
              <div>
                <h3
                  id="project-modal-title"
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2"
                >
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Problem Statement
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Technologies Used
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
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

              <div className="pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors whitespace-nowrap shrink-0 active:scale-[0.98]"
                >
                  <GitHubBrandIcon className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap shrink-0 active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

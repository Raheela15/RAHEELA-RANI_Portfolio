/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { DataVisualization } from './components/DataVisualization';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Credentials } from './components/Credentials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import {
  CustomCursor,
  FloatingControls,
  InitialLoader,
  ScrollProgressBar,
} from './components/PageEffects';
import { portfolioProfile, ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [cvNotice, setCvNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleDownloadCv = async () => {
    try {
      const response = await fetch(portfolioProfile.cvUrl);
      if (!response.ok) {
        throw new Error('CV file could not be found.');
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = portfolioProfile.cvFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);

      setCvNotice({
        type: 'success',
        message: `Downloaded ${portfolioProfile.cvFileName}`,
      });
    } catch {
      setCvNotice({
        type: 'error',
        message: 'Unable to download CV right now. Please verify public/Raheela_CV.pdf exists.',
      });
    } finally {
      window.setTimeout(() => {
        setCvNotice(null);
      }, 4000);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070B14] text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <InitialLoader />
        <ScrollProgressBar />
        <CustomCursor />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>

        <Navbar
          onDownloadCv={handleDownloadCv}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main id="main-content" className="flex-1">
          <Hero onDownloadCv={handleDownloadCv} />
          <About />
          <Skills />
          <DataVisualization theme={theme} />
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
          <Credentials />
          <Contact onDownloadCv={handleDownloadCv} />
        </main>

        <Footer />

        <FloatingControls theme={theme} onToggleTheme={toggleTheme} />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {cvNotice && (
          <div
            role="status"
            aria-live="polite"
            className={`fixed bottom-5 left-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg border shadow-lg text-sm ${
              cvNotice.type === 'success'
                ? 'bg-white dark:bg-[#0D1424] border-emerald-400 dark:border-emerald-700/70 text-emerald-900 dark:text-emerald-200'
                : 'bg-white dark:bg-[#0D1424] border-rose-400 dark:border-rose-700/70 text-rose-900 dark:text-rose-200'
            }`}
          >
            {cvNotice.type === 'success' ? (
              <CheckCircle2
                className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0"
                aria-hidden="true"
              />
            )}
            <span>{cvNotice.message}</span>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}

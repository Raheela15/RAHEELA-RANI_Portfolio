import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  Code2,
  Database,
  Download,
  Layers,
  Table2,
  User,
} from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { educationDetails, portfolioProfile } from '../data/portfolioData';
import { GitHubBrandIcon, LinkedInBrandIcon } from './SocialIcons';

interface HeroProps {
  onDownloadCv: () => void;
}

const useTypingRole = (roles: string[], disabled: boolean | null) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const currentRole = roles[roleIndex];

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && charIndex < currentRole.length) {
          setCharIndex((c) => c + 1);
        } else if (!isDeleting && charIndex === currentRole.length) {
          setIsDeleting(true);
        } else if (isDeleting && charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      },
      !isDeleting && charIndex === currentRole.length ? 1600 : isDeleting ? 38 : 68
    );

    return () => window.clearTimeout(timeout);
  }, [charIndex, disabled, isDeleting, roleIndex, roles]);

  if (disabled) {
    return roles.join(' | ');
  }

  return roles[roleIndex].slice(0, charIndex);
};

export const Hero: React.FC<HeroProps> = ({ onDownloadCv }) => {
  const [imgError, setImgError] = useState(false);
  const prefersReduced = useReducedMotion();
  const typedText = useTypingRole(portfolioProfile.heroRoles, prefersReduced);

  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(35);

  const spotlightBg = useMotionTemplate`radial-gradient(520px circle at ${pointerX}% ${pointerY}%, rgba(99, 102, 241, 0.14), transparent 72%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    pointerX.set(xPct);
    pointerY.set(yPct);
  };

  const floatingStack = [
    {
      label: 'Python',
      icon: <Code2 className="w-4 h-4 text-indigo-500 dark:text-indigo-300" aria-hidden="true" />,
      position: '-top-3 left-2 sm:-left-5',
      delay: 0,
    },
    {
      label: 'Pandas',
      icon: <Table2 className="w-4 h-4 text-blue-500 dark:text-blue-300" aria-hidden="true" />,
      position: 'top-14 -right-2 sm:-right-5',
      delay: 0.7,
    },
    {
      label: 'SQL',
      icon: <Database className="w-4 h-4 text-sky-500 dark:text-sky-300" aria-hidden="true" />,
      position: 'bottom-28 -left-2 sm:-left-6',
      delay: 1.3,
    },
    {
      label: 'Django',
      icon: <Layers className="w-4 h-4 text-violet-500 dark:text-violet-300" aria-hidden="true" />,
      position: 'bottom-14 -right-2 sm:-right-5',
      delay: 0.4,
    },
    {
      label: 'GitHub',
      icon: <GitHubBrandIcon className="w-4 h-4 text-slate-700 dark:text-slate-200" />,
      position: '-bottom-3 left-6 sm:left-10',
      delay: 1.0,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800/70 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-50 dark:from-[#0A1124] dark:via-[#070B14] dark:to-[#070B14] min-h-[calc(100svh-3.5rem)] lg:min-h-0 flex items-center"
    >
      {/* Animated ambient gradient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-indigo-500/12 dark:bg-indigo-600/15 blur-3xl animate-ambient-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-20 w-[300px] sm:w-[440px] h-[300px] sm:h-[440px] rounded-full bg-blue-500/10 dark:bg-blue-600/12 blur-3xl animate-ambient-drift"
      />

      {/* Mouse-following spotlight effect (desktop pointer) */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlightBg }}
          className="pointer-events-none absolute inset-0 hidden lg:block"
        />
      )}

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 lg:py-22 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Mobile-First Portrait Area (renders first on smartphone viewports, right column on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={prefersReduced ? undefined : { y: portraitParallaxY }}
            className="order-first lg:order-last lg:col-span-5 flex flex-col relative"
          >
            {/* Animated gradient border wrapper */}
            <div className="w-full p-[1.5px] rounded-2xl bg-gradient-to-br from-indigo-500/60 via-blue-500/30 to-violet-500/60 animate-border-sweep flex relative shadow-xl shadow-indigo-950/10 dark:shadow-indigo-950/40">
              <div className="w-full rounded-[15px] overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#0E162B] dark:via-[#0B1222] dark:to-[#070B14] relative py-7 px-5 sm:p-8 lg:min-h-[440px] flex flex-col items-center justify-center text-center">
                {!imgError ? (
                  <div className="relative mb-4 sm:mb-6">
                    {/* Slow rotating dashed orbital accent ring */}
                    {!prefersReduced && (
                      <motion.div
                        aria-hidden="true"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-dashed border-indigo-400/45 dark:border-indigo-400/35 pointer-events-none"
                      />
                    )}
                    <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-indigo-500 via-blue-500 to-violet-500 shadow-lg shadow-indigo-950/25">
                      <div className="w-36 h-36 min-[375px]:w-44 min-[375px]:h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-[#1a1d21]">
                        <img
                          src={portfolioProfile.profileImageUrl}
                          alt="Portrait of Raheela Rani, Mathematics Graduate and Python Developer"
                          referrerPolicy="no-referrer"
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover object-[50%_46%] scale-[1.18]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-indigo-400/40 bg-indigo-500/10 flex items-center justify-center mb-5">
                    <User className="w-12 h-12 text-indigo-600 dark:text-indigo-300" aria-hidden="true" />
                  </div>
                )}

                <div>
                  <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {portfolioProfile.fullName}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                    MS Mathematics · Teacher at APS
                  </p>
                  <p
                    className="text-xs text-indigo-600 dark:text-indigo-300 mt-1 tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    BS Mathematical Sciences · CGPA {educationDetails.cgpa}
                  </p>
                </div>

                {/* Compact Mobile Tech Stack Strip (< sm) so icons never clip at 320px */}
                <div className="mt-4 flex sm:hidden flex-wrap items-center justify-center gap-2">
                  {floatingStack.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#070B14]/80 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Technology Icons on sm+ screens */}
            {floatingStack.map((item) => (
              <motion.div
                key={item.label}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={
                  prefersReduced
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  opacity: { duration: 0.35, delay: 0.45 + item.delay * 0.12 },
                  scale: { duration: 0.35, delay: 0.45 + item.delay * 0.12 },
                  y: {
                    duration: 3.6 + item.delay * 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className={`absolute ${item.position} z-10 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 shadow-lg text-xs font-medium text-slate-800 dark:text-slate-200 pointer-events-none`}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Left / Main Text Column: Staggered Mobile-First Typography & Touch CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            {/* Dynamic Typing Role Line */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-[26px] flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 tracking-wide mb-3"
            >
              <span style={{ fontFamily: 'var(--font-mono)' }}>{typedText}</span>
              {!prefersReduced && (
                <span
                  aria-hidden="true"
                  className="inline-block w-[2px] h-4 bg-indigo-500 dark:bg-indigo-400 animate-pulse"
                />
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.1rem,8.5vw,3.75rem)] font-bold tracking-tight leading-[1.08] mb-4 bg-gradient-to-r from-slate-900 via-indigo-700 to-slate-900 dark:from-slate-50 dark:via-indigo-300 dark:to-blue-300 bg-clip-text text-transparent animate-text-shimmer"
            >
              {portfolioProfile.fullName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(0.95rem,2.6vw,1.125rem)] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6 sm:mb-8"
            >
              Currently pursuing{' '}
              <span className="text-slate-900 dark:text-slate-100 font-medium">
                MS Mathematics
              </span>{' '}
              and serving as a{' '}
              <span className="text-slate-900 dark:text-slate-100 font-medium">
                Teacher at APS
              </span>
              , following a {educationDetails.degree} degree from{' '}
              <span className="text-slate-900 dark:text-slate-100">
                Federal Urdu University of Arts, Science &amp; Technology (FUUAST)
              </span>{' '}
              with a 3.75 CGPA. Building reliable Python data cleaning workflows, SQL analyses, and
              interactive Streamlit dashboards.
            </motion.p>

            {/* Touch-Friendly Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="w-full sm:w-auto flex flex-col min-[400px]:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-7 sm:mb-9"
            >
              <motion.a
                href="#projects"
                whileHover={prefersReduced ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] rounded-xl shadow-sm shadow-indigo-500/20 transition-all whitespace-nowrap shrink-0"
              >
                <span>View Projects</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>

              <motion.button
                type="button"
                onClick={onDownloadCv}
                whileHover={prefersReduced ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0D1424] hover:bg-slate-100 dark:hover:bg-[#131D33] active:scale-[0.98] border border-slate-300 dark:border-slate-700/80 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download
                  className="w-4 h-4 text-indigo-600 dark:text-indigo-300"
                  aria-hidden="true"
                />
                <span>Download CV</span>
              </motion.button>
            </motion.div>

            {/* Touch-Friendly Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-5 border-t border-slate-200 dark:border-slate-800/80"
            >
              <a
                href={portfolioProfile.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Raheela's GitHub profile"
                className="min-h-[44px] px-2 inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors group"
              >
                <GitHubBrandIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                <span>GitHub</span>
                <span className="text-slate-500 font-mono text-xs">
                  {portfolioProfile.github.username}
                </span>
              </a>

              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                ·
              </span>

              <a
                href={portfolioProfile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Raheela Rani's LinkedIn profile"
                className="min-h-[44px] px-2 inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors group"
              >
                <LinkedInBrandIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                <span>LinkedIn</span>
                <span className="text-slate-500 text-xs">
                  {portfolioProfile.linkedin.displayName}
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Full-Width Verified Academic & Role Snapshot Strip Below Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 lg:mt-14 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Current Study</p>
            <p className="text-xs sm:text-base font-medium text-slate-900 dark:text-slate-100">
              {educationDetails.currentDegree}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Bachelor&apos;s Degree</p>
            <p className="text-xs sm:text-base font-medium text-slate-900 dark:text-slate-100">
              {educationDetails.degree} · FUUAST
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Teaching Role</p>
            <p className="text-xs sm:text-base font-medium text-slate-900 dark:text-slate-100">
              Teacher at APS
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Academic Standing</p>
            <p
              className="text-xs sm:text-base font-semibold text-indigo-600 dark:text-indigo-300 tabular-nums"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CGPA {educationDetails.cgpa} · {educationDetails.graduation}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

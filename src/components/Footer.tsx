import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';
import { GitHubBrandIcon, LinkedInBrandIcon } from './SocialIcons';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-[#060911] pt-12 pb-24 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-7 pb-8 border-b border-slate-200 dark:border-slate-800/70">
          <div>
            <a
              href="#home"
              className="inline-flex items-center min-h-[44px] text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {portfolioProfile.name}
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {portfolioProfile.title}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-[40px] inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Clickable Social Media & Contact Icons */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioProfile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (@Raheela15)"
              className="w-11 h-11 rounded-xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors active:scale-95"
            >
              <GitHubBrandIcon className="w-5 h-5" />
            </a>
            <a
              href={portfolioProfile.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (Raheela Rani)"
              className="w-11 h-11 rounded-xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors active:scale-95"
            >
              <LinkedInBrandIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${portfolioProfile.email}`}
              aria-label={`Email ${portfolioProfile.email}`}
              className="w-11 h-11 rounded-xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors active:scale-95"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={`tel:${portfolioProfile.phone}`}
              aria-label={`Call ${portfolioProfile.phone}`}
              className="w-11 h-11 rounded-xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors active:scale-95"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {portfolioProfile.fullName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <a
              href={`mailto:${portfolioProfile.email}`}
              className="text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors break-all"
            >
              {portfolioProfile.email}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`tel:${portfolioProfile.phone}`}
              className="text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors font-mono tabular-nums"
            >
              {portfolioProfile.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={portfolioProfile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
            >
              {portfolioProfile.github.username}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

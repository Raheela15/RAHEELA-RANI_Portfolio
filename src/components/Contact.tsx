import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Loader2,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { portfolioProfile } from '../data/portfolioData';
import { GitHubBrandIcon, LinkedInBrandIcon } from './SocialIcons';

interface ContactProps {
  onDownloadCv: () => void;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ onDownloadCv }) => {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitFeedback, setSubmitFeedback] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!values.subject.trim() || values.subject.trim().length < 3) {
      nextErrors.subject = 'Please provide a brief subject.';
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitState === 'error' || submitState === 'success') {
      setSubmitState('idle');
      setSubmitFeedback('');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioProfile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(portfolioProfile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      setCopiedPhone(false);
    }
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(values.subject.trim() || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`
    );
    return `mailto:${portfolioProfile.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState('submitting');
    setSubmitFeedback('');

    const endpoint = portfolioProfile.contactFormEndpoint.trim();

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            subject: values.subject.trim(),
            message: values.message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }

        setSubmitState('success');
        setSubmitFeedback('Your message has been sent successfully. Thank you for reaching out.');
        setValues({ name: '', email: '', subject: '', message: '' });
      } catch {
        setSubmitState('error');
        setSubmitFeedback(
          'Unable to send message through the configured form service right now. Please try again or use your email client below.'
        );
      }
      return;
    }

    window.location.href = buildMailtoHref();
    setSubmitState('success');
    setSubmitFeedback(
      'Your default email client was opened with your validated message. To enable direct browser submissions on Vercel, set VITE_CONTACT_FORM_ENDPOINT in your environment variables.'
    );
  };

  return (
    <section
      id="contact"
      className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60 bg-slate-100/70 dark:bg-[#080D18]"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="mb-8 sm:mb-12">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
            08. Contact &amp; Connect
          </p>
          <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Connect with me
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            Open to entry-level Data Analyst, Python Developer, and analytical internship
            opportunities. Reach out directly through the form or connect on GitHub and LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-start">
          {/* Left Column: Connect With Me & Social Profiles */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-5 sm:p-6 space-y-4 sm:space-y-5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Connect With Me
              </h3>

              {/* GitHub Profile Card */}
              <a
                href={portfolioProfile.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[60px] flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#090F1D] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 flex items-center justify-center shrink-0">
                    <GitHubBrandIcon className="w-5 h-5 text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      GitHub
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                      {portfolioProfile.github.username}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 shrink-0"
                  aria-hidden="true"
                />
              </a>

              {/* LinkedIn Profile Card */}
              <a
                href={portfolioProfile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[60px] flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#090F1D] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 flex items-center justify-center shrink-0">
                    <LinkedInBrandIcon className="w-5 h-5 text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      LinkedIn
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {portfolioProfile.linkedin.displayName}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 shrink-0"
                  aria-hidden="true"
                />
              </a>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090F1D] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 flex items-center justify-center shrink-0">
                    <Mail
                      className="w-5 h-5 text-indigo-600 dark:text-indigo-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Email
                    </p>
                    <a
                      href={`mailto:${portfolioProfile.email}`}
                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors truncate block"
                    >
                      {portfolioProfile.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="min-h-[44px] sm:min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check
                        className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile Number Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090F1D] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 flex items-center justify-center shrink-0">
                    <Phone
                      className="w-5 h-5 text-indigo-600 dark:text-indigo-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Mobile
                    </p>
                    <a
                      href={`tel:${portfolioProfile.phone}`}
                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors font-mono tabular-nums truncate block"
                    >
                      {portfolioProfile.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  aria-label="Copy mobile number"
                  className="min-h-[44px] sm:min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check
                        className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct CV Download */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onDownloadCv}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700/90 active:scale-[0.99] border border-slate-300 dark:border-slate-700/80 rounded-xl transition-all cursor-pointer"
                >
                  <Download
                    className="w-4 h-4 text-indigo-600 dark:text-indigo-300"
                    aria-hidden="true"
                  />
                  <span>Download CV (PDF)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile-Friendly Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-5 sm:p-8 space-y-4 sm:space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070B14] border border-slate-300 dark:border-slate-700/90 text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="name@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070B14] border border-slate-300 dark:border-slate-700/90 text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Role inquiry, collaboration, or question"
                  aria-invalid={Boolean(errors.subject)}
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070B14] border border-slate-300 dark:border-slate-700/90 text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Write your message here..."
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#070B14] border border-slate-300 dark:border-slate-700/90 text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors resize-y"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {submitState === 'success' && (
                <div
                  role="status"
                  className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700/60 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5"
                >
                  <Check
                    className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{submitFeedback}</span>
                </div>
              )}

              {submitState === 'error' && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-700/60 text-xs sm:text-sm text-rose-900 dark:text-rose-200 flex items-start gap-2.5"
                >
                  <AlertCircle
                    className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1.5">
                    <p>{submitFeedback}</p>
                    <a
                      href={buildMailtoHref()}
                      className="inline-block underline text-rose-800 dark:text-rose-100 hover:text-rose-950 dark:hover:text-white"
                    >
                      Open in default email app instead
                    </a>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {submitState === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {portfolioProfile.contactFormEndpoint
                    ? 'Form endpoint configured for direct delivery.'
                    : 'Opens your email client unless VITE_CONTACT_FORM_ENDPOINT is set.'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

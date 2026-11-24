import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  LayoutDashboard,
  Palette,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Table2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  SkillCategory,
  skillCategoryMeta,
  SkillItem,
  skillsList,
} from '../data/portfolioData';

const STORAGE_KEY = 'raheela_configurable_skill_levels_v1';

const categoryTabs: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'programming', label: 'Programming' },
  { id: 'web-development', label: 'Web Development' },
  { id: 'data-analysis', label: 'Data Analysis' },
  { id: 'tools', label: 'Tools' },
];

const SkillIcon: React.FC<{ iconKey: SkillItem['iconKey'] }> = ({ iconKey }) => {
  const cls = 'w-4 h-4 text-indigo-600 dark:text-indigo-300';
  switch (iconKey) {
    case 'code':
      return <Code2 className={cls} aria-hidden="true" />;
    case 'layers':
      return <Layers className={cls} aria-hidden="true" />;
    case 'globe':
      return <Globe className={cls} aria-hidden="true" />;
    case 'palette':
      return <Palette className={cls} aria-hidden="true" />;
    case 'database':
      return <Database className={cls} aria-hidden="true" />;
    case 'table':
      return <Table2 className={cls} aria-hidden="true" />;
    case 'layout':
      return <LayoutDashboard className={cls} aria-hidden="true" />;
    case 'git':
      return <GitBranch className={cls} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={cls} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={cls} aria-hidden="true" />;
    case 'barChart':
      return <BarChart3 className={cls} aria-hidden="true" />;
  }
};

interface CircularRingProps {
  label: string;
  value: number;
  count: number;
  accent: string;
}

const CircularCategoryGauge: React.FC<CircularRingProps> = ({ label, value, count, accent }) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="rounded-xl bg-white/80 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-3.5 sm:p-5 flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5 sm:gap-4">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 84 84" className="w-16 h-16 sm:w-20 sm:h-20 -rotate-90" aria-hidden="true">
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-200 dark:text-slate-800"
          />
          <motion.circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span
          className="absolute text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {clamped}%
        </span>
      </div>

      <div className="min-w-0 w-full">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
          {label}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 tabular-nums">
          {count} {count === 1 ? 'skill' : 'skills'} · Configurable
        </p>
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [editMode, setEditMode] = useState(false);

  const defaultLevels = useMemo(() => {
    const map: Record<string, number> = {};
    skillsList.forEach((s) => {
      map[s.id] = s.configurableLevel;
    });
    return map;
  }, []);

  const [levels, setLevels] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultLevels, ...JSON.parse(saved) };
      }
    } catch {
      // ignore storage errors
    }
    return defaultLevels;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
    } catch {
      // ignore storage errors
    }
  }, [levels]);

  const handleLevelChange = (id: string, nextValue: number) => {
    const clamped = Math.max(0, Math.min(100, Number.isNaN(nextValue) ? 0 : nextValue));
    setLevels((prev) => ({ ...prev, [id]: clamped }));
  };

  const handleReset = () => {
    setLevels(defaultLevels);
  };

  const filteredSkills =
    activeCategory === 'all'
      ? skillsList
      : skillsList.filter((skill) => skill.category === activeCategory);

  const categorySummaries = (
    ['programming', 'web-development', 'data-analysis', 'tools'] as const
  ).map((catKey) => {
    const items = skillsList.filter((s) => s.category === catKey);
    const avg = Math.round(
      items.reduce((sum, item) => sum + (levels[item.id] ?? item.configurableLevel), 0) /
        Math.max(1, items.length)
    );
    return {
      key: catKey,
      label: skillCategoryMeta[catKey].label,
      accent: skillCategoryMeta[catKey].accent,
      count: items.length,
      avg,
    };
  });

  return (
    <section
      id="skills"
      className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60 bg-slate-100/70 dark:bg-[#080D18]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 sm:mb-10"
        >
          <div>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              02. Technical Skills Dashboard
            </p>
            <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Categorized skills &amp; configurable baseline
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Organized across Programming, Web Development, Data Analysis, and Tools. Indicators
              reflect configurable self-assessment values (editable below or in{' '}
              <code className="text-xs font-mono text-indigo-600 dark:text-indigo-300">
                portfolioData.ts
              </code>
              ) rather than external scores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setEditMode((v) => !v)}
              aria-pressed={editMode}
              className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] ${
                editMode
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-white dark:bg-[#0D1424] text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-indigo-500/50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{editMode ? 'Done Editing' : 'Customize Values'}</span>
            </button>

            {editMode && (
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white dark:bg-[#0D1424] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-slate-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Circular Category Progress Indicators (1-col at 320px, 2x2 at 360px+, 4-col on desktop) */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-7 sm:mb-8">
          {categorySummaries.map((cat) => (
            <CircularCategoryGauge
              key={cat.key}
              label={cat.label}
              value={cat.avg}
              count={cat.count}
              accent={cat.accent}
            />
          ))}
        </div>

        {/* Interactive Category Tabs */}
        <div className="mb-7 sm:mb-8">
          <div
            role="tablist"
            aria-label="Filter technical skills by category"
            className="flex flex-wrap sm:inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800/90"
          >
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`min-h-[44px] sm:min-h-[38px] px-3 sm:px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Skill Bars Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => {
              const currentVal = levels[skill.id] ?? skill.configurableLevel;
              return (
                <motion.article
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{ y: -3 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(idx * 0.04, 0.2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/40 p-5 transition-colors shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4 mb-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                        <SkillIcon iconKey={skill.iconKey} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {skill.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {skill.categoryLabel}
                        </p>
                      </div>
                    </div>

                    <span
                      className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 tabular-nums shrink-0"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {currentVal}%
                    </span>
                  </div>

                  {/* Animated Horizontal Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-3">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: currentVal / 100 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left' }}
                      className="h-full w-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500"
                    />
                  </div>

                  {editMode && (
                    <div className="mb-3 pt-1 flex items-center gap-3">
                      <label
                        htmlFor={`slider-${skill.id}`}
                        className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap"
                      >
                        Adjust value:
                      </label>
                      <input
                        id={`slider-${skill.id}`}
                        type="range"
                        min={0}
                        max={100}
                        value={currentVal}
                        onChange={(e) => handleLevelChange(skill.id, Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

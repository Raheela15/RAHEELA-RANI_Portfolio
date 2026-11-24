import React, { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Info } from 'lucide-react';
import { motion } from 'motion/react';
import {
  illustrativeSampleTrendData,
  projectsList,
  skillCategoryMeta,
  skillsList,
} from '../data/portfolioData';

interface DataVisualizationProps {
  theme: 'dark' | 'light';
}

interface CustomTooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
}

const ChartTooltip: React.FC<{
  active?: boolean;
  payload?: CustomTooltipPayloadItem[];
  label?: string;
  suffix?: string;
}> = ({ active, payload, label, suffix = '' }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg bg-white/95 dark:bg-[#0A101E]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/90 px-3.5 py-2.5 shadow-xl text-xs">
      {label && (
        <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: entry.color || '#6366f1' }}
                aria-hidden="true"
              />
              <span>{entry.name}</span>
            </span>
            <span
              className="font-semibold text-slate-900 dark:text-slate-50 tabular-nums"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {entry.value}
              {suffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DataVisualization: React.FC<DataVisualizationProps> = ({ theme }) => {
  const [barMode, setBarMode] = useState<'tech' | 'features'>('tech');
  const [activeCategorySlice, setActiveCategorySlice] = useState<number | null>(null);
  const [isCompactMobile, setIsCompactMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsCompactMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const isDark = theme === 'dark';
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(15, 23, 42, 0.08)';
  const axisTickColor = isDark ? '#94a3b8' : '#475569';

  const technologyUsageData = useMemo(() => {
    const counts = new Map<string, number>();
    projectsList.forEach((proj) => {
      proj.technologies.forEach((tech) => {
        counts.set(tech, (counts.get(tech) || 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, repos]) => ({ name, count: repos }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const projectFeaturesData = useMemo(() => {
    return projectsList.map((proj) => ({
      name: proj.title.replace('Netflix ', ''),
      count: proj.keyFeatures.length,
    }));
  }, []);

  const skillCategoryData = useMemo(() => {
    return (['data-analysis', 'web-development', 'programming', 'tools'] as const).map(
      (catKey) => {
        const count = skillsList.filter((s) => s.category === catKey).length;
        return {
          name: skillCategoryMeta[catKey].label,
          value: count,
          color: skillCategoryMeta[catKey].accent,
        };
      }
    );
  }, []);

  const activeBarData = barMode === 'tech' ? technologyUsageData : projectFeaturesData;

  return (
    <section
      id="analytics"
      className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#070B14]"
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
            03. Data Visualization
          </p>
          <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Interactive portfolio &amp; analytical charts
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            Factual repository and skill breakdowns alongside a clearly labeled illustrative sample
            trend chart built with Recharts. Tap or hover any element to inspect values.
          </p>
        </motion.div>

        {/* Top Row: Factual Bar Chart + Interactive Category Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 mb-6 sm:mb-7">
          {/* Bar Chart: Switches to horizontal bars on mobile (<640px) so labels never collide */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-4 sm:p-6 flex flex-col overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {barMode === 'tech'
                    ? 'Technology usage across repositories'
                    : 'Documented features per project'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Derived directly from the 3 featured GitHub projects
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Bar chart metric view"
                className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#070B14] border border-slate-200 dark:border-slate-800 self-start"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={barMode === 'tech'}
                  onClick={() => setBarMode('tech')}
                  className={`min-h-[40px] sm:min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    barMode === 'tech'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Tech Stack
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={barMode === 'features'}
                  onClick={() => setBarMode('features')}
                  className={`min-h-[40px] sm:min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    barMode === 'features'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Key Features
                </button>
              </div>
            </div>

            <div className="w-full h-72 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                {isCompactMobile ? (
                  <BarChart
                    data={activeBarData}
                    layout="vertical"
                    margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tick={{ fill: axisTickColor, fontSize: 11 }}
                      axisLine={{ stroke: gridColor }}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={112}
                      tick={{ fill: axisTickColor, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{
                        fill: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.06)',
                      }}
                      content={
                        <ChartTooltip suffix={barMode === 'tech' ? ' repos' : ' features'} />
                      }
                    />
                    <Bar
                      dataKey="count"
                      name={barMode === 'tech' ? 'Repositories' : 'Key Features'}
                      fill="#6366f1"
                      radius={[0, 6, 6, 0]}
                      barSize={22}
                      animationDuration={750}
                    />
                  </BarChart>
                ) : (
                  <BarChart
                    data={activeBarData}
                    margin={{ top: 8, right: 12, left: -16, bottom: 16 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: axisTickColor, fontSize: 11 }}
                      axisLine={{ stroke: gridColor }}
                      tickLine={false}
                      interval={0}
                      angle={barMode === 'tech' ? -15 : 0}
                      textAnchor={barMode === 'tech' ? 'end' : 'middle'}
                      height={46}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: axisTickColor, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{
                        fill: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.06)',
                      }}
                      content={
                        <ChartTooltip suffix={barMode === 'tech' ? ' repos' : ' features'} />
                      }
                    />
                    <Bar
                      dataKey="count"
                      name={barMode === 'tech' ? 'Repositories' : 'Key Features'}
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                      animationDuration={750}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.article>

          {/* Pie / Donut Chart: Skill Category Distribution */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-4 sm:p-6 flex flex-col overflow-hidden"
          >
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                Skills by category
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Distribution of {skillsList.length} core technical skills across 4 domains
              </p>
            </div>

            <div className="w-full h-52 sm:h-56 min-h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isCompactMobile ? 48 : 56}
                    outerRadius={isCompactMobile ? 72 : 84}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                    animationDuration={800}
                    onMouseEnter={(_, idx) => setActiveCategorySlice(idx)}
                    onMouseLeave={() => setActiveCategorySlice(null)}
                  >
                    {skillCategoryData.map((entry, idx) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                        opacity={
                          activeCategorySlice === null || activeCategorySlice === idx ? 1 : 0.45
                        }
                        stroke="transparent"
                        className="cursor-pointer transition-opacity duration-150"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip suffix=" skills" />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {activeCategorySlice !== null
                    ? skillCategoryData[activeCategorySlice].value
                    : skillsList.length}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[90px] truncate">
                  {activeCategorySlice !== null
                    ? skillCategoryData[activeCategorySlice].name
                    : 'Total Skills'}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800/70 grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5 text-xs">
              {skillCategoryData.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  onMouseEnter={() => setActiveCategorySlice(idx)}
                  onMouseLeave={() => setActiveCategorySlice(null)}
                  onClick={() =>
                    setActiveCategorySlice((prev) => (prev === idx ? null : idx))
                  }
                  className="min-h-[44px] flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-100/80 dark:bg-[#070B14]/70 hover:bg-slate-200/70 dark:hover:bg-slate-800/70 transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span
                    className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {item.value}
                  </span>
                </button>
              ))}
            </div>
          </motion.article>
        </div>

        {/* Bottom Row: Line Chart (Explicitly Labeled Illustrative Sample Data) */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800/90 p-4 sm:p-6 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                Sample exploratory analysis: streaming catalog titles by release year
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-start sm:items-center gap-1.5">
                <Info
                  className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-300 shrink-0 mt-0.5 sm:mt-0"
                  aria-hidden="true"
                />
                <span>
                  Illustrative sample dataset used strictly to demonstrate interactive trend
                  visualization—not personal achievement metrics.
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 shrink-0">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" aria-hidden="true" />
                <span>Movies (Sample)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" aria-hidden="true" />
                <span>TV Shows (Sample)</span>
              </span>
            </div>
          </div>

          <div className="w-full h-64 sm:h-72 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={illustrativeSampleTrendData}
                margin={{ top: 10, right: 8, left: -18, bottom: 4 }}
              >
                <defs>
                  <linearGradient id="moviesSampleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tvSampleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: axisTickColor, fontSize: 11 }}
                  axisLine={{ stroke: gridColor }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: axisTickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                />
                <Tooltip content={<ChartTooltip suffix=" titles" />} />
                <Area
                  type="monotone"
                  dataKey="movies"
                  name="Movies (Sample)"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#moviesSampleGrad)"
                  animationDuration={850}
                />
                <Area
                  type="monotone"
                  dataKey="tvShows"
                  name="TV Shows (Sample)"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tvSampleGrad)"
                  animationDuration={850}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  Layers,
  Terminal,
  Database,
  Search,
  CheckCircle2,
  Sparkles,
  LineChart,
  Network
} from 'lucide-react';
import { technicalSkills } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Machine Learning & Algorithms',
    'Deep Learning & Artificial Intelligence',
    'Data Science & Mathematics',
    'Programming & Frameworks',
    'Databases & Development Tools'
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Machine Learning & Algorithms':
        return Brain;
      case 'Deep Learning & Artificial Intelligence':
        return Network;
      case 'Data Science & Mathematics':
        return LineChart;
      case 'Programming & Frameworks':
        return Terminal;
      case 'Databases & Development Tools':
        return Database;
      default:
        return Sparkles;
    }
  };

  const filteredCategories = technicalSkills
    .filter((cat) => {
      if (activeCategory === 'All') return true;
      return cat.category === activeCategory;
    })
    .map((cat) => {
      const filteredSkills = cat.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...cat, skills: filteredSkills };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Technical & Machine Learning Skills
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A comprehensive, battle-tested stack spanning core statistical learning, deep neural architectures, modern GenAI/RAG, and production API tooling.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((category) => {
              const label =
                category === 'All'
                  ? 'All Skills'
                  : category
                      .replace(' & Algorithms', '')
                      .replace(' & Artificial Intelligence', '')
                      .replace(' & Mathematics', '')
                      .replace(' & Frameworks', '')
                      .replace(' & Development Tools', '');
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === category
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500/40'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill (e.g. XGBoost, RAG, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((group, idx) => {
              const Icon = getCategoryIcon(group.category);
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800/80 mb-5 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-800/50">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {group.category}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {group.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto">
                      {group.skills.length} Competencies
                    </span>
                  </div>

                  {/* Skills Badges Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/70 dark:border-slate-750/70 hover:border-teal-500/50 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50">
                            {skill.level}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span className="text-[11px] text-slate-400 dark:text-slate-500">Domain</span>
                          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                            {skill.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 glass-card rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No matching skills found for "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

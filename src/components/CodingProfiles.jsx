import React from 'react';
import {
  Github,
  Activity,
  Code,
  ExternalLink,
  Sparkles,
  GitBranch,
  Terminal
} from 'lucide-react';
import { codingProfiles } from '../data/portfolioData';

export default function CodingProfiles() {
  const getProfileIcon = (platform) => {
    switch (platform) {
      case 'GitHub':
        return Github;
      case 'Kaggle':
        return Activity;
      case 'LeetCode / Problem Solving':
        return Code;
      default:
        return Terminal;
    }
  };

  return (
    <section id="profiles" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            GitHub & Coding Profiles
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Explore public machine learning repositories, reproducible data science notebooks, and algorithmic problem-solving benchmarks.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {codingProfiles.map((profile, idx) => {
            const Icon = getProfileIcon(profile.platform);
            return (
              <a
                key={idx}
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-800/60 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {profile.platform}
                  </h3>
                  <span className="text-xs font-mono text-teal-600 dark:text-teal-400 block mb-3 font-medium">
                    {profile.handle}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {profile.metrics}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 font-medium">
                    {profile.highlight}
                  </span>
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold group-hover:underline">
                    Visit Profile →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import {
  Brain,
  Layers,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Github,
  Play,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Cpu,
  BarChart3
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import BankruptcyModal from './modals/BankruptcyModal';
import ConcreteStrengthModal from './modals/ConcreteStrengthModal';
import CollegeChatbotModal from './modals/CollegeChatbotModal';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  const getProjectIcon = (id) => {
    switch (id) {
      case 'bankruptcy-prediction':
        return Brain;
      case 'concrete-strength':
        return Layers;
      case 'college-rag-chatbot':
        return MessageSquare;
      default:
        return Cpu;
    }
  };

  const getModalComponent = (project) => {
    if (!project) return null;
    switch (project.demoType) {
      case 'bankruptcy-simulator':
        return <BankruptcyModal project={project} onClose={() => setActiveModalProject(null)} />;
      case 'concrete-calculator':
        return <ConcreteStrengthModal project={project} onClose={() => setActiveModalProject(null)} />;
      case 'rag-sandbox':
        return <CollegeChatbotModal project={project} onClose={() => setActiveModalProject(null)} />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Production-Ready AI/ML Projects
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Deep-dive implementations featuring rigorous data preprocessing, algorithm benchmarking, interactive simulations, and deployment-ready architecture.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => {
            const Icon = getProjectIcon(project.id);
            return (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Top Card Banner */}
                  <div className="p-6 pb-4 bg-gradient-to-b from-slate-100/60 to-transparent dark:from-slate-800/40 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200/80 dark:border-teal-800/80">
                        {project.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary & Approach */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Key Metrics Pill Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800"
                        >
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{m.label}</span>
                          <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Algorithms / Highlights */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                        Core Methodologies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.algorithms.map((algo, aIdx) => (
                          <span
                            key={aIdx}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {algo}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Tech Stack & Actions */}
                <div className="p-6 pt-0 space-y-4">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50/60 dark:bg-slate-800/70 text-teal-800 dark:text-teal-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch Interactive Demo</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                      title="View GitHub Repository"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render Active Interactive Modal */}
      {getModalComponent(activeModalProject)}
    </section>
  );
}

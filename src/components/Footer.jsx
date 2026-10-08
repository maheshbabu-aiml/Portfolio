import React from 'react';
import {
  Sparkles,
  ArrowUp,
  Heart,
  Github,
  Linkedin,
  Mail,
  Code2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060911] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white block">
                AI/ML Engineer Portfolio
              </span>
              <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                M.Tech in Computer Science Engineering
              </span>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <a href="#about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Projects</a>
            <a href="#education" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Education</a>
            <a href="#experience" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Contact</a>
          </div>

          {/* Right Action & Scroll Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 AI/ML Engineer. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Engineered with React, Tailwind CSS & Machine Learning rigor</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

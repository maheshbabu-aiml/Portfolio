import React from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  BookOpen,
  Database
} from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

export default function Certifications() {
  const getCertIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return Award;
      case 'Sparkles':
        return Sparkles;
      case 'Database':
        return Database;
      default:
        return CheckCircle2;
    }
  };

  return (
    <section id="certifications" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Professional Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Certifications & Specialized Training
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Structured coursework and specialized continuous learning in Machine Learning, Deep Learning, Generative AI, and Database systems.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certificationsData.map((cert, idx) => {
            const Icon = getCertIcon(cert.icon);
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-800/60">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mb-3">
                    {cert.issuer}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong className="text-slate-700 dark:text-slate-300">Core Curriculum:</strong> {cert.topics}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {cert.pdfUrl ? (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={cert.downloadName || 'Certificate.pdf'}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800 shadow-sm transition-all group"
                      title="Download original verified PDF certificate"
                    >
                      <span>📥 Download Original PDF Certificate</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">Verified Credentials</span>
                  )}
                  <span className="text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1">
                    ✓ Verified Competency
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

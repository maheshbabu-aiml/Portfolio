import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  Building
} from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Education
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Strong academic foundations in advanced computer science, machine learning theory, data structures, and mathematical optimization.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-2xl p-6 sm:p-7 border shadow-sm relative overflow-hidden transition-all ${
                idx === 0
                  ? 'border-teal-500/40 dark:border-teal-500/30 bg-teal-50/20 dark:bg-teal-950/10'
                  : 'border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl text-white shadow-md flex-shrink-0 ${
                      idx === 0
                        ? 'bg-gradient-to-tr from-teal-500 to-indigo-600 shadow-teal-500/20'
                        : 'bg-slate-800 dark:bg-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      {edu.status && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">
                          {edu.status}
                        </span>
                      )}
                      {edu.grade && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                          {edu.grade}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                      {edu.field}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <strong>{edu.institution}</strong>
                      <span className="text-slate-400">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {edu.location}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-850 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-750 self-start md:self-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Coursework & Highlights */}
              <div className="pt-4 space-y-3">
                {edu.coursework && (
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                      Key Subjects & Coursework
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-850 border border-slate-200/70 dark:border-slate-750 text-xs font-medium text-slate-700 dark:text-slate-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.highlights && (
                  <div className="space-y-1.5 pt-1">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

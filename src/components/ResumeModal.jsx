import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  FileText,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Brain,
  Award
} from 'lucide-react';
import { personalInfo, technicalSkills, projectsData, educationData, experienceData, certificationsData } from '../data/portfolioData';

export default function ResumeModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
============================================================
${personalInfo.name.toUpperCase()}
Role: ${personalInfo.role} | Education: ${personalInfo.degree}
Location: ${personalInfo.location} | Mobile: ${personalInfo.mobile}
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}
============================================================

PROFESSIONAL SUMMARY:
${personalInfo.summary}

SKILLS SUMMARY:
${technicalSkills.map(cat => `- ${cat.category}: ${cat.skills.map(s => s.name).join(', ')}`).join('\n')}

PROJECTS:
${projectsData.map(p => `• ${p.title} | ${p.type}
  - ${p.summary}
  - Algorithms: ${p.algorithms.join(', ')}
  - Tech Stack: ${p.techStack.join(', ')}
  - Metrics: ${p.metrics.map(m => `${m.label}: ${m.value}`).join(' | ')}`).join('\n\n')}

EDUCATION:
${educationData.map(e => `• ${e.degree} - ${e.field}
  ${e.institution}, ${e.location} | ${e.period}${e.grade ? ` | ${e.grade}` : ''}`).join('\n')}

CERTIFICATIONS:
${certificationsData.map(c => `• ${c.title} – ${c.issuer} (${c.topics})`).join('\n')}
    `;
    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl glass-card rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 print:shadow-none print:border-none print:m-0 print:max-w-full">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {personalInfo.name} — Curriculum Vitae
              </h3>
              <p className="text-xs text-slate-500">Recruiter-Formatted Resume</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 print:max-h-full print:p-0 print:text-black">
          {/* Header */}
          <div className="pb-5 border-b border-slate-200 dark:border-slate-800 print:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white print:text-black tracking-tight uppercase">
                  {personalInfo.name}
                </h1>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 print:text-teal-700 mt-0.5">
                  AI/ML Engineer • {personalInfo.degree}
                </p>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5 sm:text-right print:text-black">
                <p className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-500" /> Location: {personalInfo.location}
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-teal-500" /> Mobile: {personalInfo.mobile}
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-500" /> Email: {personalInfo.email}
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-teal-500" /> LinkedIn: Mahesh Babu. Macharla
                </p>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 print:text-slate-600 uppercase tracking-wider mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 print:text-black">
              {personalInfo.summary}
            </p>
          </div>

          {/* Skills Summary */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 print:text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-teal-600" />
              Skills Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {technicalSkills.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 print:bg-transparent print:border-none print:p-0"
                >
                  <strong className="text-slate-900 dark:text-white print:text-black block mb-0.5">
                    {cat.category}:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-400 print:text-black">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 print:text-slate-600 uppercase tracking-wider mb-2">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {projectsData.map((proj, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200/80 dark:border-slate-800 print:bg-transparent print:border-none print:p-0"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white print:text-black">
                      {proj.title} | {proj.type}
                    </h3>
                    <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                      {proj.metrics[0].label}: {proj.metrics[0].value}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 print:text-black mb-1.5 leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 print:text-black">
                    <strong>Tech Stack & Libraries:</strong> {proj.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 print:text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850/70 border border-slate-200/80 dark:border-slate-800 print:bg-transparent print:border-none print:p-0"
                >
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 dark:text-white print:text-black">
                      {edu.degree} - {edu.field}
                    </span>
                    <span className="text-slate-500 font-mono">{edu.period}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 print:text-black mt-0.5">
                    <span>{edu.institution}, {edu.location}</span>
                    {edu.grade && <strong className="text-teal-600 print:text-black font-mono">{edu.grade}</strong>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 print:text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              Certifications
            </h2>
            <div className="space-y-1.5 text-xs">
              {certificationsData.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 print:bg-transparent print:border-none print:p-0 flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white print:text-black">
                      {cert.title} – {cert.issuer}
                    </span>
                    <span className="text-slate-500 block text-[11px]">{cert.topics}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold print:hidden">✓ Verified</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

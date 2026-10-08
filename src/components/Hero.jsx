import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  FileText,
  Mail,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown,
  Activity,
  CheckCircle2,
  Database
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';

export default function Hero({ openResumeModal }) {
  const canvasRef = useRef(null);
  const [pipelineStep, setPipelineStep] = useState(0);

  // Auto-cycle pipeline visualizer
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Neural canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const numNodes = 36;
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.22 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 212, 191, 0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(20, 184, 166, 0.5)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pipelineStages = [
    {
      title: '1. Data Ingestion & EDA',
      desc: 'Pandas, NumPy, Outlier IQR, Feature Scaling',
      badge: 'Data Layer',
      icon: Database,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/30'
    },
    {
      title: '2. Feature Engineering',
      desc: 'Interaction terms, Altman ratios, SMOTE balancing',
      badge: 'Prep Layer',
      icon: Layers,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30'
    },
    {
      title: '3. Model Training & Tuning',
      desc: 'XGBoost, Random Forest, PyTorch, Cross-Validation',
      badge: 'ML Engine',
      icon: Brain,
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/30'
    },
    {
      title: '4. Deployment & RAG',
      desc: 'Flask/FastAPI microservices, Vector DB embeddings',
      badge: 'Inference Layer',
      icon: Cpu,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background canvas and ambient glows */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60 z-0" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Mobile Profile Image + Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Mobile Profile Photo (Above Name & Intro on Mobile/Tablet) */}
            <div className="lg:hidden w-full flex justify-center sm:justify-start mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 via-indigo-500 to-teal-400 opacity-60 blur-md group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                <img
                  src={profileImg}
                  alt="Mahesh Babu - AI/ML Engineer"
                  onError={(e) => { e.currentTarget.src = '/profile.jpg'; }}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover object-center border-4 border-white dark:border-slate-800 shadow-xl ring-4 ring-teal-500/30 dark:ring-teal-400/40"
                />
                <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-md border-2 border-white dark:border-slate-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  AI/ML
                </div>
              </div>
            </div>

            {/* Recruiter Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-teal-800 dark:text-teal-300 text-xs font-semibold shadow-sm mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
              <span>M.Tech CSE Graduate • Seeking Entry-Level AI/ML Engineer Roles</span>
            </div>

            {/* Main Headline & Identity */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18] mb-3">
              Mahesh Babu
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400 mb-3">
              AI/ML Engineer
            </div>

            {/* Specialized Domain Headline */}
            <div className="text-xs sm:text-sm font-semibold font-mono text-slate-600 dark:text-slate-300 tracking-wide mb-6 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-750 inline-block">
              • Artificial Intelligence • Machine Learning • Data Science • Generative AI
            </div>

            {/* Sub-description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Post-graduate in Computer Science Engineering (M.Tech) specializing in predictive classification & regression models, deep learning architectures, and production-grade Retrieval-Augmented Generation (RAG) pipelines. Equipped with strong mathematical rigor and hands-on Scikit-learn, PyTorch, and Flask expertise.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={openResumeModal}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-semibold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 font-semibold text-sm hover:bg-slate-200/70 dark:hover:bg-slate-700/50 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6 border-t border-slate-200/80 dark:border-slate-800">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Desktop Profile Photo + Interactive ML Pipeline Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-6">
            
            {/* Desktop Profile Photo (Positioned on the Right on Desktop) */}
            <div className="hidden lg:flex flex-col items-center w-full max-w-md">
              <div className="relative group mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-teal-500 via-indigo-500 to-teal-400 opacity-60 blur-lg group-hover:opacity-100 transition duration-500"></div>
                <img
                  src={profileImg}
                  alt="Mahesh Babu - AI/ML Engineer"
                  onError={(e) => { e.currentTarget.src = '/profile.jpg'; }}
                  className="relative w-48 h-48 xl:w-56 xl:h-56 rounded-full object-cover object-center border-4 border-white dark:border-slate-800 shadow-2xl ring-4 ring-teal-500/30 dark:ring-teal-400/40"
                />
                <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg border-2 border-white dark:border-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  AI/ML Specialist
                </div>
              </div>
            </div>

            {/* Pipeline Visualizer Card */}
            <div className="w-full max-w-md glass-card rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden border border-slate-200/80 dark:border-slate-700/80">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">
                    ml_pipeline_lifecycle.py
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" /> LIVE ENGINE
                </span>
              </div>

              {/* Interactive Pipeline Stages */}
              <div className="space-y-3">
                {pipelineStages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isActive = pipelineStep === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setPipelineStep(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-teal-500/10 border-teal-500/50 shadow-md shadow-teal-500/10 scale-[1.01]'
                          : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 opacity-80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg border ${stage.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {stage.title}
                          </h4>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {stage.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 pl-8">
                        {stage.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Live Metric Snapshot */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                  Validated on Test Benchmarks
                </span>
                <span className="font-mono text-teal-600 dark:text-teal-400 font-medium">
                  ROC-AUC: 0.94 • R²: 0.92
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors z-10"
        aria-label="Scroll down to About section"
      >
        <span className="text-[11px] uppercase tracking-wider font-semibold">Explore Profile</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}

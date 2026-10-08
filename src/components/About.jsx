import React, { useState } from 'react';
import {
  Brain,
  GraduationCap,
  Sparkles,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  Play,
  Terminal,
  Cpu,
  Layers,
  Database
} from 'lucide-react';
import { personalInfo, sampleCodeSnippet } from '../data/portfolioData';

export default function About() {
  const [copied, setCopied] = useState(false);
  const [runOutput, setRunOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRun = () => {
    setIsRunning(true);
    setRunOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunOutput({
        status: 'Success',
        trainSamples: 4800,
        testSamples: 1200,
        features: 18,
        scaling: 'RobustScaler Applied',
        imbalanceRatio: '1:14 (Handled with scale_pos_weight = 13.8)',
        rocAuc: 0.9424,
        recall: '92.4%',
        precision: '86.1%'
      });
    }, 900);
  };

  const engineeringPillars = [
    {
      title: 'Statistical Rigor & Data Quality',
      desc: 'Deep focus on exploratory data analysis, outlier mitigation with IQR, skewness correction, and domain-specific feature derivation.',
      icon: Database,
      tag: 'Data Prep'
    },
    {
      title: 'Robust Algorithmic Optimization',
      desc: 'Mastery over decision trees, ensemble bagging/boosting (Random Forest, XGBoost), regularization, and stratified cross-validation.',
      icon: Brain,
      tag: 'Core ML'
    },
    {
      title: 'Deep Learning & GenAI Architectures',
      desc: 'Hands-on experience with Neural Networks (ANN, CNN, RNN), dense vector embeddings, and Retrieval-Augmented Generation (RAG).',
      icon: Cpu,
      tag: 'DL & AI'
    },
    {
      title: 'Production Deployment & Serving',
      desc: 'Translating trained pipelines into sub-10ms Flask/FastAPI REST microservices with reproducible dependency isolation.',
      icon: Layers,
      tag: 'Deployment'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Profile & Engineering Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Bridging foundational computer science research with scalable, production-grade Machine Learning and Generative AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Bio & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                M.Tech in Computer Science Engineering
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                I hold a Master of Technology (M.Tech) in Computer Science Engineering, dedicated to advancing in <strong>Artificial Intelligence, Machine Learning, Deep Learning, and Data Science</strong>. My academic and project journey has centered on developing algorithms that solve practical, high-stakes predictive challenges.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                Whether formulating classification pipelines for financial distress forecasting, tuning regression engines for material strength estimation, or building vector-backed RAG chatbots for knowledge discovery, I approach every engineering challenge with strict validation standards, clean modular code, and deployment readiness.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Focus Areas</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">AI, ML, DL, Data Science</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Career Goal</span>
                  <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">Entry-Level AI/ML Engineer</span>
                </div>
              </div>
            </div>

            {/* 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engineeringPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card rounded-xl p-4.5 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {pillar.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Code Sandbox Preview */}
          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950 text-slate-100">
              {/* Code Sandbox Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">train_xgboost_pipeline.py</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                    title="Copy Python Code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleSimulateRun}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                    title="Execute training simulation"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isRunning ? 'Training...' : 'Run Code'}</span>
                  </button>
                </div>
              </div>

              {/* Code Body */}
              <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed bg-[#0b1120] max-h-[380px] scrollbar-thin">
                <pre className="text-slate-300">
                  <code>{sampleCodeSnippet}</code>
                </pre>
              </div>

              {/* Simulated Output Terminal */}
              {runOutput && (
                <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs font-mono animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pipeline Execution Completed Successfully</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-500">Train/Test Split: </span>
                      {runOutput.trainSamples} / {runOutput.testSamples}
                    </div>
                    <div>
                      <span className="text-slate-500">ROC-AUC: </span>
                      <strong className="text-teal-400">{runOutput.rocAuc}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Sensitivity (Recall): </span>
                      <strong className="text-emerald-400">{runOutput.recall}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Precision: </span>
                      {runOutput.precision}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

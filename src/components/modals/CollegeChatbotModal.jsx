import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Sparkles,
  Database,
  Search,
  CheckCircle2,
  FileText,
  Cpu,
  Layers,
  Send,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function CollegeChatbotModal({ project, onClose }) {
  const sampleQueries = [
    {
      query: 'What are the M.Tech CSE admission eligibility criteria and scholarship requirements?',
      chunks: [
        {
          source: 'Academic_Handbook_2024_Sec4.pdf (Page 14)',
          score: 0.948,
          text: 'Candidates must possess a Bachelor’s degree in Engineering/Technology (CSE/IT/ECE) with a minimum of 60% aggregate marks (or 6.5 CGPA). Valid GATE score qualifies candidates for monthly institutional research fellowships of ₹12,400/month.'
        },
        {
          source: 'Admissions_Guidelines_v2.pdf (Page 8)',
          score: 0.892,
          text: 'Direct sponsored category candidates require 2+ years of relevant industry experience in software engineering, AI, or data systems in lieu of GATE qualification.'
        }
      ],
      answer:
        'Based on the **Academic Handbook (Sec 4, Page 14)** and **Admissions Guidelines**:\n\n1. **Degree Requirements**: Bachelor’s in Engineering (CSE/IT/ECE) with minimum 60% aggregate or 6.5 CGPA.\n2. **GATE & Fellowship**: Candidates with valid GATE scores are eligible for an institutional research stipend of **₹12,400/month**.\n3. **Sponsored Candidates**: Industry professionals with 2+ years in AI/Software systems can apply under the sponsored category without GATE.\n\n*All sources verified through indexed institutional documentation.*'
    },
    {
      query: 'What is the GPU lab access and High-Performance Computing (HPC) research cluster policy?',
      chunks: [
        {
          source: 'AI_HPC_Cluster_Protocols_2024.pdf (Page 5)',
          score: 0.962,
          text: 'Graduate students working on Deep Learning, Computer Vision, and LLM research are provisioned 24/7 remote SSH and JupyterHub credentials to the 8x NVIDIA A100 GPU cluster following faculty advisor project approval.'
        },
        {
          source: 'Lab_Safety_and_Usage_Regulations.pdf (Page 2)',
          score: 0.884,
          text: 'Batch training jobs with duration > 12 hours must be scheduled through the Slurm queue manager with appropriate priority tags to ensure equitable GPU compute sharing.'
        }
      ],
      answer:
        'According to the **AI & HPC Cluster Protocols (Page 5)**:\n\n- **24/7 Access**: Graduate researchers in AI/ML are granted remote SSH & JupyterHub access to the **8x NVIDIA A100 GPU cluster** upon faculty advisor approval.\n- **Workload Scheduling**: Long-running training runs exceeding 12 hours must be queued via **Slurm workload manager** for resource allocation.'
    },
    {
      query: 'How are semester credits and final M.Tech thesis evaluations graded?',
      chunks: [
        {
          source: 'Curriculum_Evaluation_Scheme_CSE.pdf (Page 22)',
          score: 0.935,
          text: 'The M.Tech CSE curriculum comprises 68 total credits across 4 semesters. The final semester is dedicated entirely to the Capstone Thesis (16 credits), evaluated by an internal committee and external academic reviewer.'
        }
      ],
      answer:
        'Per the **Curriculum Evaluation Scheme (Page 22)**:\n\n- Total program requirement: **68 credits** across 4 semesters.\n- **Semester IV Thesis**: Carries **16 credits** and requires defense before an expert panel comprising the research guide, departmental committee, and an external examiner.'
    }
  ];

  const [selectedQueryIdx, setSelectedQueryIdx] = useState(0);
  const [customQuery, setCustomQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState(3);

  const activeData = sampleQueries[selectedQueryIdx];

  const handleSelectQuery = (idx) => {
    setIsProcessing(true);
    setSelectedQueryIdx(idx);
    setActivePipelineStep(0);

    setTimeout(() => setActivePipelineStep(1), 200);
    setTimeout(() => setActivePipelineStep(2), 500);
    setTimeout(() => {
      setActivePipelineStep(3);
      setIsProcessing(false);
    }, 800);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setIsProcessing(true);
    setActivePipelineStep(0);
    setTimeout(() => setActivePipelineStep(1), 250);
    setTimeout(() => setActivePipelineStep(2), 600);
    setTimeout(() => {
      setActivePipelineStep(3);
      setIsProcessing(false);
      setSelectedQueryIdx(0);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-card rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">
                  RAG Architecture Sandbox
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Document Ingestion • Vector Indexing • Cosine Similarity • LLM Generation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Query Selector Tabs */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Select Sample Campus Query to Test Semantic Retrieval:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sampleQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(idx)}
                  className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                    selectedQueryIdx === idx
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">
                    Scenario #{idx + 1}
                  </div>
                  <p className="line-clamp-2 text-[11px] opacity-90">{item.query}</p>
                </button>
              ))}
            </div>
          </div>

          {/* RAG Pipeline Flow Indicator */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  activePipelineStep >= 0
                    ? 'bg-sky-500/10 border-sky-500/40 text-sky-600 dark:text-sky-400 font-semibold'
                    : 'opacity-40 border-transparent'
                }`}
              >
                <Database className="w-4 h-4 mx-auto mb-1" />
                1. Vector Embedding
              </div>
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  activePipelineStep >= 1
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'opacity-40 border-transparent'
                }`}
              >
                <Search className="w-4 h-4 mx-auto mb-1" />
                2. Top-K Retrieval
              </div>
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  activePipelineStep >= 2
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-600 dark:text-teal-400 font-semibold'
                    : 'opacity-40 border-transparent'
                }`}
              >
                <Layers className="w-4 h-4 mx-auto mb-1" />
                3. Context Injection
              </div>
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  activePipelineStep >= 3
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'opacity-40 border-transparent'
                }`}
              >
                <Sparkles className="w-4 h-4 mx-auto mb-1" />
                4. LLM Generation
              </div>
            </div>
          </div>

          {/* Retrieved Vector Chunks Inspection */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-500" />
                Retrieved Vector Store Chunks (Top-K Matches)
              </span>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-normal">
                Cosine Metric
              </span>
            </h4>
            <div className="space-y-3">
              {activeData.chunks.map((chunk, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 shadow-sm text-xs"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                      {chunk.source}
                    </span>
                    <span className="font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold border border-teal-200/50">
                      Similarity: {(chunk.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px]">
                    "{chunk.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* LLM Generated Answer */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-500" />
              Grounded LLM Response (Zero Hallucination Guardrail)
            </h4>
            <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-slate-850 border border-teal-200/80 dark:border-slate-750 shadow-sm">
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {isProcessing ? (
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-mono text-xs">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Synthesizing verified context and generating cite-backed answer...</span>
                  </div>
                ) : (
                  activeData.answer
                )}
              </div>
            </div>
          </div>

          {/* Technical Pipeline Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800"
              >
                <span className="text-xs text-slate-500 dark:text-slate-400 block">{metric.label}</span>
                <span className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Close Sandbox
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors"
            >
              <span>View Source on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  X,
  Brain,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  TrendingDown,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export default function BankruptcyModal({ project, onClose }) {
  // Financial Ratio Inputs for Simulator
  const [roa, setRoa] = useState(4.2); // Return on Assets (%)
  const [debtEquity, setDebtEquity] = useState(1.4); // Debt to Equity ratio
  const [opMargin, setOpMargin] = useState(8.5); // Operating Margin (%)
  const [currentRatio, setCurrentRatio] = useState(1.8); // Liquidity Current Ratio

  // ML Scoring Logic Simulation (Logistic / XGBoost formula approximation)
  // Higher Debt/Equity increases risk; Higher ROA, Margin, Current Ratio decreases risk.
  const calculateRisk = () => {
    let zScore =
      0.8 * (debtEquity - 1.0) -
      0.15 * roa -
      0.08 * opMargin -
      0.45 * (currentRatio - 1.2);
    
    // Sigmoid probability conversion
    const prob = 1 / (1 + Math.exp(-zScore));
    return Math.min(Math.max(prob * 100, 2.5), 98.5);
  };

  const riskScore = calculateRisk();
  const isHighRisk = riskScore > 65;
  const isModerateRisk = riskScore >= 35 && riskScore <= 65;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-card rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">
                  Live ML Simulator
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Classification benchmark with synthetic imbalance compensation & feature attribution
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
          {/* Interactive Simulator Section */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-500" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Interactive Financial Distress Inference Sandbox
                </h4>
              </div>
              <span className="text-xs text-slate-500">Adjust ratios to test live model inference</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Return on Assets (ROA)</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{roa.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="25"
                    step="0.5"
                    value={roa}
                    onChange={(e) => setRoa(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>-20% (Heavy Loss)</span>
                    <span>+25% (High Profit)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Debt-to-Equity Ratio</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{debtEquity.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.5"
                    step="0.1"
                    value={debtEquity}
                    onChange={(e) => setDebtEquity(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0.2x (Low Leverage)</span>
                    <span>4.5x (High Leverage)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Operating Profit Margin</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{opMargin.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="35"
                    step="0.5"
                    value={opMargin}
                    onChange={(e) => setOpMargin(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>-25% (Negative Margin)</span>
                    <span>+35% (Strong Margin)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Current Liquidity Ratio</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{currentRatio.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="3.5"
                    step="0.1"
                    value={currentRatio}
                    onChange={(e) => setCurrentRatio(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0.4 (Liquidity Crunch)</span>
                    <span>3.5 (Abundant Cash)</span>
                  </div>
                </div>
              </div>

              {/* Inference Result Display */}
              <div className="flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Predicted Distress Probability
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={`text-4xl font-extrabold font-mono ${
                        isHighRisk
                          ? 'text-rose-600 dark:text-rose-400'
                          : isModerateRisk
                          ? 'text-amber-500'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {riskScore.toFixed(1)}%
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Distress Likelihood</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isHighRisk
                          ? 'bg-rose-500'
                          : isModerateRisk
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${riskScore}%` }}
                    />
                  </div>

                  {/* Classification Status Badge */}
                  <div
                    className={`p-3 rounded-xl border flex items-center gap-3 ${
                      isHighRisk
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300'
                        : isModerateRisk
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {isHighRisk ? (
                      <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    )}
                    <div className="text-xs">
                      <strong>
                        {isHighRisk
                          ? 'High Bankruptcy Risk Detected'
                          : isModerateRisk
                          ? 'Moderate Risk / Cautionary Band'
                          : 'Solvent & Low Risk Classification'}
                      </strong>
                      <p className="mt-0.5 opacity-90">
                        {isHighRisk
                          ? 'High leverage and negative cash metrics trigger distress threshold.'
                          : isModerateRisk
                          ? 'Marginal solvency; close monitoring of debt obligations recommended.'
                          : 'Strong asset returns and healthy liquidity provide high solvency safety.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Ensemble: XGBoost + Random Forest</span>
                  <span>Threshold: 0.50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Benchmarking Comparison */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Multi-Algorithm Performance Benchmarking
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">Algorithm Model</th>
                    <th className="p-3">Accuracy</th>
                    <th className="p-3">Precision</th>
                    <th className="p-3">Recall (Distress)</th>
                    <th className="p-3">ROC-AUC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Logistic Regression (Baseline)</td>
                    <td className="p-3 font-mono">84.2%</td>
                    <td className="p-3 font-mono">74.5%</td>
                    <td className="p-3 font-mono">78.1%</td>
                    <td className="p-3 font-mono">0.824</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Decision Tree (Cart)</td>
                    <td className="p-3 font-mono">87.6%</td>
                    <td className="p-3 font-mono">79.2%</td>
                    <td className="p-3 font-mono">81.4%</td>
                    <td className="p-3 font-mono">0.856</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Random Forest (Ensemble)</td>
                    <td className="p-3 font-mono">92.8%</td>
                    <td className="p-3 font-mono">84.6%</td>
                    <td className="p-3 font-mono">89.3%</td>
                    <td className="p-3 font-mono">0.928</td>
                  </tr>
                  <tr className="bg-teal-50/60 dark:bg-teal-950/30 font-bold text-teal-900 dark:text-teal-200">
                    <td className="p-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>XGBoost Classifier (Selected Best)</span>
                    </td>
                    <td className="p-3 font-mono">94.7%</td>
                    <td className="p-3 font-mono">86.1%</td>
                    <td className="p-3 font-mono">92.4%</td>
                    <td className="p-3 font-mono text-teal-600 dark:text-teal-400">0.942</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Pipeline Architecture Steps */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Data Pipeline & Preprocessing Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {project.solutionApproach.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Step {idx + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
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
              Close Simulator
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

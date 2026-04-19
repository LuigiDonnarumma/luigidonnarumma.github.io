import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const explicitTauRows = [
  { tau: '0.5',  est: '298.540', bias: '1.722', hi: true },
  { tau: '0.3',  est: '297.352', bias: '0.534' },
  { tau: '0.2',  est: '295.470', bias: '1.348', hi: true },
  { tau: '0.15', est: '297.083', bias: '0.265' },
  { tau: '0.1',  est: '296.719', bias: '0.099', lo: true },
];

const implicitTauRows = [
  { tau: '1.0', est: '293.419', bias: '3.399', hi: true },
  { tau: '0.8', est: '295.935', bias: '0.883' },
  { tau: '0.5', est: '296.145', bias: '0.673', lo: true },
  { tau: '0.4', est: '296.304', bias: '0.514', lo: true },
  { tau: '0.2', est: '295.900', bias: '0.918' },
];

const cleTauRows = [
  { tau: '1.0', est: '299.072', bias: '2.254', hi: true },
  { tau: '0.5', est: '297.461', bias: '0.643' },
  { tau: '0.4', est: '297.117', bias: '0.299' },
  { tau: '0.2', est: '296.648', bias: '0.170', lo: true },
  { tau: '0.1', est: '296.782', bias: '0.036', lo: true },
];

const rareEventRows = [
  { n: '10²',  cmc: '0', is: '29' },
  { n: '10³',  cmc: '0', is: '323' },
  { n: '10⁴',  cmc: '0', is: '3 170' },
  { n: '10⁵',  cmc: '3', is: '31 130' },
];

const decisionRows = [
  {
    method: 'SSA',
    when: 'Exactness matters most. Use as accuracy reference for Monte Carlo estimation.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    method: 'Explicit τ-leaping',
    when: 'Many reactions fire and speed is a priority. Accept some discretization bias.',
    color: 'bg-gray-100 text-gray-700',
  },
  {
    method: 'Implicit τ-leaping',
    when: 'Larger time steps are needed and robustness matters more than per-step cost.',
    color: 'bg-gray-100 text-gray-700',
  },
  {
    method: 'CLE (Euler–Maruyama)',
    when: 'A continuous approximation is valid (large propensities) and efficiency is a priority.',
    color: 'bg-green-100 text-green-700',
  },
  {
    method: 'Importance Sampling',
    when: 'The quantity of interest is a rare event. Brute-force Monte Carlo will not observe it.',
    color: 'bg-purple-100 text-purple-700',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TauTable({ rows }: { rows: { tau: string; est: string; bias: string; hi?: boolean; lo?: boolean }[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-left">
          <th className="px-3 py-2 font-semibold text-gray-700 border-b rounded-tl-lg">τ</th>
          <th className="px-3 py-2 font-semibold text-gray-700 border-b">Estimate</th>
          <th className="px-3 py-2 font-semibold text-gray-700 border-b rounded-tr-lg">|Bias|</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.tau} className={row.hi ? 'bg-amber-50' : row.lo ? 'bg-green-50' : ''}>
            <td className="px-3 py-2 border-b font-mono text-gray-700">{row.tau}</td>
            <td className="px-3 py-2 border-b font-mono text-gray-700">{row.est}</td>
            <td className={`px-3 py-2 border-b font-mono ${row.hi ? 'text-amber-600' : row.lo ? 'text-green-600' : 'text-gray-600'}`}>
              {row.bias}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function StochasticProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-24">

        {/* Breadcrumb */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-medium text-blue-600 mb-3 block">
            Stochastic Simulation &amp; Scientific Computing
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Efficient Simulation of Stochastic Reaction Networks
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>2026</span>
            </div>
            <a
              href="/projects_reports/Stochastic_Simulation_Project.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FileText className="w-4 h-4" />
              Read Report
            </a>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-justify">
            This project explores efficient simulation methods for stochastic reaction networks through a Michaelis–Menten enzyme kinetics model. We implemented four simulation approaches — SSA, explicit tau-leaping, implicit tau-leaping, and the Chemical Langevin Equation (CLE) — and compared their trade-offs in accuracy, stability, and computational cost.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Beyond trajectory simulation, the project extends to Monte Carlo estimation of E[X₄(T)] and rare-event probability estimation with Importance Sampling, making it both a simulation benchmark and a study in variance reduction for stochastic systems.
          </p>
        </div>

        {/* Trade-offs strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl px-6 py-5 border border-blue-100 shadow-sm">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Trade-off 1</div>
            <div className="font-bold text-gray-900 mb-1">Exactness vs Speed</div>
            <p className="text-xs text-gray-500 leading-relaxed">SSA is exact but expensive. Tau-leaping and CLE trade discretization bias for throughput.</p>
          </div>
          <div className="bg-white rounded-xl px-6 py-5 border border-amber-100 shadow-sm">
            <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Trade-off 2</div>
            <div className="font-bold text-gray-900 mb-1">Bias vs Stability</div>
            <p className="text-xs text-gray-500 leading-relaxed">Larger τ lowers cost but increases bias. Implicit schemes recover stability at larger steps.</p>
          </div>
          <div className="bg-white rounded-xl px-6 py-5 border border-purple-100 shadow-sm">
            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">Trade-off 3</div>
            <div className="font-bold text-gray-900 mb-1">Brute Force vs Variance Reduction</div>
            <p className="text-xs text-gray-500 leading-relaxed">Crude Monte Carlo fails on rare events. Importance Sampling reduces variance by 10⁴×.</p>
          </div>
        </div>

        {/* Model */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Model</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                Four species (S₁, S₂, S₃, S₄) and three reaction channels representing Michaelis–Menten enzyme kinetics. The state X(t) ∈ ℤ₊⁴ evolves as a continuous-time Markov jump process driven by stochastic mass-action propensities.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm">
                Intuitively: S₁ is the substrate, S₂ the enzyme, S₃ the intermediate complex, and S₄ the final product. S₁ converts irreversibly to S₄ through S₃, with S₂ acting as a catalyst that is released back after each conversion.
              </p>
            </div>
            <div className="shrink-0">
              <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm text-gray-700 space-y-2 border border-gray-200">
                <div>R₁: S₁ + S₂ <span className="text-blue-600">→</span> S₃</div>
                <div>R₂: S₃ <span className="text-blue-600">→</span> S₁ + S₂</div>
                <div>R₃: S₃ <span className="text-blue-600">→</span> S₄ + S₂</div>
                <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                  <div>c₁ = 0.0017, c₂ = 10⁻⁴, c₃ = 0.1</div>
                  <div>X(0) = (312, 125, 0, 0)</div>
                  <div>T = 50</div>
                </div>
              </div>
            </div>
          </div>

          {/* SSA trajectory plot */}
          <div className="mt-8">
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src="/images/SSA/SSA_sim.png"
                alt="SSA simulation: trajectories of all four species (S₁–S₄) over time [0, 50]"
                className="w-full h-auto block"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement | null;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div
                className="hidden items-center justify-center h-48 text-gray-400 text-sm"
                style={{ display: 'none' }}
              >
                SSA trajectory plot — add <code className="mx-1 text-xs bg-gray-200 px-1 rounded">public/images/stochastic/ssa_trajectories.png</code>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              SSA: one sample trajectory of all four species over [0, 50]. S₁ (substrate) depletes, S₄ (product) accumulates irreversibly through the S₃ intermediate.
            </p>
          </div>
        </div>

        {/* Methods — editorial comparison */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 px-3 pt-3">Methods</h2>
          <p className="text-gray-500 text-sm mb-3 px-3">Four simulation schemes with different exactness–cost profiles.</p>

          {/* SSA baseline — full width, distinguished */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Exact baseline</span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">Stochastic Simulation Algorithm (SSA)</h3>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <div className="text-3xl font-black text-blue-600 leading-none">296.818</div>
                <div className="text-xs text-gray-500 mt-1">E[X₄(T)], N=10⁴ CI: (296.757, 296.921)</div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Simulates the continuous-time Markov chain exactly by sampling the next reaction time (exponential with rate a₀(x)) and the reaction channel. Produces exact trajectories at the cost of one event per step — expensive when many reactions fire over the time horizon.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <span>Runtime: 80.5s (N=1000, τ=0.2 equiv.)</span>
              <span className="text-blue-600 font-medium">Reference benchmark for all comparisons</span>
            </div>
          </div>

          {/* 3 approximate methods */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Approximate</span>
              <h3 className="font-bold text-gray-900 mt-1 mb-2 text-sm">Explicit Tau-Leaping</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-4">
                Batches multiple reaction firings into a step τ using Poisson increments. Cheaper per sample, but introduces discretization bias that grows with τ and persists even as N → ∞.
              </p>
              <div className="pt-3 border-t border-gray-100 space-y-1">
                <div className="text-xs text-gray-500">τ=0.2 → <span className="font-mono">295.470</span></div>
                <div className="text-xs text-amber-600">bias: 1.35 | runtime: 7.8s</div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Approximate</span>
              <h3 className="font-bold text-gray-900 mt-1 mb-2 text-sm">Implicit Tau-Leaping</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-4">
                Solves a nonlinear system (Newton) at each step before sampling. Robust for larger τ values where explicit tau-leaping becomes unreliable — at the cost of the nonlinear solve.
              </p>
              <div className="pt-3 border-t border-gray-100 space-y-1">
                <div className="text-xs text-gray-500">τ=0.4 → <span className="font-mono">296.304</span></div>
                <div className="text-xs text-gray-500">bias: 0.51 | stable at τ ∈ [0.4, 0.8]</div>
              </div>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-xl p-5">
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Best speed/accuracy</span>
              <h3 className="font-bold text-gray-900 mt-1 mb-2 text-sm">CLE (Euler–Maruyama)</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-4">
                Approximates Poisson increments with Gaussian noise (valid when propensities are large). Discretized with Euler–Maruyama. Fastest per sample and lowest bias at τ=0.2 in this setting.
              </p>
              <div className="pt-3 border-t border-green-100 space-y-1">
                <div className="text-xs text-gray-500">τ=0.2 → <span className="font-mono">296.648</span></div>
                <div className="text-xs text-green-600">bias: 0.17 | runtime: 6.1s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Approximation results */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Approximation Results</h2>
          <p className="text-gray-500 text-sm mb-8">
            All methods estimate E[X₄(T)] with CI half-width ε = 1 (α = 0.05). SSA reference: <span className="font-mono font-semibold text-gray-700">296.818</span>.
          </p>

          {/* Summary at τ=0.2 */}
          <h3 className="font-semibold text-gray-900 mb-3">All methods at τ = 0.2</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Method', 'Estimate', '95% CI', '|Bias vs SSA|', 'N'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-gray-700 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 border-b font-medium text-blue-700">SSA (reference)</td>
                  <td className="px-4 py-3 border-b font-mono font-semibold">296.818</td>
                  <td className="px-4 py-3 border-b font-mono text-xs text-gray-600">(295.889, 297.746)</td>
                  <td className="px-4 py-3 border-b text-blue-500">—</td>
                  <td className="px-4 py-3 border-b text-gray-600">55</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b text-gray-700">Explicit τ-leaping</td>
                  <td className="px-4 py-3 border-b font-mono">295.470</td>
                  <td className="px-4 py-3 border-b font-mono text-xs text-gray-600">(294.564, 296.376)</td>
                  <td className="px-4 py-3 border-b text-amber-600 font-medium">1.348</td>
                  <td className="px-4 py-3 border-b text-gray-600">51</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b text-gray-700">Implicit τ-leaping</td>
                  <td className="px-4 py-3 border-b font-mono">295.900</td>
                  <td className="px-4 py-3 border-b font-mono text-xs text-gray-600">(294.915, 296.885)</td>
                  <td className="px-4 py-3 border-b text-amber-600 font-medium">0.918</td>
                  <td className="px-4 py-3 border-b text-gray-600">50</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 border-b font-medium text-green-700">CLE (Euler–Maruyama)</td>
                  <td className="px-4 py-3 border-b font-mono font-semibold">296.648</td>
                  <td className="px-4 py-3 border-b font-mono text-xs text-gray-600">(295.657, 297.638)</td>
                  <td className="px-4 py-3 border-b text-green-600 font-medium">0.170</td>
                  <td className="px-4 py-3 border-b text-gray-600">46</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Fixed budget */}
          <h3 className="font-semibold text-gray-900 mb-3">Fixed-budget comparison — N = 1000, τ = 0.2</h3>
          <div className="overflow-x-auto mb-3">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Method', 'Estimate', '95% CI', 'Variance', 'Runtime', '|Bias|'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-gray-700 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 border-b font-medium text-green-700">CLE (E–M)</td>
                  <td className="px-4 py-3 border-b font-mono">296.814</td>
                  <td className="px-4 py-3 border-b font-mono text-xs text-gray-600">(296.549, 297.079)</td>
                  <td className="px-4 py-3 border-b font-mono">0.0183</td>
                  <td className="px-4 py-3 border-b">6.1s</td>
                  <td className="px-4 py-3 border-b text-green-600 font-medium">0.004</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b text-gray-700">Explicit τ-leaping</td>
                  <td className="px-4 py-3 border-b font-mono">296.429</td>
                  <td className="px-4 py-3 border-b font-mono text-xs text-gray-600">(296.171, 296.687)</td>
                  <td className="px-4 py-3 border-b font-mono">0.0173</td>
                  <td className="px-4 py-3 border-b">7.8s</td>
                  <td className="px-4 py-3 border-b text-amber-600 font-medium">0.389</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mb-8">
            At fixed budget (N=1000, τ=0.2), CLE achieves 97% lower bias than explicit tau-leaping and is 22% faster.
          </p>

          {/* Tau sweep tables — side by side, 3 columns */}
          <h3 className="font-semibold text-gray-900 mb-4">Bias vs step size — all three approximate methods</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Explicit τ-leaping</div>
              <TauTable rows={explicitTauRows} />
              <p className="text-xs text-gray-400 mt-2">Non-monotone trend — MC noise masks bias at small τ.</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Implicit τ-leaping</div>
              <TauTable rows={implicitTauRows} />
              <p className="text-xs text-gray-400 mt-2">Consistent with SSA even at τ=0.4–0.8.</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">CLE (Euler–Maruyama)</div>
              <TauTable rows={cleTauRows} />
              <p className="text-xs text-gray-400 mt-2">Cleanest convergence: monotone decrease in bias.</p>
            </div>
          </div>
        </div>

        {/* Rare event — dark panel */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Rare-Event Estimation</h2>
          <p className="text-slate-400 text-sm mb-8">
            Target: P(X₃(T) &gt; 22) under a separate parameter regime (c₁=0.001, c₂=0.005, c₃=0.01, T=1).
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* CMC vs IS table */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Observed events: CMC vs Importance Sampling</h3>
              <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-3 text-left text-slate-400 font-medium">N</th>
                    <th className="pb-3 text-left text-slate-400 font-medium">CMC</th>
                    <th className="pb-3 text-left text-slate-400 font-medium">IS</th>
                    <th className="pb-3 text-left text-slate-400 font-medium">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {rareEventRows.map(row => (
                    <tr key={row.n} className="border-b border-slate-700/50">
                      <td className="py-3 font-mono text-slate-300">{row.n}</td>
                      <td className="py-3 font-mono text-red-400">{row.cmc}</td>
                      <td className="py-3 font-mono text-green-400">{row.is}</td>
                      <td className="py-3 text-xs text-slate-400">
                        {row.cmc === '0' ? '∞' : `${(parseInt(row.is.replace(' ', '')) / parseInt(row.cmc)).toFixed(0)}×`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Variance reduction highlight */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-slate-300">Variance at N = 10⁵</h3>
              <div className="bg-slate-800 rounded-xl p-5 flex-1">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Crude Monte Carlo</div>
                    <div className="font-mono text-red-400">Var = 2.999 × 10⁻¹⁰</div>
                    <div className="font-mono text-red-400/70 text-xs">Ẑ = 3 × 10⁻⁵ (3 events in 10⁵)</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Importance Sampling</div>
                    <div className="font-mono text-green-400">Var = 4.986 × 10⁻¹⁴</div>
                    <div className="font-mono text-green-400/70 text-xs">Ẑ = 2.604 × 10⁻⁵ (31 130 events in 10⁵)</div>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="text-xs text-blue-300 mb-1 uppercase tracking-wide font-semibold">Variance reduction</div>
                    <div className="text-4xl font-black text-white">~10⁴×</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            Crude Monte Carlo observes the event only 3 times at N=10⁵, yielding an unreliable estimate. Importance Sampling modifies the rate constants to increase the propensity of reactions producing S₃, then corrects with a likelihood-ratio weight. With tilted parameters (c̃₁, c̃₂, c̃₃) = (0.0025, 0.01, 0.01), the event becomes frequent enough to estimate reliably at N=100 — with four orders of magnitude lower variance at the same budget.
          </p>
        </div>

        {/* Decision guide */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 px-3 pt-3">Decision Guide</h2>
          <p className="text-gray-500 text-sm mb-3 px-3">
            There is no universally best simulator. The right method depends on the question.
          </p>
          <div className="space-y-2">
            {decisionRows.map((row, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 mt-0.5 ${row.color}`}>
                  {row.method}
                </span>
                <span className="text-gray-700 text-sm leading-relaxed">{row.when}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical details */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Details</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tools &amp; Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'NumPy', 'SciPy', 'Monte Carlo simulation', 'Stochastic processes', 'Scientific computing'].map(t => (
                  <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Methods</h3>
              <div className="flex flex-wrap gap-2">
                {['SSA', 'Tau-leaping', 'Implicit tau-leaping', 'CLE', 'Euler–Maruyama', 'Importance Sampling', 'Confidence intervals', 'Rare-event simulation', 'Newton solver'].map(m => (
                  <span key={m} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{m}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Validation highlights</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Each method is evaluated not just by trajectory shape but by Monte Carlo estimates, 95% confidence intervals, estimated variance, and sensitivity to τ. The bias–τ relationship is studied through full sweep tables for each approximate method. The rare-event section is validated by comparing observed event counts and variance across four sample sizes. The Newton solver used in implicit tau-leaping required a more robust least-squares formulation with non-negativity bounds for large τ values.
            </p>
          </div>
        </div>

        {/* Closing note */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white">
          <p className="text-gray-300 leading-relaxed">
            This project sits at the intersection of stochastic modeling, numerical simulation, and statistical estimation. Beyond implementing standard algorithms, the interesting part was comparing them in a way that makes their trade-offs visible: exactness versus speed, bias versus stability, and brute-force sampling versus variance-aware estimation.
          </p>
        </div>

      </div>
    </div>
  );
}

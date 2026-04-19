import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const flResults = [
  { nc: 100, j4: 0.300, j8: null,  j16: null  },
  { nc: 50,  j4: 0.290, j8: 0.340, j16: 0.330 },
  { nc: 10,  j4: 0.125, j8: 0.105, j16: 0.095 },
  { nc: 5,   j4: 0.071, j8: 0.061, j16: 0.069 },
  { nc: 1,   j4: 0.027, j8: 0.024, j16: 0.025 },
];

const meComparison = [
  { nc: 100, j: 4,  fl: 0.30, flme: 0.40 },
  { nc: 50,  j: 16, fl: 0.33, flme: 0.40 },
  { nc: 50,  j: 8,  fl: 0.34, flme: 0.38 },
  { nc: 50,  j: 4,  fl: 0.29, flme: 0.31 },
];

const degradationBars = [
  { nc: 100, val: 0.300, label: 'Nc = 100', barColor: 'bg-green-400' },
  { nc: 50,  val: 0.340, label: 'Nc = 50',  barColor: 'bg-lime-400' },
  { nc: 10,  val: 0.125, label: 'Nc = 10',  barColor: 'bg-amber-400' },
  { nc: 5,   val: 0.071, label: 'Nc = 5',   barColor: 'bg-orange-400' },
  { nc: 1,   val: 0.027, label: 'Nc = 1',   barColor: 'bg-red-400' },
];

const setup = [
  { label: 'Dataset',       value: 'CIFAR-100' },
  { label: 'Backbone',      value: 'DINO ViT-S/16' },
  { label: 'Total clients', value: 'K = 100' },
  { label: 'Aggregation',   value: 'FedAvg' },
  { label: 'Optimizer',     value: 'SGDM + cosine' },
  { label: 'Partitioning',  value: 'IID & non-IID' },
  { label: 'Sparse method', value: 'Fisher mask + SparseSGDM' },
  { label: 'Platform',      value: 'Google Colab' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ncPill(nc: number) {
  if (nc >= 100) return 'bg-green-100 text-green-700';
  if (nc >= 50)  return 'bg-lime-100 text-lime-700';
  if (nc >= 10)  return 'bg-amber-100 text-amber-700';
  if (nc >= 5)   return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
}

function ncRowBg(nc: number) {
  if (nc >= 50)  return '';
  if (nc >= 10)  return 'bg-amber-50/40';
  if (nc >= 5)   return 'bg-orange-50/40';
  return 'bg-red-50/40';
}

function valColor(v: number | null) {
  if (v === null) return 'text-gray-300';
  if (v >= 0.30) return 'text-green-700 font-semibold';
  if (v >= 0.10) return 'text-amber-600 font-semibold';
  return 'text-red-500 font-semibold';
}

const MAX_BAR = 0.34;

// ─── Component ───────────────────────────────────────────────────────────────

export default function FederatedLearningProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-24">

        {/* Breadcrumb */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-medium text-blue-600 mb-3 block">
            Machine Learning · Federated Systems
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Classification under Federated Learning
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>2025</span>
            </div>
            <a
              href="/projects_reports/FL_merged.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FileText className="w-4 h-4" />
              Read Report
            </a>
          </div>
        </div>

        {/* Core question */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 mb-8">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Core question
          </div>
          <p className="text-xl font-semibold text-white leading-snug">
            Can sparse model editing improve federated learning under heterogeneous client data?
          </p>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-3 text-sm text-justify">
            Federated Learning is a way to train machine learning models across many devices or institutions without moving their raw data to a central server. Each client learns locally, and only model updates are aggregated globally.
          </p>
          <p className="text-gray-700 leading-relaxed mb-5 text-sm text-justify">
            It is important because modern data is often privacy-sensitive, geographically distributed, or costly to centralize. That makes Federated Learning attractive in practice — but also much harder than standard training, especially when clients see very different data distributions.
          </p>
          <div className="border-t border-gray-100 pt-5">
          <p className="text-gray-700 leading-relaxed mb-3 text-sm text-justify">
            This project studies federated learning as an optimization and generalization problem under data heterogeneity. Using CIFAR-100 with a frozen DINO ViT-S/16 backbone, we simulate a federated system across K=100 clients and measure how client participation rate (Nc) and local step count (J) affect global accuracy under IID and non-IID data partitioning.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm text-justify">
            The main contribution is not a new FL algorithm, but a structured empirical analysis of how sparse model editing — Fisher-based masking with SparseSGDM — interacts with non-IID client distributions. The most notable outcome: model editing consistently improves performance across all tested federated configurations, while data heterogeneity remains the dominant bottleneck throughout.
          </p>
          </div>
        </div>

        {/* Why hard — 3 cards */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Why this problem is hard</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="border border-gray-100 rounded-xl p-5">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Data heterogeneity</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Real clients hold non-IID data. FedAvg aggregates gradients from clients trained on different label distributions, causing weight drift and degraded global convergence.
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-5">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">Communication vs accuracy</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every FL round transfers the full model. More local steps (larger J) reduce communication cost but amplify client drift. Fewer active clients (smaller Nc) do the same.
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-5">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Model editing in FL</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sparse editing updates only a task-relevant parameter subset. In a federated setting it may reduce harmful interference from heterogeneous clients — but its interaction with non-IID distributions was not yet well understood.
              </p>
            </div>
          </div>
        </div>

        {/* Experimental setup */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 px-3 pt-3">Experimental setup</h2>
          <p className="text-gray-500 text-sm mb-3 px-3">
            Controlled simulation on a single GPU; FL rounds handled sequentially.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {setup.map(item => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Centralized baseline */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Centralized baseline</h2>
          <p className="text-gray-500 text-sm mb-6">
            Upper bound — full dataset, no communication constraints, no privacy guarantees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-green-700 mb-1">89.9%</div>
              <div className="text-xs text-gray-500">Best centralized result (224×224 input, J=4)</div>
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col justify-center space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Input resolution</span>
                <span className="font-medium text-gray-700">224 × 224</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Local steps J</span>
                <span className="font-medium text-gray-700">4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Data access</span>
                <span className="font-medium text-gray-700">Full, IID</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-1">
                <span className="text-gray-500">Best federated (Nc=100, FL+ME)</span>
                <span className="font-medium text-amber-600">≈ 40.0%</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Federated settings reach at most ~40% — less than half the centralized reference. The gap reflects both the non-IID penalty and the limitation of only updating a linear head on top of a frozen backbone.
          </p>
          <img
            src="/images/FL/sweep_centralized.png"
            alt="Centralized hyperparameter sweep results"
            className="w-full h-auto rounded-xl border border-gray-200"
          />
          <p className="text-xs text-gray-400 mt-1.5 text-center">Centralized sweep — accuracy vs configuration</p>
        </div>

        {/* FL Results matrix */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Federated learning results</h2>
          <p className="text-gray-500 text-sm mb-6">
            Test accuracy across client participation rate Nc and local step count J. Non-IID partitioning throughout.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 border-b">
                    Nc <span className="font-normal text-gray-400 text-xs ml-1">(clients/round)</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-b text-center">J = 4</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-b text-center">J = 8</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 border-b text-center">J = 16</th>
                </tr>
              </thead>
              <tbody>
                {flResults.map(row => (
                  <tr key={row.nc} className={`border-b last:border-0 ${ncRowBg(row.nc)}`}>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ncPill(row.nc)}`}>
                        Nc = {row.nc}
                      </span>
                    </td>
                    {([row.j4, row.j8, row.j16] as (number | null)[]).map((val, idx) => (
                      <td key={idx} className="px-4 py-3 text-center">
                        {val !== null
                          ? <span className={`font-mono ${valColor(val)}`}>{val.toFixed(3)}</span>
                          : <span className="text-gray-300 font-mono">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 mb-4">
            J = local update steps per round. Nc = number of clients participating each round (out of K=100 total).
          </p>
          <img
            src="/images/FL/test_accuracy_barplot.png"
            alt="Test accuracy bar plot across FL configurations"
            className="w-full h-auto rounded-xl border border-gray-200"
          />
          <p className="text-xs text-gray-400 mt-1.5 text-center">Test accuracy across Nc and J — bar chart</p>
        </div>

        {/* Non-IID degradation */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Non-IID degradation</h2>
          <p className="text-gray-500 text-sm mb-7">
            As Nc decreases, each participating client sees a narrower label slice. Clients memorize local patterns and contribute conflicting updates to the global model.
          </p>

          {/* Bar chart */}
          <div className="space-y-3 mb-8">
            {degradationBars.map(row => (
              <div key={row.nc} className="flex items-center gap-4">
                <div className="w-20 text-right text-xs font-mono text-gray-600 shrink-0">{row.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className={`h-5 rounded-full ${row.barColor}`}
                    style={{ width: `${Math.round((row.val / MAX_BAR) * 100)}%` }}
                  />
                </div>
                <div className="w-12 text-xs font-mono font-semibold text-gray-700 shrink-0">
                  {row.val.toFixed(3)}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Key finding</div>
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Nc matters more than J.</strong> Moving from Nc=50 to Nc=10 causes a roughly 3× accuracy
              drop regardless of J. Varying J at fixed Nc produces much smaller differences. At Nc=1, accuracy
              collapses to ~2.5%: extreme heterogeneity leaves the global model unable to generalize.
            </p>
          </div>
        </div>

        {/* FL vs FL+ME */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">FL vs FL + Model Editing</h2>
          <p className="text-gray-500 text-sm mb-6">
            Fisher-based masking + SparseSGDM applied on top of FedAvg. Every tested configuration improves.
          </p>

          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Nc', 'J', 'FL only', 'FL + ME', 'Gain'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-gray-700 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meComparison.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ncPill(row.nc)}`}>
                        {row.nc}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.j}</td>
                    <td className="px-4 py-3 font-mono text-gray-700">{row.fl.toFixed(3)}</td>
                    <td className="px-4 py-3 font-mono font-semibold text-green-700">{row.flme.toFixed(3)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        +{Math.round((row.flme - row.fl) * 100)} pp
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-5">
            <p className="text-green-800 text-sm leading-relaxed">
              <strong>All tested FL + ME runs outperform their FL baseline.</strong> Largest gain (+10 pp) at Nc=100, J=4 — the setting closest to IID. Gains compress as heterogeneity grows, suggesting model editing is most effective when client distributions are less conflicting.
            </p>
          </div>
          <img
            src="/images/FL/fl_vs_flme_comparison.png"
            alt="FL vs FL+ME accuracy comparison"
            className="w-full h-auto rounded-xl border border-gray-200"
          />
          <p className="text-xs text-gray-400 mt-1.5 text-center">FL vs FL + Model Editing — accuracy comparison across configurations</p>
        </div>

        {/* Further analysis */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 px-3 pt-3">Further analysis</h2>
          <p className="text-gray-500 text-sm mb-3 px-3">
            Exploratory experiments isolating individual factors, run independently of the main benchmark.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                Gradient path analysis (PCA)
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Greater heterogeneity leads to more fragmented gradient directions across rounds. At Nc=1, per-round gradient vectors are nearly orthogonal — the model receives contradictory update signals and cannot converge.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <img src="/images/FL/clients_directions_IID_True.png" alt="Gradient directions — IID" className="w-full h-auto rounded-lg border border-gray-100" />
                  <p className="text-xs text-gray-400 mt-1 text-center">IID</p>
                </div>
                <div>
                  <img src="/images/FL/clients_directions_Nc1.png" alt="Gradient directions — Nc=1" className="w-full h-auto rounded-lg border border-gray-100" />
                  <p className="text-xs text-gray-400 mt-1 text-center">Nc = 1 (extreme non-IID)</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Resolution analysis (32 vs 224 px)
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                224×224 inputs yield ~20% higher accuracy than 32×32 at J=4, Nc∈&#123;50, 100&#125;. The ViT backbone was pre-trained at 224px — native resolution better activates learned representations.
              </p>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>FL 32px (Nc=100, J=4)</span>
                  <span>0.300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">FL+ME 224px (Nc=100, J=4)</span>
                  <span className="text-green-600 font-semibold">0.400 (+~10%)</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">
                Validation split experiment
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Removing the validation split allocates more data to local training. In one experiment this roughly doubled test accuracy. Trade-off: no reliable early-stopping signal. Results become harder to interpret but reveal the strong effect of local data volume on client quality.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
                Masking ablation (weights vs gradients)
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Applying Fisher masking directly to parameters (weight masking) instead of to gradients (gradient masking) breaks learning entirely. The ablation confirms that sparse model editing must operate on the gradient flow — masking weights directly prevents any useful update from propagating.
              </p>
            </div>
          </div>
        </div>

        {/* Takeaways */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Takeaways</h2>
          <div className="space-y-2">
            {[
              {
                n: '01',
                text: 'Centralized training remains the performance upper bound — the FL gap is substantial across all tested settings.',
                pill: 'bg-gray-100 text-gray-600',
              },
              {
                n: '02',
                text: 'Federated learning degrades sharply under non-IID data. Accuracy falls from ~33% at Nc=50 to ~2.5% at Nc=1.',
                pill: 'bg-amber-100 text-amber-700',
              },
              {
                n: '03',
                text: 'Nc dominates J. Client participation rate is the primary variable; local step count has secondary effects.',
                pill: 'bg-amber-100 text-amber-700',
              },
              {
                n: '04',
                text: 'Sparse model editing (Fisher mask + SparseSGDM) improves accuracy in every tested federated configuration.',
                pill: 'bg-green-100 text-green-700',
              },
              {
                n: '05',
                text: 'Communication-efficient adaptation is promising, but still far from centralized performance in heterogeneous settings.',
                pill: 'bg-blue-100 text-blue-700',
              },
            ].map(item => (
              <div
                key={item.n}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0 ${item.pill}`}>
                  {item.n}
                </span>
                <span className="text-gray-700 text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical stack */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Technical stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Python', 'PyTorch', 'DINO', 'ViT-S/16', 'CIFAR-100',
              'FedAvg', 'SparseSGDM', 'Fisher Information', 'Federated Learning',
              'Model Editing', 'Non-IID partitioning', 'Google Colab',
            ].map(t => (
              <span
                key={t}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white">
          <p className="text-gray-300 leading-relaxed text-sm">
            This project sits at the intersection of distributed optimization and sparse learning. Beyond implementing FedAvg and model editing, the interesting part was building a controlled experimental framework where the effect of each variable — client count, step count, masking strategy — could be isolated and measured. The main lesson: in federated learning, data heterogeneity is a harder problem than communication efficiency.
          </p>
        </div>

      </div>
    </div>
  );
}

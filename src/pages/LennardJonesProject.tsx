import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────


function ResultDivider({ n, id, title, accent }: { n: string; id: string; title: string; accent: string }) {
  return (
    <div id={id} className="flex items-center gap-4 mb-8 scroll-mt-8">
      <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white ${accent}`}>
        {n}
      </span>
      <div className="flex-1 border-t border-gray-200" />
      <span className="shrink-0 text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</span>
      <div className="flex-1 border-t border-gray-200" />
    </div>
  );
}

function MetricCard({ value, label, sub, accent = 'border-blue-100 bg-blue-50' }: {
  value: string; label: string; sub?: string; accent?: string;
}) {
  return (
    <div className={`rounded-xl p-5 border text-center ${accent}`}>
      <div className="text-xl font-black text-gray-900 font-mono leading-tight mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-700 mb-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const skTable = [
  {
    method: 'Fourier transform of g(r)',
    strength: 'Smooth curve, clear peak structure',
    limit: 'Unreliable at small k due to cutoff artifacts',
  },
  {
    method: 'Direct sampling',
    strength: 'Better small-k behavior',
    limit: 'Noisier because of discrete wavevector sampling',
  },
];

const tagGroups = [
  {
    label: 'Physics',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    tags: ['Statistical mechanics', 'Liquid state physics', 'Molecular simulation', 'Transport properties'],
  },
  {
    label: 'Methods',
    color: 'bg-purple-50 text-purple-700 border-purple-100',
    tags: [
      'NVE molecular dynamics', 'Nosé–Hoover thermostat', 'Monte Carlo',
      'Mean square displacement', 'Velocity autocorrelation', 'Fourier methods', 'Blocking analysis',
    ],
  },
  {
    label: 'Tools',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    tags: ['Molecular simulation', 'Numerical analysis', 'Equilibrium sampling', 'Time-correlation analysis'],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function LennardJonesProject() {
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
            Computational Physics &amp; Molecular Simulation
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Lennard-Jones Liquid: Structural and Dynamical Properties
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>2026</span>
            </div>
            <a
              href="/projects_reports/LJ-Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FileText className="w-4 h-4" />
              Read Report
            </a>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <p className="text-gray-700 leading-relaxed text-sm text-justify mb-3">
            This project studies a Lennard-Jones liquid as a model for liquid argon, with the goal of extracting both structural and dynamical observables through different simulation techniques. Rather than focusing on a single algorithm, the project compares how multiple methods — NVE molecular dynamics, Nosé–Hoover molecular dynamics, and Monte Carlo sampling — describe the same physical system from complementary perspectives.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm text-justify">
            The core interest is not only to reproduce known results, but to understand which observables each method can estimate reliably, how the results compare across ensembles, and how numerical choices affect physical interpretation.
          </p>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Overview</h2>
          <p className="text-gray-700 leading-relaxed text-sm text-justify mb-4">
            The study is built around a standard Lennard-Jones fluid at fixed density and temperature, following the classic liquid argon setting of Rahman. Four observables are analyzed:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { sym: 'g(r)', label: 'Pair correlation function', tag: 'static' },
              { sym: 'S(k)', label: 'Structure factor',          tag: 'static' },
              { sym: 'D',    label: 'Diffusion coefficient',      tag: 'dynamical' },
              { sym: 'U',    label: 'Potential energy',           tag: 'static' },
            ].map(item => (
              <div key={item.sym} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-gray-900 font-mono mb-1">{item.sym}</div>
                <div className="text-xs text-gray-600 mb-2 leading-tight">{item.label}</div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  item.tag === 'dynamical'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Static equilibrium quantities — g(r), S(k), and U — can be estimated with either molecular dynamics or Monte Carlo. Dynamical quantities such as diffusion require time-resolved trajectories and are therefore exclusively accessible through molecular dynamics.
          </p>
        </div>

        {/* Why this matters */}
        <div className="bg-slate-900 rounded-2xl p-8 mb-8">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Why this project matters</div>
          <p className="text-gray-300 leading-relaxed text-sm">
            This project is a concrete example of how computational physics is often less about one "best" simulation method and more about choosing the right method for the observable of interest. The same system can look identical from the perspective of static structure, while revealing important differences once time correlations and transport properties enter the picture.
          </p>
        </div>

        {/* System & Setup */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System &amp; Setup</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">

            {/* System */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">System</div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Lennard-Jones liquid modeling liquid argon, following the state point of Rahman's 1964 molecular dynamics study.
              </p>
            </div>

            {/* Reference state */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Reference state</div>
              <div className="space-y-2">
                {[
                  { k: 'Temperature',     v: '94.4 K' },
                  { k: 'Density',         v: '1.374 g cm⁻³' },
                  { k: 'Particles',       v: 'N = 864' },
                  { k: 'Time step',       v: 'Δt = 0.01 ps' },
                ].map(item => (
                  <div key={item.k} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.k}</span>
                    <span className="font-medium text-gray-800 font-mono">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model assumptions */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Model assumptions</div>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">·</span>Cubic periodic boundary conditions</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">·</span>Minimum-image convention</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">·</span>Cutoff interactions with tail corrections</li>
              </ul>
            </div>
          </div>

          {/* Methods chips */}
          <div className="border-t border-gray-100 pt-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Methods used</div>
            <div className="flex flex-wrap gap-2">
              {['NVE molecular dynamics', 'Nosé–Hoover molecular dynamics', 'Monte Carlo (Metropolis)'].map(m => (
                <span key={m} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100 font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-5">
            All simulations run at the same physical state point. Differences in results reflect sampling strategy and estimator behavior, not changes in the system.
          </p>
        </div>

        {/* Method comparison */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Method comparison</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="border border-gray-100 rounded-xl p-5">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">NVE molecular dynamics</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Provides time-resolved trajectories at fixed total energy. Used for both structural observables and dynamical quantities such as diffusion, where time correlations and long-time behavior are essential.
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-5">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Nosé–Hoover MD</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Samples the canonical ensemble while preserving the static equilibrium structure of the liquid. Used to confirm that structural observables remain consistent across ensembles at the same thermodynamic state.
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-5">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">Monte Carlo (Metropolis)</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Directly samples equilibrium configurations in the canonical ensemble. Ideal for static quantities. Does not provide real time evolution; cannot be used for transport properties.
              </p>
            </div>
          </div>

          {/* Decision guide */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Decision guide</div>
            <div className="flex items-start gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span className="text-gray-700"><strong>Use MD</strong> when the observable depends on real dynamics.</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
              <span className="text-gray-700"><strong>Use MC</strong> when the observable is purely equilibrium and static.</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span className="text-gray-700"><strong>Use multiple methods</strong> when the goal is to test ensemble consistency.</span>
            </div>
          </div>
        </div>

        {/* Results index */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: '#gr',  label: 'g(r)',  desc: 'Pair correlation function', color: 'hover:border-blue-200' },
              { href: '#sk',  label: 'S(k)',  desc: 'Structure factor',          color: 'hover:border-blue-200' },
              { href: '#diff',label: 'D',     desc: 'Diffusion coefficient',      color: 'hover:border-purple-200' },
              { href: '#pot', label: 'U',     desc: 'Potential energy',           color: 'hover:border-green-200' },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`block bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center ${item.color} hover:shadow-md transition-all`}
              >
                <div className="text-3xl font-black text-gray-900 font-mono mb-1">{item.label}</div>
                <div className="text-xs text-gray-500 leading-tight">{item.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── g(r) ─────────────────────────────────────────────────────────── */}
        <ResultDivider n="01" id="gr" title="Pair correlation function g(r)" accent="bg-blue-600" />

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-50">
            <h3 className="font-bold text-gray-900 mb-3">g(r) — NVE, Nosé–Hoover, Monte Carlo</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The pair correlation function was estimated from all three methods. Across NVE molecular dynamics, Nosé–Hoover molecular dynamics, and Monte Carlo simulations, the curves overlap within plotting resolution and reproduce the expected Lennard-Jones liquid structure: a pronounced first-neighbor peak, a subsequent minimum, damped oscillations, and convergence to g(r) → 1 at large r.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              This agreement is one of the strongest results of the project. It shows that static equilibrium structure is captured consistently across ensembles and algorithms, and that residual differences are better explained by finite statistics than by methodological bias.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-blue-800 text-sm font-semibold">Static structure is robust across all three methods.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 text-sm mb-4">Figures</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <img src="/images/lennard-jones/gr_NVE.jpg" alt="g(r) from NVE MD" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">g(r) — NVE MD</p>
              </div>
              <div>
                <img src="/images/lennard-jones/gr_NVT.jpg" alt="g(r) from Nosé–Hoover MD" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">g(r) — Nosé–Hoover</p>
              </div>
              <div>
                <img src="/images/lennard-jones/gr_MC.jpg" alt="g(r) from Monte Carlo" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">g(r) — Monte Carlo</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── S(k) ─────────────────────────────────────────────────────────── */}
        <ResultDivider n="02" id="sk" title="Structure factor S(k)" accent="bg-blue-500" />

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-50">
            <h3 className="font-bold text-gray-900 mb-3">S(k) — two estimators from NVE data</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The structure factor was computed in two ways using NVE data: by Fourier-transforming g(r), and by direct sampling from particle positions. Both methods recover the expected peak structure and agree well in the main region of interest, but behave differently at small wave numbers.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              The direct-sampling estimate is noisier, because it depends on discrete wavevectors and limited shell averaging, but remains physically well-behaved in the small-k regime. The Fourier-transform estimate is smoother overall, yet develops non-physical features at low k due to finite-r cutoff effects in the numerical transform.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 overflow-x-auto">
            <h4 className="font-semibold text-gray-700 text-sm mb-4">Estimator comparison</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 border-b">Method</th>
                  <th className="px-4 py-3 font-semibold text-green-700 border-b">Strength</th>
                  <th className="px-4 py-3 font-semibold text-amber-700 border-b">Limitation</th>
                </tr>
              </thead>
              <tbody>
                {skTable.map((row, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-4 py-3 text-gray-700 font-medium">{row.method}</td>
                    <td className="px-4 py-3 text-green-700 text-xs leading-relaxed">{row.strength}</td>
                    <td className="px-4 py-3 text-amber-700 text-xs leading-relaxed">{row.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 italic">
                The visually smoother estimator is not always the physically safer one. In the small-k regime, direct sampling is more reliable despite higher noise.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 text-sm mb-4">Figures</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <img src="/images/lennard-jones/sk_NVE.jpg" alt="S(k) via Fourier transform of g(r)" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">S(k) — FT estimator</p>
              </div>
              <div>
                <img src="/images/lennard-jones/sk_direct_sampling_NVE.jpg" alt="S(k) via direct particle sampling" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">S(k) — direct sampling</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Diffusion ────────────────────────────────────────────────────── */}
        <ResultDivider n="03" id="diff" title="Diffusion coefficient D" accent="bg-purple-600" />

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-50">
            <h3 className="font-bold text-gray-900 mb-3">D from NVE — Einstein and Green–Kubo routes</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Diffusion was estimated from NVE molecular dynamics using two classical routes: the Einstein relation through the long-time slope of the mean square displacement, and the Green–Kubo relation through the integral of the velocity autocorrelation function.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Both estimates are close and physically consistent. The Einstein estimate aligns most closely with the reference value reported by Rahman. The analysis makes the physical crossover visible: at short times, motion is ballistic, velocities remain correlated, and the MSD is not yet linear. Only later does the system enter the diffusive regime from which a stable D can be extracted.
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              value="2.427 × 10⁻⁵"
              label="Einstein estimate"
              sub="cm² s⁻¹"
              accent="border-blue-100 bg-blue-50"
            />
            <MetricCard
              value="2.498 × 10⁻⁵"
              label="Green–Kubo estimate"
              sub="cm² s⁻¹"
              accent="border-purple-100 bg-purple-50"
            />
            <MetricCard
              value="2.43 × 10⁻⁵"
              label="Rahman reference"
              sub="cm² s⁻¹ — Einstein closest"
              accent="border-green-100 bg-green-50"
            />
          </div>

          {/* Pros/cons */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">Einstein route</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-green-500 font-bold">+</span>Intuitive; fit directly from long-time linear window of MSD</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">−</span>Requires a clean linear regime to be visible in the trajectory</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-3">Green–Kubo route</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-green-500 font-bold">+</span>Directly tied to time correlations; broader physical interpretation</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">−</span>More sensitive to integration choices and statistical noise in the VACF tail</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 text-sm mb-4">Figures</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <img src="/images/lennard-jones/MSD.jpg" alt="Mean square displacement" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">MSD — ballistic to diffusive crossover</p>
              </div>
              <div>
                <img src="/images/lennard-jones/VACF.jpg" alt="Velocity autocorrelation function" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">VACF — C(t)/C(0)</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Potential energy ─────────────────────────────────────────────── */}
        <ResultDivider n="04" id="pot" title="Average potential energy U" accent="bg-green-600" />

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-50">
            <h3 className="font-bold text-gray-900 mb-3">U/N from Monte Carlo — mean and uncertainty</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The average potential energy per particle was estimated with Monte Carlo sampling in the canonical ensemble. In addition to the mean value, the project includes a blocking analysis to quantify statistical uncertainty and assess the role of sample correlations.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              This part shifts attention from the estimate itself to its reliability. The blocking curves show that uncertainty quantification is not automatic: plateau detection depends on sample size, and limited computational budgets can leave visible ambiguity in the correlation analysis.
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              value="-5.78324"
              label="U/N"
              sub="LJ reduced units"
              accent="border-green-100 bg-green-50"
            />
            <MetricCard
              value="-9.582 × 10⁻²¹"
              label="U/N (SI)"
              sub="J per particle"
              accent="border-green-100 bg-green-50"
            />
            <MetricCard
              value="±8.53 × 10⁻²⁵"
              label="Statistical uncertainty"
              sub="J — from blocking analysis"
              accent="border-amber-100 bg-amber-50"
            />
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-amber-800 text-sm">
              The reported error is informative, but the analysis also shows that more samples would be needed for a cleaner plateau and a more reliable blocking estimate.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 text-sm mb-4">Figures</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <img src="/images/lennard-jones/UN_timeseries_MC.png" alt="U/N time series from Monte Carlo" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">U/N per MC step — equilibration and sampling</p>
              </div>
              <div>
                <img src="/images/lennard-jones/blocking_U_error.png" alt="Blocking error vs level" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Blocking analysis — plateau detection</p>
              </div>
              <div>
                <img src="/images/lennard-jones/blocking_U_tau.png" alt="Blocked autocorrelation time estimate" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Autocorrelation estimate across levels</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-method takeaways */}
        <div className="border-t border-gray-200 pt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cross-method takeaways</h2>
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-5">
            <p className="text-gray-700 leading-relaxed text-sm text-justify mb-3">
              Taken together, the results show a clean division of roles between simulation methods. Static observables such as g(r) are highly consistent across MD and Monte Carlo. Intermediate quantities such as S(k) depend more strongly on the estimator used, even when the underlying data come from the same simulation. Dynamical observables such as diffusion reveal information that only trajectory-based methods can provide.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm text-justify">
              This makes the project less about one algorithm outperforming the others, and more about matching each computational tool to the physical question being asked.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">g(r), U</div>
              <p className="text-blue-800 text-sm">Consistent across all three methods. Method choice is secondary for static equilibrium quantities.</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-center">
              <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">S(k)</div>
              <p className="text-amber-800 text-sm">Estimator-dependent. Even with the same simulation data, different estimators behave differently at small k.</p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 text-center">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">D</div>
              <p className="text-purple-800 text-sm">Requires time-resolved MD. Monte Carlo cannot access transport properties — MD is the only viable route.</p>
            </div>
          </div>
        </div>

        {/* Final note */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white mb-8">
          <p className="text-gray-300 leading-relaxed text-sm">
            What makes this project useful is the combination of physics and numerical reasoning. The objective is not only to reproduce canonical liquid-state observables, but to understand which estimates are robust, which are sensitive to finite-size or finite-statistics effects, and how different simulation paradigms complement each other when studying the same many-body system.
          </p>
        </div>

        {/* Technical tags */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Technical tags</h2>
          <div className="space-y-4 px-3 pb-3">
            {tagGroups.map(group => (
              <div key={group.label}>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map(tag => (
                    <span key={tag} className={`px-3 py-1 text-sm rounded-full border ${group.color}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

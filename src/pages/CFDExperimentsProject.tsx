import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';


function ExperimentDivider({ n, title, accent }: { n: string; title: string; accent: string }) {
  return (
    <div className={`flex items-center gap-4 mb-8`}>
      <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white ${accent}`}>
        {n}
      </span>
      <div className="flex-1 border-t border-gray-200" />
      <span className="shrink-0 text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</span>
      <div className="flex-1 border-t border-gray-200" />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const cmpTable = [
  { qty: 'Strouhal number St',         kw: '0.129', disma: '0.138', ref: '~0.132–0.139', status: 'ok'  },
  { qty: 'Mean drag Cx',               kw: '2.02',  disma: '1.90',  ref: '~2.05–2.23',  status: 'ok'  },
  { qty: 'Drag fluctuation amplitude', kw: '0.195', disma: '0.057', ref: '~0.13',        status: 'warn'},
  { qty: 'Lift fluctuation amplitude', kw: '1.85',  disma: '1.40',  ref: '~0.145–1.60', status: 'warn'},
];

const exp1Setup = [
  { k: 'Reynolds number',           v: 'Re = 21 400' },
  { k: 'Solver',                    v: 'ANSYS Fluent' },
  { k: 'Discretization',            v: 'Finite volume' },
  { k: 'Pressure–velocity',         v: 'PISO' },
  { k: 'Spatial scheme',            v: 'QUICK' },
  { k: 'Time integration',          v: '2nd-order implicit' },
  { k: 'Geometry',                  v: '2D square cylinder' },
  { k: 'Domain size',               v: '45B × 30B' },
  { k: 'Mesh',                      v: 'Hybrid quad–tri–quad' },
  { k: 'Inlet turbulence',          v: 'It = 2%, LT = 0.5B' },
];

const exp2Impl = [
  'Conservative 1D Euler formulation',
  'Roe averages for velocity, enthalpy, and sound speed',
  'Eigenvalue / eigenvector decomposition',
  'Wave-strength reconstruction',
  'Roe numerical flux assembly',
  'Harten–Hyman entropy fix for transonic rarefactions',
];

const tagGroups = [
  {
    label: 'Domains',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    tags: ['CFD', 'External aerodynamics', 'Compressible flow', 'Numerical fluid mechanics'],
  },
  {
    label: 'Methods',
    color: 'bg-purple-50 text-purple-700 border-purple-100',
    tags: [
      'Finite volume method', 'RANS', 'κ–ω turbulence model', 'κ–ε RNG comparison',
      'Roe solver', 'Approximate Riemann solver', 'Entropy fix', 'Hyperbolic conservation laws',
    ],
  },
  {
    label: 'Tools',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    tags: ['ANSYS Fluent', 'MATLAB', 'Post-processing / benchmark comparison'],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function CFDExperimentsProject() {
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
            Computational Fluid Dynamics
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">CFD Experiments</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>2025</span>
            </div>
            <a
              href="/projects_reports/relazione_finale_cwe_donnarumma_iannarelli.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FileText className="w-4 h-4" />
              Read Report 1
            </a>
            <a
              href="/projects_reports/Presentation_FC_B.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FileText className="w-4 h-4" />
              See Slides 1
            </a>
            <a
              href="/projects_reports/Presentation_FC_D.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FileText className="w-4 h-4" />
              See Slides 2
            </a>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed text-sm text-justify mb-3">
            This page documents two independent CFD experiments covering different numerical regimes: turbulent external flow and compressible inviscid flow. The two studies are presented together because they belong to the same broader area of numerical fluid mechanics, but they address different modeling problems and use different numerical methods.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm text-justify">
            Experiment 1 is a RANS simulation of flow around a 2D square cylinder using the κ–ω turbulence model in ANSYS Fluent, validated against literature data and a reference RANS simulation using κ–ε RNG. Experiment 2 is a finite-volume implementation of the Roe approximate Riemann solver for the 1D Euler equations, tested on standard benchmark problems including transonic configurations requiring entropy correction.
          </p>
        </div>

        {/* Experiment index */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Two experiments</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Card 1 */}
            <a
              href="#exp1"
              className="block bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 group-hover:bg-blue-700 transition-colors">
                  01
                </span>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  External aerodynamics · RANS · finite volume
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-700 transition-colors">
                Turbulence modeling around a square cylinder
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A 2D bluff-body flow study using the standard κ–ω turbulence model in ANSYS Fluent, compared against literature benchmarks and a matched κ–ε RNG setup.
              </p>
            </a>

            {/* Card 2 */}
            <a
              href="#exp2"
              className="block bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center shrink-0 group-hover:bg-purple-700 transition-colors">
                  02
                </span>
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                  Compressible flow · hyperbolic PDEs · finite volume
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-purple-700 transition-colors">
                Roe approximate Riemann solver for 1D Euler equations
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                An implementation-focused study of Roe's linearized Riemann solver, including entropy-fix handling and validation across multiple standard test cases.
              </p>
            </a>
          </div>
        </div>

        {/* ── EXPERIMENT 1 ────────────────────────────────────────────────── */}
        <div id="exp1" className="scroll-mt-8">
          <ExperimentDivider n="01" title="Experiment 1" accent="bg-blue-600" />
        </div>

        <div className="space-y-6 mb-16">

          {/* Title + intro */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-blue-50">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
              External aerodynamics · RANS · finite volume
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Turbulence modeling around a square cylinder
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm text-justify mb-3">
              RANS simulation of 2D flow around a square cylinder using the standard κ–ω turbulence model in ANSYS Fluent. Results are evaluated against published literature values and against a reference RANS simulation run with the same numerical setup but using the κ–ε RNG turbulence model.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm text-justify">
              The objective is to quantify how well the κ–ω model reproduces integral aerodynamic quantities, wake pressure distributions, and velocity recovery downstream of the cylinder. The side-by-side comparison with the κ–ε RNG reference isolates the effect of turbulence closure from other numerical factors.
            </p>
          </div>

          {/* Setup */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Setup</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {exp1Setup.map(item => (
                <div key={item.k} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="text-xs text-gray-400 mb-1 leading-tight">{item.k}</div>
                  <div className="text-xs font-semibold text-gray-800 leading-tight">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What was tested */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">What was tested</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Results are compared against published reference values and against a reference RANS simulation using κ–ε RNG with an otherwise identical numerical setup. The matching setup ensures that differences in predicted quantities are attributable to the turbulence model, not to mesh or discretization choices.
            </p>
          </div>

          {/* Results + table */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">Results</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The κ–ω model predicts the Strouhal number and mean drag coefficient within the reference range and reproduces qualitative vortex-shedding behavior. Force fluctuation amplitudes and wake recirculation length show larger deviations from both the literature data and the reference RANS simulation.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Compared with the κ–ε RNG reference, the κ–ω results are less accurate in the near-wake region, particularly in velocity recovery profiles and oscillation amplitudes. The two models agree better on time-averaged global coefficients than on unsteady and spatial wake quantities.
            </p>

            {/* Comparison table */}
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700 border-b">Quantity</th>
                    <th className="px-4 py-3 font-semibold text-blue-700 border-b text-right">κ–ω (ours)</th>
                    <th className="px-4 py-3 font-semibold text-gray-500 border-b text-right">Ref. RANS (κ–ε RNG)</th>
                    <th className="px-4 py-3 font-semibold text-gray-500 border-b text-right">Reference range</th>
                  </tr>
                </thead>
                <tbody>
                  {cmpTable.map((row, i) => (
                    <tr key={i} className={`border-b last:border-0 ${row.status === 'warn' ? 'bg-amber-50/40' : ''}`}>
                      <td className="px-4 py-3 text-gray-700">{row.qty}</td>
                      <td className={`px-4 py-3 font-mono text-right font-semibold ${row.status === 'warn' ? 'text-amber-600' : 'text-blue-700'}`}>
                        {row.kw}
                      </td>
                      <td className="px-4 py-3 font-mono text-right text-gray-500">{row.disma}</td>
                      <td className="px-4 py-3 font-mono text-right text-gray-400 text-xs">{row.ref}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-blue-800 text-sm leading-relaxed">
                Global aerodynamic coefficients alone are insufficient for validating a turbulence model. The κ–ω model passes on integral quantities but underperforms on wake structure. Turbulence model choice has a measurable effect on which flow features are reproduced accurately.
              </p>
            </div>
          </div>

          {/* Figures */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Figures</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <img src="/images/CFD/drag.jpg" alt="Drag coefficient time history" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Drag coefficient Cx — time history</p>
              </div>
              <div>
                <img src="/images/CFD/lift.jpg" alt="Lift coefficient time history" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Lift coefficient Cy — time history</p>
              </div>
              <div>
                <img src="/images/CFD/Cp_mean.jpg" alt="Mean pressure coefficient" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Mean Cp — cylinder surface</p>
              </div>
              <div>
                <img src="/images/CFD/Cp_rsm.jpg" alt="Cp comparison κ–ω vs reference" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Cp — κ–ω vs Ref. RANS</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <img src="/images/CFD/med_ux_yob0_NEW.jpg" alt="Mean Ux along y=0" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Mean Ux along y = 0</p>
              </div>
              <div>
                <img src="/images/CFD/ph1_ux_xob1_NEW.jpg" alt="Phase-averaged Ux at x/D=1" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Phase-avg. Ux at x/D = 1</p>
              </div>
              <div>
                <img src="/images/CFD/ph1_uy_yob0_NEW.jpg" alt="Phase-averaged Uy along y=0" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Phase-avg. Uy along y = 0</p>
              </div>
            </div>
          </div>

          {/* Flow animations */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Flow animations</h3>
            <p className="text-gray-500 text-sm mb-4">κ–ω RANS field contours — unsteady shedding cycle.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <video src="/video/CFD/contour_vorticity_mag.mp4" controls className="w-full rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Vorticity magnitude — shedding cycle</p>
              </div>
              <div>
                <video src="/video/CFD/contour_kinetic_energy.mp4" controls className="w-full rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Turbulent kinetic energy k</p>
              </div>
              <div>
                <video src="/video/CFD/contour_omega.mp4" controls className="w-full rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Specific dissipation rate ω</p>
              </div>
              <div>
                <video src="/video/CFD/contour_eps.mp4" controls className="w-full rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Turbulent dissipation rate ε</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── EXPERIMENT 2 ────────────────────────────────────────────────── */}
        <div id="exp2" className="scroll-mt-8">
          <ExperimentDivider n="02" title="Experiment 2" accent="bg-purple-600" />
        </div>

        <div className="space-y-6 mb-16">

          {/* Title + intro */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-purple-50">
            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">
              Compressible flow · hyperbolic PDEs · finite volume
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Roe approximate Riemann solver for 1D Euler equations
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm text-justify mb-3">
              This study focuses on the numerical side of CFD: the construction and testing of an approximate Riemann solver for the one-dimensional Euler equations. The core method is Roe's linearized solver, which replaces the exact nonlinear Riemann problem with a locally linear one built from a Roe-averaged Jacobian.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm text-justify">
              The project includes the derivation and implementation of the Roe flux, the use of the associated eigenstructure and wave strengths, and the treatment of transonic rarefactions through the Harten–Hyman entropy fix.
            </p>
          </div>

          {/* What was implemented */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">What was implemented</h3>
            <ul className="space-y-2">
              {exp2Impl.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-1 w-4 h-4 rounded-full bg-purple-100 text-purple-600 text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What was tested */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">What was tested</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The solver was validated across a sequence of standard test problems designed to probe shocks, rarefactions, contact discontinuities, and difficult transonic configurations. The emphasis is on robustness and practicality: how far an approximate solver can go without relying on an exact Riemann solution.
            </p>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">Results</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The Roe scheme correctly captures shocks, contact discontinuities, and rarefaction waves across all tested configurations. When combined with the Harten–Hyman entropy fix, it handles transonic rarefactions without producing non-physical expansion shocks.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              The approximate linearization via Roe averages preserves the hyperbolic structure of the Euler equations well enough to yield accurate results in practice, at a cost significantly lower than an exact Riemann solve.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <div className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2">Key takeaway</div>
              <p className="text-purple-800 text-sm leading-relaxed">
                No exact Riemann solver is needed to obtain strong practical performance. The Roe scheme achieves a good balance between mathematical structure, computational efficiency, and test-case robustness.
              </p>
            </div>
          </div>

          {/* Figures */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Figures</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <img src="/images/CFD/test_1_NEW.png" alt="Roe solver test case 1 result" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Test case 1 — solution profile</p>
              </div>
              <div>
                <img src="/images/CFD/test_1_ord1_nofix.png" alt="Order 1, no entropy fix" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Order 1 — no entropy fix (expansion shock visible)</p>
              </div>
              <div>
                <img src="/images/CFD/test_1_ord2_NEW.png" alt="Order 2 result" className="w-full h-auto rounded-xl border border-gray-200" />
                <p className="text-xs text-gray-400 mt-1.5 text-center">Order 2 — improved resolution</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Comparative takeaways ─────────────────────────────────────── */}
        <div className="border-t border-gray-200 pt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common thread</h2>
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-6">
            <p className="text-gray-700 leading-relaxed text-sm text-justify">
              Both experiments address the same underlying problem from different angles: the numerical method introduces approximations, and the relevant question is which physical quantities are affected and to what extent. In Experiment 1 this manifests as turbulence model error in wake statistics. In Experiment 2 it manifests as entropy inconsistency in transonic flow without correction. In both cases, validation against reference data is necessary to identify where the approximation breaks down.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Experiment 01</div>
              <p className="text-blue-800 text-sm leading-relaxed">
                Turbulence model comparison for bluff-body flow. Global coefficients agree with references; wake structure shows model-dependent discrepancies.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">Experiment 02</div>
              <p className="text-purple-800 text-sm leading-relaxed">
                Roe solver implementation for 1D Euler equations. Approximate linearization produces accurate results on all tested cases; entropy correction is required for transonic configurations.
              </p>
            </div>
          </div>
        </div>

        {/* Final note */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white mb-8">
          <p className="text-gray-300 leading-relaxed text-sm">
            Both experiments belong to the same area of numerical fluid mechanics but sit at different levels of the modeling stack. One operates at the level of turbulence closure in an engineering flow solver; the other at the level of flux construction for a hyperbolic PDE system. The interest in both cases is the same: understanding where the numerical approximation is reliable and where it is not.
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
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full border ${group.color}`}
                    >
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

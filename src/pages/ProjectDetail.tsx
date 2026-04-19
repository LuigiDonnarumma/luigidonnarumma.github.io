import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink, FileText } from 'lucide-react';
import StochasticProjectPage from './StochasticProject';
import FederatedLearningProject from './FederatedLearningProject';
import CFDExperimentsProject from './CFDExperimentsProject';
import LennardJonesProject from './LennardJonesProject';

// ─── Types ───────────────────────────────────────────────────────────────────

type ProjectData = {
  title: string;
  category: string;
  year: string;
  overview: string;
  model?: string;
  approachSectionTitle?: string;
  approach: { title: string; content: string }[];
  experimentsSubtitle?: string;
  experimentCards?: { title: string; caption: string }[];
  results: string;
  metrics: { value: string; label: string }[];
  technologies: string[];
  methods: string[];
  validationHighlights?: string;
  validationPlots?: {
    title: string;
    cols?: number;
    plots: { alt: string; caption: string; src?: string }[];
  }[];
  takeaways?: { intro: string; items: string[] };
  closingNote?: string;
  equations?: { label: string; lines: { text: string; annotation?: string }[] }[];
  pdfReport?: string;
  githubUrl?: string;
  imageBasePath?: string;
  images?: {
    hero?: string;
    overview?: string[];
    experiments?: string[];
    pod?: string[];
    pinn?: string[];
    podnn?: string[];
    results_quality?: string[];
    results_training?: string[];
    validation_fem?: string[];
    validation_pod?: string[];
  };
  performance?: {
    method: string;
    exp1: { speedup: string; abs_error: string; rel_error: string };
    exp2: { speedup: string; abs_error: string; rel_error: string };
  }[];
};

// ─── Data ────────────────────────────────────────────────────────────────────

const projectsData: Record<string, ProjectData> = {
  // stochastic-reaction-network, federated-learning-classification, cfd-experiments,
  // and lennard-jones-simulation use dedicated page components — no data needed here.

  'fem-solver': {
    title: 'Finite Element Solver for PDEs: diffusion, transport, reaction, and time evolution',
    category: 'Numerical Methods & Scientific Computing',
    year: '2025',
    overview: `This project develops and validates a 2D Finite Element Method solver for partial differential equations on triangular meshes. The work covers steady diffusion problems with Dirichlet and Neumann boundary conditions, convection–diffusion and reaction–diffusion regimes, and a time-dependent parabolic problem solved with Crank–Nicolson.

The main objective was not just to obtain numerical solutions, but to verify implementation correctness through error-convergence analysis. I compared first-order and second-order finite elements (P1 and P2), studied where standard FEM becomes unstable, and tested stabilization strategies such as SUPG for convection-dominated transport and Mass Lumping for reaction-dominated problems.

Across the tested cases, the solver reproduced the expected theoretical orders of convergence and highlighted the practical trade-offs between accuracy, stability, and computational cost.`,
    approach: [
      {
        title: 'Problem setup',
        content: 'We consider 2D PDEs combining diffusion, convection, and reaction terms on polygonal domains discretized with conforming Delaunay triangulations. The implementation starts from the weak formulation and assembles FEM systems on triangular elements, with both Dirichlet and Neumann boundary conditions.',
      },
      {
        title: 'Meshes and finite elements',
        content: 'The solver uses Delaunay meshes and Lagrangian finite elements on triangles: P1 elements for linear approximation and P2 elements for quadratic approximation. The project uses mesh refinement and log-log error plots to verify implementation quality. Error trends in L2 and H1 are compared against the theoretical convergence rates expected from FEM interpolation estimates.',
      },
      {
        title: 'Diffusion problems',
        content: 'The first validation step focuses on elliptic diffusion problems in 2D. I tested homogeneous Dirichlet conditions, non-homogeneous Dirichlet conditions, and mixed Dirichlet/Neumann boundary conditions. These cases were solved first with P1 elements, then with P2 elements, to confirm both the correctness of the assembly and the expected gain in approximation quality when moving to higher-order basis functions.',
      },
      {
        title: 'Convection-diffusion and stabilization',
        content: 'The project then extends the solver to transport-dominated regimes. In convection-diffusion settings, standard Galerkin FEM can produce spurious oscillations when the grid Péclet number becomes too large. To address this, I implemented SUPG (Streamline Upwind Petrov–Galerkin), adding artificial diffusion in the streamline direction to recover stable and accurate solutions.',
      },
      {
        title: 'Reaction-diffusion and Mass Lumping',
        content: 'For reaction-dominated problems, I studied cases where the standard discretization shows non-physical oscillations. In this regime I applied Mass Lumping to the reaction matrix, turning it into a diagonal approximation that mitigates instabilities while preserving a simple and efficient formulation for P1 elements.',
      },
      {
        title: 'Time-dependent problem',
        content: 'Finally, I implemented a parabolic PDE solver using the method of lines: FEM for spatial semi-discretization and Crank–Nicolson for time integration. This part of the project was used to separate spatial and temporal discretization errors and verify convergence in both dimensions.',
      },
    ],
    experimentsSubtitle: 'Six test cases covering the full range of PDE regimes explored in this project.',
    experimentCards: [
      {
        title: 'Diffusion with P1 elements',
        caption: 'Linear finite elements on triangular meshes correctly recover the expected first-order H1 and second-order L2 convergence for diffusion problems with Dirichlet and mixed boundary conditions.',
      },
      {
        title: 'Diffusion with P2 elements',
        caption: 'Quadratic elements improve solution quality at fixed mesh size and recover the expected higher convergence rates, showing the benefit of richer local polynomial approximation.',
      },
      {
        title: 'Mixed boundary conditions',
        caption: 'Solutions with Dirichlet on part of the boundary and Neumann on the remaining sides show the weaker nature of flux conditions while remaining consistent with theory.',
      },
      {
        title: 'Convection-diffusion and SUPG',
        caption: 'In convection-dominated regimes, the standard formulation develops oscillations. SUPG stabilizes the solution and restores the expected convergence behavior.',
      },
      {
        title: 'Reaction-diffusion and Mass Lumping',
        caption: 'For strongly reaction-dominated problems, Mass Lumping reduces spurious oscillations by diagonalizing the reaction contribution, improving robustness for P1 discretizations.',
      },
      {
        title: 'Time-dependent heat-like problem',
        caption: 'Using FEM in space and Crank–Nicolson in time, the solver captures smooth time evolution and separates spatial and temporal error contributions.',
      },
    ],
    results: `The most important outcome of this project is that the implementation consistently matches the theory across very different PDE regimes. For diffusion problems, the observed convergence rates align with the expected FEM orders: P1 behaves linearly in H1 and quadratically in L2, while P2 reaches quadratic H1 and cubic L2 convergence.

More interestingly, the project also shows where a standard formulation starts to fail. In convection-dominated problems, large grid Péclet numbers lead to visible oscillations and loss of the expected error behavior. SUPG removes these oscillations and recovers the correct convergence trend. In reaction-dominated regimes, Mass Lumping reduces non-physical artifacts and improves stability for linear elements.

For the time-dependent problem, the Crank–Nicolson implementation achieves the expected second-order convergence in time, while separate tests confirm the spatial convergence orders of both P1 and P2 discretizations.`,
    metrics: [
      { value: 'P1 → (H1 ~ 1, L2 ~ 2)', label: 'Expected diffusion convergence' },
      { value: 'P2 → (H1 ~ 2, L2 ~ 3)', label: 'Higher-order FEM accuracy' },
      { value: 'SUPG / Mass Lumping / CN', label: 'Stability and time integration tools' },
    ],
    pdfReport: '/projects_reports/elaborato_mnpde.pdf',
    technologies: ['MATLAB', 'Finite Element Method', 'Delaunay triangulation', 'Numerical linear algebra', 'Error analysis'],
    methods: ['P1 elements', 'P2 elements', 'Diffusion equation', 'Convection–diffusion', 'Reaction–diffusion', 'SUPG', 'Mass Lumping', 'Crank–Nicolson', 'Method of lines'],
    validationHighlights: 'The solver was validated through mesh-refinement studies and error measurements in L2 and H1 norms. Diffusion tests confirmed the expected theoretical rates for both P1 and P2 elements. Transport-dominated tests illustrated the onset of oscillations when the grid Péclet number becomes large, and showed that SUPG restores stable behavior without sacrificing convergence. Reaction-dominated tests highlighted the role of Mass Lumping in reducing spurious oscillations. Time-dependent experiments confirmed second-order accuracy in time for Crank–Nicolson and the expected spatial orders for the FEM discretization.',
    validationPlots: [
      {
        title: 'Convergence — P1 elements',
        cols: 2,
        plots: [
          { src: '/images/MNPDE/P1_DNO_N_conv_L2.jpg', alt: 'P1 L2 convergence', caption: 'P1 — L2 error vs mesh size' },
          { src: '/images/MNPDE/P1_DNO_N_conv_H1.jpg', alt: 'P1 H1 convergence', caption: 'P1 — H1 error vs mesh size' },
        ],
      },
      {
        title: 'Convergence — P2 elements (convection-diffusion)',
        cols: 2,
        plots: [
          { src: '/images/MNPDE/P2_CONVDIFF_conv_L2.jpg', alt: 'P2 convdiff L2 convergence', caption: 'P2 — L2 error vs mesh size' },
          { src: '/images/MNPDE/P2_CONVDIFF_conv_H1.jpg', alt: 'P2 convdiff H1 convergence', caption: 'P2 — H1 error vs mesh size' },
        ],
      },
      {
        title: 'Convection-diffusion — standard vs SUPG',
        cols: 2,
        plots: [
          { src: '/images/MNPDE/plot_P2_NO_SUPG.jpg', alt: 'Oscillations without stabilization', caption: 'Standard Galerkin — spurious oscillations' },
          { src: '/images/MNPDE/plot_P2_SUPG.jpg', alt: 'SUPG stabilized solution', caption: 'SUPG — stable solution' },
        ],
      },
      {
        title: 'SUPG convergence — no stabilization vs SUPG',
        cols: 2,
        plots: [
          { src: '/images/MNPDE/P2_NO_SUPG_conv_L2.jpg', alt: 'No SUPG L2 convergence', caption: 'No SUPG — L2 convergence' },
          { src: '/images/MNPDE/P2_SUPG_conv_L2.jpg',    alt: 'SUPG L2 convergence',    caption: 'SUPG — L2 convergence' },
          { src: '/images/MNPDE/P2_NO_SUPG_conv_H1.jpg', alt: 'No SUPG H1 convergence', caption: 'No SUPG — H1 convergence' },
          { src: '/images/MNPDE/P2_SUPG_conv_H1.jpg',    alt: 'SUPG H1 convergence',    caption: 'SUPG — H1 convergence' },
        ],
      },
      {
        title: 'Reaction-diffusion — Mass Lumping',
        cols: 3,
        plots: [
          { src: '/images/MNPDE/MassLumping_esatta.jpg',       alt: 'Exact solution',             caption: 'Exact solution' },
          { src: '/images/MNPDE/MassLumping_approx_senza.jpg', alt: 'FEM without Mass Lumping',   caption: 'FEM — no Mass Lumping' },
          { src: '/images/MNPDE/MassLumping_approx_con.jpg',   alt: 'FEM with Mass Lumping',      caption: 'FEM — with Mass Lumping' },
        ],
      },
      {
        title: 'Time-dependent problem — Crank–Nicolson solution evolution',
        cols: 3,
        plots: [
          { src: '/images/MNPDE/pb_evo_1_approx.jpg', alt: 'Solution at t₁', caption: 'u(t₁)' },
          { src: '/images/MNPDE/pb_evo_2_approx.jpg', alt: 'Solution at t₂', caption: 'u(t₂)' },
          { src: '/images/MNPDE/pb_evo_3_approx.jpg', alt: 'Solution at t₃', caption: 'u(t₃)' },
          { src: '/images/MNPDE/pb_evo_4_approx.jpg', alt: 'Solution at t₄', caption: 'u(t₄)' },
          { src: '/images/MNPDE/pb_evo_5_approx.jpg', alt: 'Solution at t₅', caption: 'u(t₅)' },
          { src: '/images/MNPDE/pb_evo_6_approx.jpg', alt: 'Solution at t₆', caption: 'u(t₆)' },
          { src: '/images/MNPDE/pb_evo_T_approx.jpg', alt: 'Solution at T',  caption: 'u(T) — final state' },
        ],
      },
    ],
    equations: [
      {
        label: 'Steady convection–diffusion–reaction equation',
        lines: [
          { text: '−∇·(ν∇u) + β·∇u + σu = f', annotation: 'in Ω' },
          { text: 'u = gD',                       annotation: 'on ΓD  (Dirichlet)' },
          { text: 'ν ∂u/∂n̂ = gN',               annotation: 'on ΓN  (Neumann)' },
          { text: 'ΓD ∪ ΓN = ∂Ω,  ΓD ∩ ΓN = ∅' },
        ],
      },
      {
        label: 'Time-dependent parabolic equation (method of lines + Crank–Nicolson)',
        lines: [
          { text: '∂u/∂t − ∇·(ν∇u) + β·∇u + σu = f', annotation: 'in Ω × (0, T]' },
          { text: 'u = gD',                              annotation: 'on ΓD × (0, T]' },
          { text: 'ν ∂u/∂n̂ = gN',                      annotation: 'on ΓN × (0, T]' },
          { text: 'u(t=0) = u₀',                         annotation: 'in Ω  (initial condition)' },
        ],
      },
    ],
    closingNote: 'This project was a full implementation-and-validation exercise in scientific computing: from weak formulation and mesh generation to stabilization techniques and convergence diagnostics. Beyond solving PDEs, the work was about understanding when a method is accurate, when it becomes unstable, and how numerical analysis translates into robust code.',
  },

  'mor-ml-pde': {
    title: 'Model Order Reduction and Machine Learning for Nonlinear Parametric PDE Experiments',
    category: 'Machine Learning & Physics',
    year: '2025',
    overview: 'High-fidelity simulations (FEM + Newton) are accurate but expensive when solving the same PDE for many parameter pairs μ=(μ₀, μ₁). In this project we generated a dataset of 300 high-fidelity (HF) solutions (snapshots), extracted a reduced basis using Proper Orthogonal Decomposition (POD), and trained neural models for two alternative approaches: PINN (learns the solution while enforcing physics in the loss) and POD-NN (learns the mapping parameters → reduced coefficients, enabling fast online reconstruction).',
    approach: [
      {
        title: 'Problem Setup',
        content: 'We study a nonlinear elliptic PDE on Ω=(0,1)² with homogeneous Dirichlet boundary conditions and parameters μ=(μ₀, μ₁). Two scenarios are considered: Experiment 1 with non-parametric forcing g₁(x), and Experiment 2 with non-affine parametric forcing g₂(x; μ₀).'
      },
      {
        title: 'POD (Projection-based MOR)',
        content: 'We compute a reduced basis (SVD on snapshots) and solve the reduced nonlinear system online (still using Newton). It is highly accurate, but the nonlinearity limits speedup due to iterative solves and repeated assembly.'
      },
      {
        title: 'PINN (Physics-Informed Neural Network)',
        content: 'A fully-connected network approximates u(x,y;μ) by minimizing PDE residual and boundary losses. Pros: very fast inference and mesh-free. Cons: in this setting, accuracy is lower—especially for sharper solution features—even with a simplified architecture.'
      },
      {
        title: 'POD-NN (Hybrid MOR + ML)',
        content: 'After POD, a supervised neural network learns (μ₀, μ₁) ↦ reduced coefficients. Online we avoid Newton entirely: a single forward pass produces coefficients, then we reconstruct the solution from the POD basis. This yields the best accuracy/speed trade-off.'
      }
    ],
    results: 'We evaluated absolute/relative error vs HF solutions and speed-up (t_HF / t_ROM) on a test set. POD offered excellent accuracy but limited speed-up. PINN provided very large speed-ups but with noticeably higher errors. POD-NN achieved the best balance with low error and ~35× speed-up in both experiments.',
    metrics: [
      { value: '~35×', label: 'Faster (POD-NN)' },
      { value: '0.2–0.3%', label: 'Relative Error (POD-NN)' },
      { value: 'Hybrid', label: 'POD + Neural Surrogate' }
    ],
    technologies: ['Python', 'PyTorch', 'NumPy', 'Scikit-learn', 'FEM pipeline'],
    methods: ['Model Order Reduction', 'POD', 'PINN', 'POD-NN hybrid surrogate'],
    pdfReport: '/projects_reports/report_final_project_morml_donnarumma_iannarelli.pdf',
    imageBasePath: '/images/MORML',
    images: {
      hero: 'es1_PODNN_sol_smooth.png',
      overview: ['es1_HF_sol_smooth.png', 'es1_POD_sol_smooth.png'],
      experiments: ['es2_HF_sol_smooth.png', 'es2_POD_sol_smooth.png'],
      pod: ['es1_POD_sol_smooth.png', 'es2_POD_sol_smooth.png'],
      pinn: ['es1_conv_loss_PINN_simple.png', 'es2_conv_loss_PINN_simple.png'],
      podnn: ['es1_PODNN_loss.png', 'es1_PODNN_sol_smooth.png', 'es2_PODNN_loss.png', 'es2_PODNN_sol_smooth.png'],
      results_quality: ['es1_PODNN_sol_smooth.png', 'es2_PODNN_sol_smooth.png'],
      results_training: ['es1_PODNN_loss.png', 'es2_PODNN_loss.png'],
      validation_fem: ['convergence_P1.png', 'convergence_P2.png'],
      validation_pod: ['es1_convergence_POD_L2.png', 'es2_convergence_POD_L2.png']
    },
    performance: [
      {
        method: 'POD',
        exp1: { speedup: '1.53', abs_error: '0.0072', rel_error: '0.0017' },
        exp2: { speedup: '1.40', abs_error: '0.0094', rel_error: '0.0029' }
      },
      {
        method: 'PINN v1',
        exp1: { speedup: '27.4', abs_error: '0.2960', rel_error: '0.0694' },
        exp2: { speedup: '29.5', abs_error: '0.5190', rel_error: '0.0877' }
      },
      {
        method: 'PINN v2',
        exp1: { speedup: '326.9', abs_error: '0.3000', rel_error: '0.0700' },
        exp2: { speedup: '415.0', abs_error: '0.3690', rel_error: '0.0620' }
      },
      {
        method: 'POD‑NN',
        exp1: { speedup: '35.4', abs_error: '0.0095', rel_error: '0.0022' },
        exp2: { speedup: '35.7', abs_error: '0.0110', rel_error: '0.0034' }
      }
    ]
  },

};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TextBlock({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => {
        const lines = para.split('\n');
        const bulletLines = lines.filter(l => l.trim().startsWith('- '));
        const textLines = lines.filter(l => !l.trim().startsWith('- ') && l.trim());
        if (bulletLines.length === 0) {
          return (
            <p key={i} className="text-gray-700 leading-relaxed mb-4 text-justify last:mb-0">
              {para}
            </p>
          );
        }
        return (
          <div key={i} className="mb-4">
            {textLines.map((line, j) => (
              <p key={j} className="text-gray-700 leading-relaxed mb-2">{line}</p>
            ))}
            <ul className="list-disc list-inside space-y-1 text-gray-600 mt-2 ml-2">
              {bulletLines.map((l, j) => (
                <li key={j}>{l.trim().slice(2)}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="text-center">
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-400 px-4 text-center">Plot placeholder</span>
      </div>
      {caption && <figcaption className="mt-2 text-xs text-gray-600">{caption}</figcaption>}
    </figure>
  );
}

const METRIC_COLORS = [
  'bg-blue-50 text-blue-600',
  'bg-green-50 text-green-600',
  'bg-amber-50 text-amber-600',
  'bg-slate-50 text-slate-600',
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { projectId } = useParams();

  if (projectId === 'stochastic-reaction-network') {
    return <StochasticProjectPage />;
  }

  if (projectId === 'federated-learning-classification') {
    return <FederatedLearningProject />;
  }

  if (projectId === 'cfd-experiments') {
    return <CFDExperimentsProject />;
  }

  if (projectId === 'lennard-jones-simulation') {
    return <LennardJonesProject />;
  }

  const project = projectId ? projectsData[projectId] : null;
  const imgBase = project?.imageBasePath ?? '/images/MORML';

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const metricsGridClass =
    project.metrics.length === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : project.metrics.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-3';

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
          <span className="text-sm font-medium text-blue-600 mb-3 block">{project.category}</span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{project.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
            {project.pdfReport && (
              <a
                href={project.pdfReport}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <FileText className="w-4 h-4" />
                Read Report
              </a>
            )}
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Overview</h2>
          <div className="px-3 pb-3">
          <TextBlock text={project.overview} />
          {project.equations && project.equations.length > 0 && (
            <div className="mt-8">
              <p className="text-gray-600 text-sm mb-5">
                All experiments presented below refer to the numerical solution of the following PDEs.
              </p>
              <div className="space-y-5">
                {project.equations.map((eq, i) => (
                  <div key={i}>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{eq.label}</div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 font-mono text-sm overflow-x-auto">
                      {eq.lines.map((line, j) => (
                        <div key={j} className="flex gap-6 py-0.5">
                          <span className="text-gray-800 whitespace-pre">{line.text}</span>
                          {line.annotation && (
                            <span className="text-gray-400 text-xs self-center">{line.annotation}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Model (optional) */}
        {project.model && (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Model</h2>
            <TextBlock text={project.model} />
          </div>
        )}

        {/* Approach / Methods */}
        {project.approach.length > 0 && (
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">
              {project.approachSectionTitle ?? 'Approach'}
            </h2>
            <div className="space-y-6 px-3 pb-3">
              {project.approach.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {index + 1}. {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify">{item.content}</p>
                </div>
              ))}
            </div>

            {/* MORML-specific approach gallery */}
            {projectId === 'mor-ml-pde' && (
              <div className="mt-6 space-y-6 px-3 pb-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['es1_HF_sol_smooth.png', 'es1_POD_sol_smooth.png', 'es1_PINN_sol_smooth.png', 'es1_PODNN_sol_smooth.png'].map((img, i) => (
                    <figure key={img} className="text-center">
                      <img src={`${imgBase}/${img}`} alt={['HF (Exp. 1)', 'POD (Exp. 1)', 'PINN (Exp. 1)', 'POD‑NN (Exp. 1)'][i]} loading="lazy" className="w-full max-w-[180px] mx-auto rounded-lg shadow-sm border border-gray-100" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <figcaption className="mt-2 text-xs text-gray-600">{['HF (Exp. 1)', 'POD (Exp. 1)', 'PINN (Exp. 1)', 'POD‑NN (Exp. 1)'][i]}</figcaption>
                    </figure>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['es2_HF_sol_smooth.png', 'es2_POD_sol_smooth.png', 'es2_PINN_sol_smooth.png', 'es2_PODNN_sol_smooth.png'].map((img, i) => (
                    <figure key={img} className="text-center">
                      <img src={`${imgBase}/${img}`} alt={['HF (Exp. 2)', 'POD (Exp. 2)', 'PINN (Exp. 2)', 'POD‑NN (Exp. 2)'][i]} loading="lazy" className="w-full max-w-[180px] mx-auto rounded-lg shadow-sm border border-gray-100" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <figcaption className="mt-2 text-xs text-gray-600">{['HF (Exp. 2)', 'POD (Exp. 2)', 'PINN (Exp. 2)', 'POD‑NN (Exp. 2)'][i]}</figcaption>
                    </figure>
                  ))}
                </div>
                {project.performance && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary (Speed‑up & Error)</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-left">
                            <th className="px-3 py-2 border-b">Method</th>
                            <th className="px-3 py-2 border-b">Exp. 1 Rel Error (L2)</th>
                            <th className="px-3 py-2 border-b">Exp. 1 Speed‑Up</th>
                            <th className="px-3 py-2 border-b">Exp. 2 Rel Error (L2)</th>
                            <th className="px-3 py-2 border-b">Exp. 2 Speed‑Up</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.performance.map((row) => (
                            <tr key={row.method}>
                              <td className="px-3 py-2 border-b">{row.method}</td>
                              <td className="px-3 py-2 border-b">{row.exp1.rel_error}</td>
                              <td className="px-3 py-2 border-b">{row.exp1.speedup}</td>
                              <td className="px-3 py-2 border-b">{row.exp2.rel_error}</td>
                              <td className="px-3 py-2 border-b">{row.exp2.speedup}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Experiment cards */}
        {project.experimentCards && project.experimentCards.length > 0 && (
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 px-3 pt-3">Experiments</h2>
            {project.experimentsSubtitle && (
              <p className="text-gray-500 text-sm mb-3 px-3">{project.experimentsSubtitle}</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.experimentCards.map((card, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{card.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{card.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {project.results && (
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Results</h2>
            <div className="px-3 pb-3">
            <TextBlock text={project.results} />
            {project.metrics.length > 0 && (
              <div className={`grid gap-3 mt-6 ${metricsGridClass}`}>
                {project.metrics.map((metric, index) => (
                  <div key={index} className={`rounded-lg p-5 ${METRIC_COLORS[index % METRIC_COLORS.length]}`}>
                    <div className="text-xl font-bold mb-2 leading-tight">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        )}

        {/* Technical Details */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Technical Details</h2>
          <div className="px-3 pb-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{tech}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Methods</h3>
              <div className="flex flex-wrap gap-2">
                {project.methods.map((method) => (
                  <span key={method} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{method}</span>
                ))}
              </div>
            </div>
          </div>

          {/* MORML-specific validation images */}
          {projectId === 'mor-ml-pde' && (project.images?.validation_fem || project.images?.validation_pod) && (
            <div className="mt-10 space-y-8">
              {project.images?.validation_fem && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Validation (FEM convergence)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.images.validation_fem.map((img) => (
                      <img key={img} src={`${imgBase}/${img}`} alt="FEM convergence" loading="lazy" className="w-full rounded-lg shadow-sm border border-gray-100" />
                    ))}
                  </div>
                </div>
              )}
              {project.images?.validation_pod && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Validation (POD truncation / error)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.images.validation_pod.map((img) => (
                      <img key={img} src={`${imgBase}/${img}`} alt="POD convergence" loading="lazy" className="w-full rounded-lg shadow-sm border border-gray-100" />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Training Stability</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { src: 'es1_PINN_loss.png', caption: 'PINN v1 – Exp. 1' },
                    { src: 'es1_conv_loss_PINN_simple.png', caption: 'PINN v2 – Exp. 1' },
                    { src: 'es1_PODNN_loss.png', caption: 'POD‑NN – Exp. 1' },
                    { src: 'es2_PINN_loss.png', caption: 'PINN v1 – Exp. 2' },
                    { src: 'es2_conv_loss_PINN_simple.png', caption: 'PINN v2 – Exp. 2' },
                    { src: 'es2_PODNN_loss.png', caption: 'POD‑NN – Exp. 2' },
                  ].map(({ src, caption }) => (
                    <figure key={src} className="text-center">
                      <img src={`${imgBase}/${src}`} alt={caption} loading="lazy" className="w-full rounded-lg shadow-sm border border-gray-100" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <figcaption className="mt-2 text-xs text-gray-600">{caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Validation highlights + plots (generic) */}
          {(project.validationHighlights || (project.validationPlots && project.validationPlots.length > 0)) && (
            <div className="mt-10 space-y-8">
              {project.validationHighlights && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Validation highlights</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.validationHighlights}</p>
                </div>
              )}
              {project.validationPlots?.map((section, si) => (
                <div key={si}>
                  <h3 className="font-semibold text-gray-900 mb-3">{section.title}</h3>
                  <div className={`grid gap-4 ${
                    section.cols === 1 ? 'grid-cols-1 max-w-sm' :
                    section.cols === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                    'grid-cols-1 sm:grid-cols-2'
                  }`}>
                    {section.plots.map((plot, pi) =>
                      plot.src ? (
                        <figure key={pi} className="text-center">
                          <img src={plot.src} alt={plot.alt} loading="lazy" className="w-full rounded-lg shadow-sm border border-gray-100" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          {plot.caption && <figcaption className="mt-2 text-xs text-gray-600">{plot.caption}</figcaption>}
                        </figure>
                      ) : (
                        <ImagePlaceholder key={pi} caption={plot.caption} />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.githubUrl && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
          </div>
        </div>

        {/* Takeaways / Comparison */}
        {project.takeaways && (
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">Comparison & Takeaways</h2>
            <div className="px-3 pb-3">
            <p className="text-gray-700 leading-relaxed mb-4">{project.takeaways.intro}</p>
            <ul className="space-y-3">
              {project.takeaways.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-blue-400 mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            </div>
          </div>
        )}

        {/* Closing note */}
        {project.closingNote && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white">
            <p className="text-gray-300 leading-relaxed">{project.closingNote}</p>
          </div>
        )}

      </div>
    </div>
  );
}

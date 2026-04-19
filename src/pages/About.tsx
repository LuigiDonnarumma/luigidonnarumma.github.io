import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Brain, Calculator, Wrench, Cpu, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { LINKEDIN_URL } from '../constants';

const carouselProjects = [
  {
    id: 'stochastic-reaction-network',
    title: 'Efficient Simulation of Stochastic Reaction Networks',
    description: 'Comparison of exact and approximate algorithms for simulating Michaelis–Menten reaction kinetics, including SSA, tau-leaping, CLE, and rare-event estimation with Importance Sampling.',
  },
  {
    id: 'fem-solver',
    title: 'FEM Solver for PDEs',
    description: 'Finite Element Method solver for 2D partial differential equations on triangular meshes, covering diffusion, convection-diffusion, reaction-diffusion, and time-dependent problems.',
  },
  {
    id: 'mor-ml-pde',
    title: 'Model Order Reduction and Machine Learning for Nonlinear Parametric PDEs',
    description: 'Combining model order reduction techniques with machine learning to accelerate the solution of non-linear parametric PDEs.',
  },
  {
    id: 'federated-learning-classification',
    title: 'Classification via Federated Learning',
    description: 'Distributed learning across decentralized clients with non-IID data. Compares FedAvg against sparse model editing with Fisher-based masking.',
  },
  {
    id: 'cfd-experiments',
    title: 'CFD Experiments',
    description: 'Two independent studies in numerical fluid mechanics: RANS turbulence closure for external aerodynamics, and finite-volume schemes for compressible inviscid flow.',
  },
  {
    id: 'lennard-jones-simulation',
    title: 'Lennard-Jones Liquid Simulation',
    description: 'Molecular dynamics and Monte Carlo simulation of a Lennard-Jones liquid modeled on liquid argon, extracting structural and dynamical observables across multiple methods.',
  },
];

const INTERVAL = 8000;

function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = carouselProjects.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Selected projects</h2>
      <p className="text-gray-600 mb-8">
        A collection of work spanning simulation, physically informed machine learning, and computational methods.
      </p>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Track */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {carouselProjects.map(p => (
              <div key={p.id} className="w-full flex-shrink-0">
                <Link
                  to={`/projects/${p.id}`}
                  className="block bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{p.description}</p>
                  <span className="text-blue-600 font-medium inline-flex items-center gap-2">
                    View project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-11 h-11 flex items-center justify-center text-gray-400 opacity-40 hover:opacity-90 transition-opacity z-10"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-11 h-11 flex items-center justify-center text-gray-400 opacity-40 hover:opacity-90 transition-opacity z-10"
          aria-label="Next project"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5 mb-8">
        {carouselProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-5 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-all hover:shadow-md"
      >
        See all projects
        <ArrowRight className="w-5 h-5" />
      </Link>
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-24">

        <div className="relative mb-16 rounded-3xl overflow-hidden bg-white">
          {/* image at natural proportions — no crop */}
          <img
            src="/images/img_page_about.png"
            alt="Luigi"
            className="w-full h-auto block"
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-black/15" />
          {/* text bottom-left */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight tracking-tight text-white">
              Hi, I'm Luigi.
            </h1>
            <p className="text-sm md:text-xl text-white leading-relaxed max-w-2xl font-medium">
              I work at the intersection of physics, math, and code, building models and simulations within the machine learning framework.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <p className="text-lg text-gray-600 leading-relaxed mb-12 text-justify">
            I'm currently an MSc student in Mathematical Engineering, focused on model-driven simulation and physically informed machine learning, with an aerospace engineering background and a strong interest in computational methods and AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-105"
            >
              Explore my projects
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-gray-300"
            >
              Get in touch
            </Link>
          </div>

        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">In a few words</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left column — normal */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Focus</h3>
                <p className="text-gray-600">simulation, scientific machine learning, and computational modeling</p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">I build</h3>
                <p className="text-gray-600">research-driven projects at the intersection of numerical methods, machine learning, and engineering</p>
              </div>
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">I enjoy</h3>
                <p className="text-gray-600">turning mathematical ideas into rigorous models, clean implementations, and reliable results</p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">I value</h3>
                <p className="text-gray-600">efficient methods, well-planned strategies, and solid reasoning</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              A bit more
            </h2>

            <div className="max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                I'm fascinated by systems that look complicated until you give them the right model. That's why I'm drawn to simulation and physically informed learning: they let you combine first principles with data-driven tools, keeping your work grounded in reality.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Over the years I've had the chance to move between academic work and hands-on engineering, including teaching support, technical projects, and practical workflows. I'm comfortable both with theory and implementation, and I genuinely enjoy collaborating with people who care about doing things well.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                If you're curious about the full background (education, roles, certifications), my LinkedIn is the most complete (and most up-to-date) version.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href="/cv/cv_luigi_donnarumma.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <FileText className="w-4 h-4" />
                  Download CV
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Full profile on LinkedIn
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What I'm into
          </h2>
          <p className="text-gray-600 mb-12">Areas I like working on</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Model-driven simulation & applied mathematics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mathematical models, numerical methods, and simulation tools to describe complex systems, study their behavior, and make quantitative results trustworthy.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Physically informed machine learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learning methods guided by physical structure, so models generalize better, remain consistent with known laws, and stay reliable beyond the training set.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Engineering applications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Using mathematical, computational, and data-driven methods to tackle real engineering problems across modeling, analysis, simulation, and design.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Artificial intelligence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Building models that learn from data, adapt across contexts, and turn complexity into useful predictions, decisions, and insight.
              </p>
            </div>
          </div>
        </section>

        <ProjectCarousel />

        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-7 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want the full timeline?
            </h2>
            <p className="text-gray-300 mb-3 text-lg">
              If you're looking for the detailed list of education, roles, certifications, and tools, I keep everything updated on LinkedIn.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Visit my LinkedIn
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-7 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Let's build something together.
            </h2>
            <p className="text-lg text-blue-100 mb-3">
              If you're working on simulation, physically informed ML, or computational projects, feel free to reach out.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all hover:shadow-lg"
            >
              Contact me
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

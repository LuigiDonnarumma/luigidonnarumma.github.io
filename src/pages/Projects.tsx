import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 'stochastic-reaction-network',
      title: 'Efficient Simulation of Stochastic Reaction Networks',
      category: 'Stochastic Simulation & Scientific Computing',
      description: 'Comparison of exact and approximate algorithms for simulating Michaelis–Menten reaction kinetics, including SSA, tau-leaping, CLE, and rare-event estimation with Importance Sampling.',
      tags: ['SSA', 'Tau-leaping', 'CLE', 'Importance Sampling', 'Monte Carlo'],
    },
    {
      id: 'fem-solver',
      title: 'FEM solver',
      category: 'Computational Mechanics',
      description: 'Implementation of a Finite Element Method solver for solving partial differential equations on triangular meshes, covering diffusion, convection-diffusion, reaction-diffusion, and time-dependent problems.',
      tags: ['FEM', 'PDE', 'Numerical Methods'],
    },
    {
      id: 'mor-ml-pde',
      title: 'Model Order reduction and Machine Learning for non linear parametric PDE experiments',
      category: 'Machine Learning & Physics',
      description: 'Combining model order reduction techniques with machine learning to accelerate the solution of non-linear parametric PDEs.',
      tags: ['MOR', 'Machine Learning', 'PDE', 'Scientific Computing'],
    },
    {
      id: 'federated-learning-classification',
      title: 'Classification model using Federated Learning',
      category: 'Machine Learning',
      description: 'A distributed machine learning approach for classification tasks that preserves data privacy by training across multiple decentralized edge devices.',
      tags: ['Federated Learning', 'Privacy', 'Classification', 'Distributed Systems'],
    },
    {
      id: 'cfd-experiments',
      title: 'CFD experiments',
      category: 'Fluid Dynamics',
      description: 'Computational Fluid Dynamics simulations investigating flow patterns and turbulence.',
      tags: ['CFD', 'Navier-Stokes', 'Turbulence'],
    },
    {
      id: 'lennard-jones-simulation',
      title: 'Lennard-Jones liquid simulation',
      category: 'Molecular Dynamics',
      description: 'Molecular dynamics and Monte Carlo simulation of a liquid system modeled using the Lennard-Jones potential to study structural and dynamical properties.',
      tags: ['Molecular Dynamics', 'Statistical Mechanics', 'Lennard-Jones'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-24">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A collection of work spanning simulation, physically informed machine learning, and computational methods. Each project represents a focused exploration of theory meeting practice.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="block bg-white rounded-xl p-8 border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-sm font-medium text-blue-600 mb-2 block">
                    {project.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h2>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm text-center">
            More projects and case studies coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

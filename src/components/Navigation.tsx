import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, Menu, X } from 'lucide-react';
import { LINKEDIN_URL } from '../constants';

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      isActive(path) ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
    }`;

  const links = [
    { to: '/',        label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact',  label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Luigi Donnarumma
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={linkClass(l.to)}>
                {l.label}
              </Link>
            ))}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              LinkedIn
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className="sm:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="sm:hidden border-t border-gray-100 mt-3 pt-3 pb-2 flex flex-col gap-4">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={linkClass(l.to)}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
              onClick={() => setOpen(false)}
            >
              LinkedIn
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

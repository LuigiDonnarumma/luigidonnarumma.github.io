import { Mail, Linkedin, ExternalLink } from 'lucide-react';
import { LINKEDIN_URL, EMAIL } from '../constants';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-24">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get in touch
          </h1>
          <p className="text-xl text-gray-600">
            Interested in collaboration, have a question about my work, or just want to connect? I'd be happy to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 px-3 pt-3">
            Reach out directly
          </h2>

          <div className="space-y-3">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600 break-all">{EMAIL}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Linkedin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">LinkedIn</h3>
                <p className="text-gray-600">Connect with me professionally</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white">
          <h2 className="text-xl font-bold mb-4">What I'm looking for</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Research collaborations on simulation or physically informed ML</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Engineering projects with interesting computational challenges</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Innovative cross-disciplinary projects in the scientific world</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm text-center">
            I typically respond within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

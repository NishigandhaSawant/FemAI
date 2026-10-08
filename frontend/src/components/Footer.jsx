import { Activity, ExternalLink, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-crimson-600 to-burgundy-800 rounded-lg flex items-center justify-center">
            <Activity size={14} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-sm">
            Fem<span className="text-gradient">AI</span>
          </span>
          <span className="text-gray-300 mx-2">|</span>
          <span className="text-xs text-gray-400">Intelligent PCOS Screening Platform</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:team@femai.health"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-crimson-600 transition-colors"
          >
            <Mail size={13} />
            Contact
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-crimson-600 transition-colors"
          >
            <ExternalLink size={13} />
            GitHub
          </a>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} FemAI. For educational purposes only.
        </p>
      </div>
    </footer>
  )
}

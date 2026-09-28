import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Shield,
  Heart,
  Globe,
} from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-white/95 border-t-2 border-emerald-200 text-slate-600 text-sm no-print">
      {/* Upper Footer with Primary Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-300 p-1 flex items-center justify-center shadow-xs">
                <ImageWithFallback
                  src="/images/logo.png"
                  fallbackSrc="https://i.postimg.cc/6qRt0h7H/file-00000000ee20821182e188b87dbc276d.png"
                  alt="STDTech Group"
                  className="w-full h-full object-contain"
                  fallbackInitials="STD"
                  fallbackColor="bg-emerald-100"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                  STDTech Group Pvt Ltd
                </h3>
                <p className="text-xs font-bold text-emerald-700">
                  Technology | Innovation | Impact
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 max-w-sm font-normal">
              STDTech Group is a technology company focused on building software products, delivering digital solutions, developing AI-powered technologies, and providing practical technology education.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Jitoura, Bansdih, Ballia, Uttar Pradesh, India — 277202
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="tel:7318514528" className="hover:text-emerald-700 transition-colors font-medium">
                  +91 7318514528
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href="mailto:harinathkushwaha12@gmail.com"
                  className="hover:text-emerald-700 transition-colors font-medium"
                >
                  harinathkushwaha12@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/irMyZbLojZ2Bofk1A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Locate on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 border-l-2 border-emerald-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-700 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-emerald-700 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-emerald-700 transition-colors">
                  Services (5 Core)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-emerald-700 transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-emerald-700 transition-colors">
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-emerald-700 transition-colors">
                  STDTech Academy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('verify-cert')} className="hover:text-emerald-700 transition-colors text-emerald-800 font-bold">
                  Verify Certificate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-700 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 border-l-2 border-blue-500 pl-2">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => onNavigate('leadership')} className="hover:text-blue-700 transition-colors">
                  Founder & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-blue-700 transition-colors">
                  Careers & Hiring
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-blue-700 transition-colors">
                  Solutions & Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-blue-700 transition-colors">
                  Industries Served
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('technologies')} className="hover:text-blue-700 transition-colors">
                  Technology Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-blue-700 transition-colors">
                  Technical Blog & Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 border-l-2 border-pink-500 pl-2">
              Legal & Connect
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 mb-6">
              <li>
                <button onClick={() => onNavigate('privacy-policy')} className="hover:text-pink-700 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms-conditions')} className="hover:text-pink-700 transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>

            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-2">
              Verified Profiles
            </h5>
            <div className="flex flex-col gap-2 text-xs text-slate-600">
              <a
                href="https://github.com/harinath78811388-crypto"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 flex items-center gap-1.5 transition-colors font-medium"
              >
                <span>GitHub (Official)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://www.instagram.com/stdtechgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-700 flex items-center gap-1.5 transition-colors font-medium"
              >
                <span>Instagram: @stdtechgroup</span>
              </a>
              <a
                href="https://www.linkedin.com/company/stdtechgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 flex items-center gap-1.5 transition-colors font-medium"
              >
                <span>LinkedIn: @stdtechgroup</span>
              </a>
              <span className="text-[11px] text-slate-400 italic">
                YouTube: Not available currently
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="border-t border-emerald-100 bg-emerald-50/50 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© {currentYear} STDTech Group Pvt Ltd. All rights reserved.</p>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Designed for: <strong className="text-emerald-700 font-bold">stdtechgroup.com</strong></span>
            <span>•</span>
            <span>Ballia, UP, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

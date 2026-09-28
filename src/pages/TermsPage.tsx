import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Terms & Conditions of Service</h1>
        <p className="text-xs text-slate-400">Effective Date: January 2026 • STDTech Group Pvt Ltd</p>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website, client portals, APIs, or educational systems of STDTech Group Pvt Ltd, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue using our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Intellectual Property Rights</h2>
          <p>
            All source code, proprietary algorithms (including SWAYNIS architecture, predictive classification models, and AutoCAD macros), branding, logos, graphics, and course content are the exclusive intellectual property of STDTech Group Pvt Ltd, protected under Indian and international copyright and trademark laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Certificate Verification & Academic Integrity</h2>
          <p>
            Certificates issued by STDTech Academy are unique to the credential holder and verifiable via our official verification registry. Any attempt to forge, duplicate, alter, or misrepresent certificate identifiers constitutes academic fraud and may be subject to legal prosecution.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Governing Law & Jurisdiction</h2>
          <p>
            These terms and any disputes arising out of the use of our services shall be governed exclusively by the laws of the Republic of India, with exclusive jurisdiction resting in the competent courts of Ballia / Allahabad High Court, Uttar Pradesh.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Official Inquiries</h2>
          <p className="text-white font-semibold">
            STDTech Group Pvt Ltd<br />
            Email: harinathkushwaha12@gmail.com<br />
            Phone: +91 7318514528<br />
            Registered Office: Jitoura, Bansdih, Ballia, Uttar Pradesh, India — 277202
          </p>
        </section>
      </div>
    </div>
  );
}

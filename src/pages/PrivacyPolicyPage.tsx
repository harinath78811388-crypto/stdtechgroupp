import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: January 2026 • STDTech Group Pvt Ltd</p>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Company Information & Commitment</h2>
          <p>
            STDTech Group Pvt Ltd ("STDTech", "we", "us", or "our"), headquartered in Jitoura, Bansdih, Ballia, Uttar Pradesh, India — 277202, is committed to safeguarding the privacy and confidentiality of visitors, clients, and students who utilize our digital platforms, including stdtechgroup.com.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
          <p>We may collect information you provide directly to us:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
            <li>Contact details (Name, Email Address, Phone Number, Corporate Entity) when submitting proposals or inquiries.</li>
            <li>Academic and enrollment data for course participation and cryptographic certificate issuance.</li>
            <li>Employment application materials (resumes, portfolios, cover letters) submitted through our Careers portal.</li>
            <li>Technical metadata (IP address, browser type, device information) collected automatically for security logging and diagnostic purposes.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. How We Use Collected Information</h2>
          <p>Your data is processed strictly for legitimate operational purposes:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
            <li>To formulate engineering proposals, software quotes, and execute agreed deliverables.</li>
            <li>To manage user authentication, role-based dashboards, and security sessions.</li>
            <li>To maintain the authenticity of issued certificates on our public verification registry.</li>
            <li>To comply with statutory legal and regulatory obligations in the Republic of India.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Data Security & Storage</h2>
          <p>
            We implement industry-standard encryption protocols (SSL/TLS, Argon2/bcrypt password hashing, and encrypted database connections) to safeguard stored records against unauthorized access, destruction, or alteration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
          <p>
            For privacy inquiries, data deletion requests, or compliance questions, please contact our Data Protection Officer:
          </p>
          <p className="text-white font-semibold">
            STDTech Group Pvt Ltd<br />
            Email: harinathkushwaha12@gmail.com<br />
            Phone: +91 7318514528<br />
            Address: Jitoura, Bansdih, Ballia, Uttar Pradesh, India — 277202
          </p>
        </section>
      </div>
    </div>
  );
}

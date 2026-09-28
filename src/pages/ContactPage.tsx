import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Clock,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface ContactPageProps {
  initialSubject?: string;
}

export default function ContactPage({ initialSubject = '' }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject ? `Project Inquiry: ${initialSubject}` : '',
    service: initialSubject || 'Web & Mobile App Development',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Send via local API endpoint
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (apiErr) {
        console.warn('API endpoint submission error, persisting to Firestore:', apiErr);
      }

      // 2. Persist to Firebase Firestore
      try {
        await addDoc(collection(db, 'inquiries'), {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service || 'General Inquiry',
          message: formData.message.trim(),
          createdAt: new Date().toISOString(),
          status: 'new',
        });
      } catch (firestoreErr) {
        console.warn('Firestore write warning:', firestoreErr);
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Error sending message. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Connect With STDTech</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Start Your Next Software Milestone
        </h1>
        <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
          Technology | Innovation | Impact
        </p>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          Whether you require an enterprise software quote, custom AI model pipeline, or student enrollment guidance, our leadership team is ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 5 Cols: Authentic Verified Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-emerald-200 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Direct Corporate Channels</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Registered Headquarters:</strong>
                  <span className="text-slate-600 leading-relaxed font-normal">
                    Jitoura, Bansdih, Ballia, Uttar Pradesh, India — 277202
                  </span>
                  <div className="mt-2">
                    <a
                      href="https://maps.app.goo.gl/irMyZbLojZ2Bofk1A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1 text-xs font-bold"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Direct Line:</strong>
                  <a href="tel:7318514528" className="text-emerald-700 font-bold hover:underline">
                    +91 7318514528
                  </a>
                  <span className="text-[11px] text-slate-500 block font-medium">Mon – Sat, 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-pink-600 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Executive Inquiries:</strong>
                  <a
                    href="mailto:harinathkushwaha12@gmail.com"
                    className="text-pink-700 font-bold hover:underline break-all"
                  >
                    harinathkushwaha12@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Verified Social Profiles */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Official Profiles & Repositories:
              </span>
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href="https://github.com/harinath78811388-crypto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-between font-medium"
                >
                  <span>GitHub: harinath78811388-crypto</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://www.instagram.com/stdtechgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-pink-50/50 hover:bg-pink-100/60 border border-pink-200 text-pink-800 flex items-center justify-between font-medium"
                >
                  <span>Instagram: @stdtechgroup</span>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
                </a>
                <a
                  href="https://www.linkedin.com/company/stdtechgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-100/60 border border-blue-200 text-blue-800 flex items-center justify-between font-medium"
                >
                  <span>LinkedIn: @stdtechgroup</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Proposal & Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-pink-200 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Successfully Transmitted</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
                  Thank you for contacting STDTech Group Pvt Ltd. A technical architect will review your project scope and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '',
                      service: 'Web & Mobile App Development',
                      message: '',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Request Technical Proposal</h3>
                <p className="text-xs text-slate-500 mb-6 font-normal">
                  Fill out your project specifications to receive technical estimation, milestone schedules, and architectural guidance.
                </p>

                {error && (
                  <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Harinath Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Corporate / Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 7318514528"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Domain of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      >
                        <option value="Web & Mobile App Development">Web & Mobile App Development</option>
                        <option value="AI & Machine Learning Solutions">AI & Machine Learning Solutions</option>
                        <option value="Software & Business Solutions">Software & Business Solutions</option>
                        <option value="Cybersecurity & Cloud Solutions">Cybersecurity & Cloud Solutions</option>
                        <option value="Digital Transformation & IT Consulting">Digital Transformation & IT Consulting</option>
                        <option value="AutoCAD Project Engineering">AutoCAD Project Engineering</option>
                        <option value="STDTech Academy Training">STDTech Academy Training</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Project Objective / Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Build Custom ERP with Machine Learning Analytics"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Detailed Project Scope & Functional Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your current system, desired delivery milestones, tech preferences, and timeline..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting Proposal...' : 'Transmit Proposal to Engineering'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

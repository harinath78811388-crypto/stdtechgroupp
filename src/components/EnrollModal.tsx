import { useState } from 'react';
import { X, GraduationCap, CheckCircle2, AlertCircle, Clock, BookOpen, Send } from 'lucide-react';
import { CourseItem } from '../types';

interface EnrollModalProps {
  course: CourseItem | null;
  onClose: () => void;
}

export default function EnrollModal({ course, onClose }: EnrollModalProps) {
  if (!course) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentStatus: 'College Student (B.Tech / BCA / Polytechnic)',
    batchPreference: 'Weekend Batch (Online + Virtual Lab)',
    learningGoal: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Submits as contact inquiry marked for Academy Enrollment
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Academy Enrollment Inquiry: ${course.title}`,
          service: 'STDTech Academy Training',
          message: `Applicant Status: ${formData.currentStatus} | Batch Preference: ${formData.batchPreference} | Goal: ${formData.learningGoal || 'Industry Certification & Practical Skills'}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Could not submit enrollment inquiry');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please call +91 7318514528');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Enrollment Inquiry Logged</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{formData.name}</strong>! Your inquiry for <strong>{course.title}</strong> has been forwarded to the STDTech Academy academic registrar. We will reach out to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>STDTech Academy Enrollment</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">{course.title}</h2>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.duration}</span>
              </span>
              <span>•</span>
              <span>Level: {course.skillLevel}</span>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Current Academic / Professional Status</label>
                <select
                  value={formData.currentStatus}
                  onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="College Student (B.Tech / BCA / Polytechnic)">College Student (B.Tech / BCA / Polytechnic)</option>
                  <option value="Recent Graduate Seeking Industry Transition">Recent Graduate Seeking Industry Transition</option>
                  <option value="Working Professional Looking to Upskill">Working Professional Looking to Upskill</option>
                  <option value="Self-Taught Coder / Hobbyist">Self-Taught Coder / Hobbyist</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Batch Schedule Preference</label>
                <select
                  value={formData.batchPreference}
                  onChange={(e) => setFormData({ ...formData, batchPreference: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Weekend Batch (Online + Virtual Lab)">Weekend Batch (Online + Virtual Lab)</option>
                  <option value="Weekday Evening Batch">Weekday Evening Batch</option>
                  <option value="Intensive Fast-Track Bootcamp">Intensive Fast-Track Bootcamp</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Career Goal / Note (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.learningGoal}
                  onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                  placeholder="What would you like to build or achieve?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Submitting Application...' : 'Confirm Enrollment Inquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

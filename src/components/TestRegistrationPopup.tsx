import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink, X } from 'lucide-react';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeDmvZl6R8Ql605CaJTbsR7f5DHgxiITuIt0b7mkv9Hg3tHsg/viewform';

const BANNER_IMAGE = '/images/all-united-test-2026-banner.png';

type Stage = 'banner' | 'custom' | 'google';

export default function TestRegistrationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('banner');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setStage('banner');
    setSubmitted(false);
  };

  const openRegistration = () => setStage('custom');

  const handleCustomSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    // The final official response is still collected by the existing Google Form.
    // Google Forms field entry IDs are required to post a custom form directly
    // into Google Forms; those IDs are not present in the current project.
    window.setTimeout(() => setStage('google'), 450);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-2 backdrop-blur-md sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="STDTech All United Test registration"
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl ${
          stage === 'banner' ? 'max-w-6xl' : stage === 'custom' ? 'max-w-2xl' : 'max-w-4xl'
        }`}
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close registration popup"
          className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:scale-105 hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        {stage === 'banner' && (
          <button
            type="button"
            onClick={openRegistration}
            className="group block w-full cursor-pointer border-0 bg-white p-0 text-left outline-none focus-visible:ring-4 focus-visible:ring-pink-400/60"
            aria-label="Click here for registration"
          >
            <img
              src={BANNER_IMAGE}
              alt="STDTech All United Test — Click Here for Registration"
              className="block h-auto max-h-[88vh] w-full object-contain transition duration-300 group-hover:scale-[1.01]"
            />
            <span className="sr-only">Click Here for Registration</span>
          </button>
        )}

        {stage === 'custom' && (
          <div className="max-h-[92vh] overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-5 sm:p-8">
            <div className="mx-auto max-w-xl">
              <button
                type="button"
                onClick={() => setStage('banner')}
                className="mb-5 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
              >
                <ArrowLeft size={17} /> Back to banner
              </button>

              <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl backdrop-blur sm:p-7">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">STDTech Group Pvt Ltd</p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    All United Test — Registration
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    For Diploma students of IT, Computer Science and Electronics — 1st &amp; 2nd Year.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-emerald-50 p-3 text-sm"><b>Test</b><br />20 October 2026</div>
                    <div className="rounded-2xl bg-pink-50 p-3 text-sm"><b>Registration</b><br />Until 15 October 2026</div>
                    <div className="rounded-2xl bg-blue-50 p-3 text-sm"><b>Recognition</b><br />Top 5 get certificates</div>
                  </div>
                </div>

                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-slate-700">Full Name</span>
                    <input name="fullName" required placeholder="Enter your full name" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
                  </label>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">Email</span>
                      <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">Mobile Number</span>
                      <input name="phone" type="tel" required placeholder="10-digit mobile number" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">Branch</span>
                      <select name="branch" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10">
                        <option value="">Select branch</option>
                        <option>Information Technology (IT)</option>
                        <option>Computer Science (CS)</option>
                        <option>Electronics Engineering</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">Year</span>
                      <select name="year" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10">
                        <option value="">Select year</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                      </select>
                    </label>
                  </div>

                  <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                    <input type="checkbox" required className="mt-1 h-4 w-4 accent-emerald-600" />
                    <span>I confirm that the details are correct and I want to register for the All United Test.</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-emerald-500 px-5 py-4 text-base font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-wait disabled:opacity-80"
                  >
                    {submitted ? <CheckCircle2 size={20} /> : null}
                    {submitted ? 'Opening Official Registration…' : 'Continue to Registration'}
                    {!submitted ? <ExternalLink size={18} /> : null}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-500">
                    The final official registration is submitted through the existing Google Form.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}

        {stage === 'google' && (
          <div className="bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 pr-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">STDTech Group</p>
                <h2 className="text-lg font-bold text-slate-900">Official Google Form</h2>
              </div>
              <button
                type="button"
                onClick={() => setStage('custom')}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
            <iframe
              title="STDTech All United Test Registration Google Form"
              src={`${GOOGLE_FORM_URL}?embedded=true`}
              className="block h-[76vh] min-h-[560px] w-full border-0"
              loading="eager"
              allow="fullscreen"
            />
          </div>
        )}
      </div>
    </div>
  );
}

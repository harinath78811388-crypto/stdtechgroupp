import { useEffect, useState } from 'react';
import { ClipboardCheck, ExternalLink, X } from 'lucide-react';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeDmvZl6R8Ql605CaJTbsR7f5DHgxiITuIt0b7mkv9Hg3tHsg/viewform';

export default function TestRegistrationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setShowForm(false);
  };

  if (!isOpen) return null;

  const embedUrl = `${GOOGLE_FORM_URL}?embedded=true`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/55 p-4 pt-20 backdrop-blur-sm sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label={showForm ? 'STDTech Quiz Registration Form' : 'STDTech Quiz Registration'}
    >
      <div
        className={`relative w-full overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl ${
          showForm ? 'max-w-3xl' : 'max-w-md'
        }`}
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        {!showForm ? (
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-7 sm:p-9">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-200/40 blur-2xl" />
            <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-emerald-200/40 blur-2xl" />

            <div className="relative">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-pink-500 text-white shadow-lg">
                <ClipboardCheck size={28} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                STDTech Group
              </p>
              <h2 className="pr-8 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Free Online Quiz Test
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                Test registration is open. Participate in the quiz and eligible participants
                can receive a digital certificate.
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-pink-500 px-5 py-3.5 font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Register Here
                <ExternalLink size={18} />
              </button>

              <p className="mt-3 text-center text-xs text-slate-500">
                The registration form will open inside this popup.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 pr-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  STDTech Group
                </p>
                <h2 className="text-lg font-bold text-slate-900">Quiz Registration</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Back
              </button>
            </div>

            <iframe
              title="STDTech Online Quiz Registration"
              src={embedUrl}
              className="h-[72vh] min-h-[560px] w-full border-0"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        )}
      </div>
    </div>
  );
}

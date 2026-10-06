import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink, X } from 'lucide-react';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeDmvZl6R8Ql605CaJTbsR7f5DHgxiITuIt0b7mkv9Hg3tHsg/viewform';

const GOOGLE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeDmvZl6R8Ql605CaJTbsR7f5DHgxiITuIt0b7mkv9Hg3tHsg/formResponse';

const BANNER_IMAGE = '/images/all-united-test-2026-banner.png';

type Stage = 'banner' | 'custom' | 'success' | 'google';

export default function TestRegistrationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('banner');
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 900);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setStage('banner');
    setSubmitting(false);
    setSubmitFailed(false);
  };

  const openRegistration = () => {
    setStage('custom');
    setSubmitFailed(false);
  };

  const openGoogleForm = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCustomSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setSubmitFailed(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('fullName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const college = String(formData.get('college') || '').trim();
    const branch = String(formData.get('branch') || '').trim();
    const year = String(formData.get('year') || '').trim();

    /*
     * Google Form field mapping
     *
     * Full Name:
     * entry.818366748
     *
     * Email:
     * entry.1050593685
     *
     * Mobile:
     * entry.549562356
     *
     * College:
     * entry.1328245964
     *
     * Course / Branch:
     * entry.350050676
     *
     * Year:
     * entry.1050871195
     */

    const googleFormData = new URLSearchParams();

    googleFormData.append('entry.818366748', name);
    googleFormData.append('entry.1050593685', email);
    googleFormData.append('entry.549562356', phone);
    googleFormData.append('entry.1328245964', college);
    googleFormData.append('entry.350050676', branch);
    googleFormData.append('entry.1050871195', year);

    try {
      /*
       * Google Forms accepts this POST.
       *
       * no-cors is required because Google Forms does not provide
       * normal CORS access to the browser.
       */
      await fetch(GOOGLE_FORM_RESPONSE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: googleFormData.toString(),
      });

      /*
       * Because no-cors returns an opaque response, we cannot inspect
       * Google's HTTP response. If fetch itself does not throw,
       * consider the submission sent.
       */
      setSubmitting(false);
      setStage('success');
    } catch (error) {
      console.error('Google Form submission error:', error);

      setSubmitting(false);
      setSubmitFailed(true);
    }
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
          stage === 'banner'
            ? 'max-w-6xl'
            : stage === 'custom'
              ? 'max-w-2xl'
              : stage === 'google'
                ? 'max-w-4xl'
                : 'max-w-xl'
        }`}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close registration popup"
          className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:scale-105 hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        {/* =========================================================
            BANNER
        ========================================================= */}
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

            <span className="sr-only">
              Click Here for Registration
            </span>
          </button>
        )}

        {/* =========================================================
            CUSTOM REGISTRATION FORM
        ========================================================= */}
        {stage === 'custom' && (
          <div className="max-h-[92vh] overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-5 sm:p-8">
            <div className="mx-auto max-w-xl">

              <button
                type="button"
                onClick={() => setStage('banner')}
                className="mb-5 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
              >
                <ArrowLeft size={17} />
                Back to banner
              </button>

              <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl backdrop-blur sm:p-7">

                {/* HEADER */}
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                    STDTech Group Pvt Ltd
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    All United Test — Registration
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    For Diploma students of IT, Computer Science and
                    Electronics — 1st &amp; 2nd Year.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <div className="rounded-2xl bg-emerald-50 p-3 text-sm">
                      <b>Test</b>
                      <br />
                      20 October 2026
                    </div>

                    <div className="rounded-2xl bg-pink-50 p-3 text-sm">
                      <b>Registration</b>
                      <br />
                      Until 15 October 2026
                    </div>

                    <div className="rounded-2xl bg-blue-50 p-3 text-sm">
                      <b>Recognition</b>
                      <br />
                      Top 5 get certificates
                    </div>

                  </div>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleCustomSubmit}
                  className="space-y-4"
                >

                  {/* FULL NAME */}
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Full Name
                    </span>

                    <input
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </label>

                  {/* EMAIL + MOBILE */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Email
                      </span>

                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Mobile Number
                      </span>

                      <input
                        name="phone"
                        type="tel"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </label>

                  </div>

                  {/* COLLEGE */}
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                      College / Institute Name
                    </span>

                    <input
                      name="college"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="Enter your college / institute name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </label>

                  {/* BRANCH + YEAR */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Branch
                      </span>

                      <select
                        name="branch"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      >
                        <option value="">
                          Select branch
                        </option>

                        <option value="IT">
                          Information Technology (IT)
                        </option>

                        <option value="CS">
                          Computer Science (CS)
                        </option>

                        <option value="Electronics Engineering">
                          Electronics Engineering
                        </option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Year
                      </span>

                      <select
                        name="year"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      >
                        <option value="">
                          Select year
                        </option>

                        <option value="1st Year">
                          1st Year
                        </option>

                        <option value="2nd Year">
                          2nd Year
                        </option>

                        <option value="3rd year">
                          3rd Year
                        </option>
                      </select>
                    </label>

                  </div>

                  {/* CONFIRMATION */}
                  <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 accent-emerald-600"
                    />

                    <span>
                      I confirm that the details are correct and I want
                      to register for the All United Test.
                    </span>
                  </label>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-emerald-500 px-5 py-4 text-base font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-wait disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting Registration...
                      </>
                    ) : (
                      <>
                        Submit Registration
                        <CheckCircle2 size={19} />
                      </>
                    )}
                  </button>

                  {/* FALLBACK ERROR */}
                  {submitFailed && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">

                      <p className="text-sm font-semibold text-red-700">
                        We couldn't send the registration automatically.
                      </p>

                      <p className="mt-1 text-xs text-red-600">
                        Please use the official Google Form instead.
                      </p>

                      <button
                        type="button"
                        onClick={openGoogleForm}
                        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                      >
                        Open Official Google Form
                        <ExternalLink size={16} />
                      </button>

                    </div>
                  )}

                  <p className="text-center text-xs leading-5 text-slate-500">
                    Your registration details will be submitted to
                    STDTech's official registration form.
                  </p>

                </form>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            SUCCESS SCREEN
        ========================================================= */}
        {stage === 'success' && (
          <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-6 sm:p-10">

            <div className="w-full max-w-md text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2
                  size={48}
                  className="text-emerald-600"
                />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Registration Submitted
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                You're Registered! 🎉
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Your registration details have been sent to the
                official STDTech registration system.
              </p>

              <div className="mt-6 rounded-2xl bg-white p-4 text-sm shadow-md ring-1 ring-slate-200">
                <p className="font-bold text-slate-800">
                  All United Test
                </p>

                <p className="mt-1 text-slate-600">
                  Test Date: 20 October 2026
                </p>

                <p className="text-slate-600">
                  Top 5 winners will receive certificates.
                </p>
              </div>

              <button
                type="button"
                onClick={closePopup}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Done
              </button>

              {/* MANUAL FALLBACK */}
              <button
                type="button"
                onClick={openGoogleForm}
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 underline hover:text-slate-800"
              >
                Open official Google Form
                <ExternalLink size={13} />
              </button>

            </div>
          </div>
        )}

        {/* =========================================================
            GOOGLE FORM FALLBACK
        ========================================================= */}
        {stage === 'google' && (
          <div className="bg-white">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 pr-16">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  STDTech Group
                </p>

                <h2 className="text-lg font-bold text-slate-900">
                  Official Google Form
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setStage('custom')}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                <ArrowLeft size={16} />
                Back
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

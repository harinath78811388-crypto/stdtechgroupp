# Integration changes — STDTech Group project

## Files added
- `src/components/UnitedTestExamPopup.tsx`
  - Custom React + TypeScript exam popup.
  - Uses the existing banner at `/images/all-united-test-2026-banner.png`.
  - Shows Roll Number entry, start button, 60-minute timer, MCQ questions, answer options, submit action, animated result/lock screen.
  - On a visibility-hidden event during an active exam, attempts to submit current answers to Google Forms.
  - Appends elapsed time and reason to the Roll Number field before sending.
  - Uses localStorage to block another attempt from the same browser for that roll number.
- `src/components/UnitedTestExamPopup.css`
  - Styling for the popup, exam cards, timer, and animated success/lock state.

## Files modified
- `src/App.tsx`
  - Replaced the existing `TestRegistrationPopup` import with `UnitedTestExamPopup`.
  - Replaced the existing popup render slot with `<UnitedTestExamPopup />` so two automatic popups do not overlap.

## Existing files retained
- `src/components/TestRegistrationPopup.tsx` remains in the project but is no longer mounted by `App.tsx`.
- Existing registration assets and other website files are retained.

## Important limitations
- Browser visibility detection cannot reliably tell whether a user minimized the browser, switched tabs, locked the device, or opened another app. This is best-effort behavior.
- The first hide event attempts to auto-submit; the roll number is marked as used in localStorage. If the same roll number tries again in the same browser, the UI blocks the attempt. This is not secure enforcement because localStorage can be cleared or bypassed.
- To reliably enforce disqualification across devices/browsers, implement server-side attempt records keyed by roll number.
- Google Forms `fetch` with `mode: "no-cors"` cannot confirm whether Google saved the response. Test a dummy response and verify it in Google Forms → Responses before using the live exam.
- Verify all `entry.*` IDs and option text against the actual Google Form before exam day.

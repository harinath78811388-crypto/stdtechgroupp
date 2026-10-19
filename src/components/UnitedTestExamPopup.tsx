import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import "./STDTechExamPopup.css";

type Question = { text: string; entry: string; options: string[] };
type Group = { title: string; questions: Question[] };
type Stage = "banner" | "exam" | "success" | "disqualified";

const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScc240cYRAnJFTbMD0tLkVFp3Uu6oWlTETKfGA1XG9LB0kyOQ/formResponse";
const ROLL_ENTRY = "entry.896197312";
const ATTEMPT_KEY_PREFIX = "stdtech_united_test_attempt_";
const EXAM_SECONDS = 60 * 60;

const groups: Group[] = [
  { title: "Mathematics-I", questions: [
    { text: "If sin θ = 3/5, where θ is acute, then tan θ equals:", entry: "entry.334809569", options: ["3/4","4/3","3/5","5/4"] },
    { text: "sin 30° + cos 60° equals:", entry: "entry.22393482", options: ["0","1/2","1","√3"] },
    { text: "The roots of x² − 7x + 12 = 0 are:", entry: "entry.596814567", options: ["2 and 6","3 and 4","−3 and −4","1 and 12"] },
    { text: "For A = [[1,2],[3,4]], the determinant is:", entry: "entry.1883047141", options: ["2","−2","10","−10"] },
    { text: "log₁₀ 1000 equals:", entry: "entry.1766947892", options: ["2","3","10","100"] },
    { text: "The slope of 2x + 3y − 6 = 0 is:", entry: "entry.599899070", options: ["2/3","−2/3","3/2","−3/2"] },
    { text: "The derivative of x³ + 2x² − 5x + 1 is:", entry: "entry.1924553848", options: ["3x² + 4x − 5","3x² + 2x − 5","x² + 4x − 5","3x + 4x² − 5"] },
    { text: "lim(x→0) sin x / x, with x in radians, equals:", entry: "entry.496018502", options: ["0","1","∞","−1"] },
    { text: "Distance between (1,2) and (4,6) is:", entry: "entry.1525199714", options: ["3","4","5","7"] },
    { text: "∫ 2x dx equals:", entry: "entry.506783438", options: ["2x² + C","x² + C","x + C","2 + C"] },
  ]},
  { title: "Applied Physics-I", questions: [
    { text: "The dimensional formula of force is:", entry: "entry.1366766426", options: ["[MLT⁻¹]","[MLT⁻²]","[ML²T⁻²]","[ML⁻¹T⁻²]"] },
    { text: "The SI unit of force is:", entry: "entry.1299942415", options: ["Watt","Newton","Joule","Pascal"] },
    { text: "Velocity changes from 10 m/s to 30 m/s in 5 seconds. Average acceleration is:", entry: "entry.1206999344", options: ["2 m/s²","4 m/s²","5 m/s²","8 m/s²"] },
    { text: "If mass doubles and velocity stays constant, kinetic energy becomes:", entry: "entry.1322917018", options: ["Half","Double","Four times","Unchanged"] },
    { text: "The SI unit of power is:", entry: "entry.1769629759", options: ["Joule","Watt","Newton","Ampere"] },
    { text: "Approximate acceleration due to gravity near Earth is:", entry: "entry.530468591", options: ["4.9 m/s²","8.9 m/s²","9.8 m/s²","98 m/s²"] },
    { text: "For an ideal simple pendulum with unchanged length and gravity, which remains constant?", entry: "entry.1027388523", options: ["Amplitude under all conditions","Time period","Bob speed at every point","Kinetic energy at every point"] },
    { text: "The SI unit of the coefficient of linear expansion is:", entry: "entry.178344399", options: ["K","K⁻¹","m/K","m²/K"] },
    { text: "A force of 200 N acts on an area of 4 m². Pressure is:", entry: "entry.503311306", options: ["25 Pa","50 Pa","100 Pa","800 Pa"] },
    { text: "Which heat-transfer mode can occur through a vacuum?", entry: "entry.649112057", options: ["Conduction only","Convection only","Radiation only","Conduction and convection only"] },
  ]},
  { title: "Applied Chemistry", questions: [
    { text: "Atomic number equals the number of:", entry: "entry.1095277125", options: ["Neutrons","Protons","Nucleons","Protons and neutrons combined"] },
    { text: "Which subatomic particle has no electric charge?", entry: "entry.618963461", options: ["Proton","Neutron","Electron","Alpha particle"] },
    { text: "A bond generally formed by transfer of electrons is:", entry: "entry.324106549", options: ["Covalent","Ionic","Metallic","Hydrogen"] },
    { text: "The pH of a neutral aqueous solution at 25°C is approximately:", entry: "entry.342354711", options: ["0","5","7","14"] },
    { text: "Which is a strong acid in aqueous solution?", entry: "entry.125777273", options: ["HCl","CH₃COOH","H₂CO₃","H₂O"] },
    { text: "Approximate molar mass of water (H₂O) is:", entry: "entry.1324126151", options: ["16 g/mol","17 g/mol","18 g/mol","20 g/mol"] },
    { text: "Rusting of iron generally requires:", entry: "entry.1502000570", options: ["Oxygen only","Water only","Oxygen and moisture","Nitrogen and sunlight"] },
    { text: "Which is a noble gas?", entry: "entry.270602150", options: ["Chlorine","Sodium","Argon","Hydrogen"] },
    { text: "Coating iron with zinc to prevent corrosion is called:", entry: "entry.1223124202", options: ["Distillation","Galvanization","Sublimation","Neutralization"] },
    { text: "Moles of solute per kilogram of solvent is called:", entry: "entry.253034109", options: ["Molality","Molarity","Mass percentage","Normality"] },
    { text: "For N₂O₄(g) ⇌ 2NO₂(g), initially 1 mole N₂O₄ is taken in a 1 L vessel. At 298 K, degree of dissociation is 50%. Given R = 0.0821 L·atm·mol⁻¹·K⁻¹, what is Kp?", entry: "entry.80102606", options: ["A) 12.2 atm","B) 24.4 atm","C) 36.6 atm","D) 48.8 atm"] },
  ]},
];

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
}

export default function STDTechExamPopup() {
  const [stage, setStage] = useState<Stage>("banner");
  const [roll, setRoll] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [seconds, setSeconds] = useState(EXAM_SECONDS);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const lock = useRef(false);
  const hiddenSubmitRef = useRef<((reason: string) => void) | null>(null);

  const questionCount = useMemo(() => groups.reduce((sum, group) => sum + group.questions.length, 0), []);
  const answeredCount = Object.keys(answers).length;

  const showExam = () => {
    const normalizedRoll = roll.trim();
    if (!normalizedRoll) {
      setMessage("Please enter your roll number before starting the examination.");
      return;
    }
    const key = ATTEMPT_KEY_PREFIX + normalizedRoll.toLowerCase();
    if (localStorage.getItem(key) === "submitted" || localStorage.getItem(key) === "disqualified") {
      setStage("disqualified");
      setMessage("A previous attempt has already been recorded for this roll number. Contact the exam administrator.");
      return;
    }
    localStorage.setItem(key, "in-progress");
    setStartedAt(Date.now());
    setSeconds(EXAM_SECONDS);
    setMessage("");
    setStage("exam");
  };

  const submitExam = async (reason: string) => {
    if (lock.current || stage !== "exam") return;
    lock.current = true;
    setBusy(true);
    const elapsed = startedAt ? Math.max(0, Math.floor((Date.now() - startedAt) / 1000)) : EXAM_SECONDS - seconds;
    const submissionLabel = `${roll.trim()} | Submitted in ${formatDuration(elapsed)} | Reason: ${reason}`;
    const data = new URLSearchParams();
    data.append(ROLL_ENTRY, submissionLabel);
    groups.forEach(group => group.questions.forEach(q => {
      const answer = answers[q.entry];
      if (answer) data.append(q.entry, answer);
    }));

    try {
      await fetch(FORM_RESPONSE_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      localStorage.setItem(ATTEMPT_KEY_PREFIX + roll.trim().toLowerCase(), reason === "minimized" && violationCount + 1 >= 2 ? "disqualified" : "submitted");
      setMessage(
        reason === "minimized"
          ? `The exam submission was triggered because the page was hidden/minimized. Elapsed time: ${formatDuration(elapsed)}. Please contact the administrator if this was accidental.`
          : `Your exam submission request was sent. Elapsed time: ${formatDuration(elapsed)}. The result will be announced soon.`
      );
      setStage(reason === "minimized" && violationCount + 1 >= 2 ? "disqualified" : "success");
    } catch {
      setMessage("The submission request could not be sent. Keep this page open and contact the exam administrator immediately.");
      setStage("success");
    } finally {
      setBusy(false);
    }
  };
  hiddenSubmitRef.current = (reason: string) => { void submitExam(reason); };

  useEffect(() => {
    if (stage !== "exam" || busy) return;
    const id = window.setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [stage, busy]);

  useEffect(() => {
    if (stage === "exam" && seconds === 0) void submitExam("time-expired");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, stage]);

  useEffect(() => {
    if (stage !== "exam") return;
    const onVisibility = () => {
      if (document.visibilityState === "hidden" && !lock.current) {
        const next = violationCount + 1;
        setViolationCount(next);
        if (next >= 2) {
          localStorage.setItem(ATTEMPT_KEY_PREFIX + roll.trim().toLowerCase(), "disqualified");
        }
        hiddenSubmitRef.current?.("minimized");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [stage, violationCount, roll]);

  const chooseAnswer = (entry: string, value: string) => setAnswers(prev => ({ ...prev, [entry]: value }));

  const manualSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!roll.trim()) {
      setMessage("Enter your roll number before submitting.");
      return;
    }
    if (Object.keys(answers).length < questionCount && !window.confirm("Some questions are unanswered. Submit anyway?")) return;
    void submitExam("student-submitted");
  };

  return (
    <div className="stx-root">
      {stage === "banner" && (
        <div className="stx-overlay" role="dialog" aria-modal="true" aria-label="For All United Test">
          <button className="stx-close" onClick={() => setStage("exam")} aria-label="Close banner">×</button>
          <button className="stx-banner-button" onClick={() => {
            const saved = localStorage.getItem(ATTEMPT_KEY_PREFIX + roll.trim().toLowerCase());
            if (roll.trim() && (saved === "submitted" || saved === "disqualified")) {
              setStage("disqualified");
              setMessage("This roll number already has a recorded attempt. Further attempts are not allowed on this browser.");
            } else {
              setMessage("");
              setStage("exam");
            }
          }}>
            <img src="/images/STDtech-United-Test-Announcement.png" alt="For All United Test — Click Here" className="stx-banner" />
            <span className="stx-banner-caption">Click the banner to start the examination</span>
          </button>
        </div>
      )}

      {stage !== "banner" && (
        <main className="stx-main">
          <header className="stx-header">
            <div><div className="stx-logo">ST</div><div><strong>STDTech Group</strong><small>Technology | Innovation | Impact</small></div></div>
            {stage === "exam" && <span className="stx-timer">Time left: {formatDuration(seconds)}</span>}
          </header>

          {stage === "exam" && (
            <form onSubmit={manualSubmit}>
              <section className="stx-card">
                <h1>For All United Test — 1st Year</h1>
                <p>MCQ Examination · 60 minutes · {questionCount} questions</p>
                <label className="stx-label">Roll Number
                  <input value={roll} onChange={e => setRoll(e.target.value)} required disabled={startedAt !== null} placeholder="Enter roll number before starting" />
                </label>
                {startedAt === null && <button type="button" className="stx-primary" onClick={showExam}>Start Examination</button>}
                {startedAt !== null && <p className="stx-note">Answered {answeredCount}/{questionCount}. If you minimize or switch away from this page, the browser will attempt to auto-submit your current answers. Browser restrictions may affect detection.</p>}
              </section>

              {startedAt !== null && groups.map((group, groupIndex) => (
                <section key={group.title}>
                  <h2 className="stx-section-title">{group.title}</h2>
                  {group.questions.map((q, index) => {
                    const globalIndex = groups.slice(0, groupIndex).reduce((n, g) => n + g.questions.length, 0) + index + 1;
                    return <article className="stx-question" key={q.entry}>
                      <h3>Q{globalIndex}. {q.text}</h3>
                      <div className="stx-options">
                        {q.options.map((option, optionIndex) => <label className="stx-option" key={option}>
                          <input type="radio" name={q.entry} checked={answers[q.entry] === option} onChange={() => chooseAnswer(q.entry, option)} />
                          <span>{String.fromCharCode(65 + optionIndex)}) {option}</span>
                        </label>)}
                      </div>
                    </article>;
                  })}
                </section>
              ))}
              {startedAt !== null && <section className="stx-card"><button className="stx-primary" disabled={busy} type="submit">{busy ? "Submitting..." : "Submit Examination"}</button></section>}
            </form>
          )}

          {(stage === "success" || stage === "disqualified") && (
            <section className={`stx-result ${stage === "disqualified" ? "stx-result-warning" : ""}`}>
              <div className="stx-check-circle">{stage === "success" ? "✓" : "!"}</div>
              <h1>{stage === "success" ? "Application Submitted Successfully!" : "Disqualified / Attempt Locked"}</h1>
              <p>{message}</p>
              <p>The result will be announced soon.</p>
              <p className="stx-small">Submission time is included with the roll number in the response field. The administrator should verify the response in Google Forms.</p>
            </section>
          )}
        </main>
      )}
    </div>
  );
}

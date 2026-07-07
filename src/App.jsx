import React, { useState, useRef } from "react";

const C = {
  ink: "#0B1220", panel: "#121A2B", line: "#1F2A3D", mute: "#7C8AA5",
  text: "#E6ECF5", cyan: "#22D3EE", cyanDim: "#0E7490", amber: "#FBBF24", green: "#34D399",
};

const STATES = { idle: "idle", running: "running", done: "done", error: "error" };

const STAGES = [
  { key: "intent", label: "Search intent + buyer stage" },
  { key: "serp", label: "SERP angle + differentiation" },
  { key: "geo", label: "GEO / AI-overview optimization" },
  { key: "entities", label: "Entity + topic coverage" },
  { key: "outline", label: "Draft outline + internal links" },
];

const SAMPLES = {
  "SOC 2 compliance automation": {
    primaryKeyword: "SOC 2 compliance automation",
    audience: "Security & compliance leaders at B2B SaaS",
    searchIntent: "Commercial",
    buyerStage: "Solution-aware → Vendor evaluation",
    estDifficulty: "High — dominated by GRC platforms with deep domain authority",
    serpAngle: "Win on specificity competitors avoid: show the actual automated evidence-collection workflow end to end, with a realistic timeline and where humans still gate the audit. Most ranking pages stay abstract — out-concrete them.",
    geoOptimization: [
      "Open with a 40–55 word definitional block answering 'What is SOC 2 compliance automation?' so it can be lifted verbatim into AI overviews.",
      "Add HowTo + FAQPage structured data covering the evidence-collection and continuous-monitoring steps.",
      "Publish one original data point (e.g. average days-to-audit-ready) so LLMs cite you as the source, not a competitor.",
      "Use unambiguous entity language — name the Trust Services Criteria explicitly so models map your page to the right concept.",
    ],
    secondaryKeywords: ["continuous compliance monitoring","SOC 2 Type II automation","automated evidence collection","GRC automation platform","SOC 2 audit readiness","compliance as code","security questionnaire automation"],
    entities: ["Trust Services Criteria","Type I vs Type II","Evidence collection","Continuous monitoring","AICPA","Audit window","Control mapping","Vendor risk","ISO 27001 overlap","Penetration testing"],
    questions: ["How long does SOC 2 automation actually take to get audit-ready?","Can compliance automation replace a human auditor?","What's the difference between SOC 2 Type I and Type II automation?","How does automated evidence collection work?","Is SOC 2 automation worth it for an early-stage startup?"],
    outline: [
      { h2: "What SOC 2 compliance automation actually does", points: ["Plain definition + the manual workflow it replaces","Where automation ends and human judgment begins"] },
      { h2: "The automated evidence-collection workflow, step by step", points: ["Integrations that pull evidence continuously","How controls map to Trust Services Criteria","What the audit window looks like in practice"] },
      { h2: "Type I vs Type II: what automation changes", points: ["Point-in-time vs over-a-period evidence","Why Type II is where automation pays off"] },
      { h2: "Realistic timeline to audit-ready", points: ["A week-by-week breakdown","The gates that still slow teams down"] },
      { h2: "When automation is (and isn't) worth it", points: ["Stage and team-size thresholds","Cost vs manual GRC effort"] },
      { h2: "Choosing a platform: an evaluation checklist", points: ["Integration depth","Auditor network","Continuous monitoring vs snapshot"] },
    ],
    internalLinks: ["ISO 27001 vs SOC 2 comparison","Security questionnaire automation guide","Vendor risk management overview","Penetration testing for compliance"],
    metaTitle: "SOC 2 Compliance Automation: How It Works in 2026",
    metaDescription: "A concrete look at SOC 2 compliance automation — the evidence-collection workflow, a realistic audit-ready timeline, and when it's worth it for B2B SaaS.",
  },
  "Zero trust network access": {
    primaryKeyword: "Zero trust network access",
    audience: "Infrastructure & security architects at mid-market tech",
    searchIntent: "Informational → Commercial",
    buyerStage: "Problem-aware → Solution-aware",
    estDifficulty: "High — established vendors and analyst content own the SERP",
    serpAngle: "Most pages define ZTNA and stop. Win by showing the migration path from legacy VPN to ZTNA with the failure modes teams actually hit — the practical angle analyst pages skip.",
    geoOptimization: [
      "Lead with a crisp 'ZTNA vs VPN' answer block — the comparison is the most-cited framing in AI overviews.",
      "Add a structured comparison table (legacy VPN vs ZTNA) with FAQPage schema so models extract it cleanly.",
      "Define ZTNA against the NIST 800-207 framework by name for entity clarity.",
      "Include one original migration-time benchmark so you become the citable source.",
    ],
    secondaryKeywords: ["ZTNA vs VPN","zero trust architecture","software defined perimeter","least privilege access","secure remote access","ZTNA solutions","identity aware proxy"],
    entities: ["NIST 800-207","Software-defined perimeter","Least privilege","Microsegmentation","Identity provider","Policy engine","Legacy VPN","SASE","Continuous verification","Trust broker"],
    questions: ["What's the difference between ZTNA and a VPN?","How do you migrate from VPN to zero trust network access?","Is ZTNA the same as SASE?","How long does a ZTNA rollout take?","Does zero trust eliminate the need for a firewall?"],
    outline: [
      { h2: "What zero trust network access means (and what it replaces)", points: ["Definition grounded in NIST 800-207","Why 'never trust, always verify' changes the network edge"] },
      { h2: "ZTNA vs VPN: the comparison that matters", points: ["Access model differences","Where VPNs break at scale"] },
      { h2: "The migration path from legacy VPN", points: ["Phased rollout sequence","Failure modes teams hit mid-migration"] },
      { h2: "ZTNA and SASE: how they relate", points: ["Where ZTNA fits in the SASE stack","When you need both"] },
      { h2: "Evaluating ZTNA solutions", points: ["Identity integration","Policy granularity","Performance overhead"] },
    ],
    internalLinks: ["SASE explained","Microsegmentation guide","Identity provider integration","Secure remote access best practices"],
    metaTitle: "Zero Trust Network Access (ZTNA): A Practical Guide",
    metaDescription: "Zero trust network access explained — ZTNA vs VPN, the real migration path from legacy VPN, and how to evaluate solutions. For security architects.",
  },
  "CTEM platform": {
    primaryKeyword: "CTEM platform",
    audience: "CISOs & security operations leaders",
    searchIntent: "Commercial",
    buyerStage: "Solution-aware → Vendor evaluation",
    estDifficulty: "Medium — newer category, less entrenched authority to displace",
    serpAngle: "CTEM is an emerging category, so the SERP is still soft. Own the definitional space and the five-stage framing before incumbents do — first-mover authority on a rising term.",
    geoOptimization: [
      "Publish the canonical definition of Continuous Threat Exposure Management with the five program stages, formatted for direct extraction.",
      "Map CTEM explicitly to adjacent terms (ASM, vulnerability management) so models disambiguate the category.",
      "Use Article + FAQPage schema and a stage-by-stage breakdown LLMs can summarize.",
      "Cite the Gartner-origin framing by name to anchor entity authority on a new term.",
    ],
    secondaryKeywords: ["continuous threat exposure management","attack surface management","exposure management","CTEM vs vulnerability management","threat exposure platform","security validation","CTEM program"],
    entities: ["Continuous Threat Exposure Management","Attack surface management","Scoping","Discovery","Prioritization","Validation","Mobilization","Vulnerability management","Breach and attack simulation","Risk prioritization"],
    questions: ["What is a CTEM platform?","How is CTEM different from vulnerability management?","What are the five stages of CTEM?","Do you need a dedicated CTEM platform or is ASM enough?","How do you measure CTEM program success?"],
    outline: [
      { h2: "What a CTEM platform is", points: ["Definition + the five-stage program","Why exposure management replaces point-in-time scanning"] },
      { h2: "The five stages, explained", points: ["Scoping through mobilization","What each stage produces"] },
      { h2: "CTEM vs vulnerability management vs ASM", points: ["Where the categories overlap","What CTEM adds on top"] },
      { h2: "What to look for in a platform", points: ["Validation capability","Prioritization logic","Workflow mobilization"] },
      { h2: "Measuring program success", points: ["Exposure-reduction metrics","Mean time to remediate"] },
    ],
    internalLinks: ["Attack surface management guide","Vulnerability management vs CTEM","Breach and attack simulation explained","Risk-based prioritization"],
    metaTitle: "What Is a CTEM Platform? The 2026 Buyer's Guide",
    metaDescription: "CTEM platforms explained — the five stages of continuous threat exposure management, how it differs from vuln management, and what to evaluate.",
  },
};

function Stat({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: C.mute }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{value}</span>
    </div>
  );
}

function Pill({ children, tone = "cyan" }) {
  const map = {
    cyan: { bg: "rgba(34,211,238,.12)", fg: C.cyan, bd: "rgba(34,211,238,.3)" },
    amber: { bg: "rgba(251,191,36,.12)", fg: C.amber, bd: "rgba(251,191,36,.3)" },
    green: { bg: "rgba(52,211,153,.12)", fg: C.green, bd: "rgba(52,211,153,.3)" },
  }[tone];
  return (
    <span style={{ fontSize: 12, padding: "3px 9px", borderRadius: 999, background: map.bg, color: map.fg, border: "1px solid " + map.bd, whiteSpace: "nowrap" }}>{children}</span>
  );
}

function Section({ n, title, children }) {
  return (
    <div style={{ borderTop: "1px solid " + C.line, paddingTop: 18, marginTop: 18 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, color: C.cyan, border: "1px solid " + C.cyanDim, borderRadius: 4, padding: "1px 6px" }}>{n}</span>
        <h3 style={{ margin: 0, fontSize: 14, letterSpacing: ".04em", textTransform: "uppercase", color: C.text }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [keyword, setKeyword] = useState("SOC 2 compliance automation");
  const [audience, setAudience] = useState("Security & compliance leaders at B2B SaaS");
  const [status, setStatus] = useState(STATES.idle);
  const [stageIdx, setStageIdx] = useState(-1);
  const [brief, setBrief] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [usedLive, setUsedLive] = useState(false);
  const stageTimer = useRef(null);

  function runStageAnimation(after) {
    setStageIdx(0);
    let i = 0;
    stageTimer.current = setInterval(() => {
      i += 1;
      if (i >= STAGES.length) { clearInterval(stageTimer.current); setStageIdx(STAGES.length); after(); }
      else { setStageIdx(i); }
    }, 600);
  }

  function runSample() {
    const match = SAMPLES[keyword] || Object.values(SAMPLES).find((s) => s.primaryKeyword.toLowerCase() === keyword.trim().toLowerCase());
    if (!match) return false;
    setStatus(STATES.running); setBrief(null); setErrMsg(""); setUsedLive(false);
    runStageAnimation(() => { setBrief(match); setStatus(STATES.done); });
    return true;
  }

  async function runLive() {
    setStatus(STATES.running); setBrief(null); setErrMsg(""); setUsedLive(true); setStageIdx(0);
    let i = 0;
    stageTimer.current = setInterval(() => { i = Math.min(i + 1, STAGES.length - 1); setStageIdx(i); }, 1100);
    const prompt = "You are an expert B2B and cybersecurity SEO/GEO strategist producing a content brief.\n\nTarget keyword: \"" + keyword + "\"\nAudience: \"" + audience + "\"\n\nReturn ONLY a valid JSON object (no markdown, no backticks, no preamble) with this exact shape:\n{\n  \"primaryKeyword\": string,\n  \"searchIntent\": string,\n  \"buyerStage\": string,\n  \"estDifficulty\": string,\n  \"serpAngle\": string,\n  \"geoOptimization\": [string],\n  \"secondaryKeywords\": [string],\n  \"entities\": [string],\n  \"questions\": [string],\n  \"outline\": [ { \"h2\": string, \"points\": [string] } ],\n  \"internalLinks\": [string],\n  \"metaTitle\": string,\n  \"metaDescription\": string\n}\nBe specific to the B2B/cyber buyer. GEO tactics must be concrete (structured data, definitional answer blocks, original data, entity clarity).";
    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const raw = data.content.filter((b) => b.type === "text").map((b) => b.text).join("").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(raw);
      clearInterval(stageTimer.current); setStageIdx(STAGES.length); setBrief(parsed); setStatus(STATES.done);
    } catch (e) {
      clearInterval(stageTimer.current);
      setErrMsg("Live generation isn't wired to a backend in this deploy. Try one of the sample keywords above for an instant brief.");
      setStatus(STATES.error);
    }
  }

  function generate() {
    if (!keyword.trim()) return;
    if (!runSample()) runLive();
  }

  function copyBrief() {
    if (!brief) return;
    const t = "CONTENT BRIEF — " + brief.primaryKeyword + "\nIntent: " + brief.searchIntent + " | Stage: " + brief.buyerStage + " | Difficulty: " + brief.estDifficulty + "\n\nSERP ANGLE\n" + brief.serpAngle + "\n\nGEO / AI-OVERVIEW\n" + brief.geoOptimization.map((x) => "• " + x).join("\n") + "\n\nSECONDARY KEYWORDS\n" + brief.secondaryKeywords.join(", ") + "\n\nENTITIES TO COVER\n" + brief.entities.join(", ") + "\n\nQUESTIONS TO ANSWER\n" + brief.questions.map((x) => "• " + x).join("\n") + "\n\nOUTLINE\n" + brief.outline.map((s) => "## " + s.h2 + "\n" + s.points.map((p) => "  - " + p).join("\n")).join("\n\n") + "\n\nINTERNAL LINKS\n" + brief.internalLinks.map((x) => "• " + x).join("\n") + "\n\nMETA TITLE: " + brief.metaTitle + "\nMETA DESCRIPTION: " + brief.metaDescription;
    navigator.clipboard && navigator.clipboard.writeText(t);
  }

  const running = status === STATES.running;
  const isSampleKw = !!(SAMPLES[keyword] || Object.values(SAMPLES).find((s) => s.primaryKeyword.toLowerCase() === keyword.trim().toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(900px 500px at 80% -10%, rgba(34,211,238,.08), transparent), " + C.ink, color: C.text, fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif", padding: "28px 20px 64px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: C.cyan, boxShadow: "0 0 14px " + C.cyan }} />
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: ".18em", color: C.mute }}>SEO / GEO BRIEF ENGINE</span>
            </div>
            <h1 style={{ margin: "10px 0 0", fontSize: 28, fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.1 }}>From keyword to ranking brief — in one pass</h1>
            <p style={{ margin: "8px 0 0", color: C.mute, fontSize: 14, maxWidth: 560 }}>Built for B2B & cybersecurity search. Generates intent, SERP angle, GEO tactics for AI overviews, entity coverage, and a draft outline.</p>
          </div>
        </div>

        <div style={{ marginTop: 22, background: C.panel, border: "1px solid " + C.line, borderRadius: 14, padding: 18 }}>
          <div style={{ display: "grid", gap: 14 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: C.mute }}>Target keyword</span>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !running && generate()} placeholder="e.g. zero trust network access" style={inputStyle} />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: C.mute }}>Audience</span>
              <input value={audience} onChange={(e) => setAudience(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !running && generate()} style={inputStyle} />
            </label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={generate} disabled={running} style={{ background: running ? C.cyanDim : C.cyan, color: C.ink, border: "none", borderRadius: 9, padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: running ? "default" : "pointer" }}>{running ? "Analyzing…" : isSampleKw ? "Generate brief" : "Generate (live)"}</button>
              {brief && <button onClick={copyBrief} style={ghostBtn}>Copy brief</button>}
              <div style={{ display: "flex", gap: 6, marginLeft: "auto", flexWrap: "wrap" }}>
                {Object.keys(SAMPLES).map((k) => (
                  <button key={k} onClick={() => { setKeyword(k); setAudience(SAMPLES[k].audience); }} style={chip}>{k}</button>
                ))}
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: C.mute }}>{isSampleKw ? "Instant sample — works for any viewer, no account needed." : "Custom keyword calls a serverless proxy to the Anthropic API. Pick a sample chip for an instant demo."}</p>
          </div>

          {status !== STATES.idle && (
            <div style={{ marginTop: 18, display: "grid", gap: 8 }}>
              {STAGES.map((s, i) => {
                const active = i === stageIdx && running;
                const done = i < stageIdx || status === STATES.done;
                return (
                  <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid " + (done ? C.green : active ? C.cyan : C.line), background: done ? "rgba(52,211,153,.15)" : active ? "rgba(34,211,238,.15)" : "transparent", color: done ? C.green : C.cyan, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>{done ? "✓" : active ? "●" : ""}</span>
                    <span style={{ color: done || active ? C.text : C.mute }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {status === STATES.error && <div style={{ marginTop: 14, color: C.amber, fontSize: 13 }}>{errMsg}</div>}
        </div>

        {brief && status === STATES.done && (
          <div style={{ marginTop: 22, background: C.panel, border: "1px solid " + C.line, borderRadius: 14, padding: "20px 22px 26px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, alignItems: "flex-start" }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-.01em" }}>{brief.primaryKeyword}</h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <Pill tone="cyan">{brief.searchIntent}</Pill>
                <Pill tone="amber">{(brief.estDifficulty && brief.estDifficulty.split(/[—-]/)[0].trim()) || brief.estDifficulty}</Pill>
                {usedLive && <Pill tone="green">live</Pill>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 14, flexWrap: "wrap" }}>
              <Stat label="Buyer stage" value={brief.buyerStage} />
              <Stat label="Difficulty" value={brief.estDifficulty} />
            </div>

            <Section n="01" title="SERP angle">
              <p style={{ margin: 0, color: C.text, fontSize: 14.5, lineHeight: 1.6 }}>{brief.serpAngle}</p>
            </Section>

            <Section n="02" title="GEO / AI-overview optimization">
              <ul style={ulStyle}>{brief.geoOptimization.map((x, i) => <li key={i} style={liStyle}>{x}</li>)}</ul>
            </Section>

            <Section n="03" title="Keyword + entity coverage">
              <div style={{ display: "grid", gap: 14 }}>
                <div><div style={subLabel}>Secondary keywords</div><div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{brief.secondaryKeywords.map((k, i) => <Pill key={i} tone="cyan">{k}</Pill>)}</div></div>
                <div><div style={subLabel}>Entities a top page must cover</div><div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{brief.entities.map((k, i) => <Pill key={i} tone="green">{k}</Pill>)}</div></div>
              </div>
            </Section>

            <Section n="04" title="Questions to answer">
              <ul style={ulStyle}>{brief.questions.map((x, i) => <li key={i} style={liStyle}>{x}</li>)}</ul>
            </Section>

            <Section n="05" title="Draft outline">
              <div style={{ display: "grid", gap: 14 }}>
                {brief.outline.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: C.text, marginBottom: 5 }}><span style={{ color: C.cyan, fontFamily: "ui-monospace, monospace", fontSize: 12, marginRight: 8 }}>H2</span>{s.h2}</div>
                    <ul style={{ ...ulStyle, marginTop: 0 }}>{s.points.map((p, j) => <li key={j} style={liStyle}>{p}</li>)}</ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section n="06" title="Internal links + metadata">
              <div style={{ display: "grid", gap: 14 }}>
                <div><div style={subLabel}>Link to</div><ul style={ulStyle}>{brief.internalLinks.map((x, i) => <li key={i} style={liStyle}>{x}</li>)}</ul></div>
                <div style={{ background: C.ink, border: "1px solid " + C.line, borderRadius: 10, padding: 14 }}>
                  <div style={subLabel}>Search snippet preview</div>
                  <div style={{ color: "#8AB4F8", fontSize: 16, lineHeight: 1.3 }}>{brief.metaTitle}</div>
                  <div style={{ color: C.green, fontSize: 12, margin: "2px 0 4px" }}>example.com › resources › guide</div>
                  <div style={{ color: C.mute, fontSize: 13, lineHeight: 1.5 }}>{brief.metaDescription}</div>
                </div>
              </div>
            </Section>
          </div>
        )}

        <p style={{ marginTop: 22, color: C.mute, fontSize: 12, textAlign: "center" }}>Working prototype · samples render instantly · custom keywords call the model live · same engine behind Cornerman's content pipeline</p>
      </div>
    </div>
  );
}

const inputStyle = { background: "#0C1322", border: "1px solid " + C.line, borderRadius: 9, padding: "11px 13px", color: C.text, fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" };
const ghostBtn = { background: "transparent", color: C.text, border: "1px solid " + C.line, borderRadius: 9, padding: "11px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" };
const chip = { background: "transparent", color: C.mute, border: "1px solid " + C.line, borderRadius: 999, padding: "5px 10px", fontSize: 12, cursor: "pointer" };
const ulStyle = { margin: "8px 0 0", paddingLeft: 18, display: "grid", gap: 6 };
const liStyle = { color: C.text, fontSize: 14, lineHeight: 1.55 };
const subLabel = { fontSize: 11, letterSpacing: ".07em", textTransform: "uppercase", color: C.mute, marginBottom: 8 };

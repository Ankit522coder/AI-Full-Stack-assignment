import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleHelp,
  FlaskConical,
  LayoutDashboard,
  RotateCcw,
  Sparkles,
  Target,
  TrendingDown,
} from 'lucide-react'

type Stage = 'ask' | 'clarify' | 'define' | 'test' | 'learn'

const stages: { id: Stage; label: string; icon: typeof Sparkles }[] = [
  { id: 'ask', label: 'Ask', icon: Sparkles },
  { id: 'clarify', label: 'Clarify', icon: CircleHelp },
  { id: 'define', label: 'Define', icon: Target },
  { id: 'test', label: 'Test', icon: FlaskConical },
  { id: 'learn', label: 'Learn', icon: BarChart3 },
]

const definitions = [
  ['Market', 'NIFTY 50 index'],
  ['Condition', 'Close-to-close fall of >= 2% over 5 sessions'],
  ['Entry', 'Buy at next session close after signal'],
  ['Exit', 'Sell at the close after 10 sessions'],
  ['Test period', 'Jan 2018 - Dec 2023'],
  ['Cost assumptions', '0.15% round-trip cost + no leverage'],
]

function App() {
  const [stage, setStage] = useState<Stage>('ask')
  const [question, setQuestion] = useState('Does buying NIFTY after a sharp fall work?')
  const [confirmed, setConfirmed] = useState(false)
  const [showMethod, setShowMethod] = useState(false)

  const stageIndex = stages.findIndex((item) => item.id === stage)
  const goNext = () => {
    const next = stages[Math.min(stageIndex + 1, stages.length - 1)].id
    setStage(next)
    if (next === 'clarify') setConfirmed(false)
  }

  const reset = () => {
    setStage('ask')
    setQuestion('Does buying NIFTY after a sharp fall work?')
    setConfirmed(false)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><TrendingDown size={17} /></span><span>signal<span className="brand-accent">/</span>lab</span></div>
        <div className="workspace-label">Workspace</div>
        <button className="workspace-switcher"><span><span className="status-dot" /> NIFTY research</span><ChevronDown size={15} /></button>
        <nav className="sidebar-nav">
          <button className="nav-item active"><LayoutDashboard size={17} /> Research desk</button>
          <button className="nav-item"><BarChart3 size={17} /> Saved experiments <span className="nav-count">3</span></button>
        </nav>
        <div className="sidebar-note">
          <div className="note-icon"><Sparkles size={15} /></div>
          <strong>Evidence over instinct</strong>
          <p>Turn a market hunch into a question you can actually test.</p>
        </div>
        <div className="sidebar-footer"><span className="avatar">AR</span><span><strong>Analyst workspace</strong><small>Local prototype</small></span><button aria-label="More workspace options">•••</button></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div><span className="eyebrow">RESEARCH DESK</span><h1>Idea to evidence</h1></div><div className="topbar-actions"><span className="data-badge"><span className="live-dot" /> Mock market data</span><button className="icon-button" onClick={reset} title="Reset research"><RotateCcw size={17} /></button></div></header>

        <div className="progress-wrap">
          <div className="progress-track"><div className="progress-fill" style={{ width: `${(stageIndex / 4) * 100}%` }} /></div>
          <div className="stage-list">{stages.map((item, index) => { const Icon = item.icon; return <button key={item.id} className={`stage-step ${item.id === stage ? 'current' : ''} ${index < stageIndex ? 'done' : ''}`} onClick={() => index <= stageIndex && setStage(item.id)}><span className="stage-icon">{index < stageIndex ? <Check size={14} /> : <Icon size={14} />}</span><span>{item.label}</span></button> })}</div>
        </div>

        <section className="content-grid">
          <div className="primary-column">
            {stage === 'ask' && <AskView question={question} setQuestion={setQuestion} onContinue={goNext} />}
            {stage === 'clarify' && <ClarifyView confirmed={confirmed} setConfirmed={setConfirmed} onContinue={goNext} />}
            {stage === 'define' && <DefineView showMethod={showMethod} setShowMethod={setShowMethod} onContinue={goNext} />}
            {stage === 'test' && <TestView onContinue={goNext} />}
            {stage === 'learn' && <LearnView onReset={reset} />}
          </div>
          <aside className="context-column">
            <div className="context-card"><div className="card-kicker"><span className="kicker-line" /> LIVE CONTEXT</div><h3>One question at a time</h3><p>Signal Lab keeps uncertainty visible before turning an idea into a result.</p><div className="context-rule" /><div className="mini-stat"><span>Current step</span><strong>{String(stageIndex + 1).padStart(2, '0')} / 05</strong></div><div className="mini-stat"><span>Experiment status</span><strong className="status-text">{stage === 'learn' ? 'Complete' : 'In progress'}</strong></div></div>
            <div className="assumption-card"><div className="card-kicker"><span className="kicker-line warm" /> WHY THIS MATTERS</div><p>“Sharp fall” is not a strategy until its threshold, timing and costs are explicit.</p><span className="annotation">A useful experiment makes ambiguity inspectable.</span></div>
          </aside>
        </section>
      </main>
    </div>
  )
}

function AskView({ question, setQuestion, onContinue }: { question: string; setQuestion: (value: string) => void; onContinue: () => void }) {
  return <div className="view-panel ask-panel"><span className="section-number">01 / 05</span><h2>Start with the hunch.</h2><p className="lede">What are you curious about in the market?</p><div className="question-box"><div className="question-label"><Sparkles size={15} /> YOUR QUESTION</div><textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={3} /><div className="question-foot"><span>Natural language is fine. We’ll make it testable together.</span><span className="char-count">{question.length} / 240</span></div></div><div className="suggestion-row"><span>Try asking:</span><button onClick={() => setQuestion('Does buying NIFTY after a sharp fall work?')}>Does buying NIFTY after a sharp fall work?</button></div><button className="primary-button" onClick={onContinue}>Make it testable <ArrowRight size={17} /></button></div>
}

function ClarifyView({ confirmed, setConfirmed, onContinue }: { confirmed: boolean; setConfirmed: (value: boolean) => void; onContinue: () => void }) {
  return <div className="view-panel"><span className="section-number">02 / 05</span><h2>Let’s make the ambiguity visible.</h2><p className="lede">The question is promising, but three choices will change the answer.</p><div className="clarify-list"><ClarifyItem label="What counts as a sharp fall?" value="At least 2% over the previous 5 trading sessions" /><ClarifyItem label="When do we buy?" value="At the next session close, after the signal is complete" /><ClarifyItem label="What does ‘work’ mean?" value="Positive average return after 10 sessions, net of costs" /></div><label className="confirm-row"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span className="custom-check"><Check size={13} /></span><span>I’m comfortable testing these starting assumptions.</span></label><button className="primary-button" disabled={!confirmed} onClick={onContinue}>Build the experiment <ArrowRight size={17} /></button><p className="muted-foot"><CircleHelp size={14} /> You can revisit these definitions before running the test.</p></div>
}

function ClarifyItem({ label, value }: { label: string; value: string }) { return <div className="clarify-item"><div className="clarify-label"><span className="question-dot">?</span><strong>{label}</strong><button aria-label={`Edit ${label}`}>Edit</button></div><p>{value}</p></div> }

function DefineView({ showMethod, setShowMethod, onContinue }: { showMethod: boolean; setShowMethod: (value: boolean) => void; onContinue: () => void }) {
  return <div className="view-panel"><span className="section-number">03 / 05</span><h2>Here’s the experiment.</h2><p className="lede">A clear research card turns one fuzzy sentence into a repeatable test.</p><div className="definition-grid">{definitions.map(([label, value]) => <div className="definition-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="hypothesis"><div><span className="hypothesis-label"><Target size={14} /> HYPOTHESIS</span><p>After a meaningful drawdown, NIFTY may mean-revert over the next two weeks.</p></div><span className="confidence">Directional · not a prediction</span></div><button className="method-toggle" onClick={() => setShowMethod(!showMethod)}><span><CircleHelp size={15} /> Why these defaults?</span><ChevronDown size={15} className={showMethod ? 'rotate' : ''} /></button>{showMethod && <div className="method-copy">Five sessions captures a short shock without overfitting to one day. Ten sessions gives the trade enough room to mean-revert, while the 0.15% cost assumption prevents frictionless results from looking investable.</div>}<button className="primary-button" onClick={onContinue}>Run a sample test <ArrowRight size={17} /></button></div>
}

function TestView({ onContinue }: { onContinue: () => void }) {
  return <div className="view-panel"><span className="section-number">04 / 05</span><h2>Run the sample test.</h2><p className="lede">We found 26 historical signals in the mock NIFTY series.</p><div className="test-summary"><div><span>Signals found</span><strong>26</strong></div><div><span>Average return</span><strong className="positive">+1.84%</strong></div><div><span>Win rate</span><strong>61.5%</strong></div><div><span>After costs</span><strong className="positive">+1.69%</strong></div></div><div className="chart-area"><div className="chart-head"><span>10-session forward return by signal</span><span className="chart-legend"><i /> Positive <i className="negative-dot" /> Negative</span></div><div className="bars">{[42, 68, 51, 78, 34, 64, 28, 59, 73, 46, 86, 38, 62, 49, 71, 30, 57, 81, 44, 66].map((height, index) => <div className={`bar ${index === 4 || index === 6 || index === 15 ? 'negative' : ''}`} style={{ height: `${height}%` }} key={index} />)}</div><div className="chart-axis"><span>Signal 01</span><span>13</span><span>26</span></div></div><div className="test-note"><Check size={15} /><span>This is a directional sample, not a live trading recommendation.</span></div><button className="primary-button" onClick={onContinue}>See what we learned <ArrowRight size={17} /></button></div>
}

function LearnView({ onReset }: { onReset: () => void }) {
  return <div className="view-panel learn-panel"><span className="section-number">05 / 05</span><h2>A useful signal, with limits.</h2><p className="lede">The data supports a narrow conclusion. It does not prove a strategy.</p><div className="result-banner"><div className="result-ring">+1.69<span>%</span></div><div><span className="result-label">AVERAGE 10-SESSION RETURN</span><h3>Positive in this sample</h3><p>After estimated round-trip costs.</p></div></div><div className="learn-grid"><div className="learn-block"><span className="learn-title">What the data shows</span><p>26 signals produced a 61.5% win rate and +1.69% average return after costs from 2018–2023.</p></div><div className="learn-block"><span className="learn-title">What we can conclude</span><p>There is a possible short-term mean-reversion effect worth investigating further, not enough evidence to trade it.</p></div></div><div className="next-question"><div className="next-icon"><ArrowRight size={17} /></div><div><span className="learn-title">Investigate next</span><p>Does the effect survive out-of-sample data, different fall thresholds, and a sector-neutral benchmark?</p></div></div><div className="learn-actions"><button className="secondary-button" onClick={onReset}><RotateCcw size={16} /> Start another question</button><button className="primary-button" onClick={() => window.print()}>Export research note <ArrowRight size={17} /></button></div></div>
}

export default App
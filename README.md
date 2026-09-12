<<<<<<< HEAD
# Signal Lab

Signal Lab is a small AI-native trading research prototype for Option 2 of the AI Full-Stack Developer Intern challenge. It turns the question **“Does buying NIFTY after a sharp fall work?”** into an explicit, inspectable experiment.

## What is included

- **Ask:** capture a research question in natural language.
- **Clarify:** expose the missing definitions instead of silently inventing them.
- **Define:** turn the assumptions into a structured experiment card.
- **Test:** run a transparent sample test over mock market data.
- **Learn:** separate what the data shows from what we can reasonably conclude, then suggest the next investigation.

The prototype intentionally does not present itself as a live trading system or investment recommendation.

## Architecture

This is a client-only React application. `App.tsx` owns the small workflow state (`stage`, question text, assumption confirmation, and method disclosure) and renders one view per stage. `styles.css` contains the visual system and responsive layout. The sample result is deterministic mock data so the prototype is runnable without API keys, market-data licensing, or a backend.

The next production step would be to replace the deterministic Test view with an API boundary that accepts a validated experiment schema and returns raw observations plus separately generated interpretation. Keeping those two outputs separate is important for auditability.

## Technology choices

- React + TypeScript for a typed, component-based interface.
- Vite for a fast development server and production bundle.
- Lucide React for interface icons.
- CSS variables and responsive CSS for a lightweight, dependency-free visual system.
- Mock data for a reproducible assignment prototype.

## Run locally

Requirements: Node.js 20+ and npm 10+.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. For a production check:

```bash
npm run build
npm run preview
```

## Key assumptions

“Sharp fall” is defined as a close-to-close fall of at least 2% over five sessions. The signal enters at the next session close and exits after ten sessions. The test uses January 2018–December 2023, 0.15% round-trip costs, no leverage, and a NIFTY 50 index proxy. These are visible defaults, not claims about the user’s intent.

## What I would improve next

1. Add an editable experiment schema and persist saved experiments.
2. Connect licensed historical data and a real backtesting service.
3. Add out-of-sample and sensitivity analysis with confidence intervals.
4. Add an AI clarification endpoint with structured JSON output and citations.
5. Add automated browser tests for each workflow transition.

## Submission notes

See [THINKING_NOTE.md](THINKING_NOTE.md) and [AI_USAGE_NOTE.md](AI_USAGE_NOTE.md) for the reasoning and development notes requested by the brief.
=======
# AI-Full-Stack-assignment
>>>>>>> f18c2e537cea314f431574af11aa7e2b6cc5d0a8

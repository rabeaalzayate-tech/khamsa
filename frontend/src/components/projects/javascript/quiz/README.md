# JavaScript Quiz Application

Interactive quiz project for the JavaScript documentation curriculum. The project combines a typed question bank, answer selection, a per-question countdown, immediate explanations, scoring, and a restart flow.

## Route

`/frontend/javascript/quiz`

The route is implemented in `src/app/(public)/frontend/javascript/quiz/page.tsx`. The reusable quiz interface and question bank live in `QuizApp.tsx` in this directory.

## Concepts demonstrated

- Objects and arrays as a structured question bank.
- TypeScript interfaces for question records.
- Array traversal and score aggregation.
- React state for the active question, selected answers, and quiz lifecycle.
- `useEffect` cleanup for the countdown interval.
- Derived results with `useMemo`.
- Accessible button-based answer selection and feedback.

## User flow

1. The learner selects one of the answer choices.
2. Selecting an answer enables confirmation and pauses the countdown after submission.
3. The app shows whether the answer is correct and displays an explanation.
4. The learner advances through the question set; timer expiry submits the question without an answer.
5. The results screen shows the score and percentage and offers a full restart.

The question data is intentionally kept separate from the rendering logic so the list can be extended without changing the interaction model.

## Local verification

From the repository root, run:

```bash
npm --prefix frontend run build -- --webpack
```

The production build should include `/frontend/javascript/quiz` in its route summary.

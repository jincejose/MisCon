# AlgoMate AI

AlgoMate is a browser based DSA learning workspace MVP. It includes a dashboard, local progress and settings, a roadmap, a Java styled binary search editor, deterministic step trace, and a contextual misconception hint.

## Run locally

Requirements: Node.js 22 or newer and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` creates a production build and `npm test` runs the binary search trace tests.

## Roadmap and AI providers

- The Roadmap page contains the 300 LeetCode questions and exact problem slugs linked in the supplied DSA-300 PDF, in eight weekly phases, with locally saved completion marks. Opening a question loads its statement and official Java, Python 3, C++, and JavaScript method template from LeetCode, and adds common language imports/headers. Its topics follow the study order in the supplied playlist directory PDF. **Solve** opens an in-app lesson, your live code review, complexity estimate, editor, and code-flow visualization.
- **Evaluate** scores implementation, control flow, result handling, edge-case signals, and complexity choices, then saves best scores to the profile dashboard. It does not prove correctness.
- JavaScript runs in a network-isolated browser worker. Java, Python, and C++ are compiled and run through Judge0 CE; the current challenge input passes a numeric array and target to `solve(nums, target)`, `twoSum(nums, target)`, or `search(nums, target)`. Remote-language source code is sent to Judge0 for execution. The default no-problem Binary Search sample uses the local trace demo.
- For your own AI credits, copy `.env.example` to `.env.local`, add `OPENAI_API_KEY` or `GEMINI_API_KEY`, and restart the dev server. To show YouTube videos with current view counts, also add `YOUTUBE_API_KEY` from a Google Cloud project with YouTube Data API v3 enabled. Select GPT or Gemini in Settings. Keys are read by the Vite server proxy and are not saved to browser storage. The default models are `gpt-4o-mini` and `gemini-2.5-flash`; override them with `OPENAI_MODEL` and `GEMINI_MODEL`.
- The AI proxy is included in Vite development and preview servers. A production static deployment needs an equivalent server-side proxy; do not put provider keys in frontend code.

## Try the debugging demo

1. Open **Code Lab** from the dashboard.
2. The sample uses the first item in a sorted array as the target. Run it to reproduce the boundary bug (`low < high`).
3. Step through the comparisons and read the Bug DNA hint.
4. Change the loop condition to `low <= high`, then run again. The same test passes.
5. Change the target or swap the sample array to explore more cases.

The Code Lab runs the current code for its supported array-and-target harness. It checks expected output for Two Sum and Binary Search; for other roadmap questions, it displays the program output without claiming hidden-test correctness. Judge0 applies remote compile and execution limits. The app does not provide a full LeetCode statement, data-structure-specific input editor, or hidden test suite for every one of the 300 questions.

## Current scope

- The trace engine computes verified binary search states locally and rejects unsorted arrays.
- The AI tutor supports local demo hints or server-side OpenAI/Gemini keys configured through `.env.local`.
- Dashboard topic state, editor text, theme, language, bookmarks, and the 50 most recently opened questions persist in browser local storage.
- Profile score and completion totals are calculated from local browser progress. There is no account system, backend database, or cloud sync.
- The Video Library searches all 300 roadmap questions and loads problem-specific YouTube tutorials. Add `YOUTUBE_API_KEY` for in-app view counts sorted by popularity; without it, the problem-specific YouTube results link remains available.

## Project layout

- `src/algorithms.ts`: deterministic trace and demo-pattern runner.
- `src/algorithms.test.ts`: correctness tests for found, missing, invalid, buggy, and corrected cases.
- `src/App.tsx`: app shell, workspace, dashboard, and learning views.
- `src/styles.css`: responsive dark/light UI styling.

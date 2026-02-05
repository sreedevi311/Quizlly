# Frontend Architecture (React + TypeScript + Vite)

**Project Structure**

```
src/
├── components/
│   ├── content/
│   │   ├── ContentInput.tsx
│   │   ├── ConceptList.tsx
│   │   └── ProcessingLoader.tsx
│   ├── quiz/
│   │   ├── QuizSession.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── Timer.tsx
│   │   └── ProgressBar.tsx
│   ├── feedback/
│   │   ├── ImmediateFeedback.tsx
│   │   ├── ConceptExplanation.tsx
│   │   └── ContextHighlight.tsx
│   ├── results/
│   │   ├── QuizResults.tsx
│   │   ├── ConceptBreakdown.tsx
│   │   └── GamifiedTitle.tsx
│   └── dashboard/
│       ├── UserDashboard.tsx
│       ├── PerformanceChart.tsx
│       └── HistoryTimeline.tsx
├── services/
│   ├── api.ts
│   ├── contentService.ts
│   ├── quizService.ts
│   └── analyticsService.ts
├── hooks/
│   ├── useQuizSession.ts
│   ├── useTimer.ts
│   └── usePerformanceData.ts
├── types/
│   ├── content.types.ts
│   ├── quiz.types.ts
│   └── analytics.types.ts
├── store/
│   ├── quizStore.ts
│   └── userStore.ts
├── utils/
│   ├── scoring.ts
│   └── formatting.ts
└── App.tsx
```
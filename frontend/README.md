frontend/
│
├── src/
│   ├── api/              # All backend API calls
│   │   ├── authApi.js
│   │   ├── quizApi.js
│   │   └── httpClient.js
│   │
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Button.jsx
│   │   ├── QuizCard.jsx
│   │   └── Loader.jsx
│   │
│   ├── pages/            # Route-level pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── QuizList.jsx
│   │   ├── QuizPlay.jsx
│   │   └── Profile.jsx
│   │
│   ├── layouts/          # Page layouts
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   ├── store/            # Global state (Context / Redux / Zustand)
│   │   └── authStore.js
│   │
│   ├── routes/           # Route definitions
│   │   └── AppRoutes.jsx
│   │
│   ├── styles/           # Global styles / themes
│   │   └── theme.css
│   │
│   ├── utils/            # Helpers
│   │   └── validators.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
└── package.json


1️⃣ Pages (What screens does Quizlly have?)

For v1 (clean + impressive), we’ll build these:

/               → Home
/login          → Login
/register       → Register
/quizzes        → Quiz List
/quizzes/:id    → Quiz Play
/profile        → User Profile


2️⃣ Home Page UI (Home.jsx)
Purpose

First impression

Explain what Quizlly is

Push user to login / start quiz

Layout (Top → Bottom)

┌─────────────────────────────┐
│ Navbar                      │
│  Logo | Quizzes | Login     │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Hero Section                │
│ "Learn Faster. Quiz Smarter"│
│ [ Get Started ] [ Login ]   │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Featured Quizzes            │
│ [ QuizCard ][ QuizCard ]    │
│ [ QuizCard ][ QuizCard ]    │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Footer                      │
└─────────────────────────────┘

Components used

Navbar

HeroSection

QuizCard

Footer

3️⃣ Quiz Card Component (QuizCard.jsx)

This is IMPORTANT — recruiters love reusable components.

Visual Structure

┌─────────────────────────┐
│ Quiz Title              │
│ Short description       │
│ Difficulty: Easy        │
│ ⏱ 10 Questions          │
│ [ Start Quiz ]          │
└─────────────────────────┘

props

<QuizCard
  title="Java Basics"
  description="Test your core Java skills"
  difficulty="Easy"
  totalQuestions={10}
/>


4️⃣ Quiz List Page (QuizList.jsx)
Purpose

Show all quizzes

Filter/search later

Layout

┌──────── Filter Bar ────────┐
│ Difficulty | Search        │
└───────────────────────────┘

┌───────────────────────────┐
│ QuizCard  QuizCard        │
│ QuizCard  QuizCard        │
│ QuizCard  QuizCard        │
└───────────────────────────┘

Components:

FilterBar

QuizCard

5️⃣ Quiz Play Page (QuizPlay.jsx)

This is the core product screen.

Layout

┌───────────────────────────┐
│ Quiz Title                │
│ Question 3 / 10           │
└───────────────────────────┘

┌───────────────────────────┐
│ Question Text             │
│                           │
│ ( ) Option A              │
│ ( ) Option B              │
│ ( ) Option C              │
│ ( ) Option D              │
└───────────────────────────┘

┌───────────────────────────┐
│ [ Previous ] [ Next ]     │
└───────────────────────────┘

Components:

QuestionCard

Option

QuizProgress

6️⃣ Login & Register Pages
Shared Layout (AuthLayout.jsx)

┌───────────────────────────┐
│ Quizlly Logo              │
│                           │
│ Email                     │
│ Password                  │
│ [ Login ]                 │
│                           │
│ New user? Register        │
└───────────────────────────┘

Components:

Input

Button

AuthForm

7️⃣ Profile Page (Profile.jsx)
Purpose

Show user info

Quiz history later

┌───────────────────────────┐
│ User Info Card            │
│ Name | Email              │
└───────────────────────────┘

┌───────────────────────────┐
│ Attempted Quizzes         │
│ Score | Date              │
└───────────────────────────┘


8️⃣ Layout Architecture
MainLayout.jsx

Used for most pages

<Navbar />
<Outlet />   ← Page content
<Footer />

AuthLayout.jsx

Used for login/register only

<CenteredCard>
  <Outlet />
</CenteredCard>


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ContentInputPage from './pages/ContentInputPage';
import ConceptReviewPage from './pages/ConceptReviewPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages (optional for now, but good to plan ahead)
// import LoginPage from './pages/auth/LoginPage';
// import RegisterPage from './pages/auth/RegisterPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            {/* Home & Content Flow */}
            <Route path="/" element={<HomePage />} />
            <Route path="/input" element={<ContentInputPage />} />
            <Route path="/content/:contentId/concepts" element={<ConceptReviewPage />} />
            
            {/* Quiz Flow */}
            <Route path="/quiz/:contentId" element={<QuizPage />} />
            <Route path="/quiz/:attemptId/results" element={<ResultsPage />} />
            
            {/* User Analytics */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            
            {/* Auth Routes (uncomment when implementing) */}
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> */}
            
            {/* 404 & Redirects */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
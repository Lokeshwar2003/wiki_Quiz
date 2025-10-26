import { useState } from 'react';
import GenerateQuizTab from './components/GenerateQuizTab';
import HistoryTab from './components/HistoryTab';
import QuizComponent from './components/QuizComponent';
import { getQuiz } from './api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const handleQuizGenerated = (quiz) => {
    setCurrentQuiz(quiz);
  };

  const handleQuizSelect = async (quizId) => {
    try {
      const quiz = await getQuiz(quizId);
      setCurrentQuiz(quiz);
    } catch (error) {
      console.error('Error loading quiz:', error);
    }
  };

  const renderContent = () => {
    if (currentQuiz) {
      return (
        <div>
          <button
            onClick={() => setCurrentQuiz(null)}
            className="btn btn-outline-secondary mb-3"
          >
            ← Back
          </button>
          <QuizComponent quiz={currentQuiz} />
        </div>
      );
    }

    return (
      <div>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              onClick={() => setActiveTab('generate')}
              className={`nav-link ${activeTab === 'generate' ? 'active' : ''}`}
            >
              Generate Quiz
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab('history')}
              className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            >
              History
            </button>
          </li>
        </ul>

        {activeTab === 'generate' ? (
          <GenerateQuizTab onQuizGenerated={handleQuizGenerated} />
        ) : (
          <HistoryTab onQuizSelect={handleQuizSelect} />
        )}
      </div>
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-journal-bookmark me-2" viewBox="0 0 16 16">
              <path d="M6 8V1h1v6.5L8 7.5l1 1V1h1v7l.5-.5L12 8v6H4V8l.5.5L6 8z"/>
              <path d="M3 0h8a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a2 2 0 0 1-2-2V2A2 2 0 0 1 3 0z"/>
            </svg>
            Wiki Quiz
          </a>
          <div className="ms-auto d-none d-lg-block text-muted small">Generate quizzes from Wikipedia articles</div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9 col-md-10">
            <div className="bg-white shadow rounded p-4">
              {renderContent()}
            </div>
            <footer className="text-center text-muted mt-4 small">
              Built with Bootstrap · Local dev only
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

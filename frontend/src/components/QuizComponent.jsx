import { useState } from 'react';

export default function QuizComponent({ quiz }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    if (!quiz || !quiz.questions) return null;

    const questions = JSON.parse(quiz.questions);
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: answer
        });
    };

    const calculateScore = () => {
        let score = 0;
        Object.keys(selectedAnswers).forEach(questionIndex => {
            if (selectedAnswers[questionIndex] === questions[questionIndex].correct_answer) {
                score++;
            }
        });
        return score;
    };

    const isQuizComplete = Object.keys(selectedAnswers).length === questions.length;

    return (
        <div className="container py-4">
            <h2 className="h2 mb-4">{quiz.topic}</h2>
            
            {!showResults ? (
                <div>
                    <div className="mb-4">
                        <p className="h5 mb-3">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </p>
                        <p className="lead">{currentQuestion.question}</p>
                    </div>

                    <div className="d-grid gap-2">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                className={`btn btn-outline-primary text-start ${
                                    selectedAnswers[currentQuestionIndex] === option
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            disabled={currentQuestionIndex === 0}
                            className="btn btn-secondary"
                        >
                            Previous
                        </button>
                        
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button
                                onClick={() => setShowResults(true)}
                                disabled={!isQuizComplete}
                                className="btn btn-primary"
                            >
                                Show Results
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                disabled={!selectedAnswers[currentQuestionIndex]}
                                className="btn btn-primary"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="h3 mb-4">Quiz Results</h3>
                    <p className="lead mb-4">
                        Your score: {calculateScore()} out of {questions.length}
                    </p>
                    
                    {questions.map((question, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <p className="card-text mb-2">{question.question}</p>
                                <p className="text-success">
                                    Correct answer: {question.correct_answer}
                                </p>
                                <p className={
                                    selectedAnswers[index] === question.correct_answer
                                        ? 'text-success'
                                        : 'text-danger'
                                }>
                                    Your answer: {selectedAnswers[index]}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    <button
                        onClick={() => {
                            setShowResults(false);
                            setCurrentQuestionIndex(0);
                            setSelectedAnswers({});
                        }}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}
import { useState, useEffect } from 'react';
import { getQuizHistory } from '../api';

export default function HistoryTab({ onQuizSelect }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const quizzes = await getQuizHistory();
            setHistory(quizzes);
        } catch (err) {
            setError('Failed to load quiz history');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-4">Loading history...</div>;
    if (error) return <div className="p-4 text-danger">{error}</div>;

    return (
        <div className="p-3">
            <h2 className="h4 mb-4">Quiz History</h2>
            {history.length === 0 ? (
                <div className="alert alert-info">No quizzes generated yet</div>
            ) : (
                <div className="row g-3">
                    {history.map((quiz) => (
                        <div className="col-12" key={quiz.id}>
                            <div className="card shadow-sm">
                                <div className="card-body d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="card-title mb-1">{quiz.topic}</h5>
                                        <p className="mb-0 text-muted small">Questions: {quiz.questions ? JSON.parse(quiz.questions).length : '—'}</p>
                                        <p className="mb-0 text-muted small">Created: {new Date(quiz.created_at).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <button className="btn btn-outline-primary btn-sm" onClick={() => onQuizSelect(quiz.id)}>View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import { useState } from 'react';
import { generateQuiz } from '../api';

export default function GenerateQuizTab({ onQuizGenerated }) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const quiz = await generateQuiz(url);
            onQuizGenerated(quiz);
            setUrl('');
        } catch (err) {
            setError('Failed to generate quiz. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3">
            <div className="card">
                <div className="card-body">
                    <h2 className="h5 mb-3">Generate a Quiz</h2>
                    <p className="text-muted small">Paste a Wikipedia article URL and we'll create multiple-choice questions for you.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="wikiUrl" className="form-label">
                                Wikipedia URL
                            </label>
                            <input
                                type="url"
                                id="wikiUrl"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://en.wikipedia.org/wiki/Artificial_intelligence"
                                required
                                className="form-control"
                            />
                        </div>
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-100"
                        >
                            {loading ? (
                                <span className="d-inline-flex align-items-center">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Generating...
                                </span>
                            ) : (
                                'Generate Quiz'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
const API_BASE_URL = 'http://localhost:8000';

export const generateQuiz = async (url) => {
    try {
        const response = await fetch(`${API_BASE_URL}/generate_quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        if (!response.ok) throw new Error('Failed to generate quiz');
        return await response.json();
    } catch (error) {
        console.error('Error generating quiz:', error);
        throw error;
    }
};

export const getQuizHistory = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/history`);
        if (!response.ok) throw new Error('Failed to fetch quiz history');
        return await response.json();
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        throw error;
    }
};

export const getQuiz = async (quizId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`);
        if (!response.ok) throw new Error('Failed to fetch quiz');
        return await response.json();
    } catch (error) {
        console.error('Error fetching quiz:', error);
        throw error;
    }
};
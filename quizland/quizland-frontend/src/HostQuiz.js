import React, { useState } from 'react';
import './css/QuizForm.css';

function QuizForm() {
    const [hostEmail, setHostEmail] = useState('');
    const [quizName, setQuizName] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState([{ optionText: '', correct: false }]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index].optionText = value;
        setOptions(updatedOptions);
    };

    const handleCorrectChange = (index) => {
        const updatedOptions = [...options];
        updatedOptions[index].correct = !updatedOptions[index].correct;
        setOptions(updatedOptions);
    };

    const addOption = () => {
        setOptions([...options, { optionText: '', correct: false }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const quizData = {
            hostEmail,
            quizName,
            questions: [
                {
                    questionText,
                    options,
                },
            ],
        };
        try {
            const response = await fetch('http://localhost:8080/api/quiz/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData),
            });

            if (response.ok) {
                console.log('Quiz created successfully!');
                // Reset form fields or show a success message
            } else {
                console.error('Error creating quiz');
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };
    return (
        <div>
            <h2>Create Quiz</h2>
            <form onSubmit={handleSubmit}>
                {/* Host Email */}
                <label>Host Email:</label>
                <input
                    type="text"
                    value={hostEmail}
                    onChange={(e) => setHostEmail(e.target.value)}
                />

                {/* Quiz Name */}
                <label>Quiz Name:</label>
                <input
                    type="text"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                />

                {/* Question */}
                <label>Question:</label>
                <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                />

                {/* Options */}
                {options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={option.optionText}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <label>
                            Correct:
                            <input
                                type="checkbox"
                                checked={option.correct}
                                onChange={() => handleCorrectChange(index)}
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={addOption}>
                    Add Option
                </button>

                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
}

export default QuizForm;
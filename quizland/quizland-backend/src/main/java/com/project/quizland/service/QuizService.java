package com.project.quizland.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.quizland.entity.Question;
import com.project.quizland.entity.Quiz;
import com.project.quizland.entity.QuizOption;
import com.project.quizland.repository.QuestionRepository;
import com.project.quizland.repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizService quizOptionRepository;

    public Quiz createQuiz(Quiz quiz) {
        Quiz savedQuiz = quizRepository.save(quiz);

        // Iterate through questions and options and save them
        for (Question question : quiz.getQuestions()) {
            question.setHostEmail(savedQuiz.getHostEmail());
            question.setQuizName(savedQuiz.getQuizName());

            Question savedQuestion = questionRepository.save(question);

            for (QuizOption option : question.getQuizOptions()) {
                option.setHostEmail(savedQuestion.getHostEmail());
                option.setQuizName(savedQuestion.getQuizName());
                option.setQuestion(savedQuestion);

                quizOptionRepository.save(option);
            }
        }

        return savedQuiz;
    }
}
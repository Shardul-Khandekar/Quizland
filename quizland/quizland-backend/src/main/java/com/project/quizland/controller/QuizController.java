package com.project.quizland.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.quizland.entity.Quiz;
import com.project.quizland.service.QuizService;

@RestController
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/api/quiz/create")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }
}

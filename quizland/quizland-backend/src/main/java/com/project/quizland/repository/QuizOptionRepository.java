package com.project.quizland.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.quizland.entity.QuizOption;

@Repository
public interface QuizOptionRepository extends JpaRepository<QuizOption, Long> {
}

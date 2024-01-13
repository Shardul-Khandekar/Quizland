package com.project.quizland;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class QuizlandApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizlandApplication.class, args);
	}

}

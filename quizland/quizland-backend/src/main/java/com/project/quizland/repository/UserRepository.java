package com.project.quizland.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.repository.CrudRepository;

import com.project.quizland.entity.User;

@Configuration
public interface UserRepository extends CrudRepository<User, String> {

	User findByEmail(String email);

}
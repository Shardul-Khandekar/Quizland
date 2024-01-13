package com.project.quizland.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.quizland.entity.User;
import com.project.quizland.repository.UserRepository;
import com.project.quizland.security.PasswordService;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
    @Autowired
    private PasswordService passwordService;

	public User createUser(User user) {
		return userRepository.save(user);
	}

	public boolean validateLogin(String email, String plainPassword) {
		User user = userRepository.findByEmail(email);
		
		if(user != null) {
			return passwordService.isPasswordValid(plainPassword, user.getPassword());
		} else {
			return false;
		}
	}

}

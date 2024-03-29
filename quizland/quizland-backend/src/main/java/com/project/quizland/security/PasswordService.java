package com.project.quizland.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public String encryptPassword(String plainPassword) {
		return passwordEncoder.encode(plainPassword);
	}

	public boolean isPasswordValid(String plainPassword, String hashedPassword) {
		return passwordEncoder.matches(plainPassword, hashedPassword);
	}

}

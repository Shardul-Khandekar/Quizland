package com.project.quizland.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.project.quizland.dto.LoginRequest;
import com.project.quizland.entity.LoginResponse;
import com.project.quizland.entity.User;
import com.project.quizland.security.JwtTokenUtil;
import com.project.quizland.security.PasswordService;
import com.project.quizland.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordService passwordService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@PostMapping("/api/users/register")
	public User createUser(@RequestBody User request) {
		// Encrypt the password and store it in the database
		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());

		String encryptedPassword = passwordService.encryptPassword(request.getPassword());
		user.setPassword(encryptedPassword);
		return userService.createUser(user);
	}

	@PostMapping(path = "/api/users/login")
	public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {

		boolean isValid = userService.validateLogin(request.getEmail(), request.getPassword());

		if (isValid) {
			String token = jwtTokenUtil.generateToken(request.getEmail());
			return ResponseEntity.ok().body(new LoginResponse(token, request.getEmail()));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}

	@GetMapping("/api/users/secured")
	public ResponseEntity<String> securedAPI(@RequestHeader("Authorization") String authorizationHeader) {
		String token = authorizationHeader.replace("Bearer ", "");
		String email = jwtTokenUtil.extractEmail(token);
		System.out.print(token);
		boolean isValid = jwtTokenUtil.validateToken(token, email);
		return isValid ? ResponseEntity.ok("Validation Successful")
				: ResponseEntity.badRequest().body("Validation Failed");
	}

}
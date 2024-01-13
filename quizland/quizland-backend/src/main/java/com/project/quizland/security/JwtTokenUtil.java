package com.project.quizland.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Configuration
public class JwtTokenUtil {

	private final String secret = "quizland";
	private final long expirationTimeMillis = 3600000;

	public String generateToken(String email) {
		Map<String, Object> claims = new HashMap<>();
		return Jwts.builder().setClaims(claims).setSubject(email).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expirationTimeMillis))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
	}

	// Validate JWT token
	public Boolean validateToken(String token, String email) {
		final String tokenUsername = extractEmail(token);
		return (tokenUsername.equals(email) && !isTokenExpired(token));
	}

	// Extract claims from JWT token
	public Claims extractClaims(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	// Extract email from JWT token
	public String extractEmail(String token) {
		return extractClaims(token).getSubject();
	}

	// Check if JWT token is expired
	private Boolean isTokenExpired(String token) {
		final Date expiration = extractClaims(token).getExpiration();
		return expiration.before(new Date());
	}

}

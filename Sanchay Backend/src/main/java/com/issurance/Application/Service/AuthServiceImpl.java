package com.issurance.Application.Service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.issurance.Application.Payload.LoginDto;
import com.issurance.Application.Security.JwtTokenProvider;
import com.issurance.Application.repository.UserInfoRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
public class AuthServiceImpl implements AuthService{

	private AuthenticationManager authenticationManager;
	private UserInfoRepo userRepo;
	private JwtTokenProvider jwtTokenProvider;
	private PasswordEncoder passwordEncoder;
	
	
	
	public AuthServiceImpl(AuthenticationManager authenticationManager, UserInfoRepo userRepo,
			JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
		super();
		this.authenticationManager = authenticationManager;
		this.userRepo = userRepo;
		this.jwtTokenProvider = jwtTokenProvider;
		this.passwordEncoder = passwordEncoder;
	}


	
	@Override
	public String login(LoginDto loginDto) {
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token=jwtTokenProvider.generateToken(authentication);
		return token;
	}



	@Override
	public String getRoleFromToken(String token) {
		 try {
	            Claims claims = jwtTokenProvider.decodeJwtToken(token);
	            // You can access the claims from the token
//	            System.out.println(claims.get("role", String.class));
	            String role =claims.get("role", String.class);
	            System.out.println(claims.get("role"));
	            return role;
	        } catch (JwtException e) {
	            return e.getMessage();
	        }
	}

	
	
	
}

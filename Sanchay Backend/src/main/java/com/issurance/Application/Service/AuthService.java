package com.issurance.Application.Service;

import com.issurance.Application.Payload.LoginDto;

public interface AuthService {
	
	String login(LoginDto loginDto);
	
	public String getRoleFromToken(String token);
}

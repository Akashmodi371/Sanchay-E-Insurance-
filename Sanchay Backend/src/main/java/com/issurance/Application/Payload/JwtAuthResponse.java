package com.issurance.Application.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Setter
@Getter
public class JwtAuthResponse {

	
	private String accessToken;
	
	private String tokenType="Bearer";
	
	private String rolename;

	
	private int accessid;
}

package com.issurance.Application.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserInfoDto {

	private int userid;
    private String username;
    private String password;
    private RoleDto role;
	
	
}

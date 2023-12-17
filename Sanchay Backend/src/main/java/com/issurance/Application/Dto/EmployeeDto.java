package com.issurance.Application.Dto;

import java.util.List;

import com.issurance.Application.entities.Query;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class EmployeeDto {
		
	private int employeeid;
    private String firstname;
    private String lastname;
    private String email;
    private UserInfoDto userInfo;
    private List<QueryDto> repliedQueries;
}

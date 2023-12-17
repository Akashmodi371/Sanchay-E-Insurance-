package com.issurance.Application.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class QueryDto {
		
	private int queryid;
    private String title;
    private String messagequery;
    private String replyquery;
    private String status;
    private CustomerDto customer;
    private EmployeeDto employee;
    private AdminDto admin;
}

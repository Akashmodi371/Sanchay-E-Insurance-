package com.issurance.Application.Dto;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.issurance.Application.entities.Policy;
import com.issurance.Application.entities.UserInfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CustomerDto {
	
	private int customerid;
    private String firstname;
    private String lastname;
    private String email;
    private String address;
    private String state;
    private String city;
    private int pincode;
    private long mobileno;
    private LocalDate birthdate;
    private String Username;
//    private UserInfo userInfo;
//    private List<AgentDto> agents;
//    private List<Policy> policies;
//    private List<QueryDto> queries;
//	
}

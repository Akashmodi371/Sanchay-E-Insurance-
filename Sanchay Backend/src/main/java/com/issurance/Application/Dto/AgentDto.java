package com.issurance.Application.Dto;

import java.time.LocalDate;
import java.util.List;

import com.issurance.Application.entities.Customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class AgentDto {
		
	private int agentid;
    private String firstname;
    private String lastname;
    private String email;
    private String mobileno;
    private String referencenumber;
    private double commission;
    private String username;
    private String status;
//    private List<CustomerDto> customers;
//    private List<WithdrawDto> withdraws;
//    private List<PolicyDto> policies;
}

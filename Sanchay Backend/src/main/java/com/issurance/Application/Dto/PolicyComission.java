package com.issurance.Application.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class PolicyComission {

	
	private int policynumber;
	private int customerid;
	private String customername;
	private double policycommission;
}

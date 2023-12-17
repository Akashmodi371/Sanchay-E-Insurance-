package com.issurance.Application.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class SchemeDto {
		
	private int schemeId;
    private String schemeName;
    private int minAge;
    private int maxAge;
    private int minAmount;
    private double maxAmount;
    private int minInvestTime;
    private int maxInvestTime;
    private double registrationCommission;
    private String description;
    private String documentsRequire;
    private String planname;
}

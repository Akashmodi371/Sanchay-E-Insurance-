package com.issurance.Application.Dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class ClaimDto {

	
	private int claimid;
    private Date claimdate;
    private double claimamount;
    private int policyid;
}

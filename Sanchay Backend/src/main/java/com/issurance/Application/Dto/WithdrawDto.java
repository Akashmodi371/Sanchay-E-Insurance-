package com.issurance.Application.Dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class WithdrawDto {
		
	private int withdrawid;
    private double withdrawamount;
    private Date date;
    private AgentDto agent;
}

package com.issurance.Application.Dto;

import java.sql.Date;

import com.issurance.Application.entities.Policy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class PaymentDto {

	private int paymentid;
	
	private Date paymentdate;
	
	private double amountpaid;
	
	private Policy policy;
}

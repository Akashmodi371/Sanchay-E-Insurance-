package com.issurance.Application.Service;

import org.springframework.http.ResponseEntity;

import com.issurance.Application.Dto.PaymentDto;
import com.issurance.Application.entities.Payment;

public interface PaymentService {

	
	public String addpayment(Payment payment,Integer policynumber);
}

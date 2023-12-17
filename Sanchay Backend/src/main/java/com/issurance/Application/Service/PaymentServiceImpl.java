package com.issurance.Application.Service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.issurance.Application.Dto.PaymentDto;
import com.issurance.Application.entities.Payment;
import com.issurance.Application.entities.Policy;
import com.issurance.Application.entities.StatusType;
import com.issurance.Application.exceptions.PolicyStatusIsPending;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.PaymentRepo;
import com.issurance.Application.repository.PolicyRepo;
import com.issurance.Application.repository.RoleRepo;
import com.issurance.Application.repository.UserInfoRepo;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@RequiredArgsConstructor
@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService{
	
	
	
	private static final Logger log = LoggerFactory.getLogger(PaymentServiceImpl.class);

	
	@Autowired
	private PaymentRepo paymentRepo;
	
	@Autowired
	private PolicyRepo policyRepo;
	
	@Transactional
	@Override
	public String addpayment(Payment payment,Integer policynumber) {
		
		Optional<Policy> policy=policyRepo.findById(policynumber);
		
		Policy policy2=null;
		
		if(policy.isPresent() && policy.get().getStatus()==StatusType.VERIFIED) {
			policy2=policy.get();
			
			payment.setPolicy(policy2);
			
			paymentRepo.save(payment);
			
			log.info("payment done successfully");
			
			return "payment successfull";
		}
		else {
			throw new PolicyStatusIsPending("Wait for verification");
		}
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
}

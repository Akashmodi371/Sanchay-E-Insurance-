package com.issurance.Application.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Service.PaymentService;
import com.issurance.Application.entities.Payment;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("paymentapp")
@Slf4j
public class PaymentController {

	
	private static final Logger log = LoggerFactory.getLogger(PaymentController.class);

	@Autowired
	private PaymentService paymentService;
	
	
	@PostMapping("/addpayment/{policynumber}")
	public ResponseEntity<String> addnewpayment(@RequestBody Payment payment, @PathVariable(name="policynumber") Integer policynumber){
		
		String response= paymentService.addpayment(payment,policynumber);
		
		log.info("payment done successfull");
		
		return new ResponseEntity(response,HttpStatus.OK); 
		
	}
	
	
}

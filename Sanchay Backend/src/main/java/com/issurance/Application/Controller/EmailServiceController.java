package com.issurance.Application.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.EmailDto;
import com.issurance.Application.Service.EmailService;



@RestController
@RequestMapping("/mailapp")
public class EmailServiceController {

	@Autowired
	private EmailService service;
	
	@PostMapping("/")
	public ResponseEntity<String> sendMail(@RequestBody EmailDto emailDto) {
		return service.sendEmail(emailDto);
	}
	
}

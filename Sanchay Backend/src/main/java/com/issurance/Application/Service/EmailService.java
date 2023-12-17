package com.issurance.Application.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.issurance.Application.Dto.EmailDto;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;
	
	public ResponseEntity<String> sendEmail(EmailDto emailDto) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setTo(emailDto.getToemail());
		message.setText(emailDto.getBody());
		message.setSubject(emailDto.getSubject());
		
		mailSender.send(message);
		String response="Message Sent Successfully To : "+emailDto.getToemail();
		
		return ResponseEntity.ok(response);
	}

	
	
}
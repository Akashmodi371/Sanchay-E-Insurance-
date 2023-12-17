package com.issurance.Application.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Service.AuthService;

@RequestMapping("/auth")
@RestController
public class AuthController {
	
	
	
	@Autowired
	private AuthService authService;
	
	
	@GetMapping("/getrole")
    public ResponseEntity<String> getRoleFromToken(@RequestParam(name="token") String token) {
    	String roleName=authService.getRoleFromToken(token);
    	return new ResponseEntity(roleName,HttpStatus.OK);
    }
	
	
	
}

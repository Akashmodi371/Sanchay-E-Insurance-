package com.issurance.Application.Controller;

import java.util.Optional;

import org.hibernate.bytecode.internal.bytebuddy.PrivateAccessorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Payload.JwtAuthResponse;
import com.issurance.Application.Payload.LoginDto;
import com.issurance.Application.Service.AuthService;
import com.issurance.Application.entities.Admin;
import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Employee;
import com.issurance.Application.entities.Role;
import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.repository.AdminRepo;
import com.issurance.Application.repository.AgentRepo;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.EmployeeRepo;
import com.issurance.Application.repository.UserInfoRepo;


import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("userinfoapp")
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
public class UserInfoController {

	
	private static final Logger log = LoggerFactory.getLogger(UserInfoController.class);
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private AgentRepo agentRepo;
	
	@Autowired
	private AdminRepo adminRepo;
	
	
	
	@PostMapping(value = {"/login","/signin"})
	public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
		String token = authService.login(loginDto);
		
		JwtAuthResponse jwtAuthResponse=new JwtAuthResponse();
		jwtAuthResponse.setAccessToken(token);
		
		log.info("Signing with username"+loginDto.getUsername());
		
		String rolename;
		int roleid;
		String username=loginDto.getUsername();
		System.out.println(username);
		Optional<UserInfo> userInfo=userInfoRepo.findByUsername(username);
		if(userInfo.isPresent()) {
			Role role=userInfo.get().getRole();
			rolename=role.getRolename();
			roleid=role.getRoleid();
			System.out.println(roleid);
			System.out.println(rolename);
			jwtAuthResponse.setRolename(rolename);
			if(roleid==1) {
				Customer customer2=customerRepo.findByUserInfo(userInfo.get());
				int cid=customer2.getCustomerid();
				jwtAuthResponse.setAccessid(cid);
			}
			else if(roleid==4) {
				Employee employee=employeeRepo.findByUserInfo(userInfo.get());
				int employeeid=employee.getEmployeeid();

				jwtAuthResponse.setAccessid(employeeid);
			}
			else if(roleid==2) {
				Admin admin=adminRepo.findByUserInfo(userInfo.get());
				int adminid=admin.getAdminid();
				jwtAuthResponse.setAccessid(adminid);
			}
			else if(roleid==3) {
				Agent agent=agentRepo.findByUserInfo(userInfo.get());
				int agenid=agent.getAgentid();
				jwtAuthResponse.setAccessid(agenid);
			}
			
		}
		return new ResponseEntity<>(jwtAuthResponse,HttpStatus.OK);
	}
	
}

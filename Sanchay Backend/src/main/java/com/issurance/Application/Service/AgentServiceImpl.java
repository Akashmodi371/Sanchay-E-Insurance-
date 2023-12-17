package com.issurance.Application.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.entities.Admin;
import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Employee;
import com.issurance.Application.entities.Role;
import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.exceptions.EmailIdAlreadyExist;
import com.issurance.Application.exceptions.InsufficentCommission;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.exceptions.UserNameAlreadyExist;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.AgentRepo;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.EmployeeRepo;
import com.issurance.Application.repository.RoleRepo;
import com.issurance.Application.repository.UserInfoRepo;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Slf4j
public class AgentServiceImpl implements AgentService{
	
	
	
	private static final Logger log = LoggerFactory.getLogger(AgentServiceImpl.class);

	@Autowired
	private AgentRepo agentRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
	
	private PasswordEncoder passwordEncoder;
	
	@Override
	public void registerAgent(Agent agent) {
		
		
		ValidatingData validatingData=new ValidatingData();
		
		if(!validatingData.validateName(agent.getFirstname())) {
			throw new ValidationDataException("FirstName should containt only characters");
		}
		if(!validatingData.validateName(agent.getLastname())) {
			throw new ValidationDataException("LastName should containt only characters");
		}
		if(!validatingData.validateUsername(agent.getUserInfo().getUsername())) {
			throw new ValidationDataException("username start with character and no special character should contain");
		}
		if(!validatingData.validateEmail(agent.getEmail())) {
			throw new ValidationDataException("Email is not in proper formate");
		}
		
		
//		if(!validatingData.validateBirthdate(customer.getBirthdate())) {
//			throw new UserApiException(HttpStatus.NOT_ACCEPTABLE, "pincode must be a number of length 6");
//		}
		
		if(!validatingData.validateMobileNumber(agent.getMobileno())) {
			throw new UserApiException(HttpStatus.NOT_ACCEPTABLE, "mobile number should 10 digit");
		}
		
//		if(!validatingData.validateName(customer.())) {
//			throw new UserApiException(HttpStatus.NOT_ACCEPTABLE, "pincode must be a number of length 6");
//		}
		
		if(!validatingData.validatePassword(agent.getUserInfo().getPassword())) {
			throw new ValidationDataException("Password should be of 8 length and must contain lowerCase,"
					+ " UpperCase, Number and special character");
		}
		
		List<String> allEmails = new ArrayList<>();

		allEmails.addAll(employeeRepo.findAll().stream().map(Employee::getEmail).collect(Collectors.toList()));
		allEmails.addAll(agentRepo.findAll().stream().map(Agent::getEmail).collect(Collectors.toList()));
		allEmails.addAll(customerRepo.findAll().stream().map(Customer::getEmail).collect(Collectors.toList()));

		if (allEmails.contains(agent.getEmail())) {
		    throw new EmailIdAlreadyExist("Email already Exists");
		}
		
		List<String> allUserName=new ArrayList<>();
		List<UserInfo> users=userInfoRepo.findAll();
		
		for(UserInfo user:users) {
			allUserName.add(user.getUsername());
		}
		
		if(allUserName.contains(agent.getUserInfo().getUsername())) {
			throw new UserNameAlreadyExist("User Name Exists");
		}
		
		Optional<Role> role=roleRepo.findById(3);
		
		Role role2=null;
		
		if(role.isPresent()) {
			role2=role.get();
			agent.getUserInfo().setRole(role2);
		}
		else {
			agent.getUserInfo().setRole(null);
		}
		
		String pass=agent.getUserInfo().getPassword();
		
		agent.getUserInfo().setPassword(passwordEncoder.encode(pass));
		
		agentRepo.save(agent);
		
		log.info("Agent "+ agent +"is added Successfully");
		
	}

	@Override
	public String addCommission(Integer agentid, double commission) {
		
		Optional<Agent> admin=agentRepo.findById(agentid);
		
		Admin admin2=null;
		
		if(admin.isPresent()) {
			admin.get().setCommission(commission+admin.get().getCommission());
			
			agentRepo.save(admin.get());
		}
		
		return "commission added successfully";
	}

	@Override
	public double getCommisionbyid(int adminid) {
		
		Optional<Agent> agent=agentRepo.findById(adminid);
		
		double commssion=0;
		
		if(agent.isPresent()) {
			commssion=agent.get().getCommission();
		}
		
		return commssion;
	}

	@Override
	public ResponseEntity<String> withdrawamount(double amount, int agentid) {
		
		Optional<Agent> agent=agentRepo.findById(agentid);
		
		Agent agent2=null;
		
		if(agent.isPresent()) {
			agent2=agent.get();
			double existingcommision=agent2.getCommission();
			if(existingcommision>=amount) {
				double remaining=existingcommision-amount;
				agent.get().setCommission(remaining);
				agentRepo.save(agent.get());
				
				return new ResponseEntity("Amount Successfully WIthdrawn",HttpStatus.OK);
			}
			else {
				throw new InsufficentCommission("Insufficient amount for withdraw");
			}
		}
		
		return new ResponseEntity("Agent not exists",HttpStatus.NOT_FOUND);
	}

}

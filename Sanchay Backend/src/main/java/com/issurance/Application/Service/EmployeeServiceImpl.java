package com.issurance.Application.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Employee;
import com.issurance.Application.entities.Role;
import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.exceptions.EmailIdAlreadyExist;
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
@Slf4j
@Service
public class EmployeeServiceImpl implements EmployeeService{

	
	private static final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	

	@Autowired
	private AgentRepo agentRepo;
	
	private PasswordEncoder passwordEncoder;
	
	@Transactional
	@Override
	public void registeremployee(Employee employee) {
		
		
		ValidatingData validatingData=new ValidatingData();
		
		if(!validatingData.validateName(employee.getFirstname())) {
			throw new ValidationDataException("FirstName should containt only characters");
		}
		if(!validatingData.validateName(employee.getLastname())) {
			throw new ValidationDataException("LastName should containt only characters");
		}
		if(!validatingData.validateUsername(employee.getUserInfo().getUsername())) {
			throw new ValidationDataException("username start with character and no special character should contain");
		}
		if(!validatingData.validateEmail(employee.getEmail())) {
			throw new ValidationDataException("Email is not in proper formate");
		}
		
		if(!validatingData.validatePassword(employee.getUserInfo().getPassword())) {
			throw new ValidationDataException("Password should be of 8 length and must contain lowerCase,"
					+ " UpperCase, Number and special character");
		}
		
		List<String> allEmails = new ArrayList<>();

		allEmails.addAll(employeeRepo.findAll().stream().map(Employee::getEmail).collect(Collectors.toList()));
		allEmails.addAll(agentRepo.findAll().stream().map(Agent::getEmail).collect(Collectors.toList()));
		allEmails.addAll(customerRepo.findAll().stream().map(Customer::getEmail).collect(Collectors.toList()));

		if (allEmails.contains(employee.getEmail())) {
		    throw new EmailIdAlreadyExist("Email already Exists");
		}
		
		List<String> allUserName=new ArrayList<>();
		List<UserInfo> users=userInfoRepo.findAll();
		
		for(UserInfo user:users) {
			allUserName.add(user.getUsername());
		}
		
		if(allUserName.contains(employee.getUserInfo().getUsername())) {
			throw new UserNameAlreadyExist("User Name Exists");
		}
		
		Optional<Role> role=roleRepo.findById(4);
		
		Role role2=null;
		
		if(role.isPresent()) {
			role2=role.get();
			employee.getUserInfo().setRole(role2);
		}
		else {
			employee.getUserInfo().setRole(null);
		}
		
		String pass=employee.getUserInfo().getPassword();
		
		employee.getUserInfo().setPassword(passwordEncoder.encode(pass));
		
		employeeRepo.save(employee);
		
		log.info("customer"+employee+"is added Successfully");
		
	}

}

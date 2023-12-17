package com.issurance.Application.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.validator.constraints.ISBN;
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
@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService{
	
	
	private static final Logger log = LoggerFactory.getLogger(CustomerServiceImpl.class);
	
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private AgentRepo agentRepo;
	
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
	
	private PasswordEncoder passwordEncoder;

	
	
	@Transactional
	@Override
	public void registerCustomer(Customer customer) {
		
		
		
		ValidatingData validatingData=new ValidatingData();
		if(customer.getFirstname().length()==0) {
			throw new ValidationDataException("FirstName required");
		}
		else if(!validatingData.validateName(customer.getFirstname())) {
			throw new ValidationDataException("FirstName should containt only characters");
		}
		if(customer.getLastname().length()==0) {
			throw new ValidationDataException("lastName required");
		}
		else if(!validatingData.validateName(customer.getLastname())) {
			throw new ValidationDataException("LastName should containt only characters");
		}
		if(customer.getUserInfo().getUsername().length()==0) {
			throw new ValidationDataException("User Name required");
		}
		else if(!validatingData.validateUsername(customer.getUserInfo().getUsername())) {
			throw new ValidationDataException("username start with character and no special character should contain");
		}
		if(customer.getEmail().length()==0) {
			throw new ValidationDataException("Email required");
		}
		else if(!validatingData.validateEmail(customer.getEmail())) {
			throw new ValidationDataException("Email is not in proper formate");
		}
		if(!validatingData.validateAddress(customer.getAddress())) {
			throw new ValidationDataException("address contains only character and number");
		}
		if(!validatingData.validateName(customer.getCity())) {
			throw new ValidationDataException("City should contains only characters");
		}
		if(!validatingData.validateName(customer.getState())) {
			throw new ValidationDataException("state should contains only characters");
		}
//		if (String.valueOf(customer.getPincode())!=null || String.valueOf(customer.getPincode()).length() != 6) {
//		    throw new ValidationDataException("Pincode must be exactly 6 digits");
//		}
//		if(!validatingData.validatePassword(customer.getUserInfo().getPassword())) {
//			throw new ValidationDataException("Password contains at least 8 length and contain lowerCase,"
//					+ " UpperCase, Number and special character");
//		}
		
		
		
		
		List<String> allEmails = new ArrayList<>();

		allEmails.addAll(employeeRepo.findAll().stream().map(Employee::getEmail).collect(Collectors.toList()));
		allEmails.addAll(agentRepo.findAll().stream().map(Agent::getEmail).collect(Collectors.toList()));
		allEmails.addAll(customerRepo.findAll().stream().map(Customer::getEmail).collect(Collectors.toList()));

		if (allEmails.contains(customer.getEmail())) {
		    throw new EmailIdAlreadyExist("Email already Exists");
		}

		List<String> allUserName=new ArrayList<>();
		List<UserInfo> users=userInfoRepo.findAll();
		
		for(UserInfo user:users) {
			allUserName.add(user.getUsername());
		}
		
		if(allUserName.contains(customer.getUserInfo().getUsername())) {
			throw new UserNameAlreadyExist("User Name Exists");
		}
		Optional<Role> role=roleRepo.findById(1);
		
		Role role2=null;
		
		if(role.isPresent()) {
			role2=role.get();
			customer.getUserInfo().setRole(role2);
		}
		else {
			customer.getUserInfo().setRole(null);
		}
		
		String pass=customer.getUserInfo().getPassword();
		
		customer.getUserInfo().setPassword(passwordEncoder.encode(pass));
		
		customerRepo.save(customer);
		
		log.info("customer"+customer+"is added Successfully");	
	}
	
	
	

}

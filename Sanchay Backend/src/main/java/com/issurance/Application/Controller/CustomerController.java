package com.issurance.Application.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.CustomerDto;
import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.Service.CustomerService;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.UserInfoRepo;
import com.techlabs.bankapplication.exceptions.CustomerNotFoundExeception;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("customerapp")
@Slf4j
public class CustomerController {

	
	
	private static final Logger log = LoggerFactory.getLogger(CustomerController.class);
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
	
	
	//Register Customer
	@PostMapping("/register")
	public ResponseEntity<String>  addCustomer(@RequestBody Customer customer) {
		System.out.println("Customer Here!!");
		
		customerService.registerCustomer(customer);
		
		return new ResponseEntity<>("Customer Added Successfully",HttpStatus.OK);
	}
	
	
	//Get Customer By Id
	@GetMapping("/customer")
	public ResponseEntity<CustomerDto> getCustomer(@RequestParam(name="accessid") int cid){
		
		Optional<Customer> customer=customerRepo.findById(cid);
		Customer customer2=null;
		if(customer.isPresent()) {
			customer2=customer.get();
			CustomerDto customerDto=new CustomerDto();
			
			   customerDto.setCustomerid(customer2.getCustomerid());
		        customerDto.setFirstname(customer2.getFirstname());
		        customerDto.setLastname(customer2.getLastname());
		        customerDto.setEmail(customer2.getEmail());
		        customerDto.setAddress(customer2.getAddress());
		        customerDto.setState(customer2.getState());
		        customerDto.setCity(customer2.getCity());
		        customerDto.setPincode(customer2.getPincode());
		        customerDto.setMobileno(customer2.getMobileno());
		        customerDto.setBirthdate(customer2.getBirthdate());
		        customerDto.setUsername(customer2.getUserInfo().getUsername());
			return new ResponseEntity<>(customerDto,HttpStatus.OK);
		}
		throw new CustomerNotFoundExeception("No customer exists");
	}
	
	//Get All Customer
	@GetMapping("/customers")
	public ResponseEntity<List<CustomerDto>> getCustomers(){
		
		List<Customer> customers=customerRepo.findAll();
		
		List<CustomerDto> customerDtos=new ArrayList<>();
		
		for(Customer customer:customers) {
			CustomerDto customerDto=new CustomerDto();
			
			 customerDto.setCustomerid(customer.getCustomerid());
		        customerDto.setFirstname(customer.getFirstname());
		        customerDto.setLastname(customer.getLastname());
		        customerDto.setEmail(customer.getEmail());
		        customerDto.setAddress(customer.getAddress());
		        customerDto.setState(customer.getState());
		        customerDto.setCity(customer.getCity());
		        customerDto.setPincode(customer.getPincode());
		        customerDto.setMobileno(customer.getMobileno());
		        customerDto.setBirthdate(customer.getBirthdate());
		        customerDto.setUsername(customer.getUserInfo().getUsername());

		        customerDtos.add(customerDto);
		}
		
		return new ResponseEntity<>(customerDtos,HttpStatus.OK);
	}
	
	//Update Customer
	
	@PostMapping("/update/{customerid}")
	public ResponseEntity<String> updateCustomer(@PathVariable(name = "customerid") Integer cid ,@RequestBody Customer updatedCustomer){
		
		ValidatingData validatingData=new ValidatingData();
		
		if(!validatingData.validateName(updatedCustomer.getFirstname())) {
			throw new ValidationDataException("FirstName should containt only characters");
		}
		if(!validatingData.validateName(updatedCustomer.getLastname())) {
			throw new ValidationDataException("LastName should containt only characters");
		}
		if(!validatingData.validateUsername(updatedCustomer.getUserInfo().getUsername())) {
			throw new ValidationDataException("username start with character and no special character should contain");
		}
		if(!validatingData.validateEmail(updatedCustomer.getEmail())) {
			throw new ValidationDataException("Email is not in proper formate");
		}
//		if(!validatingData.validateAddress(updatedCustomer.getAddress())) {
//			throw new ValidationDataException("address contains only character and number");
//		}
		if(!validatingData.validateName(updatedCustomer.getCity())) {
			throw new ValidationDataException("City should contains only characters");
		}
		if(!validatingData.validateName(updatedCustomer.getState())) {
			throw new ValidationDataException("state should contains only characters");
		}
		if(!validatingData.validatePincode(updatedCustomer.getCity())) {
			throw new ValidationDataException("pincode must be a number of length 6");
		}
		
		if(!validatingData.validatePassword(updatedCustomer.getUserInfo().getPassword())) {
			throw new ValidationDataException("Password should be of 8 length and must contain lowerCase,"
					+ " UpperCase, Number and special character");
		}
		
		
		
		Optional<Customer> existingCustomer=customerRepo.findById(cid);
		
		if (existingCustomer == null) {
	        return ResponseEntity.notFound().build();
	    }
		
		updatedCustomer.setCustomerid(cid);
		ReflectionUtils.copyNonNullFields(updatedCustomer, existingCustomer.get());
		
		Customer savedCustomer = customerRepo.save(existingCustomer.get());
		
		return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
	}
	
	//Change Password
	@PostMapping("/changepassword/{customerid}/{oldpassword}/{newpassword}")
	public ResponseEntity<String> changePassword(@PathVariable(name = "customerid") Integer cid, 
			@PathVariable(name = "oldpassword") String oldpass, @PathVariable(name = "newpassword") String newpass){
		
		ValidatingData validatingData=new ValidatingData();
		
		
		if(!validatingData.validatePassword(newpass)) {
			throw new ValidationDataException("Password should be of 8 length and must contain lowerCase,"
					+ " UpperCase, Number and special character");
		}
		
		Optional<Customer> existingCustomer=customerRepo.findById(cid);
		
		if (existingCustomer == null) {
			return new ResponseEntity<>("Not exists",HttpStatus.NOT_FOUND);
	    }
		UserInfo userInfo=existingCustomer.get().getUserInfo();
		
		if(passwordEncoder.matches(oldpass, userInfo.getPassword())) {
			userInfo.setPassword(passwordEncoder.encode(newpass));
			userInfoRepo.save(userInfo);
			return new ResponseEntity<>("Password changed Successfully",HttpStatus.OK);
		}
		
		return new ResponseEntity<>("Password Not match",HttpStatus.NOT_ACCEPTABLE);
	}
	
	
	
	
}

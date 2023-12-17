package com.issurance.Application.Controller;

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

import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.Service.EmployeeService;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Employee;
import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.exceptions.EmployeeNotFoundException;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.EmployeeRepo;
import com.issurance.Application.repository.UserInfoRepo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("employeeapp")
@Slf4j
public class EmployeeController {

	
	private static final Logger log = LoggerFactory.getLogger(EmployeeController.class);

	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
		//Register Employees
		@PostMapping("/register")
		public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
			System.out.println("Employee Here!!");
			
			employeeService.registeremployee(employee);
			
			return new ResponseEntity<>("Employee Added Successfully",HttpStatus.OK);
		}
		
		
		//Get All Employees
		@GetMapping("/employees")
		public ResponseEntity<List<Employee>> getEmployees(){
			
			List<Employee> employees=employeeRepo.findAll();
			
			if(employees.size()==0) {
				throw new EmployeeNotFoundException("No Employee found");
			}
			
			return new ResponseEntity<>(employees,HttpStatus.OK);
		}
		
		
		//get by employeeid
		
		@GetMapping("/employee/{employeeid}")
		public ResponseEntity<Employee> getEmployee(@PathVariable(name="employeeid") int eid){
			
			Optional<Employee> employee=employeeRepo.findById(eid);
			Employee employee2=null;
			
			if(employee.isPresent()) {
				employee2=employee.get();
				return new ResponseEntity(employee2,HttpStatus.OK);
			}
			return new ResponseEntity(employee2,HttpStatus.NOT_FOUND);
		}
		
		
		
		
		@PostMapping("/update/{employeeid}")
		public ResponseEntity<String> updateEmployee(@PathVariable(name = "employeeid") Integer eid ,@RequestBody Employee updateemployee){
			
			ValidatingData validatingData=new ValidatingData();
			
			if(!validatingData.validateName(updateemployee.getFirstname())) {
				throw new ValidationDataException("FirstName should containt only characters");
			}
			if(!validatingData.validateName(updateemployee.getLastname())) {
				throw new ValidationDataException("LastName should containt only characters");
			}
			if(!validatingData.validateUsername(updateemployee.getUserInfo().getUsername())) {
				throw new ValidationDataException("username start with character and no special character should contain");
			}
			if(!validatingData.validateEmail(updateemployee.getEmail())) {
				throw new ValidationDataException("Email is not in proper formate");
			}
			
			
			
			Optional<Employee> existingemployee=employeeRepo.findById(eid);
			
			if (existingemployee == null) {
		        return ResponseEntity.notFound().build();
		    }
			
			updateemployee.setEmployeeid(eid);
			ReflectionUtils.copyNonNullFields(updateemployee, existingemployee.get());
			
			Employee savedemployee = employeeRepo.save(existingemployee.get());
			
			return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
		}
		
		
		@PostMapping("/changepassword/{employeeid}/{oldpassword}/{newpassword}")
		public ResponseEntity<String> changePassword(@PathVariable(name = "employeeid") Integer eid, 
				@PathVariable(name = "oldpassword") String oldpass, @PathVariable(name = "newpassword") String newpass){
			
			Optional<Employee> existingEmployee=employeeRepo.findById(eid);
			
			if (existingEmployee == null) {
				return new ResponseEntity<>("Not exists",HttpStatus.NOT_FOUND);
		    }
			UserInfo userInfo=existingEmployee.get().getUserInfo();
			
			if(passwordEncoder.matches(oldpass, userInfo.getPassword())) {
				userInfo.setPassword(passwordEncoder.encode(newpass));
				userInfoRepo.save(userInfo);
				return new ResponseEntity<>("Password changed Successfully",HttpStatus.OK);
			}
			
			return new ResponseEntity<>("Password Not match",HttpStatus.NOT_ACCEPTABLE);
		}
		
		
	
}

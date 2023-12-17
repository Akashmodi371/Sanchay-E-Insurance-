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
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.AdminDto;
import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.Service.AdminService;
import com.issurance.Application.Service.EmployeeService;
import com.issurance.Application.entities.Admin;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Employee;
import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.AdminRepo;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.EmployeeRepo;
import com.issurance.Application.repository.UserInfoRepo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("adminapp")
@Slf4j
public class AdminController {
	
	private static final Logger log = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	private AdminService adminService;
	
	@Autowired
	private AdminRepo adminRepo;
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
	
//Register admin
		@PostMapping("/register")
		public ResponseEntity<String> addAdmin(@RequestBody Admin admin) {
			System.out.println("Admin Here!!");
			
			adminService.registerAdmins(admin);
			
			return new ResponseEntity<>("Admin Added Successfully",HttpStatus.OK);
		}
		
		
//Get All Admins
		@GetMapping("/admins")
		public ResponseEntity<List<AdminDto>> getEmployees(){
			
			List<Admin> admins=adminRepo.findAll();
			
			List<AdminDto> adminDtos=new ArrayList<>();
			
			for(Admin admin:admins) {
				AdminDto adminDto=new AdminDto();
				adminDto.setAdminid(admin.getAdminid());
				adminDto.setAdminname(admin.getAdminname());
				adminDto.setUsername(admin.getUserInfo().getUsername());
				
				adminDtos.add(adminDto);
			}
			
			return new ResponseEntity(adminDtos,HttpStatus.OK);
		}

//Get Admin by id
		
		@GetMapping("/getadmin/{adminid}")
		public ResponseEntity<Admin> getadminbyid(@PathVariable(name="adminid") Integer adminid){
			
			
			Optional<Admin> admin=adminRepo.findById(adminid);
				if(admin.isPresent()) {
					return new ResponseEntity(admin.get(),HttpStatus.OK);
				}
				else {
					throw new UserApiException(HttpStatus.NOT_FOUND, "admin not exists");
				}
		}
		
		@PostMapping("/update/{adminid}")
		public ResponseEntity<String> updateAdminById(@PathVariable(name="adminid") Integer adminid,@RequestBody Admin updatedAdmin){
			
			ValidatingData validatingData=new ValidatingData();
			
			if(updatedAdmin.getAdminname()==null) {
				throw new ValidationDataException("Admin name is required");
			}
			
			if(!validatingData.validateName(updatedAdmin.getAdminname())) {
				throw new ValidationDataException("Admin Name should contains only characters");
			}
			
			
			Optional<Admin> existingAdmin=adminRepo.findById(adminid);
			
			if (existingAdmin == null) {
		        return ResponseEntity.notFound().build();
		    }
			
			updatedAdmin.setAdminid(adminid);
			ReflectionUtils.copyNonNullFields(updatedAdmin, existingAdmin.get());
			
			Admin savedAdmin = adminRepo.save(existingAdmin.get());
			
			return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
		}	
		
		
		@PostMapping("/changepassword/{adminid}/{oldpassword}/{newpassword}")
		public ResponseEntity<String> changePassword(@PathVariable(name = "adminid") Integer adminid, 
				@PathVariable(name = "oldpassword") String oldpass, @PathVariable(name = "newpassword") String newpass){
			
			ValidatingData validatingData=new ValidatingData();
			
			if(newpass.length()==0) {
				throw new ValidationDataException("New password required");
			}
			
			if(!validatingData.validatePassword(newpass)) {
				throw new ValidationDataException("Password should be of 8 length and must contain lowerCase,"
						+ " UpperCase, Number and special character");
			}
			
			
			Optional<Admin> existingAdmin=adminRepo.findById(adminid);
			
			if (existingAdmin == null) {
				return new ResponseEntity<>("Not exists",HttpStatus.NOT_FOUND);
		    }
			UserInfo userInfo=existingAdmin.get().getUserInfo();
			
			if(passwordEncoder.matches(oldpass, userInfo.getPassword())) {
				userInfo.setPassword(passwordEncoder.encode(newpass));
				userInfoRepo.save(userInfo);
				return new ResponseEntity<>("Password changed Successfully",HttpStatus.OK);
			}
			
			return new ResponseEntity<>("Password Not match",HttpStatus.NOT_ACCEPTABLE);

		}
}

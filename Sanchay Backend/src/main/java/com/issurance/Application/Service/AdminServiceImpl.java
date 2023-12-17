package com.issurance.Application.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.entities.Admin;
import com.issurance.Application.entities.Role;
import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.exceptions.UserNameAlreadyExist;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.AdminRepo;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.RoleRepo;
import com.issurance.Application.repository.UserInfoRepo;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Slf4j
public class AdminServiceImpl implements AdminService{

	
	private static final Logger log = LoggerFactory.getLogger(AdminServiceImpl.class);

	
	@Autowired
	private AdminRepo adminRepo;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
	
	private PasswordEncoder passwordEncoder;
	
	@Transactional
	@Override
	public void registerAdmins(Admin admin) {
		
		ValidatingData validatingData=new ValidatingData();
		
		if(!validatingData.validateName(admin.getAdminname())) {
			throw new ValidationDataException("Admin Name should containt only characters");
		}
	
		if(!validatingData.validateUsername(admin.getUserInfo().getUsername())) {
			throw new ValidationDataException("username start with character and no special character should contain");
		}
	
		
		
		if(!validatingData.validatePassword(admin.getUserInfo().getPassword())) {
			throw new ValidationDataException("Password should be of 8 length and must contain lowerCase,"
					+ " UpperCase, Number and special character");
		}
		
		List<String> allUserName=new ArrayList<>();
		List<UserInfo> users=userInfoRepo.findAll();
		
		for(UserInfo user:users) {
			allUserName.add(user.getUsername());
		}
		
		if(allUserName.contains(admin.getUserInfo().getUsername())) {
			throw new UserNameAlreadyExist("User Name Exists");
		}
		
		Optional<Role> role=roleRepo.findById(2);
		
		Role role2=null;
		
		if(role.isPresent()) {
			role2=role.get();
			admin.getUserInfo().setRole(role2);
		}
		else {
			admin.getUserInfo().setRole(null);
		}
		
		String pass=admin.getUserInfo().getPassword();
		
		admin.getUserInfo().setPassword(passwordEncoder.encode(pass));
		
		adminRepo.save(admin);
		
		log.info("admin"+admin+"is added Successfully");
		
	}

}

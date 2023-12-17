package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.issurance.Application.entities.Employee;
import com.issurance.Application.entities.UserInfo;


public interface EmployeeRepo extends JpaRepository<Employee, Integer>{
	 
	Employee findByUserInfo(UserInfo userInfo);
}

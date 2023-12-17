package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.UserInfo;

public interface CustomerRepo extends JpaRepository<Customer, Integer> {

	Customer findByUserInfo(UserInfo userInfo);
	
}

package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Admin;
import com.issurance.Application.entities.UserInfo;

public interface AdminRepo extends JpaRepository<Admin, Integer>{

	Admin findByUserInfo(UserInfo userInfo);
}

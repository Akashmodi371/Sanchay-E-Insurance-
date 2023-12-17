package com.issurance.Application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.UserInfo;

public interface UserInfoRepo extends JpaRepository<UserInfo, Integer>{
		
	boolean existsByUsername(String username);

	Optional<UserInfo> findByUsername(String username);
}

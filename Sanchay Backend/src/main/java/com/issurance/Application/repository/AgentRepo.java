package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.UserInfo;

public interface AgentRepo extends JpaRepository<Agent, Integer>  {

	Agent findByUserInfo(UserInfo userInfo);
}

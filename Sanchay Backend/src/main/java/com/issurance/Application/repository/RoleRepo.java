package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Role;

public interface RoleRepo extends JpaRepository<Role, Integer>{

}

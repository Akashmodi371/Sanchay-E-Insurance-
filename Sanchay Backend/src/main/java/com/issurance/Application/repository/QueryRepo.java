package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Query;

public interface QueryRepo extends JpaRepository<Query, Integer>{

}

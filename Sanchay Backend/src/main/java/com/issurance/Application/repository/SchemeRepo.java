package com.issurance.Application.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Scheme;

public interface SchemeRepo extends JpaRepository<Scheme, Integer> {

	List<Scheme> findByPlanPlanname(String planname);
	Scheme findBySchemename(String schemename);
	
}

package com.issurance.Application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Plan;

public interface PlanRepo extends JpaRepository<Plan, Integer> {

	Plan findByPlanname(String planname);
}

package com.issurance.Application.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.issurance.Application.Dto.PlanDto;
import com.issurance.Application.entities.Plan;

public interface PlanService {

	public ResponseEntity<String> addPlan(Plan plan);
	
	public ResponseEntity<List<PlanDto>> getplans();
	
	public ResponseEntity<Plan> getplanbyid(int planid);
}

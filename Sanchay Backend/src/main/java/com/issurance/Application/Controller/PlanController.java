package com.issurance.Application.Controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.PlanDto;
import com.issurance.Application.Service.PlanService;
import com.issurance.Application.entities.Plan;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.repository.PlanRepo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("planapp")
@Slf4j
public class PlanController {

	
	private static final Logger log = LoggerFactory.getLogger(PlanController.class);

	
	@Autowired
	private PlanRepo planRepo;
	
	@Autowired
	private PlanService planService;
	
	
//Adding plan
	@PostMapping("/addplan")
	public ResponseEntity<String> addPlan(@RequestBody Plan plan) {
		return planService.addPlan(plan);
	}
	
//Get all plans
	@GetMapping("/getall")
	public ResponseEntity<List<PlanDto>> getplans(){
		return planService.getplans();
	}
	
//Get plan by planid
	@GetMapping("/getplanbyid")
	public ResponseEntity<Plan> getplanbyid(@RequestParam(name="planid") int planid){
		return planService.getplanbyid(planid);
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

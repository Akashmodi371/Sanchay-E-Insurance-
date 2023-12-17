package com.issurance.Application.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.stereotype.Service;

import com.issurance.Application.Dto.PlanDto;
import com.issurance.Application.Dto.PolicyDto;
import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.entities.Plan;
import com.issurance.Application.exceptions.PlanAlreadyExist;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.EmployeeRepo;
import com.issurance.Application.repository.PlanRepo;
import com.issurance.Application.repository.RoleRepo;
import com.issurance.Application.repository.UserInfoRepo;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
@Service
public class PlanServiceImpl implements PlanService {

	
	
	private static final Logger log = LoggerFactory.getLogger(PlanServiceImpl.class);

	@Autowired
	private PlanRepo planRepo;

	@Override
	public ResponseEntity<String> addPlan(Plan plan) {
		
		ValidatingData validatingData=new ValidatingData();
		
		if(!validatingData.validateName(plan.getPlanname())) {
			throw new ValidationDataException("Plan should contains only characters");
		}
		List<String> plannames=new ArrayList<>();
		List<Plan> plans=planRepo.findAll();
		for(Plan pl:plans) {
			plannames.add(pl.getPlanname());
		}
		
		if(plannames.contains(plan.getPlanname())) {
			throw new PlanAlreadyExist("Already Exists Plan");
		}
		else {
			planRepo.save(plan);
			return new ResponseEntity<>("Plan Added Successfully",HttpStatus.OK);
		}
		
		
	}

	@Override
	public ResponseEntity<List<PlanDto>> getplans() {
		List<Plan> plans=planRepo.findAll();
		
		if(plans.size()==0) {
			throw new UserApiException(HttpStatus.NOT_FOUND, "No plans available");
		}
		
		List<PlanDto> planDtos=new ArrayList<>();
		
		for(Plan plan:plans) {
			PlanDto planDto=new PlanDto();
			planDto.setPlanid(plan.getPlanid());
			planDto.setPlanname(plan.getPlanname());
			planDtos.add(planDto);
		}
		
		return new ResponseEntity<>(planDtos,HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Plan> getplanbyid(int planid) {
		Optional<Plan> plan=planRepo.findById(planid);
		
		Plan plan2=null;
		
		if(plan.isPresent()) {
			plan2=plan.get();
		}
		
		if(plan2==null) {
			throw new UserApiException(HttpStatus.NOT_FOUND, "No plan by this id");
		}
		
		return new ResponseEntity<>(plan2,HttpStatus.OK);
	}
	
	
	
	
}

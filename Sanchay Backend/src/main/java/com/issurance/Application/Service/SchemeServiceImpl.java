package com.issurance.Application.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ScheduledExecutorTask;
import org.springframework.stereotype.Service;

import com.issurance.Application.Dto.SchemeDto;
import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.entities.Plan;
import com.issurance.Application.entities.Scheme;
import com.issurance.Application.exceptions.SchemeNameExistsExceptions;
import com.issurance.Application.exceptions.SchemeNotFoundException;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.PlanRepo;
import com.issurance.Application.repository.SchemeRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SchemeServiceImpl implements SchemeService{
	
	@Autowired
	private SchemeRepo schemeRepo;
	
	@Autowired
	private PlanRepo planRepo;
	
	@Override
	public ResponseEntity<String> addScheme(Scheme scheme, int planid) {
	 
		ValidatingData validatingData=new ValidatingData();
		
		if(!validatingData.validateName(scheme.getSchemename())) {
			throw new ValidationDataException("Scheme Name should containt only characters");
		}
		
		if(scheme.getDescription().length()>100) {
			throw new ValidationDataException("Description should be of length 100 characters only");
		}
		
//		if(!validatingData.validateDocumentDetail(scheme.getDocumentsrequire())) {
//			throw new ValidationDataException("required document contains character & ,");
//		}
		
		if(scheme.getMinage()>=scheme.getMaxage()) {
			throw new ValidationDataException("Minimum age should less than max age");
		}
		
		if(scheme.getMinamount()>=scheme.getMaxamount()) {
			throw new ValidationDataException("minimum amount should less than maximum amount");
		}
		
		if(scheme.getMininvesttime()>=scheme.getMaxinvesttime()) {
			throw new ValidationDataException("Minimumm investment time should less than maximum investment time");
		}
		
		
		
		Optional<Plan> plan=planRepo.findById(planid);
		
		List<String> schemenameList=new ArrayList<>();
		List<Scheme> schemes=schemeRepo.findAll();
		for(Scheme sc:schemes) {
			schemenameList.add(sc.getSchemename());
		}
		
		if(schemenameList.contains(scheme.getSchemename())) {
			throw new SchemeNameExistsExceptions("Scheme Already Exists");
		}
		
		Plan plan2=null;
		
		if(plan.isPresent()) {
			plan2=plan.get();
			scheme.setPlan(plan2);
			
			schemeRepo.save(scheme);
			return new ResponseEntity("Add Successfully",HttpStatus.OK);
		}
		
		return new ResponseEntity("No plan by this id",HttpStatus.NOT_FOUND);
		
	}

	@Override
	public List<Scheme> getall() {
		List<Scheme> schemes=schemeRepo.findAll();
		
		return schemes;
	}

	@Override
	public ResponseEntity<SchemeDto> getbyid(int schemeid) {
		
		Optional<Scheme> scheme=schemeRepo.findById(schemeid);
		
		Scheme scheme2=null;
		SchemeDto schemeDto=new SchemeDto();
		if(scheme.isPresent()) {
			scheme2=scheme.get();
			schemeDto.setSchemeId(scheme2.getSchemeid());
	        schemeDto.setSchemeName(scheme2.getSchemename());
	        schemeDto.setMinAge(scheme2.getMinage());
	        schemeDto.setMaxAge(scheme2.getMaxage());
	        schemeDto.setMinAmount(scheme2.getMinamount());
	        schemeDto.setMaxAmount(scheme2.getMaxamount());
	        schemeDto.setMinInvestTime(scheme2.getMininvesttime());
	        schemeDto.setMaxInvestTime(scheme2.getMaxinvesttime());
	        schemeDto.setRegistrationCommission(scheme2.getRegistrationcommission());
//	        schemeDto.setDescription(scheme2.getDescription());
//	        schemeDto.setDocumentsRequire(scheme2.getDocumentsrequire());
		}
		return new ResponseEntity(scheme2,HttpStatus.OK);
		
	}

	@Override
	public ResponseEntity<List<SchemeDto>> getbyplanids(int planid) {
		
		Optional<Plan> plan=planRepo.findById(planid);
		
		
		List<SchemeDto> schemeDtos=new ArrayList<>();
		List<Scheme> schemes =plan.get().getSchemes();
		Plan plan2=null;
		if(plan.isPresent()) {
			plan2=plan.get();	
		}
		
		if(schemes.size()==0) {
			throw new SchemeNotFoundException("No Scheme Available");
		}
		
		for(Scheme scheme:schemes) {
			System.out.println(scheme.getDocumentsrequire());
			System.out.println(scheme.getDocumentsrequire());
			SchemeDto schemeDto=new SchemeDto();
			schemeDto.setSchemeId(scheme.getSchemeid());
			schemeDto.setDescription(scheme.getDescription());
			schemeDto.setSchemeName(scheme.getSchemename());
            schemeDto.setMinAge(scheme.getMinage());
            schemeDto.setMaxAge(scheme.getMaxage());
            schemeDto.setMinAmount(scheme.getMinamount());
            schemeDto.setMaxAmount(scheme.getMaxamount());
            schemeDto.setMinInvestTime(scheme.getMininvesttime());
            schemeDto.setMaxInvestTime(scheme.getMaxinvesttime());
            schemeDto.setRegistrationCommission(scheme.getRegistrationcommission());
            schemeDto.setDocumentsRequire(scheme.getDocumentsrequire());
            schemeDtos.add(schemeDto);
		}
		
		
		return new ResponseEntity(schemeDtos,HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<SchemeDto>> getbyplanname(String planname) {
		
		List<Scheme> schemes=schemeRepo.findByPlanPlanname(planname);
		List<SchemeDto> schemeDtos=new ArrayList<>();
		
		if(schemes.size()==0) {
			throw new SchemeNotFoundException("No Schemes Available");
		}
		
		for(Scheme scheme:schemes) {
			SchemeDto schemeDto=new SchemeDto();
			schemeDto.setSchemeId(scheme.getSchemeid());
			schemeDto.setDescription(scheme.getDescription());
			schemeDto.setSchemeName(scheme.getSchemename());
            schemeDto.setMinAge(scheme.getMinage());
            schemeDto.setMaxAge(scheme.getMaxage());
            schemeDto.setMinAmount(scheme.getMinamount());
            schemeDto.setMaxAmount(scheme.getMaxamount());
            schemeDto.setMinInvestTime(scheme.getMininvesttime());
            schemeDto.setMaxInvestTime(scheme.getMaxinvesttime());
            schemeDto.setRegistrationCommission(scheme.getRegistrationcommission());
            schemeDto.setDocumentsRequire(scheme.getDocumentsrequire());
            schemeDtos.add(schemeDto);
			
		}
		
		return new ResponseEntity(schemeDtos,HttpStatus.OK);
	}


	@Override
	public ResponseEntity<Scheme> getbyschemename(String schemename) {
		
		Scheme scheme=schemeRepo.findBySchemename(schemename);
		
		if(scheme==null) {
			throw new SchemeNotFoundException("scheme name not exists");
		}
		
		return new ResponseEntity(scheme,HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> addschemebyplanname(Scheme scheme, String planname) {
		
		ValidatingData validatingData=new ValidatingData();
		
		if(!validatingData.validateName(scheme.getSchemename())) {
			throw new ValidationDataException("Scheme Name should containt only characters");
		}
		
		if(scheme.getDescription().length()>100) {
			throw new ValidationDataException("Description should be of length 100 characters only");
		}
		
		if(!validatingData.validateDocumentDetail(scheme.getDocumentsrequire())) {
			throw new ValidationDataException("required document contains character & ,");
		}
		
		if(scheme.getMinage()>=scheme.getMaxage()) {
			throw new ValidationDataException("Minimum age should less than max age");
		}
		
		if(scheme.getMinamount()>=scheme.getMaxamount()) {
			throw new ValidationDataException("minimum amount should less than maximum amount");
		}
		
		if(scheme.getMininvesttime()>=scheme.getMaxinvesttime()) {
			throw new ValidationDataException("Minimumm investment time should less than maximum investment time");
		}
		
	
		
		Plan plan=planRepo.findByPlanname(planname);
		
		if(scheme==null) {
			throw new SchemeNotFoundException("Scheme not preset");
		}
		
		List<String> schemenameList=new ArrayList<>();
		List<Scheme> schemes=schemeRepo.findAll();
		for(Scheme sc:schemes) {
			schemenameList.add(sc.getSchemename());
		}
		
		if(schemenameList.contains(scheme.getSchemename())) {
			throw new SchemeNameExistsExceptions("Scheme Already Exists");
		}
		
		
		scheme.setPlan(plan);
		schemeRepo.save(scheme);
		
		return new ResponseEntity("Added Successfully",HttpStatus.OK);
	}



}

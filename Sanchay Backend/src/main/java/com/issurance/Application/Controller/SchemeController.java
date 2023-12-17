package com.issurance.Application.Controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.SchemeDto;
import com.issurance.Application.Service.SchemeService;
import com.issurance.Application.entities.Scheme;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("schemeapp")
@Slf4j
public class SchemeController {

	
	
	private static final Logger log = LoggerFactory.getLogger(SchemeController.class);

	@Autowired
	private SchemeService schemeService;
	
	
	
	@PostMapping("/addscheme/{planid}")
	public ResponseEntity<String> addscheme(@RequestBody Scheme scheme,@PathVariable(name="planid") int planid){
		
		return schemeService.addScheme(scheme, planid);
	}
	@PostMapping("/addschemebyplanname")
	public ResponseEntity<String> addschemebypl(@RequestBody Scheme scheme, @RequestParam(name="planname") String planname){
		return schemeService.addschemebyplanname(scheme, planname);
	}
	
	
	@GetMapping("/getall")
	public ResponseEntity<List<SchemeDto>> getall(){
		
		List<Scheme> schemes= schemeService.getall();
		
		List<SchemeDto> schemeDtos=new ArrayList<>();
		for(Scheme scheme:schemes) {
			System.out.println(scheme.getDocumentsrequire());
			SchemeDto schemeDto=new SchemeDto();
			
			schemeDto.setSchemeId(scheme.getSchemeid());
	        schemeDto.setSchemeName(scheme.getSchemename());
	        schemeDto.setMinAge(scheme.getMinage());
	        schemeDto.setMaxAge(scheme.getMaxage());
	        schemeDto.setMinAmount(scheme.getMinamount());
	        schemeDto.setMaxAmount(scheme.getMaxamount());
	        schemeDto.setMinInvestTime(scheme.getMininvesttime());
	        schemeDto.setMaxInvestTime(scheme.getMaxinvesttime());
	        schemeDto.setRegistrationCommission(scheme.getRegistrationcommission());
	        schemeDto.setDocumentsRequire(scheme.getDocumentsrequire());
	        schemeDto.setPlanname(scheme.getPlan().getPlanname());
	        schemeDto.setDocumentsRequire(scheme.getDocumentsrequire());
	        

	        schemeDtos.add(schemeDto);
		}
		
		return new ResponseEntity(schemeDtos,HttpStatus.OK);
	}
	
	@GetMapping("/getbyid")
	public ResponseEntity<SchemeDto> getbyid(@RequestParam(name="schemeid") int schemid){
		
		return schemeService.getbyid(schemid);
	}
	
	@GetMapping("/getbyschemename")
	public ResponseEntity<Scheme> getbysc(@RequestParam(name="schemename") String schemename){
		
		return schemeService.getbyschemename(schemename);
	}
	
	
	
	@GetMapping("getbyplanid")
	public ResponseEntity<List<SchemeDto>> getbyplanid(@RequestParam(name="planid") int planid){
		return schemeService.getbyplanids(planid);
	}
	
	@GetMapping("getbyplanname")
	public ResponseEntity<List<SchemeDto>> getbyplanname(@RequestParam(name="planname") String planname){
		return schemeService.getbyplanname(planname);
	}
	

	
	
	
	
	
}

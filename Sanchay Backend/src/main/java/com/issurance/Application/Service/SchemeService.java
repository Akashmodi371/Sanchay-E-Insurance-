package com.issurance.Application.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.issurance.Application.Dto.SchemeDto;
import com.issurance.Application.entities.Scheme;

public interface SchemeService {
		
	public ResponseEntity<String> addScheme(Scheme scheme,int planid);
	
	public ResponseEntity<String> addschemebyplanname(Scheme scheme, String planname);
	
	public List<Scheme> getall();
	
	public ResponseEntity<SchemeDto> getbyid(int schemeid);
	
	public ResponseEntity<Scheme> getbyschemename(String schemename);
	
	public ResponseEntity<List<SchemeDto>> getbyplanids(int planid);
	
	public ResponseEntity<List<SchemeDto>> getbyplanname(String planname);
	
	
}

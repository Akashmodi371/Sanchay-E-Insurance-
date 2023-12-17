package com.issurance.Application.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.DocumentDto;
import com.issurance.Application.Service.DocumentService;
import com.issurance.Application.exceptions.DocumentNotFoundException;
import com.issurance.Application.repository.DocumentRepo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("documentapp")
@Slf4j
public class DocumentController {

	
	@Autowired
	private DocumentRepo documentRepo;
	
	@Autowired
	private DocumentService documentService;
	
	
	@GetMapping("/getdocuments/{policynumber}")
	public ResponseEntity<List<DocumentDto>> getdocument(@PathVariable(name="policynumber") Integer policynumber){
		
		List<DocumentDto> documentDtos=documentService.getalldocument(policynumber);
		
		if(documentDtos.size()==0) {
			throw new DocumentNotFoundException("No Document Found");
		}
		
		
		return ResponseEntity.ok(documentDtos);
		
	}
	
	
	
}

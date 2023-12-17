package com.issurance.Application.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.issurance.Application.Dto.DocumentDto;
import com.issurance.Application.entities.Document;
import com.issurance.Application.entities.Policy;
import com.issurance.Application.exceptions.DocumentNotFoundException;
import com.issurance.Application.exceptions.PolicyNotFoundException;
import com.issurance.Application.repository.DocumentRepo;
import com.issurance.Application.repository.PolicyRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DocumentServiceImpl implements DocumentService{
	
	
	@Autowired
	private DocumentRepo documentRepo;
	
	
	@Autowired
	private PolicyRepo policyRepo;
	
	@Override
	public List<DocumentDto> getalldocument(Integer policynumber) {
		
		Optional<Policy> policy=policyRepo.findById(policynumber);
		
		
		Policy policy2=null;
		
		
		List<DocumentDto> documentDtos=new ArrayList<>();
		
		if(policy.isPresent()) {
			policy2=policy.get();
			
			List<Document> documents=policy2.getDocuments();
			if(documents.size()==0) {
				throw new DocumentNotFoundException("No Document Exists");
			}
			
			
			
			for(Document document:documents) {
				DocumentDto documentDto=new DocumentDto();
				documentDto.setDocumentname(document.getDocumentname());
				documentDto.setDocumentFile(document.getDocumentFile());
//				documentDto.setDocumentid(document.getDocumentid());
//				documentDto.setDocumentpath(document.getDocumentpath());
//				documentDto.setDocumentType(document.getDocumentType());
				
				documentDtos.add(documentDto);
			}
		}
		else {
			throw new PolicyNotFoundException("No Policy Exists");
		}
		
		return documentDtos;
		
	}

	

}

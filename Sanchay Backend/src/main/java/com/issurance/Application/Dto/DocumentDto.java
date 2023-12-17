package com.issurance.Application.Dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class DocumentDto {
		
		private int documentid;
	    private String documentname;
	    private String documentpath;
	    private String documentType;
	    private byte[] documentFile;
	    

}

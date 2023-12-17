package com.issurance.Application.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class NomineeDto {
	
	private int nomineeId;
    private String nomineeName;
    private String nomineeRelation;

}

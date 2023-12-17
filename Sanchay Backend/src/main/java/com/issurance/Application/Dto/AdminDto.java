package com.issurance.Application.Dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class AdminDto {
	 private int adminid;
	    private String adminname;
	    private String username;
//	    private List<QueryDto> repliedQueries;

}

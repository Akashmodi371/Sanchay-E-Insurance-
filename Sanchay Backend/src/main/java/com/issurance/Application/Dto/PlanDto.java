package com.issurance.Application.Dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class PlanDto {
	private int planid;
    private String planname;
//    private List<SchemeDto> schemes;
}

package com.issurance.Application.Service;

import org.springframework.http.ResponseEntity;

import com.issurance.Application.Dto.ReplyDataDto;
import com.issurance.Application.entities.Query;

public interface QueryService {

	public ResponseEntity<Query> addQueryForCustomer(Query query,Integer customerid);
	
	public ResponseEntity<String> addreplybyadmin(Integer queryid,Integer adminid, ReplyDataDto replyDataDto);
	
	
}

package com.issurance.Application.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.ReplyDataDto;
import com.issurance.Application.Service.QueryService;
import com.issurance.Application.entities.Query;
import com.issurance.Application.exceptions.NoFeedbackAvailableException;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.repository.QueryRepo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("queryapp")
@Slf4j
public class QueryController {

	
	
	@Autowired
	private QueryRepo queryRepo;
	
	@Autowired
	private QueryService queryService;
	
	
   @PostMapping("/addquery/{customerid}")
    public ResponseEntity<?> addQueryForCustomer(@RequestBody Query query, @PathVariable(name="customerid") Integer customerId) {
        
	   return queryService.addQueryForCustomer(query, customerId);
    }
   
   	@GetMapping("/getqueries")
   	public ResponseEntity<List<Query>> getallqueries(){
   		List<Query> queries= queryRepo.findAll();
   		
   		if(queries.size()==0) {
   			throw new NoFeedbackAvailableException("No query Found");
   		}
   		return new ResponseEntity(queries,HttpStatus.OK);
   	}
   	
   	@PostMapping("replyqueryadmin/{queryid}/{adminid}")
   	public ResponseEntity<String> addreplybyadmn(@PathVariable(name="queryid") Integer queryid, 
   			@PathVariable(name="adminid") Integer adminid,@RequestBody ReplyDataDto replyDataDto){
   		return queryService.addreplybyadmin(queryid, adminid, replyDataDto);
   		
   	}
}

package com.issurance.Application.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.issurance.Application.Dto.ReplyDataDto;
import com.issurance.Application.entities.Admin;
import com.issurance.Application.entities.Query;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.repository.AdminRepo;
import com.issurance.Application.repository.AgentRepo;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.QueryRepo;
import com.issurance.Application.repository.RoleRepo;
import com.issurance.Application.repository.UserInfoRepo;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Slf4j
public class QueryServiceImpl implements QueryService{

	
	@Autowired
	private QueryRepo queryRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private AdminRepo adminRepo;

	@Override
	public ResponseEntity<Query> addQueryForCustomer(Query query, Integer customerId) {
		com.issurance.Application.entities.Customer customer = customerRepo.findById(customerId).orElse(null);
        if (customer != null) {
            query.setCustomer(customer);
            Query query2= queryRepo.save(query);
            return new ResponseEntity(query2,HttpStatus.OK);
        } else {
            throw new UserApiException(HttpStatus.NOT_FOUND, "Customer not found");
        }
	}

	@Override
	public ResponseEntity<String> addreplybyadmin(Integer queryid, Integer adminid, ReplyDataDto replyDataDto) {
		
		Query query=queryRepo.getById(queryid);
		
		if(replyDataDto.getReplymessage()==null) {
			throw new UserApiException(HttpStatus.NOT_ACCEPTABLE, "Add Some reply");
		}
		query.setReplyquery(replyDataDto.getReplymessage());
		
		Admin admin=adminRepo.getById(adminid);
		
		query.setAdmin(admin);
		
		query.setStatus("REPLIED");
		queryRepo.save(query);
		
		
		return new ResponseEntity("query submitted",HttpStatus.OK);
		
	}
	
	
	
	
}

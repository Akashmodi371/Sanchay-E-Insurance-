package com.issurance.Application.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.issurance.Application.Dto.CustomerDto;
import com.issurance.Application.Dto.PolicyDto;
import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Payment;
import com.issurance.Application.entities.Policy;

public interface PolicyService {

	public ResponseEntity<String> addPolicy(Policy policy,Integer customerid,Integer schemeid);
	
	public ResponseEntity<List<Policy>> getbycustomerid(Integer customerid);
	
	public ResponseEntity<PolicyDto> getbypolicynumber(Integer policynumber);
	
	public Page<Policy> getallinpage(int pageno,int pagesize,int customerid);
	
	public ResponseEntity<Policy> addPolicyBySchemename(Policy policy,Integer customemrid,String schemename, List<MultipartFile> documentFiles);
	
	public List<PolicyDto> getallpolicy();
	
	public List<CustomerDto> getCustomersByAgent(Agent agent) ;
	
	public List<Policy> getagentpolicies(int agentid);
	
	public ResponseEntity<String> policystatusupdate(Integer policynumber,String status);
	
	public List<PolicyDto> getcustomerpolicy(Integer customerid);
	
	
	
	
}

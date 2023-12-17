package com.issurance.Application.Service;

import org.springframework.http.ResponseEntity;

import com.issurance.Application.entities.Agent;

public interface AgentService {

	public void registerAgent(Agent agent);
	
	public String addCommission(Integer agentid,double commission);
	
	public double getCommisionbyid(int adminid);
	
//	public ResponseEntity<String> withdrawamount(double amount,int agentid);
	public ResponseEntity<String> withdrawamount(double amount,int agentid);
}

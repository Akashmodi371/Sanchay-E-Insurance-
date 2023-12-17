package com.issurance.Application.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.AbstractListenerWriteFlushProcessor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issurance.Application.Dto.AgentDto;
import com.issurance.Application.Dto.PolicyComission;
import com.issurance.Application.ExceptionController.ValidatingData;
import com.issurance.Application.Service.AgentService;
import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Payment;
import com.issurance.Application.entities.Policy;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.repository.AgentRepo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("agentapp")
@Slf4j
public class AgentController {

	
	private static final Logger log = LoggerFactory.getLogger(AgentController.class);

	
	@Autowired
	private AgentService agentService;
	
	@Autowired
	private AgentRepo agentRepo;
	
	
	//Register Agent
		@PostMapping("/register")
		public ResponseEntity<String>  addAgent(@RequestBody Agent agent) {
			System.out.println(agent);
			agentService.registerAgent(agent);
			return new ResponseEntity<>("AgentRegistered Successfully",HttpStatus.OK);
		}
		
		
	//Get All Agent
		@GetMapping("/agents")
		public ResponseEntity<List<AgentDto>> getAgents(){
			
			List<Agent> agents=agentRepo.findAll();
			
			List<AgentDto> agentDtos=new ArrayList<>();
			
			for(Agent agent: agents) {
				AgentDto agentDto=new AgentDto();
				
				agentDto.setAgentid(agent.getAgentid());
			    agentDto.setFirstname(agent.getFirstname());
			    agentDto.setLastname(agent.getLastname());
			    agentDto.setEmail(agent.getEmail());
			    agentDto.setMobileno(agent.getMobileno());
			    agentDto.setReferencenumber(agent.getReferencenumber());
			    agentDto.setCommission(agent.getCommission());
			    agentDto.setUsername(agent.getUserInfo().getUsername());
			    agentDto.setStatus(agent.getStatus());

			    // Add the AgentDto to the list
			    agentDtos.add(agentDto);
			}
			
			return new ResponseEntity<>(agentDtos,HttpStatus.OK);
		}
	//Add Commission to agent
		@PostMapping("/addcommion/{agentId}/{commission}")
		public ResponseEntity<String> addcommission(@PathVariable(name="agentId") int agentId,@PathVariable(name="commission") double commission){
			System.out.println("getting commission");
			try {
				agentService.addCommission(agentId, commission);
				return ResponseEntity.ok("Commission added Successfully");
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Due to some technical issue age");
			}
		}
	
				 
	// get by customer id
		@GetMapping("/getbyid/{agentid}")
		public ResponseEntity<AgentDto> getagentbyid(@PathVariable(name="agentid") Integer agentid){
			
			Optional<Agent> agent=agentRepo.findById(agentid);
			
			Agent agent2=null;
			
			AgentDto agentDto=new AgentDto();
			if(agent.isPresent()) {
				
				agent2=agent.get();
				System.out.println(agent2.getStatus());
				agentDto.setAgentid(agent2.getAgentid());
			    agentDto.setFirstname(agent2.getFirstname());
			    agentDto.setLastname(agent2.getLastname());
			    agentDto.setEmail(agent2.getEmail());
			    agentDto.setMobileno(agent2.getMobileno());
			    agentDto.setReferencenumber(agent2.getReferencenumber());
			    agentDto.setCommission(agent2.getCommission());
			    agentDto.setUsername(agent2.getUserInfo().getUsername());
			    agentDto.setStatus(agent2.getStatus());
				
				
				return new ResponseEntity(agentDto,HttpStatus.OK);
			}
			else {
				throw new UserApiException(HttpStatus.NOT_FOUND, "no admin exists ");
			}
		}
		
		@PostMapping("/changestatus/{agentid}/{status}")
		public ResponseEntity<String> changeLoginStatus(@PathVariable(name="agentid") Integer agentid,@PathVariable(name="status") String status){
			
			
			Optional<Agent> agent=agentRepo.findById(agentid);
			
			
			if(agent.isPresent()) {
				
				agent.get().setStatus(status);
				agentRepo.save(agent.get());
				
				return new ResponseEntity("Successfully Changed to"+status,HttpStatus.OK);
			}
			
			throw new UserApiException(HttpStatus.NOT_FOUND, "Agnet not exists" );
			
		}
		
		
		
	// update customer id
		
		@PostMapping("/update/{agentid}")
		public ResponseEntity<String> updateagent(@PathVariable(name = "agentid") Integer agentid ,@RequestBody Agent updatedAgent){
//			System.out.println(updatedAgent.getMobileno());
			ValidatingData validatingData=new ValidatingData();
			
			if(!validatingData.validateName(updatedAgent.getFirstname())) {
				throw new ValidationDataException("FirstName should containt only characters");
			}
			if(!validatingData.validateName(updatedAgent.getLastname())) {
				throw new ValidationDataException("LastName should containt only characters");
			}
//			if(!validatingData.validateUsername(updatedAgent.getUserInfo().getUsername())) {
//				throw new ValidationDataException("username start with character and no special character should contain");
//			}
			if(!validatingData.validateEmail(updatedAgent.getEmail())) {
				throw new ValidationDataException("Email is not in proper formate");
			}
			
			if(!validatingData.validateMobileNumber(updatedAgent.getMobileno())) {
				throw new ValidationDataException("it should contains 10 digit only");
			}
			
			Optional<Agent> existingAgent=agentRepo.findById(agentid);
			
			if (existingAgent == null) {
				System.out.println("Here bromke");
		        return ResponseEntity.notFound().build();
		    }
			
			updatedAgent.setAgentid(agentid);
			ReflectionUtils.copyNonNullFields(updatedAgent, existingAgent.get());
			
			Agent savedAgent = agentRepo.save(existingAgent.get());
			
			return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
		}
	
		
		
		
		//get commision 
		
		@GetMapping("/getcommision/{agentid}")
		public ResponseEntity<?> getCommision(@PathVariable(name="agentid") Integer agentid){
			Optional<Agent> agent=agentRepo.findById(agentid);
			
			
			double commision=0;
			if(agent.isPresent()) {
				commision=agent.get().getCommission();
			}
			
			return  new ResponseEntity(commision,HttpStatus.OK);
		}
		
		//get commision with policy
		
				@GetMapping("/getbypolicycommission/{agentid}")
				public ResponseEntity<List<PolicyComission>> getbypolicy(@PathVariable(name="agentid") Integer agentid){
					Optional<Agent> agent=agentRepo.findById(agentid);
					
					
					List<PolicyComission> policyComissions=new ArrayList<>();
					if(agent.isPresent()) {
						List<Policy> policies=agent.get().getPolicies();
						
						for(Policy policy:policies) {
							PolicyComission policyComission=new PolicyComission();
							List<Payment> payments=policy.getPayments();
							double totalcommision=0;
							for(Payment payment:payments) {
								totalcommision+=(payment.getAmountpaid()*5)/100;
							}
							policyComission.setPolicycommission(totalcommision);
							policyComission.setPolicynumber(policy.getPolicynumber());
							policyComission.setCustomerid(policy.getCustomer().getCustomerid());
							policyComission.setCustomername(policy.getCustomer().getFirstname());
							policyComissions.add(policyComission);
						}
					}
					
					return  new ResponseEntity(policyComissions,HttpStatus.OK);
				}
		
		@PostMapping("/withdrawamount/{amount}/{agentid}")
		public ResponseEntity<String> withdrawamount(@PathVariable(name="amount") double amount,@PathVariable(name="agentid") int agentid){
			return agentService.withdrawamount(amount, agentid);
		}
		
		
		
}


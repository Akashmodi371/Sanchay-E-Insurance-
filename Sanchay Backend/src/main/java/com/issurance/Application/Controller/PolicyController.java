package com.issurance.Application.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.antlr.v4.runtime.misc.ParseCancellationException;
import org.hibernate.cache.spi.support.NaturalIdNonStrictReadWriteAccess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.event.PublicInvocationEvent;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.issurance.Application.Dto.CustomerDto;
import com.issurance.Application.Dto.PolicyDto;
import com.issurance.Application.Service.PolicyService;
import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Document;
import com.issurance.Application.entities.Payment;
import com.issurance.Application.entities.Policy;
import com.issurance.Application.entities.Scheme;
import com.issurance.Application.entities.StatusType;
import com.issurance.Application.exceptions.PolicyAlreadyVerified;
import com.issurance.Application.repository.AgentRepo;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.DocumentRepo;
import com.issurance.Application.repository.PaymentRepo;
import com.issurance.Application.repository.PlanRepo;
import com.issurance.Application.repository.PolicyRepo;
import com.issurance.Application.repository.SchemeRepo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("policyapp")
@Slf4j
public class PolicyController {

	
	private static final Logger log = LoggerFactory.getLogger(PolicyController.class);

	
	@Autowired
	private PolicyRepo policyRepo;
	
	@Autowired
	private PlanRepo planRepo;
	
	@Autowired
	private PolicyService policyService;
	
	@Autowired
	private AgentRepo agentRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	
	@Autowired
	private SchemeRepo schemeRepo;
	
	@Autowired
	private DocumentRepo documentRepo;
	
	@Autowired
	private PaymentRepo paymentRepo;
	
	//Adding policy
//		@PostMapping("/addpolicy/{customerid}/{schemeid}")
		public ResponseEntity<String> addPolicy(@RequestBody Policy policy,@PathVariable(name="customerid") Integer customerid ,
				@PathVariable(name="schemeid") Integer schemeid) {
			
			return policyService.addPolicy(policy, customerid,schemeid);
		}
	
	//adding policy by schemename
//		@PreAuthorize("CUSTOMER")
		@PostMapping("/addpolicy/{customerid}/{schemename}/{premiumt}/{selectedAgent}")
	    public ResponseEntity<String> addPolicyBySchemename(
	            @ModelAttribute Policy policy,
	            @PathVariable(name = "customerid") Integer customerid,
	            @PathVariable(name = "schemename") String schemename,
	            @PathVariable(name = "premiumt") Integer premiumt,
	            @PathVariable(name="selectedAgent") Integer selectedAgent,
	            @RequestParam("documentFiles") List<MultipartFile> documentFiles
	    ) {
	        try {
	        	System.out.println("customer id"+customerid);
	            Optional<Customer> customer = customerRepo.findById(customerid);
	            Scheme scheme = schemeRepo.findBySchemename(schemename);
	            
	            Optional<Agent> agent=agentRepo.findById(selectedAgent);
	            Agent agent2=null;
	            
	            if(agent.isPresent()) {
	            	agent2=agent.get();
	            	policy.setAgent(agent2);
	            }
	           

	            if (customer.isPresent()) {
	                // Save the policy
	                policy.setCustomer(customer.get());
	                policy.setScheme(scheme);
	                Policy savedPolicy = policyRepo.save(policy);
	                policy.setPremiumtype(convertPremiumTypeToString(premiumt));

	                // Save associated documents
	                List<Document> documents = new ArrayList<>();
	                for (MultipartFile documentFile : documentFiles) {
	                    if ("application/pdf".equals(documentFile.getContentType())) {
	                        Document document = new Document();
	                        document.setDocumentname(documentFile.getOriginalFilename());
	                        document.setDocumentFile(documentFile.getBytes());
	                        document.setPolicy(savedPolicy); // Associate the document with the saved policy
	                        documents.add(document);
	                    } else {
	                        log.error("Uploaded document is not a PDF");
	                    }
	                }
	                policy.setDocuments(documents);
	                documentRepo.saveAll(documents); // Save all documents

	                return ResponseEntity.ok("Insurance policy added successfully.");
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("File size is too large. File size should be less than 2MB");
	        }
	    }
		
		// Helper function to convert premium type integer to string
		private String convertPremiumTypeToString(Integer premiumtype) {
		   switch (premiumtype) {
		      case 3:
		         return "three_months";
		      case 6:
		         return "six_months";
		      case 12:
		         return "twelve_months";
		      default:
		         return null; // Handle invalid input
		   }
		}

		
	//get all policy
			@GetMapping("/getall")
			public ResponseEntity<List<PolicyDto>> getallpolicy() {
				
				List<PolicyDto> policyDtos= policyService.getallpolicy();
				
				return new ResponseEntity(policyDtos,HttpStatus.OK);
			}	

	//get policy by customerid in pageable
		
		@GetMapping("/getallpolicy")
		public Page<Policy> getallpolicies(@RequestParam(defaultValue = "0") int pageno,@RequestParam(defaultValue = "4")int pagesize,
				@RequestParam(name = "customerid") int customerid){
			return policyService.getallinpage(pageno, pagesize, customerid);
		}
		
		
	
		
		
	//get all policy by customerid	
		@GetMapping("getbycustomerid")
		public ResponseEntity<List<Policy>> getbycustomerid(@RequestParam(name="customerid") Integer customerid){
			return policyService.getbycustomerid(customerid);
		}
		
		
		
		
		
	//get policy by policy number
		@GetMapping("getbypolicynumber")
		public ResponseEntity<PolicyDto> getbypolicynumber(@RequestParam(name="policynumber") Integer policynumber){
			
			return policyService.getbypolicynumber(policynumber);
		}
	
//	//get customer of policy by agents
//	 @GetMapping("/policycustomer/{agentid}")
//	    public ResponseEntity<List<Policy>> getCustomersByAgentId(@PathVariable Integer agentid) {
//	        return policyService.getCustomersByAgentId(agentid);
//	    }
		
		 @GetMapping("customerbyagent/{agentid}")
		    public ResponseEntity<List<CustomerDto>> getCustomersByAgent(@PathVariable Integer agentid) {
		        // Fetch the agent by ID from your agent repository
		        Agent agent = agentRepo.findById(agentid).orElse(null);

		        

		       List<CustomerDto> customerDtos= policyService.getCustomersByAgent(agent);
		       
		       return new ResponseEntity(customerDtos,HttpStatus.OK);
		 }
		
		 
		 @GetMapping("agent/{agentid}")
		    public ResponseEntity<List<PolicyDto>> getPoliciesByAgent(@PathVariable(name="agentid") Integer agentid) {
		        List<Policy> policies = policyService.getagentpolicies(agentid);
		        
		        
		        
		        List<PolicyDto> policyDtos=new ArrayList<>();
		        
		        
		        for(Policy policy:policies) {
		        	
		        	List<Payment> payments=paymentRepo.findByPolicyPolicynumber(policy.getPolicynumber());
		        	
		        	PolicyDto policyDto=new PolicyDto();
		        	
		        	policyDto.setPolicyNumber(policy.getPolicynumber());
					policyDto.setIssueDate(policy.getIssuedate());
					policyDto.setMaturityDate(policy.getMaturitydate());
					policyDto.setPremiumType(policy.getPremiumtype());
					policyDto.setPremiumAmount(policy.getPremiumamount());
					policyDto.setNumberOfInstallment(policy.getNumberofinstallment());
					policyDto.setStatus(policy.getStatus()); // Assuming StatusType is an enum
					policyDto.setCustomerId(policy.getCustomer().getCustomerid());
					policyDto.setCustomerName(policy.getCustomer().getFirstname());
					policyDto.setSchemeId(policy.getScheme().getSchemeid());
					policyDto.setPaidInstallments(payments.size());
					
					policyDtos.add(policyDto);
		        }
		        
		        return new ResponseEntity(policyDtos,HttpStatus.OK); 
		        
		        
		        
		        
		        
		    }
		 
		 
		 @PostMapping("changestatuspolicy/{policynumber}")
		 public ResponseEntity<String> policystatusupdate(
		   @PathVariable(name = "policynumber") Integer policynumber,
		   @RequestBody String newAction // Receive newAction from the request body
		 ) {
		   newAction = newAction.toUpperCase(); // Convert newAction to uppercase

		   Optional<Policy> policy = policyRepo.findById(policynumber);

		   Policy policy2 = null;

		   if (policy.isPresent()) {
		     policy2 = policy.get();

		     // Use .equals() to compare strings
		     if ("VERIFIED".equals(newAction)) {
		       policy2.setStatus(StatusType.VERIFIED);
//		       throw new PolicyAlreadyVerified("already Verified");
		     } else if ("REJECTED".equals(newAction)) {
		       policy2.setStatus(StatusType.REJECTED);
		     }

		     policyRepo.save(policy2);

		     return new ResponseEntity<>("PolicyStatus Changed", HttpStatus.OK);
		   }

		   return new ResponseEntity<>("policy not found", HttpStatus.NOT_FOUND);
		 }
		 
		 
		 @GetMapping("/getcustomerpolicy/{customerid}")
		 public ResponseEntity<List<PolicyDto>> getCustomerPolicy(@PathVariable(name="customerid") Integer customerid){
			 
			 List<PolicyDto> policyDtos= policyService.getcustomerpolicy(customerid);
			 
			 
			 return new ResponseEntity(policyDtos,HttpStatus.OK); 
			 
		 }


		 
	
	
}

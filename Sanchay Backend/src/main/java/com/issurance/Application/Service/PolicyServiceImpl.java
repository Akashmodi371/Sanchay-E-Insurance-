package com.issurance.Application.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.query.ReturnableType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;

import com.issurance.Application.Dto.CustomerDto;
import com.issurance.Application.Dto.PolicyDto;
import com.issurance.Application.entities.Agent;
import com.issurance.Application.entities.Customer;
import com.issurance.Application.entities.Document;
import com.issurance.Application.entities.Payment;
import com.issurance.Application.entities.Plan;
import com.issurance.Application.entities.Policy;
import com.issurance.Application.entities.Scheme;
import com.issurance.Application.entities.StatusType;
import com.issurance.Application.exceptions.PolicyNotFoundException;
import com.issurance.Application.repository.AdminRepo;
import com.issurance.Application.repository.AgentRepo;
import com.issurance.Application.repository.CustomerRepo;
import com.issurance.Application.repository.EmployeeRepo;
import com.issurance.Application.repository.PaymentRepo;
import com.issurance.Application.repository.PlanRepo;
import com.issurance.Application.repository.PolicyRepo;
import com.issurance.Application.repository.RoleRepo;
import com.issurance.Application.repository.SchemeRepo;
import com.issurance.Application.repository.UserInfoRepo;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//@AllArgsConstructor
//@RequiredArgsConstructor
@Slf4j
@Service
public class PolicyServiceImpl implements PolicyService{
	
	@Autowired
	private PaymentRepo paymentRepo;
	
	
	private static final Logger log = LoggerFactory.getLogger(PolicyServiceImpl.class);

	
	@Autowired
	private PlanRepo planRepo;


	@Autowired
	private PolicyRepo policyRepo;

	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private SchemeRepo schemeRepo;

	
	@Autowired
	private AgentRepo agentRepo;
	
	@Override
	public ResponseEntity<String> addPolicy(Policy policy, Integer customerid, Integer schemeid) {
		
		Optional<Customer> customer=customerRepo.findById(customerid);
		Optional<Scheme> scheme=schemeRepo.findById(schemeid);
		
		Customer customer2=null;
		Scheme scheme2=null;
		
		if(customer.isPresent() && scheme.isPresent()) {
			customer2=customer.get();
			scheme2=scheme.get();
			policy.setCustomer(customer2);
			policy.setScheme(scheme2);
			policyRepo.save(policy);
			
			return new ResponseEntity("Added Policy Successfully",HttpStatus.OK);
		}
		
		return new ResponseEntity("Incorrect customerid or schemeid",HttpStatus.OK);
	}
	
	//get policies by customerid in pages
		@Override
		public Page<Policy> getallinpage(int pageno, int pagesize, int customerid) {
			
			List<Policy> policies=policyRepo.findByCustomerCustomerid(customerid);			
			
			Pageable pageable = PageRequest.of(pageno, pagesize);
		
			 int start = pageno * pagesize;
			    int end = Math.min(start + pagesize, policies.size());
			    
			 List<Policy> pagepolicy=policies.subList(start, end);
			 
			 Page<Policy> generated = new PageImpl<>(pagepolicy, pageable, policies.size());
			 
			 return generated;
		}
		
		
	@Override
	public ResponseEntity<List<Policy>> getbycustomerid(Integer customerid) {
		
		Optional<Customer> customer=customerRepo.findById(customerid);
		
		Customer customer2=null;
		
		if(customer.isPresent()) {
			
			customer2=customer.get();
			
			List<Policy> policies=customer2.getPolicies();
			
			return new  ResponseEntity(policies,HttpStatus.OK);
		}
		return new ResponseEntity(null,HttpStatus.OK);
	}


	@Override
	public ResponseEntity<PolicyDto> getbypolicynumber(Integer policynumber) {
		
		Optional<Policy> policy2=policyRepo.findById(policynumber);
		Policy policy=null;
		PolicyDto policyDto=new PolicyDto();
		if(policy2.isPresent()) {
			policy=policy2.get();
			
			policyDto.setPolicyNumber(policy.getPolicynumber());
			policyDto.setIssueDate(policy.getIssuedate());
			policyDto.setMaturityDate(policy.getMaturitydate());
			policyDto.setPremiumType(policy.getPremiumtype());
			policyDto.setPremiumAmount(policy.getPremiumamount());
			policyDto.setNumberOfInstallment(policy.getNumberofinstallment());
			policyDto.setStatus(policy.getStatus()); // Assuming StatusType is an enum
			policyDto.setCustomerId(policy.getCustomer().getCustomerid());
			policyDto.setSchemeId(policy.getScheme().getSchemeid());
			policyDto.setSchemeName(policy.getScheme().getSchemename());
			policyDto.setPayments(policy.getPayments());
			policyDto.setAgentId(policy.getAgent().getAgentid());
			return new ResponseEntity(policyDto,HttpStatus.OK);
		}
		
		throw new PolicyNotFoundException("not policy exists");
	}

	@Override
	public ResponseEntity<Policy> addPolicyBySchemename(Policy policy, Integer customemrid, String schemename,List<MultipartFile> documentFiles) {
		
		Optional<Customer> customer=customerRepo.findById(customemrid);
		Scheme scheme=schemeRepo.findBySchemename(schemename);
		
		Customer customer2=null;
		Policy policy2=null;
		if(customer.isPresent()) {
			


			List<Document> documents = new ArrayList<>();
			for (MultipartFile documentFile : documentFiles) {
				if ("application/pdf".equals(documentFile.getContentType())) {
					Document document = new Document();
					String filename=(documentFile.getOriginalFilename());
					document.setDocumentname(filename);
					try {
						document.setDocumentFile(documentFile.getBytes());
					} catch (java.io.IOException e) {
						e.printStackTrace();
					}
					document.setPolicy(policy);
					documents.add(document);
				} else {

					log.error("Uploaded document is not a PDF");
				}
			}
			

			policy.setCustomer(customer.get());
			System.out.println(scheme.getSchemename());
			policy.setScheme(scheme);
			policy2=policyRepo.save(policy);	
		}
		log.info("policy Added Successfully");
		
		return new ResponseEntity(policy2,HttpStatus.OK);
		
	}

	@Override
	public List<PolicyDto> getallpolicy() {
		List<Policy> policies=policyRepo.findAll();
		
		
		if(policies.size()==0) {
			throw new PolicyNotFoundException("Not policy present");
		}
		
		List<PolicyDto> policyDtos=new ArrayList<>();
		
		for(Policy policy :policies) {
			
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
			policyDto.setSchemeId(policy.getScheme().getSchemeid());
			policyDto.setPaidInstallments(payments.size());
//			if(policy.getAgent().getAgentid()==0) {
//				policyDto.setAgentId(0);
//			}
			policyDto.setAgentId(policy.getAgent().getAgentid());
			

			// Assuming nominee, payments, documents, and claims are related entities,
			// you can populate them as needed
//			policyDto.setNomineename(policy.getNominee().getNomineeName());
			
			policyDtos.add(policyDto);
		}
		
		return policyDtos;
	}

	@Override
	public List<CustomerDto> getCustomersByAgent(Agent agent) {
        List<Policy> policies = policyRepo.findByAgent(agent);
        
        
        
        List<Customer> customers= policies.stream().map(Policy::getCustomer).collect(Collectors.toList());
        
        List<CustomerDto> customerDtos=new ArrayList<>();
        
        for(Customer customer:customers) {
        	CustomerDto customerDto=new CustomerDto();
        	
        	customerDto.setCustomerid(customer.getCustomerid());
            customerDto.setFirstname(customer.getFirstname());
            customerDto.setLastname(customer.getLastname());
            customerDto.setEmail(customer.getEmail());
            customerDto.setAddress(customer.getAddress());
            customerDto.setState(customer.getState());
            customerDto.setCity(customer.getCity());
            customerDto.setPincode(customer.getPincode());
            customerDto.setMobileno(customer.getMobileno());
            customerDto.setBirthdate(customer.getBirthdate());
            customerDto.setUsername(customer.getUserInfo().getUsername());

            // Add the populated CustomerDto to the list
            customerDtos.add(customerDto);
        }
        
        return customerDtos;
        
        
//        List<CustomerDto> customerDtos=customers;
        
//        for (Customer customer : customers){ {
//			for(CustomerDto customerDto:customerDtos) {
//				customerDto.setAddress(customer.getAddress());
//				customerDto.setCity(customer.getCity());
//				customerDto.setCustomerid(customer.getCustomerid());
//				customerDto.setFirstname(customer.getFirstname());
//				customerDto.setEmail(customer.getEmail());
//				customerDto.setPincode(customer.getPincode());
//				customerDto.setPolicynumber(customer.getPolicies.().get);
//				
//				
//			}
//		}
    }

	@Override
	public List<Policy> getagentpolicies(int agentid) {
		
		Optional<Agent> agent=agentRepo.findById(agentid);
		
		Agent agent2=null;
		
		List<Policy> policie=null;
		if(agent.isPresent()) {
			agent2=agent.get();
		 policie= policyRepo.findByAgent(agent2);
		}
		
		return policie;
		
		
	
		
	}

	@Override
	public ResponseEntity<String> policystatusupdate(Integer policynumber, String status) {
	    
	    Optional<Policy> policy = policyRepo.findById(policynumber);

	    Policy policy2 = null;

	    if (policy.isPresent()) {
	        policy2 = policy.get();

	        // Use .equals() to compare strings
	        if ("VERIFIED".equals(status)) {
	            policy2.setStatus(StatusType.VERIFIED);
	        } else if ("REJECTED".equals(status)) {
	            policy2.setStatus(StatusType.REJECTED);
	        }

	        policyRepo.save(policy2);

	        return new ResponseEntity<>("PolicyStatus Changed", HttpStatus.OK);
	    }

	    return new ResponseEntity<>("policy not found", HttpStatus.NOT_FOUND);
	}

	@Override
	public List<PolicyDto> getcustomerpolicy(Integer customerid) {
		
		Optional<Customer> customer=customerRepo.findById(customerid);
		
		
		Customer customer2=null;
		List<PolicyDto> policyDtos=new ArrayList<>();
		
		
		if(customer.isPresent()) {
			customer2=customer.get();
			List<Policy> policies=customer2.getPolicies();
			
			for(Policy policy:policies) {
				PolicyDto policyDto=new PolicyDto();
				
				policyDto.setPolicyNumber(policy.getPolicynumber());
	            policyDto.setIssueDate(policy.getIssuedate());
	            policyDto.setMaturityDate(policy.getMaturitydate());
	            policyDto.setPremiumType(policy.getPremiumtype());
	            policyDto.setPremiumAmount(policy.getPremiumamount());
	            policyDto.setNumberOfInstallment(policy.getNumberofinstallment());
	            policyDto.setStatus(policy.getStatus());
	            policyDto.setAgentId(policy.getAgent().getAgentid());	            policyDto.setSchemeName(policy.getScheme().getSchemename());
	            // Set customer and scheme IDs directly since they are integers
	            policyDto.setCustomerId(customer2.getCustomerid());
	            policyDto.setSchemeId(policy.getScheme().getSchemeid());
	            
	            policyDtos.add(policyDto);
				
			}
			
		}
		
		return policyDtos;
		
	}


	
	
	

	
	
	
	
	
	
	
	
	







	
}

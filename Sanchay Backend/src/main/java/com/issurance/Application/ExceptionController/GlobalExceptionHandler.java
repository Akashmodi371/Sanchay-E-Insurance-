package com.issurance.Application.ExceptionController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.issurance.Application.exceptions.DocumentNotFoundException;
import com.issurance.Application.exceptions.EmailNotFoundException;
import com.issurance.Application.exceptions.EmployeeNotFoundException;
import com.issurance.Application.exceptions.PolicyNotFoundException;
import com.issurance.Application.exceptions.PolicyStatusIsPending;
import com.issurance.Application.exceptions.SchemeNotFoundException;
import com.issurance.Application.exceptions.ValidationDataException;
import com.issurance.Application.exceptions.WrongCredentialException;



@ControllerAdvice
public class GlobalExceptionHandler {
	
	
	@ExceptionHandler(PolicyNotFoundException.class)
	public ResponseEntity<ErrorHandler> PolicyNotFoundHandler(PolicyNotFoundException policyNotFoundException){
	
		ErrorHandler error=new ErrorHandler(HttpStatus.NOT_FOUND.value(),policyNotFoundException.getMessage(),System.currentTimeMillis());
	
	return new ResponseEntity<>(error,HttpStatus.OK);
	}
	
//	@ExceptionHandler(SchemeNotFoundException.class)
//	public ResponseEntity<ErrorHandler> SchemNotFoundHandler(SchemeNotFoundException schemeNotFoundException){
//	
//		ErrorHandler error=new ErrorHandler(HttpStatus.NOT_FOUND.value(),schemeNotFoundException.getMessage(),System.currentTimeMillis());
//	
//	return new ResponseEntity<>(error,HttpStatus.OK);
//	}
	
	
	// Scheme Not Found Exceptiong
	@ExceptionHandler(SchemeNotFoundException.class)
	public ResponseEntity<String> SchemNotFoundHandler(SchemeNotFoundException schemeNotFoundException){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(schemeNotFoundException.getMessage());
	}
	
	//Wrong Credentials Exception
	@ExceptionHandler(WrongCredentialException.class)
	public ResponseEntity<String> wrongCredentialsHandler(WrongCredentialException wrongCredentialException){
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(wrongCredentialException.getMessage());
	}
	
	//Document Not Found Exception
	@ExceptionHandler(DocumentNotFoundException.class)
	public ResponseEntity<String> DocumentNotFoundHandle(DocumentNotFoundException documentNotFoundException){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(documentNotFoundException.getMessage());
	}
	
	//Employee Not Found Exception
	
	@ExceptionHandler(EmployeeNotFoundException.class)
	public ResponseEntity<String> EmployeeNotFoundHandler(EmployeeNotFoundException employeeNotFoundException){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(employeeNotFoundException.getMessage());
	}
	
	//Policy Status Pending Exception
	@ExceptionHandler(PolicyStatusIsPending.class)
	public ResponseEntity<String> PolicyStatusPendingHandler(PolicyStatusIsPending policyStatusIsPending){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(policyStatusIsPending.getMessage());
	}
	
	//for not mail found exception
	@ExceptionHandler(EmailNotFoundException.class)
	public ResponseEntity<String> EmailNOtFoundHandler(EmailNotFoundException emalEmailNotFoundException){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emalEmailNotFoundException.getMessage());
	}
	
	// for insufficient withdrawn
	 @ExceptionHandler(com.issurance.Application.exceptions.InsufficentCommission.class)
	 	public ResponseEntity<String> InsufficentCommission(com.issurance.Application.exceptions.InsufficentCommission insufficentCommission){
	 		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(insufficentCommission.getMessage());
	 	}
	
	//Scheme already exists Exception handler
	 @ExceptionHandler(com.issurance.Application.exceptions.SchemeNameExistsExceptions.class)
	 	public ResponseEntity<String> SchemeExists(com.issurance.Application.exceptions.SchemeNameExistsExceptions schemeNameExistsExceptions){
	 		return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(schemeNameExistsExceptions.getMessage());
	 	}
	 
	 // userName Already Exists
	 @ExceptionHandler(com.issurance.Application.exceptions.UserNameAlreadyExist.class)
		public ResponseEntity<String> UserNameAlreadyExist(com.issurance.Application.exceptions.UserNameAlreadyExist userNameAlreadyExist){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userNameAlreadyExist.getMessage());
		}
		
		
	//Email id already exists	
		@ExceptionHandler(com.issurance.Application.exceptions.EmailIdAlreadyExist.class)
		public ResponseEntity<String> EmailIdAlreadyExist(com.issurance.Application.exceptions.EmailIdAlreadyExist emailIdAlreadyExist){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(emailIdAlreadyExist.getMessage());
		}
		
	//No Feedback Available
		@ExceptionHandler(com.issurance.Application.exceptions.NoFeedbackAvailableException.class)
		public ResponseEntity<String> NoFeedbackAvailableException(com.issurance.Application.exceptions.NoFeedbackAvailableException noFeedbackAvailableException){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(noFeedbackAvailableException.getMessage()); 
		}
		
	//Plan ALready Exists
		@ExceptionHandler(com.issurance.Application.exceptions.PlanAlreadyExist.class)
		public ResponseEntity<String> PlanAlreadyExist(com.issurance.Application.exceptions.PlanAlreadyExist planAlreadyExist){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(planAlreadyExist.getMessage()); 
		}
	
	//Policy Already verified
		@ExceptionHandler(com.issurance.Application.exceptions.PolicyAlreadyVerified.class)
		public ResponseEntity<String> PolicyAlreadyVerified(com.issurance.Application.exceptions.PolicyAlreadyVerified policyAlreadyVerified){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(policyAlreadyVerified.getMessage()); 
		}
	 //form data validation
		
		@ExceptionHandler(ValidationDataException.class)
		public ResponseEntity<String> ValidationDataExceptionhandler(ValidationDataException validationDataException){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(validationDataException.getMessage()); 
		}
	 
	 // For Any General Exception Handler	
	 @ExceptionHandler(Exception.class)
	    public ResponseEntity<String> handleGeneralException(Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
	    }
	 
	

	 
	 
	 
	 
	 
}

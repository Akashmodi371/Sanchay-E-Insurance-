package com.issurance.Application.exceptions;

public class PolicyAlreadyVerified extends RuntimeException{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "PolicyAlreadyVerified [message=" + message + "]";
	}

	public PolicyAlreadyVerified(String message) {
		super();
		this.message = message;
	}

	

  

}
package com.issurance.Application.exceptions;

public class PolicyStatusIsPending extends RuntimeException {

private String message;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public PolicyStatusIsPending(String message) {
		super();
		this.message = message;
	}

	@Override
	public String toString() {
		return "PolicyStatusIsPending [message=" + message + "]";
	}
	
	
	
}

package com.issurance.Application.exceptions;

public class PolicyNotFoundException extends RuntimeException{
		
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public PolicyNotFoundException(String message) {
		super();
		this.message = message;
	}

	@Override
	public String toString() {
		return "PolicyNotFoundException [message=" + message + "]";
	}
}

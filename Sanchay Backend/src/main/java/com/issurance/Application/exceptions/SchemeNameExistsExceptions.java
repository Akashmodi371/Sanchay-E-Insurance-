package com.issurance.Application.exceptions;

public class SchemeNameExistsExceptions extends RuntimeException{

	
	
	private String message;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public SchemeNameExistsExceptions(String message) {
		super();
		this.message = message;
	}

	@Override
	public String toString() {
		return "SchemeNameExistsExceptions [message=" + message + "]";
	}
	
	
}

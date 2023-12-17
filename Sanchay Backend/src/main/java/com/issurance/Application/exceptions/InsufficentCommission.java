package com.issurance.Application.exceptions;

public class InsufficentCommission extends RuntimeException{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}



	public InsufficentCommission(String message) {
		super();
		this.message = message;
	}

	@Override
	public String toString() {
		return "InsufficentCommission [message=" + message + "]";
	}
	
	
	

}
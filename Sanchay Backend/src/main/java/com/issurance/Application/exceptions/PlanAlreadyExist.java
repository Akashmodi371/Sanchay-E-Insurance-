package com.issurance.Application.exceptions;

public class PlanAlreadyExist extends RuntimeException{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public PlanAlreadyExist(String message) {
		super();
		this.message = message;
	}

	@Override
	public String toString() {
		return "PlanAlreadyExist [message=" + message + "]";
	}

	

}
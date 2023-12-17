package com.issurance.Application.exceptions;

public class EmailIdAlreadyExist extends RuntimeException{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "EmailIdAlreadyExist [message=" + message + "]";
	}

	public EmailIdAlreadyExist(String message) {
		super();
		this.message = message;
	}


}
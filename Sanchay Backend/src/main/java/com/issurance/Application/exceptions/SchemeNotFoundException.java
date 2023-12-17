package com.issurance.Application.exceptions;

public class SchemeNotFoundException extends RuntimeException{

	private String message;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "SchemeNotFoundException [message=" + message + "]";
	}

	public SchemeNotFoundException(String message) {
		super();
		this.message = message;
	}
}

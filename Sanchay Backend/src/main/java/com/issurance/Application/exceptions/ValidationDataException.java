package com.issurance.Application.exceptions;

public class ValidationDataException extends RuntimeException{

	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ValidationDataException(String message) {
		super();
		this.message = message;
	}

	@Override
	public String toString() {
		return "ValidationDataException [message=" + message + "]";
	}

	public ValidationDataException() {
		super();
	}
	
	
}

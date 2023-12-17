package com.issurance.Application.exceptions;

public class NoFeedbackAvailableException extends RuntimeException {
	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "NoFeedbackAvailableException [message=" + message + "]";
	}

	public NoFeedbackAvailableException(String message) {
		super();
		this.message = message;
	}

	

}
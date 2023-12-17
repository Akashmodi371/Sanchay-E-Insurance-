package com.issurance.Application.exceptions;

import org.springframework.http.HttpStatus;

public class UserApiException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;
	private HttpStatus status;
	public UserApiException(HttpStatus status, String message ) {
		super();
		this.message = message;
		this.status = status;
	}
	@Override
	public String toString() {
		return "UserApiException [message=" + message + ", status=" + status + "]";
	}
	
}

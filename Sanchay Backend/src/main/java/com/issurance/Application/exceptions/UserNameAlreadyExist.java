package com.issurance.Application.exceptions;

public class UserNameAlreadyExist extends RuntimeException{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public UserNameAlreadyExist(String message) {
		super();
		this.message = message;
	}

	public UserNameAlreadyExist() {
		super();
	}

	@Override
	public String toString() {
		return "UserNameAlreadyExist [message=" + message + "]";
	}



}
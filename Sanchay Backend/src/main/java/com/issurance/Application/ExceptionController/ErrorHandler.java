package com.issurance.Application.ExceptionController;

public class ErrorHandler {

	private int status;
	private String body;
	private long milisecond;
	public ErrorHandler(int status, String body, long milisecond) {
		super();
		this.status = status;
		this.body = body;
		this.milisecond = milisecond;
	}
	
	@Override
	public String toString() {
		return "ExceptionHandler [status=" + status + ", body=" + body + ", milisecond=" + milisecond + "]";
	}

	public ErrorHandler() {
		super();
	}

	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public long getMilisecond() {
		return milisecond;
	}
	public void setMilisecond(long milisecond) {
		this.milisecond = milisecond;
	}
	
}

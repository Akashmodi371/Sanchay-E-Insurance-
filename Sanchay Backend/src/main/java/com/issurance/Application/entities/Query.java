package com.issurance.Application.entities;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class Query {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int queryid;
	
	
	@Column
	private String title;
	
	@Column
	private String messagequery;
	
	@Column(columnDefinition = "VARCHAR(255) default 'wait for Reply'")
	private String replyquery;
	
	@Column(nullable = false, columnDefinition = "VARCHAR(20) default 'Pending'")
	private String status;
	
	@ManyToOne
    @JoinColumn(name = "customerid")
	@JsonIgnore
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "employeeid")
    @JsonIgnore
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "adminid")
    @JsonIgnore
    private Admin admin;
	
	
	
}

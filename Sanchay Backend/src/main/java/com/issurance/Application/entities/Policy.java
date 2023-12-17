package com.issurance.Application.entities;


import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import ch.qos.logback.core.status.Status;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
public class Policy {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int policynumber;
	
	@Column
	private Date issuedate;
	
	@Column
	private Date maturitydate;
	
	@Column
	private String premiumtype;
	
	@Column
	private double premiumamount;
	
	@Column
	private int numberofinstallment;
	
	@Column
	@Enumerated(EnumType.STRING)
	private StatusType status;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH})
	@JoinColumn(name="customerid", referencedColumnName = "customerid")
	@JsonIgnore
	private Customer customer;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH,CascadeType.PERSIST})
	@JoinColumn(name = "schemeid",referencedColumnName = "schemeid")
	@JsonIgnore
	private Scheme scheme;
	
	@OneToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH,CascadeType.PERSIST})
	@JoinColumn(name="policynumber")
//	@JsonIgnore
	private List<Payment>payments;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="documentnumber")
	private List<Document> documents;
	
	@OneToOne
	@JoinColumn(name = "nominee_id") 
	private Nominee nominee;

	@OneToMany( cascade = CascadeType.ALL)
	@JoinColumn(name="policynumber")
	private List<Claim> claims;
	
	@ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "agentid", referencedColumnName = "agentid", nullable = true)
	private Agent agent;

//	
//	@OneToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH,CascadeType.PERSIST})
//	@JoinColumn(name="policynumber")
//	private List<Claim>claims;
	
	
	
	
}

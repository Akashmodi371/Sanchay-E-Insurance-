package com.issurance.Application.entities;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.query.sqm.CastType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Customer {

	
	@Column
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int customerid;
	
	@Column
	@NotNull
	private String firstname;
	
	@Column
	@NotNull
	private String lastname;
	
	@Column
	private String email;
	
	@Column
	private String address;
	
	@Column
	private String state;
	
	@Column
	private String city;
	
	@Column
	private int pincode;
	
	@Column 
//	@Size(min = 10, max = 10, message = "Mobile number must be 10 digits")
//	@Pattern(regexp = "\\d{10}", message = "Mobile number must be exactly 10 digits")
	private long mobileno;
	
	
	@Column
	private LocalDate birthdate;
	
//	@PrePersist
//	    private void beforePersist() {
//		date = LocalDate.now();
//	 }
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userid", referencedColumnName = "userid")
//	@JsonIgnore
	private UserInfo userInfo;
	
	
	
	@ManyToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH},mappedBy = "customers")
	@JsonIgnore
	private List<Agent> agents;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="customerid")
	private List<Policy> policies;
	
	@OneToMany(mappedBy = "customer")
    private List<Query> queries;
}

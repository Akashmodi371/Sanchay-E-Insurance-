package com.issurance.Application.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Agent {
	
	
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int agentid;
	
	@Column
	private String firstname;
	
	@Column
	private String lastname;
	
	@Column
	private String email;
	
	@Column
	private String mobileno;
	
	@Column
	private String referencenumber;
	
	@Column(columnDefinition = "varchar(255) default 'ACTIVE'")
	private String status;
	
	@Column
	private double commission;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userid", referencedColumnName = "userid")
//	@JsonIgnore
	private UserInfo userInfo;
	
	@ManyToMany
    @JoinTable(
        name = "agent_customer",
        joinColumns = @JoinColumn(name = "agentid"),
        inverseJoinColumns = @JoinColumn(name = "customerid")
    )
    private List<Customer> customers;
	
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "agent")
	private List<Withdraw> withdraws;
	
	@OneToMany(cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinColumn(name="agentid")
	private List<Policy> policies;
	
}

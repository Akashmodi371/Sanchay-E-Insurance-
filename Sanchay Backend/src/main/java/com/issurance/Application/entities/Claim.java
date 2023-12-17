package com.issurance.Application.entities;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Claim {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int claimid;
	
	@Column
	private Date claimdate;
	
	@Column
	private double claimamount;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="policynumber",referencedColumnName = "policynumber")
	private Policy policy;
	
	
}

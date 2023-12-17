package com.issurance.Application.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
public class Document {
	

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int documentid;
	
	
	@Column
	private String documentname;
	
	@Column
	private String documentpath;
	
	@Column
    private String documentType;
	
	
	@Column(name = "documentfile",length=2000000)
	@Lob
    private byte[] documentFile;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinColumn(name="documentnumber", referencedColumnName = "policynumber")
	private Policy policy;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinColumn(name="clainnumber", referencedColumnName = "claimid")
	private Claim claims;
}

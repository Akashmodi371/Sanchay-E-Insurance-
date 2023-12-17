package com.issurance.Application.Dto;

import java.sql.Date;
import java.util.List;

import com.issurance.Application.entities.Payment;
import com.issurance.Application.entities.StatusType;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class PolicyDto {
	
	private int policyNumber;
    private Date issueDate;
    private Date maturityDate;
    private String premiumType;
    private double premiumAmount;
    private int numberOfInstallment;
    private StatusType status;
    private int customerId;
    private String customerName;
    private String schemeName;
    private String planName;
    private int schemeId;
    private List<Payment> payments;
    private List<DocumentDto> documents;
    private String  nomineename;
    private List<ClaimDto> claims;
    private int agentId;
    @Column(columnDefinition = "int default 0")
    private int paidInstallments;
}

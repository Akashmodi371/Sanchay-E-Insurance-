package com.issurance.Application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Integer> {

	List<Payment> findByPolicyPolicynumber(int policynumber);
}

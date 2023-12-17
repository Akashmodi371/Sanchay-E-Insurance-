package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Claim;

public interface ClaimRepo extends JpaRepository<Claim, Integer> {

}

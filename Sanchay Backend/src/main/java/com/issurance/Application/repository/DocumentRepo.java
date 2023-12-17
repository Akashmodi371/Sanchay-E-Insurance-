package com.issurance.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issurance.Application.entities.Document;

public interface DocumentRepo extends JpaRepository<Document, Integer>{

}

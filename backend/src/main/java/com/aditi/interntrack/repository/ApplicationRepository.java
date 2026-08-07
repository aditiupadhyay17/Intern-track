package com.aditi.interntrack.repository;

import com.aditi.interntrack.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}

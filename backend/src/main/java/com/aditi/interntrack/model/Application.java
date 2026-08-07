package com.aditi.interntrack.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Role is required")
    private String role;

    @Enumerated(EnumType.STRING)
    private Status status = Status.APPLIED;

    private LocalDate dateApplied;

    @Column(length = 1000)
    private String notes;

    public enum Status {
        APPLIED, OA_ROUND, INTERVIEW, OFFER, REJECTED
    }

    public Application() {
    }

    public Application(String companyName, String role, Status status, LocalDate dateApplied, String notes) {
        this.companyName = companyName;
        this.role = role;
        this.status = status;
        this.dateApplied = dateApplied;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(LocalDate dateApplied) {
        this.dateApplied = dateApplied;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}

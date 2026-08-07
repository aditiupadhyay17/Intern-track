package com.aditi.interntrack.controller;

import com.aditi.interntrack.model.Application;
import com.aditi.interntrack.repository.ApplicationRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository repository;

    public ApplicationController(ApplicationRepository repository) {
        this.repository = repository;
    }

    // GET /api/applications - list all
    @GetMapping
    public List<Application> getAll() {
        return repository.findAll();
    }

    // GET /api/applications/{id} - get one
    @GetMapping("/{id}")
    public ResponseEntity<Application> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/applications - create
    @PostMapping
    public ResponseEntity<Application> create(@Valid @RequestBody Application application) {
        Application saved = repository.save(application);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // PUT /api/applications/{id} - update
    @PutMapping("/{id}")
    public ResponseEntity<Application> update(@PathVariable Long id, @Valid @RequestBody Application updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setCompanyName(updated.getCompanyName());
                    existing.setRole(updated.getRole());
                    existing.setStatus(updated.getStatus());
                    existing.setDateApplied(updated.getDateApplied());
                    existing.setNotes(updated.getNotes());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/applications/{id} - delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

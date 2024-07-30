package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.RegistrationDto;
import org.example.model.QueueRegistration;
import org.example.model.Registration;
import org.example.service.QueueRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/queue-registration")
public class QueueRegistrationController {
    @Autowired
    private QueueRegistrationService queueRegistrationService;

    @GetMapping("/get")
    public ResponseEntity<List<QueueRegistration>> getAll() {
        return ResponseEntity.ok(queueRegistrationService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<List<QueueRegistration>> add(@RequestBody @Valid RegistrationDto registrationDto){
        return ResponseEntity.ok(queueRegistrationService.add(registrationDto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam int id) {
        queueRegistrationService.deleteById(id);
        return ResponseEntity.ok("Успешно удалено!");
    }
}

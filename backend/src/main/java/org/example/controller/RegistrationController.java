package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.FreePlaceDto;
import org.example.dto.RegistrationDto;
import org.example.model.QueueRegistration;
import org.example.model.Registration;
import org.example.model.Registrations;
import org.example.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/registration")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/get")
    public ResponseEntity<List<Registration>> getAll() {
        return ResponseEntity.ok(registrationService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<Registration> add(@RequestBody QueueRegistration queueRegistration){
        Object object = registrationService;
        System.out.println(object.getClass());
        return ResponseEntity.ok(registrationService.add(queueRegistration));
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<String> cancel(@RequestParam int id) {
        registrationService.cancel(id);
        return ResponseEntity.ok("Отменено");
    }

    @PostMapping("/add-by-phone")
    public ResponseEntity<List<Registration>> addByPhone(@RequestBody RegistrationDto registrationDto){
        return ResponseEntity.ok(registrationService.addByPhone(registrationDto));
    }

    @GetMapping("/get-actives")
    public ResponseEntity<List<Registrations>> getActives(@RequestParam int id) {
        return ResponseEntity.ok(registrationService.getActives(id));
    }

    @GetMapping("/get-olds")
    public ResponseEntity<List<Registrations>> getOlds(@RequestParam int id) {
        return ResponseEntity.ok(registrationService.getOlds(id));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam int id) {
        registrationService.deleteById(id);
        return ResponseEntity.ok("Удалено успешно!");
    }
}

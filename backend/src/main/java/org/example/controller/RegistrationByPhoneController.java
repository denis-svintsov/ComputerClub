package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.RegistrationByPhoneDto;
import org.example.model.RegistrationByPhone;
import org.example.service.RegistrationByPhoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration-by-phone")
public class RegistrationByPhoneController {
    @Autowired
    private RegistrationByPhoneService registrationByPhoneService;

    @PostMapping("/add")
    public ResponseEntity<RegistrationByPhone> add(@RequestBody @Valid RegistrationByPhoneDto registrationByPhoneDto) {
        return ResponseEntity.ok(registrationByPhoneService.add(registrationByPhoneDto));
    }

    @GetMapping("/get")
    public ResponseEntity<List<RegistrationByPhone>> getAll() {
        return ResponseEntity.ok(registrationByPhoneService.getAll());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<RegistrationByPhone> getById(@PathVariable int id) {
        return ResponseEntity.ok(registrationByPhoneService.getById(id));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam int id) {
        registrationByPhoneService.deleteById(id);
        return ResponseEntity.ok("Успешно удалено!");
    }
}

package org.example.service;

import org.example.dto.RegistrationDto;
import org.example.model.QueueRegistration;

import java.util.List;

public interface QueueRegistrationService {
    List<QueueRegistration> add(RegistrationDto registrationDto);
    List<QueueRegistration> getAll();
    List<QueueRegistration> getAllByUserId(int id);
    List<QueueRegistration> getAllByUsername(String username);
    void deleteById(int id);
}

package org.example.service;

import org.example.dto.RegistrationDto;
import org.example.model.QueueRegistration;
import org.example.model.Registration;
import org.example.model.Registrations;

import java.util.List;

public interface RegistrationService {
    Registration add(QueueRegistration queueRegistration);
    List<Registration> addByPhone(RegistrationDto registrationDto);
    List<Registrations> getActives(int id);
    List<Registrations> getOlds(int id);
    List<Registration> getAllByUserId(int id);
    List<Registration> getAll();
    List<Registration> getByPlace(int placeId);
    void deleteById(int id);
    void cancel(int id);
}

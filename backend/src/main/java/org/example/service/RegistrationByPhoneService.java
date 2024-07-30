package org.example.service;

import org.example.dto.RegistrationByPhoneDto;
import org.example.model.RegistrationByPhone;

import java.util.List;

public interface RegistrationByPhoneService {
    RegistrationByPhone add(RegistrationByPhoneDto registrationByPhone);
    List<RegistrationByPhone> getAll();
    RegistrationByPhone getById(int id);
    void deleteById(int id);
}

package org.example.repository;

import org.example.model.Registration;
import org.example.model.RegistrationByPhone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationByPhoneRepository extends JpaRepository<RegistrationByPhone, Integer> {
}

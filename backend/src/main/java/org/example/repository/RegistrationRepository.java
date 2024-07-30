package org.example.repository;

import org.example.model.Registration;
import org.example.model.Registrations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {
    Collection<? extends Registrations> findAllByDate(String date);
    List<Registration> findAllByPhone(String phone);
    List<Registration> findAllByUserId(int id);
}

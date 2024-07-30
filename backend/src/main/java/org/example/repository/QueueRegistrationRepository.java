package org.example.repository;

import org.example.model.QueueRegistration;
import org.example.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueueRegistrationRepository extends JpaRepository<QueueRegistration, Integer> {
    List<QueueRegistration> findAllByDate(String date);
    List<QueueRegistration> findAllByPhone(String phone);
    List<QueueRegistration> findAllByUserId(int id);
}

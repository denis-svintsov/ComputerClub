package org.example.service.impl;

import org.example.dto.RegistrationDto;
import org.example.mapper.RegistrationMapper;
import org.example.model.*;
import org.example.repository.QueueRegistrationRepository;
import org.example.repository.RegistrationRepository;
import org.example.service.PlaceService;
import org.example.service.QueueRegistrationService;
import org.example.service.RegistrationService;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private QueueRegistrationRepository queueRegistrationRepository;
    @Autowired
    private PlaceService placeService;
    @Autowired
    private QueueRegistrationService queueRegistrationService;
    @Autowired
    private UserService userService;

    @Override
    public List<Registration> getByPlace(int placeId) {
        return null;
    }

    @Override
    public void deleteById(int id) {
        registrationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void cancel(int id) {
        QueueRegistration queueRegistration = queueRegistrationRepository.findById(id).get();
        queueRegistration.setStatus(RegistrationStatus.CANCELED);
        add(queueRegistration);
        queueRegistrationService.deleteById(id);
    }

    @Override
    @Transactional
    public Registration add(QueueRegistration queueRegistration) {
        if (queueRegistration.getStatus() != RegistrationStatus.CANCELED) queueRegistration.setStatus(RegistrationStatus.CONFIRMED);
        Registration registration = RegistrationMapper.map(queueRegistration, userService);
        queueRegistrationRepository.deleteById(queueRegistration.getId());
        return registrationRepository.save(registration);
    }

    @Override
    @Transactional
    public List<Registration> addByPhone(RegistrationDto registrationDto) {
        List<QueueRegistration> list = queueRegistrationService.add(registrationDto);
        List<Registration> registrationList = new ArrayList<>();
        for (QueueRegistration registration:list) {
            registrationList.add(add(registration));
        }
        return registrationList;
    }

    @Override
    public List<Registrations> getActives(int id) {
        List<Registrations> registrations = new ArrayList<>();
        registrations.addAll(queueRegistrationService.getAllByUserId(id));
        registrations.addAll(getAllByUserId(id));
        registrations = registrations.stream().filter((registration) -> LocalDate.parse(registration.getDate()).isAfter(LocalDate.now().minusDays(1))
        && LocalDate.parse(registration.getDate()).isBefore(LocalDate.now().plusDays(3))).toList();
        return registrations;
    }

    @Override
    public List<Registrations> getOlds(int id) {
        List<Registrations> registrations = new ArrayList<>();
        registrations.addAll(queueRegistrationService.getAllByUserId(id));
        registrations.addAll(getAllByUserId(id));
        registrations = registrations.stream().filter((registration) -> LocalDate.parse(registration.getDate()).isBefore(LocalDate.now())).toList();
        return registrations;
    }

    @Override
    public List<Registration> getAllByUserId(int id) {
        return registrationRepository.findAllByUserId(id);
    }

    @Override
    public List<Registration> getAll() {
        List<Registration> list = registrationRepository.findAll();
        list.sort(Comparator.comparing(Registration::getDate).reversed());
        return list;
    }
}

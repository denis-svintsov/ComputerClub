package org.example.service.impl;

import org.example.dto.RegistrationByPhoneDto;
import org.example.mapper.RegistrationByPhoneMapper;
import org.example.model.RegistrationByPhone;
import org.example.repository.RegistrationByPhoneRepository;
import org.example.service.RegistrationByPhoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

@Service
public class RegistrationByPhoneServiceImpl implements RegistrationByPhoneService {
    @Autowired
    private RegistrationByPhoneRepository registrationByPhoneRepository;

    @Override
    public RegistrationByPhone add(RegistrationByPhoneDto registrationByPhoneDto) {
        if (registrationByPhoneDto.getPhone() == null || registrationByPhoneDto.getName() == null) throw new RuntimeException();
        RegistrationByPhone registrationByPhone = RegistrationByPhoneMapper.map(registrationByPhoneDto);
        return registrationByPhoneRepository.save(registrationByPhone);
    }

    @Override
    public List<RegistrationByPhone> getAll() {
        List<RegistrationByPhone> list = registrationByPhoneRepository.findAll();
        list.sort(Comparator.comparing(RegistrationByPhone::getDate).thenComparing(RegistrationByPhone::getTime));
        return list;
    }

    @Override
    public RegistrationByPhone getById(int id) {
        return registrationByPhoneRepository.findById(id).get();
    }

    @Override
    public void deleteById(int id) {
        registrationByPhoneRepository.deleteById(id);
    }
}



package org.example.service.impl;

import org.example.dto.RegistrationDto;
import org.example.model.*;
import org.example.repository.QueueRegistrationRepository;
import org.example.service.PlaceService;
import org.example.service.PriceService;
import org.example.service.QueueRegistrationService;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class QueueRegistrationServiceImpl implements QueueRegistrationService {
    @Autowired
    private QueueRegistrationRepository queueRegistrationRepository;
    @Autowired
    private PlaceService placeService;
    @Autowired
    private PriceService priceService;
    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public List<QueueRegistration> add(RegistrationDto registrationDto) {
        List<QueueRegistration> registrations = new ArrayList<>();
        List<String> placesDto = registrationDto.getPlaces();
        Map<String, List<Integer>> places = new HashMap<>();
        for (String place : placesDto) {
            List<String> parse = List.of(place.split("-"));
            if (parse.size() !=4) {
                throw new RuntimeException("Неверный формат места");
            }
            String date = STR."\{parse.get(0)}-\{parse.get(1)}-\{parse.get(2)}";
            if (!places.containsKey(date)) {
                places.put(date, new ArrayList<>());
            }
            places.get(date).add(Integer.parseInt(parse.get(3)));
        }
        for (String date:places.keySet()) {
            List<Integer> times = places.get(date);
            Set<Place> placeList = placeService.getFreePlaces(registrationDto, date, times);
            QueueRegistration registration = new QueueRegistration();
            if(registrationDto.getUserId() != null) {
                User user = userService.getById(registrationDto.getUserId());
                registration.setUser(user);
            }
            else {
                registration.setName(registrationDto.getName());
                registration.setPhone(registrationDto.getPhone());
            }
            registration.setDate(date);
            registration.setTime(times);
            registration.setAmount(priceService.getPriceForDate(registrationDto, date));
            registration.setPlace(placeList);
            registration.setStatus(RegistrationStatus.WAITING);
            queueRegistrationRepository.save(registration);
            registrations.add(registration);
        }
        return registrations;
    }

    @Override
    public List<QueueRegistration> getAll() {
        List<QueueRegistration> list = queueRegistrationRepository.findAll();
        list.sort(Comparator.comparing(QueueRegistration::getDate).reversed());
        return list;
    }

    @Override
    public List<QueueRegistration> getAllByUserId(int id) {
        return queueRegistrationRepository.findAllByUserId(id);
    }

    @Override
    public List<QueueRegistration> getAllByUsername(String username) {
        return queueRegistrationRepository.findAllByPhone(username);
    }

    @Override
    public void deleteById(int id) {
        queueRegistrationRepository.deleteById(id);
    }
}

package org.example.service.impl;

import org.example.dto.FreePlaceDto;
import org.example.dto.PlaceDto;
import org.example.dto.RegistrationDto;
import org.example.exception.NoFoundFreePlaceException;
import org.example.mapper.PlaceMapper;
import org.example.model.*;
import org.example.repository.PlaceRepository;
import org.example.repository.QueueRegistrationRepository;
import org.example.repository.RegistrationRepository;
import org.example.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PlaceServiceImpl implements PlaceService {
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private QueueRegistrationRepository queueRegistrationRepository;
    @Override
    public Place add(PlaceDto placeDto) {
        return placeRepository.save(PlaceMapper.map(placeDto));
    }

    @Override
    public List<Place> getAll() {
        return placeRepository.findAll();
    }

    @Override
    public List<Place> getAllByPlaceType(int placeType) {
        return placeRepository.findAllByPlaceTypeId(placeType);
    }

    @Override
    public Place getPlaceById(int id) {
        return placeRepository.findById(id).get();
    }

    @Override
    public void deleteById(int id) {
        placeRepository.deleteById(id);
    }

    @Override
    public Integer count(int placeType) {
        return placeRepository.countByPlaceTypeId(placeType);
    }

    @Override
    public FreePlaceDto getFreePlaces(int placeType) {
        FreePlaceDto freePlaceDto = new FreePlaceDto();
        freePlaceDto.setFreePlaces(new HashMap<>());
        String date1 = LocalDate.now().toString();
        RegistrationDto registrationDto = new RegistrationDto();
        registrationDto.setPlaceType(placeType);
        registrationDto.setCountPlaces(-1);
        List<Integer> list1 = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH");
            String dateTime = formatter.format(LocalDateTime.now());
            if (Integer.parseInt(dateTime) >= i) {
                list1.add(-1);
            }
            else {
                Set<Place> places = getFreePlaces(registrationDto, date1, List.of(i));
                list1.add(places.size());
            }
        }
        String date2 = LocalDate.now().plusDays(1).toString();
        List<Integer> list2 = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            Set<Place> places = getFreePlaces(registrationDto, date2, List.of(i));
            list2.add(places.size());
        }
        String date3 = LocalDate.now().plusDays(2).toString();
        List<Integer> list3 = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            Set<Place> places = getFreePlaces(registrationDto, date3, List.of(i));
            list3.add(places.size());
        }
        freePlaceDto.getFreePlaces().put(date1, list1);
        freePlaceDto.getFreePlaces().put(date2, list2);
        freePlaceDto.getFreePlaces().put(date3, list3);
        return freePlaceDto;
    }

    @Override
    public Set<Place> getFreePlaces(RegistrationDto registrationDto, String date, List<Integer> times) {
        List<Place> placeList = getAllByPlaceType(registrationDto.getPlaceType());
        Set<Place> placeSet = new HashSet<>();
        List<Registrations> registrations = new ArrayList<>();
        registrations.addAll(registrationRepository.findAllByDate(date));
        registrations.addAll(queueRegistrationRepository.findAllByDate(date));
        registrations = registrations.stream().filter((registration) -> registration.getStatus() != RegistrationStatus.CANCELED).toList();
        for (Place place : placeList) {
            if (placeSet.size() >= registrationDto.getCountPlaces() && registrationDto.getCountPlaces() != -1) break;
            if (registrations.isEmpty()) {
                placeSet.add(place);
                continue;
            }
            Registrations res = null;
            for (Registrations registration : registrations) {
                for (Integer time:times) {
                    if (registration.getPlace().contains(place) && registration.getTime().contains(time)) {
                        res = registration;
                        break;
                    }
                }
            }
            if (res == null) {
                placeSet.add(place);
            }
        }
        if (placeSet.size() != registrationDto.getCountPlaces() && registrationDto.getCountPlaces() != -1) throw new NoFoundFreePlaceException();
        return placeSet;
    }
}



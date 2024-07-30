package org.example.service;

import org.example.dto.FreePlaceDto;
import org.example.dto.PlaceDto;
import org.example.dto.RegistrationDto;
import org.example.model.Place;

import java.util.List;
import java.util.Set;

public interface PlaceService {
    Place add(PlaceDto placeDto);
    List<Place> getAll();
    List<Place> getAllByPlaceType(int placeType);
    Place getPlaceById(int id);
    void deleteById(int id);
    Integer count(int placeType);
    FreePlaceDto getFreePlaces(int placeType);
    Set<Place> getFreePlaces(RegistrationDto registrationDto, String date, List<Integer> times);
}

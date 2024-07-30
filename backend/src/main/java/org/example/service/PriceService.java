package org.example.service;

import org.example.dto.RegistrationDto;
import org.example.model.Price;

import java.util.List;

public interface PriceService {
    Price add(Price price);
    List<Price> getAll();
    Price getById(int id);
    List<Price> getByPlaceType(int placeType);
    void deleteById(int id);
    int getPrice(RegistrationDto registrationDto);
    int getPriceForDate(RegistrationDto registrationDto, String date);
}

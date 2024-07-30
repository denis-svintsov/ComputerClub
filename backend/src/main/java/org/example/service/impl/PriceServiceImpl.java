package org.example.service.impl;

import org.example.dto.RegistrationDto;
import org.example.model.Place;
import org.example.model.Price;
import org.example.model.QueueRegistration;
import org.example.repository.PriceRepository;
import org.example.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PriceServiceImpl implements PriceService {
    @Autowired
    private PriceRepository priceRepository;

    @Override
    public Price add(Price price) {
        return priceRepository.save(price);
    }

    @Override
    public List<Price> getAll() {
        return priceRepository.findAll();
    }

    @Override
    public Price getById(int id) {
        return priceRepository.findById(id).get();
    }

    @Override
    public List<Price> getByPlaceType(int placeType) {
        return priceRepository.findAllByPlaceTypeId(placeType);
    }

    @Override
    public void deleteById(int id) {
        priceRepository.deleteById(id);
    }

    @Override
    public int getPrice(RegistrationDto registrationDto) {
        int res = 0;
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
           res += getPriceForDate(registrationDto, date);
        }
        return res;
    }

    @Override
    public int getPriceForDate(RegistrationDto registrationDto, String date) {
        int res = 0;
        List<Price> priceList = getByPlaceType(registrationDto.getPlaceType());
        List<Price> currentPrice = new ArrayList<>();
        priceList.sort(Comparator.comparing(Price::getCountHours).reversed());
        List<String> placesDto = registrationDto.getPlaces();
        Map<String, List<Integer>> places = new HashMap<>();
        for (String place : placesDto) {
            List<String> parse = List.of(place.split("-"));
            if (parse.size() !=4) {
                throw new RuntimeException("Неверный формат места");
            }
            String parseDate = STR."\{parse.get(0)}-\{parse.get(1)}-\{parse.get(2)}";
            if (!places.containsKey(parseDate)) {
                places.put(parseDate, new ArrayList<>());
            }
            places.get(parseDate).add(Integer.parseInt(parse.get(3)));
        }

        List<Integer> times = places.get(date);
        for (Price price : priceList) {
            if (price.getCountHours() <= times.size()) {
                currentPrice.add(price);
            }
        }
        for (Price price : currentPrice) {
            int count = price.getCountHours();
            List<Integer> newTimes = new ArrayList<>();
            List<Integer> tempTimes = new ArrayList<>();
            for (Integer time : times) {
                if (price.getEndHour() < price.getStartHour()) {
                    if (time >= 0 && time < price.getEndHour() || time >= price.getStartHour() && time <= 24) {
                        count -= 1;
                        tempTimes.add(time);
                    }
                }
                else {
                    if (time >= price.getStartHour() && time < price.getEndHour()) {
                        count -= 1;
                        tempTimes.add(time);
                    }
                }
                if (count == 0) {
                    res += price.getPrice() * registrationDto.getCountPlaces();
                    count = price.getCountHours();
                    newTimes.addAll(tempTimes);
                }
            }
            times = times.stream().filter((time)->!newTimes.contains(time)).toList();
        }
        return res;
    }

}

package org.example.service;

import org.example.model.PlaceType;
import org.example.repository.PlaceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface PlaceTypeService{
    PlaceType add(PlaceType placeType);
    List<PlaceType> getAll();
    PlaceType getById(int id);
    void deleteById(int id);
}

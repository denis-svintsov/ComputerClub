package org.example.service.impl;

import org.example.model.PlaceType;
import org.example.repository.PlaceTypeRepository;
import org.example.service.PlaceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceTypeServiceImpl implements PlaceTypeService {
    @Autowired
    private PlaceTypeRepository placeTypeRepository;
    @Override
    public PlaceType add(PlaceType placeType) {
        return placeTypeRepository.save(placeType);
    }

    @Override
    public List<PlaceType> getAll() {
        return placeTypeRepository.findAll();
    }

    @Override
    public PlaceType getById(int id) {
        return placeTypeRepository.findById(id).get();
    }

    @Override
    public void deleteById(int id) {
        placeTypeRepository.deleteById(id);
    }
}

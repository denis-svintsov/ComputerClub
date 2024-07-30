package org.example.repository;

import org.example.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Integer> {
    Integer countByPlaceTypeId(int placeTypeId);

    List<Place> findAllByPlaceTypeId(int placeTypeId);
}

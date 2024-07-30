package org.example.repository;

import org.example.model.Price;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PriceRepository extends JpaRepository<Price, Integer> {
    List<Price> findAllByPlaceTypeId(int placeType);
}

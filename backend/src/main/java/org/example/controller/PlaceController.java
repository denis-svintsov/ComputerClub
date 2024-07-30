package org.example.controller;

import org.example.dto.FreePlaceDto;
import org.example.dto.PlaceDto;
import org.example.model.Place;
import org.example.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/place")
public class PlaceController {
    @Autowired
    private PlaceService placeService;

    @PostMapping("/add")
    public ResponseEntity<Place> add(@RequestBody PlaceDto placeDto) {
        return ResponseEntity.ok(placeService.add(placeDto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam int id) {
        placeService.deleteById(id);
        return ResponseEntity.ok("Успешно удалено!");
    }

    @GetMapping("/get")
    public ResponseEntity<List<Place>> getAll() {
        return ResponseEntity.ok(placeService.getAll());
    }

    @GetMapping("/get-by-place-type")
    public ResponseEntity<List<Place>> getAllByPlaceType(@RequestParam int placeType) {
        return ResponseEntity.ok(placeService.getAllByPlaceType(placeType));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable int id) {
        return ResponseEntity.ok(placeService.getPlaceById(id));
    }

    @GetMapping("/free-place")
    public ResponseEntity<FreePlaceDto> freePlace(@RequestParam int placeType) {
        return ResponseEntity.ok(placeService.getFreePlaces(placeType));
    }


}

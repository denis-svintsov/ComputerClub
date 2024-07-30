package org.example.controller;

import org.example.model.PlaceType;
import org.example.service.PlaceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/place-type")
public class PlaceTypeController {
    @Autowired
    private PlaceTypeService placeTypeService;

    @PostMapping("/add")
    public ResponseEntity<PlaceType> add(@RequestBody PlaceType placeType) {
        return ResponseEntity.ok(placeTypeService.add(placeType));
    }

    @GetMapping("/get")
    public ResponseEntity<List<PlaceType>> getAll() {
        return ResponseEntity.ok(placeTypeService.getAll());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<PlaceType> getById(@PathVariable int id) {
        return ResponseEntity.ok(placeTypeService.getById(id));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam int id) {
        placeTypeService.deleteById(id);
        return ResponseEntity.ok("Успешно удалено");
    }
}

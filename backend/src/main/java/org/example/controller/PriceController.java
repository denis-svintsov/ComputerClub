package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.RegistrationDto;
import org.example.model.Price;
import org.example.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/price")
public class PriceController {
    @Autowired
    private PriceService priceService;

    @PostMapping("/add")
    public ResponseEntity<Price> add(@Valid @RequestBody Price price) {
        return ResponseEntity.ok(priceService.add(price));
    }

    @GetMapping("/get")
    public ResponseEntity<List<Price>> getAll() {
        return ResponseEntity.ok(priceService.getAll());
    }

    @GetMapping("/get-by-place-type")
    public ResponseEntity<List<Price>> getByPlaceType(@RequestParam int placeType) {
        return ResponseEntity.ok(priceService.getByPlaceType(placeType));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Price> getById(@PathVariable int id) {
        return ResponseEntity.ok(priceService.getById(id));
    }

    @PostMapping("/get-price")
    public ResponseEntity<Integer> getPrice(@RequestBody RegistrationDto registrationDto) {
        return ResponseEntity.ok(priceService.getPrice(registrationDto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam int id) {
        priceService.deleteById(id);
        return ResponseEntity.ok("Успешно удалено");
    }
}

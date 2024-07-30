package org.example.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.model.Place;

import java.util.List;

@Data
@AllArgsConstructor @NoArgsConstructor
public class RegistrationDto {
    private Integer userId;
    private String name;
    private String phone;
    @Min(1)
    private int placeType;
    @Min(1)
    private int countPlaces;
    private List<String> places;
}

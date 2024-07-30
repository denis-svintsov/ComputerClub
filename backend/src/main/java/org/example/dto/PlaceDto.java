package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDto {
    private Integer id;
    private int placeType;
    private String processor;
    private String graphics;
    private int ram;
    private int memory;
}

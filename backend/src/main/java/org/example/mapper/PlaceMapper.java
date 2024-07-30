package org.example.mapper;

import org.example.dto.PlaceDto;
import org.example.model.Place;
import org.example.model.PlaceType;

public class PlaceMapper {
    public static Place map(PlaceDto placeDto) {
        Place place = new Place();
        PlaceType placeType = new PlaceType();
        placeType.setId(placeDto.getPlaceType());
        place.setId(placeDto.getId());
        place.setPlaceType(placeType);
        place.setProcessor(placeDto.getProcessor());
        place.setGraphics(placeDto.getGraphics());
        place.setRam(placeDto.getRam());
        place.setMemory(placeDto.getMemory());
        return place;
    }
}

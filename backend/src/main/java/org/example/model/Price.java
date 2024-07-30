package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "prices")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Min(0)
    @Max(24)
    @Column(name = "count_hours", nullable = false)
    private int countHours;
    @Min(0)
    @Max(24)
    @Column(name = "start_hour", nullable = false)
    private int startHour;
    @Min(0)
    @Max(24)
    @Column(name = "end_hour", nullable = false)
    private int endHour;
    @JoinColumn(name = "place_type_id", referencedColumnName = "id", nullable = false)
    @ManyToOne
    private PlaceType placeType;
    @Min(0)
    @Column(nullable = false)
    private int price;
}

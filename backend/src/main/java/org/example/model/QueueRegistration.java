package org.example.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.validation.ValidRegistrationDate;
import org.example.validation.ValidRegistrationTimes;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ValidRegistrationTimes
@Table(name = "queue_registrations")
public class QueueRegistration implements Registrations{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne
    private User user;
    private String name;
    private String phone;
    @Column(nullable = false)
    @ValidRegistrationDate
    private String date;
    @Column(nullable = false)
    private List<Integer> time;
    @ManyToMany
    private Set<Place> place;
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RegistrationStatus status;
    @Column(nullable = false)
    private Integer amount;
}

package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
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
@Table(name = "registrationsByPhone")
public class RegistrationByPhone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
    @Pattern(regexp = "^\\+[0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]\\-[0-9][0-9]\\-[0-9][0-9]$")
    @Column(unique = true, nullable = false)
    private String phone;
    @Column(nullable = false)
    private String date;
    @Column(nullable = false)
    private String time;
}

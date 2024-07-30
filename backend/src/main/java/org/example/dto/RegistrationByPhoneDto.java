package org.example.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationByPhoneDto {
    private Integer id;
    private String name;
    @Pattern(regexp = "^\\+[0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]\\-[0-9][0-9]\\-[0-9][0-9]$")
    private String phone;
}

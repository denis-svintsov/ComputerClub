package org.example.mapper;

import org.example.dto.RegistrationByPhoneDto;
import org.example.model.RegistrationByPhone;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RegistrationByPhoneMapper {
    public static RegistrationByPhone map(RegistrationByPhoneDto registrationByPhoneDto) {
        RegistrationByPhone registrationByPhone = new RegistrationByPhone();
        registrationByPhone.setPhone(registrationByPhoneDto.getPhone());
        registrationByPhone.setName(registrationByPhoneDto.getName());
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = dateFormatter.format(LocalDateTime.now());
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String time = timeFormatter.format(LocalDateTime.now());
        registrationByPhone.setDate(date);
        registrationByPhone.setTime(time);
        return registrationByPhone;
    }
}

package org.example.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.example.model.Registration;
import org.example.model.Registrations;
import org.example.validation.ValidRegistrationTimes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

public class ValidRegistrationTimesValidator implements ConstraintValidator<ValidRegistrationTimes, Registrations> {
    @Override
    public void initialize(ValidRegistrationTimes constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Registrations registration, ConstraintValidatorContext constraintValidatorContext) {
        if (registration == null) return false;
        if (registration.getTime().isEmpty()) return false;
        String date = registration.getDate();
        List<Integer> times = registration.getTime();
        for (Integer time:times) {
            if (time < 0 || time > 24) return false;
            if (Objects.equals(date, LocalDate.now().toString())) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH");
                int dateTime = Integer.parseInt(formatter.format(LocalDateTime.now()));
                if (time < dateTime) {
                    return false;
                }
            }
        }
        return true;
    }
}

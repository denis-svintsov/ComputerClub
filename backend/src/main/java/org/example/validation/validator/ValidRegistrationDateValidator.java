package org.example.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.example.validation.ValidRegistrationDate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class ValidRegistrationDateValidator implements ConstraintValidator<ValidRegistrationDate, String> {
    @Override
    public void initialize(ValidRegistrationDate constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date1 = formatter.format(LocalDateTime.now());
        String date2 = formatter.format(LocalDateTime.now().plusDays(1));
        String date3 = formatter.format(LocalDateTime.now().plusDays(2));
        if (Objects.equals(s, date1) || Objects.equals(s, date2) || Objects.equals(s, date3)) {
            return true;
        }
        return false;
    }
}

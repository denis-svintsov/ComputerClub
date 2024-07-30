package org.example.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.example.validation.validator.ValidRegistrationDateValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidRegistrationDateValidator.class)
public @interface ValidRegistrationDate {
    String message() default "Date is not valid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

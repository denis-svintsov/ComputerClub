package org.example.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.example.validation.validator.ValidRegistrationDateValidator;
import org.example.validation.validator.ValidRegistrationTimesValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidRegistrationTimesValidator.class)
public @interface ValidRegistrationTimes {
    String message() default "Times are not valid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

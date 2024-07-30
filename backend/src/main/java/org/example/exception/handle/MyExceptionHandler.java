package org.example.exception.handle;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.exception.NoFoundFreePlaceException;
import org.example.exception.NoUniqueEmailException;
import org.example.exception.NoUniqueUsernameException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class MyExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(NoFoundFreePlaceException.class)
    protected ResponseEntity<MyException> handleNoFoundFreeTimeException() {
        return new ResponseEntity<>(new MyException("Свободных мест не найдено"), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoUniqueEmailException.class)
    protected ResponseEntity<MyException> handleNoUniqueEmailException() {
        return new ResponseEntity<>(new MyException("Пользователь с таким email уже существует"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoUniqueUsernameException.class)
    protected ResponseEntity<MyException> handleNoUniqueUsernameException() {
        return new ResponseEntity<>(new MyException("Пользователь с таким телефоном уже существует"), HttpStatus.BAD_REQUEST);
    }

    @Data
    @AllArgsConstructor
    private static class MyException {
        private String message;
    }

}

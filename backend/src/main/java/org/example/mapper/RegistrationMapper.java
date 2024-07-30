package org.example.mapper;

import org.example.model.QueueRegistration;
import org.example.model.Registration;
import org.example.model.Role;
import org.example.model.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationMapper {
    public static Registration map(QueueRegistration queueRegistration, UserService userService) {
        Registration registration = new Registration();
        if (queueRegistration.getUser() != null) {
            User user = userService.getById(queueRegistration.getUser().getId());
            User newUser = new User(user.getId(), user.getLastName(), user.getFirstName(), user.getPassword(), user.getEmail(), user.getUsername(), user.getRole());
            registration.setUser(newUser);
        }

        registration.setPhone(queueRegistration.getPhone());
        registration.setDate(queueRegistration.getDate());
        registration.setName(queueRegistration.getName());
        registration.setTime(queueRegistration.getTime());
        registration.setPlace(queueRegistration.getPlace());
        registration.setAmount(queueRegistration.getAmount());
        registration.setStatus(queueRegistration.getStatus());
        return registration;
    }
}

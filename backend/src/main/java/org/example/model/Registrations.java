package org.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import org.example.validation.ValidRegistrationDate;

import java.util.List;
import java.util.Set;

public interface Registrations {

    Integer getId();
    void setId(Integer id);

    User getUser();
    void setUser(User user);

    String getName();
    void setName(String name);

    String getPhone();
    void setPhone(String phone);

    String getDate();
    void setDate(String date);

    List<Integer> getTime();
    void setTime(List<Integer> time);

    Set<Place> getPlace();
    void setPlace(Set<Place> place);

    Integer getAmount();
    void setAmount(Integer amount);

    RegistrationStatus getStatus();
    void setStatus(RegistrationStatus registrationStatus);
}

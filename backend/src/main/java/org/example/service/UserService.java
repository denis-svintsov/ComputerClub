package org.example.service;

import org.example.dto.UserEditDto;
import org.example.model.Role;
import org.example.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService {
    User save(User user);
    User create(User user);
    User edit(User user);

    User getById(int id);
    User getByUsername(String username);
    User getByEmail(String email);
    List<User> getAllByRole(String role);
    UserDetailsService userDetailsService();
    User getCurrentUser();
    void getAdmin();
    void getAdminByUsername(String username);
    void deleteById(int id);
}

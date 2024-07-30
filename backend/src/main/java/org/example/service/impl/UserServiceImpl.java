package org.example.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.dto.UserEditDto;
import org.example.exception.NoUniqueEmailException;
import org.example.exception.NoUniqueUsernameException;
import org.example.model.Role;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository repository;

    /**
     * Сохранение пользователя
     *
     * @return сохраненный пользователь
     */
    public User save(User user) {
        return repository.save(user);
    }


    /**
     * Создание пользователя
     *
     * @return созданный пользователь
     */
    public User create(User user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new NoUniqueUsernameException();
        }

        if (user.getEmail() != null && repository.existsByEmail(user.getEmail())) {
            throw new NoUniqueEmailException();
        }

        return save(user);
    }

    @Override
    public User edit(User user) {
        if (user.getUsername() != null && repository.existsByUsername(user.getUsername())) {
            User temp = getByUsername(user.getUsername());
            if (!Objects.equals(temp.getId(), user.getId())) throw new NoUniqueUsernameException();
        }

        if (user.getEmail() != null && repository.existsByEmail(user.getEmail())) {
            User temp = getByEmail(user.getEmail());
            if (!Objects.equals(temp.getId(), user.getId())) throw new NoUniqueEmailException();
        }

        return save(user);
    }

    @Override
    public User getById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
    }

    /**
     * Получение пользователя по имени пользователя
     *
     * @return пользователь
     */
    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    public User getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    @Override
    public List<User> getAllByRole(String role) {
        List<User> userList = repository.findAll();
        userList = userList.stream().filter((user) -> user.getRole().name().equals(role)).toList();
        return userList;
    }

    /**
     * Получение пользователя по имени пользователя
     * <p>
     * Нужен для Spring Security
     *
     * @return пользователь
     */
    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    /**
     * Получение текущего пользователя
     *
     * @return текущий пользователь
     */
    public User getCurrentUser() {
        // Получение имени пользователя из контекста Spring Security
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }


    /**
     * Выдача прав администратора текущему пользователю
     * <p>
     * Нужен для демонстрации
     */
    @Deprecated
    public void getAdmin() {
        var user = getCurrentUser();
        user.setRole(Role.ROLE_ADMIN);
        save(user);
    }

    @Override
    public void getAdminByUsername(String username) {
        var user = getByUsername(username);
        user.setRole(Role.ROLE_ADMIN);
        save(user);
    }

    @Override
    public void deleteById(int id) {
        if (repository.count() > 0) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException();
        }
    }
}

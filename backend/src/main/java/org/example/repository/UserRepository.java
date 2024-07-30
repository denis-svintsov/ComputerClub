package org.example.repository;

import org.example.model.Role;
import org.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

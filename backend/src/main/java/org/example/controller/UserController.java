package org.example.controller;

import org.example.dto.UsernameDto;
import org.example.model.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get-by-phone")
    public ResponseEntity<User> getUserByPhone(@RequestParam String phone) {
        return ResponseEntity.ok(userService.getByUsername(phone));
    }

    @GetMapping("/get-by-role")
    public ResponseEntity<List<User>> getAllByRole(@RequestParam String role) {
        return ResponseEntity.ok(userService.getAllByRole(role));
    }

    @PostMapping("/save")
    public ResponseEntity<User> save(@RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }

    @GetMapping("/get-current")
    public ResponseEntity<User> current() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PostMapping("/set-admin")
    public ResponseEntity<String> setAdmin(@RequestBody UsernameDto username) {
        userService.getAdminByUsername(username.getUsername());
        return ResponseEntity.ok("Поздравляю, вы админ!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        userService.deleteById(id);
        return ResponseEntity.ok("Успешно удалено");
    }
}

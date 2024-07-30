package org.example.controller;

import jakarta.validation.Valid;
import org.example.dto.JwtAuthenticationResponse;
import org.example.dto.SignInRequest;
import org.example.dto.SignUpRequest;
import org.example.dto.UserEditDto;
import org.example.model.Role;
import org.example.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<JwtAuthenticationResponse> signUp(@RequestBody @Valid SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signUp(request, Role.ROLE_USER));
    }

    @PostMapping("/sign-up-admin")
    public ResponseEntity<JwtAuthenticationResponse> signUpAdmin(@RequestBody @Valid SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signUp(request, Role.ROLE_ADMIN));
    }

    @PostMapping("/edit-user")
    public ResponseEntity<JwtAuthenticationResponse> editUser(@RequestBody @Valid UserEditDto userEditDto) {
        return ResponseEntity.ok(authenticationService.edit(userEditDto));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody @Valid SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signIn(request));
    }
}

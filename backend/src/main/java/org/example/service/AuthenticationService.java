package org.example.service;

import org.example.dto.JwtAuthenticationResponse;
import org.example.dto.SignInRequest;
import org.example.dto.SignUpRequest;
import org.example.dto.UserEditDto;
import org.example.model.Role;
import org.example.model.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public interface AuthenticationService {
    JwtAuthenticationResponse signUp(SignUpRequest request, Role role);
    JwtAuthenticationResponse edit(UserEditDto editDto);
    JwtAuthenticationResponse signIn(SignInRequest request);
}

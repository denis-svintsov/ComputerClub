package org.example.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    @Pattern(regexp = "^\\+[0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]\\-[0-9][0-9]\\-[0-9][0-9]$")
    private String phone;

    @Size(max = 255, message = "Длина пароля должна быть от 8 до 255 символов")
    @NotBlank(message = "Пароль не может быть пустыми")
    private String password;
}

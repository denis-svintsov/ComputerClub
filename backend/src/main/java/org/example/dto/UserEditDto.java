package org.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEditDto {
    private int id;
    private String lastName;
    @Size(min = 2, max = 50, message = "Имя пользователя должно содержать от 5 до 50 символов")
    private String firstName;
    @Size(min = 5, max = 255, message = "Адрес электронной почты должен содержать от 5 до 255 символов")
    @Email(message = "Email адрес должен быть в формате user@example.com")
    private String email;
    @Pattern(regexp = "^\\+[0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]\\-[0-9][0-9]\\-[0-9][0-9]$")
    private String phone;
}

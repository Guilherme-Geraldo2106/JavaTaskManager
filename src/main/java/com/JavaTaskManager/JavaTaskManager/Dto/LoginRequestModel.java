package com.JavaTaskManager.JavaTaskManager.Dto;


import jakarta.validation.constraints.NotBlank;

public record LoginRequestModel(@NotBlank String username, @NotBlank String password) {

}

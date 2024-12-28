package com.JavaTaskManager.JavaTaskManager.Dto;


import jakarta.validation.constraints.NotBlank;

public record CreateTaskRequestModel(@NotBlank String title, @NotBlank String description) {

}

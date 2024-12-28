package com.JavaTaskManager.JavaTaskManager.Dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateTaskRequestModel(@NotBlank String title, @NotBlank String description, boolean completed) {

}

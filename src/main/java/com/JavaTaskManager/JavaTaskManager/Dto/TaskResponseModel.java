package com.JavaTaskManager.JavaTaskManager.Dto;

import com.JavaTaskManager.JavaTaskManager.Model.Task;

public record TaskResponseModel(Long id, Long userId, String title, String description, boolean completed) {
    public TaskResponseModel(Task task) {
        this(
                task.getId(),
                task.getUsuario().getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted()
        );
    }
}

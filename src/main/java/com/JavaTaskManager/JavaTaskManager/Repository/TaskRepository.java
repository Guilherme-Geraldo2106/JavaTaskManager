package com.JavaTaskManager.JavaTaskManager.Repository;

import com.JavaTaskManager.JavaTaskManager.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUsuarioId(Long userId);
}

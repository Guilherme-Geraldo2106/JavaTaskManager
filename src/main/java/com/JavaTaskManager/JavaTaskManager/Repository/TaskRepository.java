package com.JavaTaskManager.JavaTaskManager.Repository;

import com.JavaTaskManager.JavaTaskManager.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

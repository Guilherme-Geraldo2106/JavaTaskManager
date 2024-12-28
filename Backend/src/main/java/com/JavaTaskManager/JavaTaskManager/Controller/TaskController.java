package com.JavaTaskManager.JavaTaskManager.Controller;

import com.JavaTaskManager.JavaTaskManager.Config.JwtUtil;
import com.JavaTaskManager.JavaTaskManager.Dto.CreateTaskRequestModel;
import com.JavaTaskManager.JavaTaskManager.Dto.TaskResponseModel;
import com.JavaTaskManager.JavaTaskManager.Dto.UpdateTaskRequestModel;
import com.JavaTaskManager.JavaTaskManager.Model.Task;
import com.JavaTaskManager.JavaTaskManager.Service.TaskService;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;
    private final JwtUtil jwtUtil;

    public TaskController(TaskService taskService, JwtUtil jwtUtil) {
        this.taskService = taskService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<TaskResponseModel> getAllTasks(HttpServletRequest httpRequest) {
        List<Task> tasks = taskService.getAllTasks(jwtUtil.extractUserIdFromRequestHeader(httpRequest));
        List<TaskResponseModel> tasksResponseModel = tasks.stream().map(TaskResponseModel::new).toList();

        return tasksResponseModel;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseModel> getTaskById(@PathVariable Long id) {

        Task task = taskService.getTaskById(id);
        TaskResponseModel responseModel = new TaskResponseModel(task);
        return ResponseEntity.ok(responseModel);
    }

    @PostMapping
    public ResponseEntity<TaskResponseModel> createTask(@RequestBody CreateTaskRequestModel request, HttpServletRequest httpRequest) {

        Long userId = jwtUtil.extractUserIdFromRequestHeader(httpRequest);

        return ResponseEntity.ok(new TaskResponseModel(taskService.createTask(new Task(request, userId))));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseModel> updateTask(@PathVariable Long id, @RequestBody UpdateTaskRequestModel updateTaskRequest, HttpServletRequest httpRequest) {

        long userId = jwtUtil.extractUserIdFromRequestHeader(httpRequest);
        Task taskObject = taskService.updateTask(id, new Task(updateTaskRequest, userId));

        TaskResponseModel responseModel = new TaskResponseModel(taskObject);
        return ResponseEntity.ok(responseModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}

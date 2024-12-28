package com.JavaTaskManager.JavaTaskManager.Model;

import com.JavaTaskManager.JavaTaskManager.Dto.CreateTaskRequestModel;
import com.JavaTaskManager.JavaTaskManager.Dto.UpdateTaskRequestModel;
import jakarta.persistence.*;

@Entity
public class Task {

    public Task(){

    }

    public Task(CreateTaskRequestModel createRequest, Long userId){
        setTitle(createRequest.title());
        setDescription(createRequest.description());

        setUsuario(new Usuario(userId));
    }

    public Task(UpdateTaskRequestModel updateRequest, Long userId){
        setTitle(updateRequest.title());
        setDescription(updateRequest.description());

        setUsuario(new Usuario(userId));
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Usuario usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Usuario getUsuario(){ return this.usuario;}

    public void setUsuario(Usuario usuario){this.usuario = usuario;}
}

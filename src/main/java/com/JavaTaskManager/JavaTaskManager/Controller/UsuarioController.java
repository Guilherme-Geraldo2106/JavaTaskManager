package com.JavaTaskManager.JavaTaskManager.Controller;

import com.JavaTaskManager.JavaTaskManager.Dto.LoginRequest;
import com.JavaTaskManager.JavaTaskManager.Model.Usuario;
import com.JavaTaskManager.JavaTaskManager.Repository.UsuarioRepository;
import jakarta.annotation.security.PermitAll;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/registrar")
    @PermitAll
    public String registrarUsuario(@RequestBody LoginRequest usuario) {
        // Verifica se o usuário já existe
        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            return "Usuário já existe!";
        }

       Usuario newUser = new Usuario(usuario.getUsername(), usuario.getPassword());

        newUser.setRole("ROLE_USER");

        // Salva o usuário no banco
        usuarioRepository.save(newUser);
        return "Usuário registrado com sucesso!";
    }
}

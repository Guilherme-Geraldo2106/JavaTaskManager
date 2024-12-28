package com.JavaTaskManager.JavaTaskManager.Controller;

import com.JavaTaskManager.JavaTaskManager.Config.JwtUtil;
import com.JavaTaskManager.JavaTaskManager.Dto.LoginRequestModel;
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
    public String registrarUsuario(@RequestBody LoginRequestModel usuario) {

        if (usuarioRepository.findByUsername(usuario.username()).isPresent()) {
            return "Usuário já existe!";
        }

        String encodedPassword = passwordEncoder.encode(usuario.password());

        Usuario newUser = new Usuario(usuario.username(), encodedPassword);

        newUser.setRole("ROLE_USER");

        usuarioRepository.save(newUser);
        return "Usuário registrado com sucesso!";
    }
}

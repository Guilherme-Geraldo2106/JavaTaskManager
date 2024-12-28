package com.JavaTaskManager.JavaTaskManager.Config;

import com.JavaTaskManager.JavaTaskManager.Model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expirationTime = 3600000; // 1 hora

    public String generateToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getUsername())
                .claim("userId", usuario.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public  Long extractUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("userId", Long.class);
    }

    public String extractTokenFromHeader(String header){
        String token = "";

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        return token;
    }

    public Long extractUserIdFromRequestHeader(HttpServletRequest request){

        String token = extractTokenFromHeader(request.getHeader("Authorization"));
        Long userId = null;

        if (token != null && !token.isBlank()){
            userId = extractUserId(token);
        }

        return userId;
    }
}

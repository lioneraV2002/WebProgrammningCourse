package com.example.backend.config;


import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Component
public class JwtKeyManager {
    private static final String KEY_FILE_PATH = "jwt-secret.key";

    public SecretKey loadOrGenerateKey() {
        try {
            Path path = Paths.get(KEY_FILE_PATH);
            if (Files.exists(path)) {
                // Load existing key
                String keyString = Files.readString(path);
                return Keys.hmacShaKeyFor(Base64.getDecoder().decode(keyString));
            } else {
                // Generate and save new key
                SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
                String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
                Files.writeString(path, encodedKey);
                return key;
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to load or generate JWT key", e);
        }
    }
}
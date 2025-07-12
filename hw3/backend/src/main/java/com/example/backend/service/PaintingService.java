package com.example.backend.service;

import com.example.backend.model.Painting;
import com.example.backend.model.User;
import com.example.backend.repo.PaintingRepository;
import com.example.backend.repo.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class PaintingService {
    private final PaintingRepository paintingRepository;
    private final UserRepository userRepository;

    public PaintingService(PaintingRepository paintingRepository, UserRepository userRepository) {
        this.paintingRepository = paintingRepository;
        this.userRepository = userRepository;
    }

    public Painting savePainting(Painting painting) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        painting.setUser(user);
        painting.setTimestamp(LocalDateTime.now());
        return paintingRepository.save(painting);
    }

    public Painting updatePainting(Long id, Painting painting) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Painting> existing = paintingRepository.findById(id);
        if (existing.isPresent() && existing.get().getUser().getUsername().equals(username)) {
            Painting updated = existing.get();
            updated.setTitle(painting.getTitle());
            updated.setShapes(painting.getShapes());
            updated.setTimestamp(LocalDateTime.now());
            return paintingRepository.save(updated);
        } else {
            throw new RuntimeException("Painting not found or unauthorized");
        }
    }

    public Optional<Painting> getPainting(Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return paintingRepository.findById(id)
                .filter(painting -> painting.getUser().getUsername().equals(username));
    }

    public List<Painting> getAllPaintings() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return paintingRepository.findAll().stream()
                .filter(painting -> painting.getUser().getUsername().equals(username))
                .toList();
    }
}
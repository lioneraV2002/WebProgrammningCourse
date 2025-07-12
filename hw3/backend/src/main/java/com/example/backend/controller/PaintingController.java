package com.example.backend.controller;

import com.example.backend.model.Painting;
import com.example.backend.service.PaintingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paintings")
public class PaintingController {
    private final PaintingService service;

    public PaintingController(PaintingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Painting> savePainting(@RequestBody Painting painting) {
        return ResponseEntity.ok(service.savePainting(painting));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Painting> getPainting(@PathVariable Long id) {
        return service.getPainting(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Painting> updatePainting(@PathVariable Long id, @RequestBody Painting painting) {
        try {
            return ResponseEntity.ok(service.updatePainting(id, painting));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    public ResponseEntity<List<Painting>> getAllPaintings() {
        return ResponseEntity.ok(service.getAllPaintings());
    }
}
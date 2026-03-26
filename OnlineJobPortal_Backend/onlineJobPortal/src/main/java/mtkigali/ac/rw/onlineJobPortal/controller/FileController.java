package mtkigali.ac.rw.onlineJobPortal.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
public class FileController {

    @GetMapping
    public ResponseEntity<Resource> serveFile(@RequestParam String filePath) throws IOException {
        Path resolvedPath = Paths.get(filePath).normalize();

        if (!Files.exists(resolvedPath)) {
            throw new FileNotFoundException("File not found at path: " + filePath);
        }

        Resource resource = new UrlResource(resolvedPath.toUri());
        String contentType = Files.probeContentType(resolvedPath);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resolvedPath.getFileName().toString() + "\"")
                .body(resource);
    }
}

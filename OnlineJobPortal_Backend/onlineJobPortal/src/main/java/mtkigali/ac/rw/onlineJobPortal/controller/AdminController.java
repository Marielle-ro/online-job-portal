package mtkigali.ac.rw.onlineJobPortal.controller;

import mtkigali.ac.rw.onlineJobPortal.model.Category;
import mtkigali.ac.rw.onlineJobPortal.model.User;
import mtkigali.ac.rw.onlineJobPortal.service.CategoryService;
import mtkigali.ac.rw.onlineJobPortal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/categories")
    public ResponseEntity<String> createCategory(@RequestBody Category category) {
        categoryService.saveCategory(category);
        return ResponseEntity.ok("Category created successfully");
    }
}

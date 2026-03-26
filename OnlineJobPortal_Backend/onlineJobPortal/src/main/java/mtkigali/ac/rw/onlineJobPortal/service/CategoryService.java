package mtkigali.ac.rw.onlineJobPortal.service;

import mtkigali.ac.rw.onlineJobPortal.model.Category;
import mtkigali.ac.rw.onlineJobPortal.model.CategoryDTO;
import mtkigali.ac.rw.onlineJobPortal.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // public List<Category> getAllCategories() {
    //     return categoryRepository.findAll();
    // }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category saveCategory(Category category) { // Add this method
        return categoryRepository.save(category);
    }
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> new CategoryDTO(category.getCategoryId(), category.getName()))
                .collect(Collectors.toList());
    }

    public Optional<Category> findById(UUID id) {
        return categoryRepository.findById(id); // Use the repository to find the user by UUID
    }
}

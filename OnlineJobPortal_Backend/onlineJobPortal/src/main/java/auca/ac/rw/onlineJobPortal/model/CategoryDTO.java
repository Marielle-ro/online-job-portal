package auca.ac.rw.onlineJobPortal.model;
import java.util.UUID;

public class CategoryDTO {

    private UUID categoryId;
    private String name;

    public CategoryDTO(UUID categoryId, String name) {
        this.categoryId = categoryId;
        this.name = name;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
}

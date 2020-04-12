package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Category;
import springboot.server.model.Subject;
import springboot.server.repository.CategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return true;
    }
}

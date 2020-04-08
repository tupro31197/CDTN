package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Category;
import springboot.server.repository.CategoryRepository;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return true;
    }
}

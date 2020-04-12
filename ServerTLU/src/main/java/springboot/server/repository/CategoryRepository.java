package springboot.server.repository;

import org.springframework.data.repository.CrudRepository;
import springboot.server.model.Category;

import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, String> {
    List<Category> findAll();
}

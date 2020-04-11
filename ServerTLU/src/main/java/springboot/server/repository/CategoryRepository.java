package springboot.server.repository;

import org.springframework.data.repository.CrudRepository;
import springboot.server.model.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}

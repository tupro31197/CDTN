package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Department;

import java.util.List;

public interface DepartmentRepository extends MongoRepository<Department, String> {
    List<Department> findAll();
    List<Department> findByIsDeleted(boolean isDeleted);
    Department findByDepartmentId(String departmentId);
    Department findBy_id(String id);
}

package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Employee;

import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    List<Employee> findAll();
    List<Employee> findByIsDeleted(boolean isDeleted);
    Employee findByName(String name);
    Employee findBy_id(String id);
    Employee findByEmployeeId(String employeeId);
    List<Employee> findByGroupSubjectId(String id);
}

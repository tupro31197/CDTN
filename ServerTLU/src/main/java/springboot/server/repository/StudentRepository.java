package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Student;

import java.util.List;

public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findAll();
}

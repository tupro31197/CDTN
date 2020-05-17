package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Student;
import springboot.server.model.Subject;

import java.util.List;

public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findAll();
    List<Student> findByIsDeleted(boolean isDeleted);
    Student findByStudentId(String studentId);
    Student findBy_id(String studentId);
}

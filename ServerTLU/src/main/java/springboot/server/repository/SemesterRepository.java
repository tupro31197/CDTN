package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Semester;

import java.util.List;

public interface SemesterRepository extends MongoRepository<Semester, String> {
    List<Semester> findAll();
}

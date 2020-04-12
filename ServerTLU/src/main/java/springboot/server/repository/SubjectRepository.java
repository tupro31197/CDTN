package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Subject;

import java.util.List;

public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findAll();
}

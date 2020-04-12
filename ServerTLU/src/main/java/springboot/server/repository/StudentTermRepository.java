package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.StudentTerm;

public interface StudentTermRepository extends MongoRepository<StudentTerm, String> {
}

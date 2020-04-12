package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.FinalGrade;

public interface FinalGradeRepository extends MongoRepository<FinalGrade, String> {
}

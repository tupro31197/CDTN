package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.FinalGrade;

import java.util.List;

public interface FinalGradeRepository extends MongoRepository<FinalGrade, String> {
    List<FinalGrade> findByStudentId(String studentId);
}

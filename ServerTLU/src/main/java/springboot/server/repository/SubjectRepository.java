package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Subject;

import java.util.List;

public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findAll();
    List<Subject> findByIsDeleted(boolean isDeleted);
    Subject findBySubjectId(String subjectId);
    Subject findBy_id(String id);
    List<Subject> findByGroupSubjectId(String groupSubjectId);
}

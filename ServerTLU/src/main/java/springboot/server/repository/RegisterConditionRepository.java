package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.RegisterCondition;

import java.util.List;

public interface RegisterConditionRepository extends MongoRepository<RegisterCondition, String> {
    List<RegisterCondition> findByIsDeleted(boolean isDeleted);
    RegisterCondition findBy_id(String id);
    List<RegisterCondition> findBySemesterIdAndIsDeleted(String semesterId, boolean isDelete);
}

package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.RegisterCondition;

public interface RegisterConditionRepository extends MongoRepository<RegisterCondition, String> {
}

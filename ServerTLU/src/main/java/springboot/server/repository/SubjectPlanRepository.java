package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.SubjectPlan;

import java.util.List;

public interface SubjectPlanRepository extends MongoRepository<SubjectPlan, String> {
    List<SubjectPlan> findBySemesterId(String semesterId);
}

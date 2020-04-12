package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.GroupSubject;

import java.util.List;

public interface GroupSubjectRepository extends MongoRepository<GroupSubject, String> {
    List<GroupSubject> findAll();
}

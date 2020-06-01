package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.GroupSubject;

import java.util.List;

public interface GroupSubjectRepository extends MongoRepository<GroupSubject, String> {
    List<GroupSubject> findAll();
    List<GroupSubject> findByIsDeleted(boolean isDeleted);
    GroupSubject findBy_id(String id);
    void deleteBy_id(String id);
    GroupSubject findByName(String name);
}

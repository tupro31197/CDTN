package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Group;

import java.util.List;

public interface GroupRepository extends MongoRepository<Group, String> {
    List<Group> findAll();
}

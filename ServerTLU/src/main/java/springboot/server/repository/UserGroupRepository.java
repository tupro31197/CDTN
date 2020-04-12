package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.UserGroup;

import java.util.List;

public interface UserGroupRepository extends MongoRepository<UserGroup, String> {
    List<UserGroup> findAll();
}

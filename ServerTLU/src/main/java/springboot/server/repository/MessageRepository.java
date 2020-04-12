package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
}

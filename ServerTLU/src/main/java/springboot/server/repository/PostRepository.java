package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Post;

public interface PostRepository extends MongoRepository<Post, String> {
}

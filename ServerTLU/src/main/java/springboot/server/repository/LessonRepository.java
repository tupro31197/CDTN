package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Lesson;

import java.util.List;

public interface LessonRepository extends MongoRepository<Lesson, String> {
    List<Lesson> findAll();
}

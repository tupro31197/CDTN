package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import springboot.server.model.Lesson;

import java.util.List;

public interface LessonRepository extends MongoRepository<Lesson, String> {
    List<Lesson> findAll();
    Lesson findBy_id(String id);
    List<Lesson> findByTeacherId(String teacherId);
    List<Lesson> findByStatus(String status);
    List<Lesson> findBySemesterId(String semesterId);
    List<Lesson> findBySemesterIdAndStatus(String semesterId, String status);
    void deleteAllBySemesterId(String semesterId);
    Lesson findFirstBy_id(String id);

//    @Query(value = "{ 'semesterId' :  ?0 }", fields = "{ '_id': 0, 'lessonName': 1 }")
//    List<String> findLessonNameBySemesterId(String semesterId);
}

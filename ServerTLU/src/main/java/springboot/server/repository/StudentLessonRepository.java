package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.StudentLesson;

import java.util.List;

public interface StudentLessonRepository extends MongoRepository<StudentLesson, String> {
    List<StudentLesson> findByStudentId(String studentId);
    List<StudentLesson> findByLessonId(String id);
    StudentLesson findFirstByLessonIdAndStudentId(String lessonId, String studentId);
}

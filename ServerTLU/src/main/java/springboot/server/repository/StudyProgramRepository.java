package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.StudyProgram;

import java.util.List;

public interface StudyProgramRepository extends MongoRepository<StudyProgram, String> {
    List<StudyProgram> findAll();
    List<StudyProgram> findByDepartmentIdAndIsDeleted(String departmentId, boolean isDeleted);
    List<StudyProgram> findByDepartmentId(String departmentId);
    List<StudyProgram> findBy_id(String id);
}

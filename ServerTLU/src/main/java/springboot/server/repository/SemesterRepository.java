package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Semester;

import java.util.List;

public interface SemesterRepository extends MongoRepository<Semester, String> {
    List<Semester> findAll();
    Semester findByNameAndGroupAndYear(String name, int group, String year);
    List<Semester> findByYear(String year);
    Semester findBy_id(String id);
    Semester getTopByOrderByEndDesc();
    List<Semester> findByYearAndStatusOrStatus(String year, int status1, int status2);
    Semester findFirstByGroupAndStatus(int group, int status);
}

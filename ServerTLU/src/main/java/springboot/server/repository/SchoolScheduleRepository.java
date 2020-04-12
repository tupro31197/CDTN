package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.SchoolSchedule;

import java.util.List;

public interface SchoolScheduleRepository extends MongoRepository<SchoolSchedule, String> {
    List<SchoolSchedule> findAll();
}

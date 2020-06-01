package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Shift;

import java.util.List;

public interface ShiftRepository extends MongoRepository<Shift, String> {
    List<Shift> findAll();
    List<Shift> findByIsDeleted(boolean isDeleted);
    Shift findByStartShiftAndEndShiftAndDayOfWeek(String startShift, String endShift, String dayOfWeek);
    Shift findBy_id(String id);
    List<Shift> findByDayOfWeek(String dayOfWeek);
}

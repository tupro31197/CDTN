package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Room;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findAll();
    List<Room> findByIsDeleted(boolean isDeleted);
    Room findByName(String name);
    Room findBy_id(String id);
}

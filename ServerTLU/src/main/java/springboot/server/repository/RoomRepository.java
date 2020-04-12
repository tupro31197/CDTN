package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Room;

import java.util.List;

public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findAll();

}

package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.RegisterCondition;
import springboot.server.model.Room;
import springboot.server.model.Subject;
import springboot.server.repository.RoomRepository;

import java.util.List;

@RestController
@RequestMapping("/api/room")
public class RoomController {
    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Room> getAllRoom() {
        return roomRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveRoom(@RequestBody Room room) {
        roomRepository.save(room);
        return true;
    }
}

package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Shift;
import springboot.server.repository.ShiftRepository;

import java.util.List;

@RestController
@RequestMapping("/api/shift")
public class ShiftController {
    private final ShiftRepository shiftRepository;

    public ShiftController(ShiftRepository shiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Shift> getAllShift() {
        return shiftRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveShift(@RequestBody Shift shift) {
        shiftRepository.save(shift);
        return true;
    }
}

package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.RegisterCondition;
import springboot.server.model.SchoolSchedule;
import springboot.server.model.Subject;
import springboot.server.repository.SchoolScheduleRepository;

import java.util.List;

@RestController
@RequestMapping("/api/schoolSchedule")
public class SchoolScheduleController {
    private final SchoolScheduleRepository schoolScheduleRepository;

    public SchoolScheduleController(SchoolScheduleRepository schoolScheduleRepository) {
        this.schoolScheduleRepository = schoolScheduleRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<SchoolSchedule> getAllSchoolSchedule() {
        return schoolScheduleRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveSchoolSchedule(@RequestBody SchoolSchedule schoolSchedule) {
        schoolScheduleRepository.save(schoolSchedule);
        return true;
    }
}

package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.RegisterCondition;
import springboot.server.model.Semester;
import springboot.server.model.Subject;
import springboot.server.repository.SemesterRepository;

import java.util.List;

@RestController
@RequestMapping("/api/semester")
public class SemesterController {
    private final SemesterRepository semesterRepository;

    public SemesterController(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Semester> getAllSemester() {
        return semesterRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveSemester(@RequestBody Semester semester) {
        semesterRepository.save(semester);
        return true;
    }
}

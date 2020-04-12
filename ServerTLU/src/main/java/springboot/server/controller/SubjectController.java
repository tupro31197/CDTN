package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.StudentTerm;
import springboot.server.model.Subject;
import springboot.server.repository.SubjectRepository;

import java.util.List;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {
    private final SubjectRepository subjectRepository;

    public SubjectController(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Subject> getAllSubject() {
        return subjectRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveSubject(@RequestBody Subject subject) {
        subjectRepository.save(subject);
        return true;
    }
}

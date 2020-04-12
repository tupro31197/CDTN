package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.StudentTerm;
import springboot.server.repository.StudentTermRepository;

@RestController
@RequestMapping("/api/studentTerm")
public class StudentTermController {
    private final StudentTermRepository studentTermRepository;

    public StudentTermController(StudentTermRepository studentTermRepository) {
        this.studentTermRepository = studentTermRepository;
    }


    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveStudentTerm(@RequestBody StudentTerm studentTerm) {
        studentTermRepository.save(studentTerm);
        return true;
    }
}

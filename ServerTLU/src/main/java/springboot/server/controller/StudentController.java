package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Shift;
import springboot.server.model.Student;
import springboot.server.repository.StudentRepository;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveStudent(@RequestBody Student student) {
        studentRepository.save(student);
        return true;
    }
}

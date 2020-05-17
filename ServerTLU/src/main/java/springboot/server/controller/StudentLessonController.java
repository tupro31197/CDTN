package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.StudentLesson;
import springboot.server.repository.StudentLessonRepository;

@RestController
@RequestMapping("/api/studentLesson")
public class StudentLessonController {
    private final StudentLessonRepository studentLessonRepository;

    public StudentLessonController(StudentLessonRepository studentLessonRepository) {
        this.studentLessonRepository = studentLessonRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveStudentTerm(@RequestBody StudentLesson studentLesson) {
        studentLessonRepository.save(studentLesson);
        return true;
    }
}

package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.GroupSubject;
import springboot.server.model.Lesson;
import springboot.server.repository.LessonRepository;

@RestController
@RequestMapping("/api/lesson")
public class LessonController {
    private final LessonRepository lessonRepository;

    public LessonController(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveLesson(@RequestBody Lesson lesson) {
        lessonRepository.save(lesson);
        return true;
    }
}

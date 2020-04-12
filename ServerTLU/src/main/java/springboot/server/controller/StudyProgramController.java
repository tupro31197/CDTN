package springboot.server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springboot.server.repository.StudyProgramRepository;

@RestController
@RequestMapping("/api/studyProgram")
public class StudyProgramController {
    private final StudyProgramRepository studyProgramRepository;

    public StudyProgramController(StudyProgramRepository studyProgramRepository) {
        this.studyProgramRepository = studyProgramRepository;
    }
}

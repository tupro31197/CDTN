package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Department;
import springboot.server.model.FinalGrade;
import springboot.server.repository.FinalGradeRepository;

@RestController
@RequestMapping("/api/finalGrade")
public class FinalGradeController {
    private final FinalGradeRepository finalGradeRepository;

    public FinalGradeController(FinalGradeRepository finalGradeRepository) {
        this.finalGradeRepository = finalGradeRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveFinalGrade(@RequestBody FinalGrade finalGrade) {
        finalGradeRepository.save(finalGrade);
        return true;
    }
}

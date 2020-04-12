package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.StudentTerm;
import springboot.server.model.Term;
import springboot.server.repository.TermRepository;

@RestController
@RequestMapping("/api/term")
public class TermController {
    private final TermRepository termRepository;

    public TermController(TermRepository termRepository) {
        this.termRepository = termRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveTerm(@RequestBody Term term) {
        termRepository.save(term);
        return true;
    }
}

package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.GroupSubject;
import springboot.server.model.RegisterCondition;
import springboot.server.repository.RegisterConditionRepository;

@RestController
@RequestMapping("/api/registerCondition")
public class RegisterConditionController {
    private final RegisterConditionRepository registerConditionRepository;

    public RegisterConditionController(RegisterConditionRepository registerConditionRepository) {
        this.registerConditionRepository = registerConditionRepository;
    }
    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveRegisterCondition(@RequestBody RegisterCondition registerCondition) {
        registerConditionRepository.save(registerCondition);
        return true;
    }

}

package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Department;
import springboot.server.model.Employee;
import springboot.server.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveEmployee(@RequestBody Employee employee) {
        employeeRepository.save(employee);
        return true;
    }
}

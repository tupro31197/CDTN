package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Department;
import springboot.server.model.Subject;
import springboot.server.repository.DepartmentRepository;

import java.util.List;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {
    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Department> getAllDepartment() {
        return departmentRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveEmployee(@RequestBody Department department) {
        departmentRepository.save(department);
        return true;
    }
}

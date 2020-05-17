package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Department;
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
        return departmentRepository.findByIsDeleted(false);
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Department getDepartmentById(@PathVariable String id) {
        return departmentRepository.findBy_id(id);
    }

    @PutMapping(value = "/")
    @ResponseBody
    public boolean updateDepartment(@RequestBody Department newDepartment) {
        Department department = departmentRepository.findBy_id(newDepartment.get_id());
        department.setDepartmentId(newDepartment.getDepartmentId());
        department.setDepartmentName(newDepartment.getDepartmentName());
        department.setDeleted(false);
        departmentRepository.save(department);
        return true;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveDepartment(@RequestBody Department department) {
        departmentRepository.save(department);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteDepartment(@PathVariable String id) {
        Department department = departmentRepository.findBy_id(id);
        department.setDeleted(true);
        departmentRepository.save(department);
        return true;
    }

    @GetMapping(value = "/isExist/{departmentId}")
    @ResponseBody
    public boolean isExist(@PathVariable String departmentId) {
        return departmentRepository.findByDepartmentId(departmentId) != null;
    }
}

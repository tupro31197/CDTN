package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.Employee;
import springboot.server.model.Subject;
import springboot.server.model.SubjectPlan;
import springboot.server.repository.EmployeeRepository;
import springboot.server.repository.SubjectPlanRepository;
import springboot.server.repository.SubjectRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/subjectPlan")
public class SubjectPlanController {
    private final SubjectPlanRepository subjectPlanRepository;
    private final SubjectRepository subjectRepository;
    private final EmployeeRepository employeeRepository;

    public SubjectPlanController(SubjectPlanRepository subjectPlanRepository, SubjectRepository subjectRepository, EmployeeRepository employeeRepository) {
        this.subjectPlanRepository = subjectPlanRepository;
        this.subjectRepository = subjectRepository;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean createSubjectPlan(@RequestBody SubjectPlan subjectPlan) {
        subjectPlanRepository.save(subjectPlan);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteSubjectPlan(@PathVariable String id) {
        subjectPlanRepository.deleteById(id);
        return true;
    }

    @GetMapping(value = "/getBySemester/{semesterId}")
    @ResponseBody
    public String getListSubjectPlanBySemester(@PathVariable String semesterId) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        List<SubjectPlan> listSubjectPlan = subjectPlanRepository.findBySemesterId(semesterId);
        for (SubjectPlan subjectPlan : listSubjectPlan) {
            String subjectName = subjectRepository.findBy_id(subjectPlan.getSubjectId()).getName();
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("_id", subjectPlan.get_id());
            jsonObject.addProperty("subjectName", subjectName);
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }

    @GetMapping(value = "/getListSubject/{teacherId}/{semesterId}")
    @ResponseBody
    public List<Subject> getListSubjectPlanFindByGroupSubject(@PathVariable String teacherId, @PathVariable String semesterId){
        Employee teacher = employeeRepository.findBy_id(teacherId);
        List<Subject> listSubject = subjectRepository.findByGroupSubjectId(teacher.getGroupSubjectId());
        List<SubjectPlan> subjectPlanList = subjectPlanRepository.findBySemesterId(semesterId);
        for (SubjectPlan subjectPlan : subjectPlanList) {
            String subjectId = subjectPlan.getSubjectId();
            for (int i = 0; i < listSubject.size(); i++) {
                if (subjectId.equals(listSubject.get(i).get_id())) {
                    listSubject.remove(listSubject.get(i));
                    i--;
                }
            }
        }
        return listSubject;
    }
}

package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.Employee;
import springboot.server.model.GroupSubject;
import springboot.server.model.Lesson;
import springboot.server.model.Shift;
import springboot.server.repository.*;
import springboot.server.response.TeacherScheduleResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    private final EmployeeRepository employeeRepository;
    private final GroupSubjectRepository groupSubjectRepository;
    private final LessonRepository lessonRepository;
    private final SubjectRepository subjectRepository;
    private final ShiftRepository shiftRepository;
    private final RoomRepository roomRepository;

    public EmployeeController(EmployeeRepository employeeRepository, GroupSubjectRepository groupSubjectRepository, LessonRepository lessonRepository, SubjectRepository subjectRepository, ShiftRepository shiftRepository, RoomRepository roomRepository) {
        this.employeeRepository = employeeRepository;
        this.groupSubjectRepository = groupSubjectRepository;
        this.lessonRepository = lessonRepository;
        this.subjectRepository = subjectRepository;
        this.shiftRepository = shiftRepository;
        this.roomRepository = roomRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveEmployee(@RequestBody Employee employee) {
        Employee updateEmployee = employeeRepository.findByEmployeeId(employee.getEmployeeId());
        employeeRepository.save(employee);
        return true;
    }

    @GetMapping("/")
    @ResponseBody
    public String getAllTeacher() {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        for (Employee employee : employeeRepository.findByIsDeleted(false)) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("_id", employee.get_id());
            jsonObject.addProperty("teacherId", employee.getEmployeeId());
            jsonObject.addProperty("name", employee.getName());
            if (groupSubjectRepository.findBy_id(employee.getGroupSubjectId()) != null) {
                jsonObject.addProperty("groupSubject", groupSubjectRepository.findBy_id(employee.getGroupSubjectId()).getName());
            } else {
                jsonObject.addProperty("groupSubject", "");
            }
            jsonObject.addProperty("email", employee.getEmail());
            jsonObject.addProperty("phone", employee.getPhoneNumber());
            jsonObject.addProperty("dob", employee.getDayOfBirth());
            jsonObject.addProperty("address", employee.getAddress());
            jsonObject.addProperty("role", employee.getRole());
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }

    @GetMapping("/getSchedule/{teacherId}/{semesterId}")
    @ResponseBody
    public List<TeacherScheduleResponse> getScheduleOfTeacherBySemester(@PathVariable String teacherId, @PathVariable String semesterId) {
        ArrayList<TeacherScheduleResponse> teacherScheduleResponseArrayList = new ArrayList<>();
        for (Lesson lesson : lessonRepository.findBySemesterId(semesterId)) {
            if (employeeRepository.findBy_id(teacherId).getEmployeeId().equals(lesson.getTeacherId())) {
                Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
                TeacherScheduleResponse teacherScheduleResponse = new TeacherScheduleResponse();
                teacherScheduleResponse.setLessonName(lesson.getLessonName());
                teacherScheduleResponse.setStartShift(shift.getStartShift());
                teacherScheduleResponse.setEndShift(shift.getEndShift());
                teacherScheduleResponse.setDayOfWeek(shift.getDayOfWeek());
                teacherScheduleResponse.setRoomName(roomRepository.findBy_id(lesson.getRoomId()).getName());
                teacherScheduleResponseArrayList.add(teacherScheduleResponse);
            }
        }
        return teacherScheduleResponseArrayList;
    }

    @GetMapping("/getGroupSubjectSchedule/{teacherId}/{semesterId}")
    @ResponseBody
    public String getGroupSubjectScheduleBySemester(@PathVariable String teacherId, @PathVariable String semesterId) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        for (Lesson lesson : lessonRepository.findBySemesterId(semesterId)) {
            if (employeeRepository.findBy_id(teacherId).getGroupSubjectId()
                    .equals(employeeRepository.findByEmployeeId(lesson.getTeacherId()).getGroupSubjectId())) {
                Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("name", lesson.getLessonName());
                jsonObject.addProperty("subject", subjectRepository.findBySubjectId(lesson.getSubjectId()).getName());
                jsonObject.addProperty("startShift", shift.getStartShift());
                jsonObject.addProperty("endShift", shift.getEndShift());
                jsonObject.addProperty("dayOfWeek", shift.getDayOfWeek());
                jsonObject.addProperty("room", roomRepository.findBy_id(lesson.getRoomId()).getName());
                jsonObject.addProperty("teacher", employeeRepository.findByEmployeeId(lesson.getTeacherId()).getName());
                jsonArray.add(jsonObject);
            }
        }
        return new Gson().toJson(jsonArray);
    }

    @PostMapping(value = "/import")
    @ResponseBody
    public boolean importTeacher() throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\Teacher.csv"));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            Employee employee = new Employee();
            employee.setName(csvRecord.get(0));
            employee.setRole(csvRecord.get(1));
            for (GroupSubject groupSubject: groupSubjectRepository.findAll()) {
                if (csvRecord.get(2).equals(groupSubject.getName())) {
                    employee.setGroupSubjectId(groupSubject.get_id());
                }
            }

            employee.setEmployeeId("GV" + (employeeRepository.findAll().size() + 1));
            employee.setEmail("");
            employee.setPassword("123");
            employee.setPhoneNumber("");
            employee.setDayOfBirth("");
            employee.setAddress("");
            employee.setDeleted(false);

            employeeRepository.save(employee);
        }
        return true;
    }

    @PostMapping(value = "/importFromSchoolSchedule/{filename}")
    @ResponseBody
    public boolean importTeacherFromSchoolSchedule(@PathVariable
                                                   String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f", "g", "h")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            if (employeeRepository.findByName(csvRecord.get(7)) == null) {
                Employee employee = new Employee();
                employee.setName(csvRecord.get(7));
                employee.setRole("Giảng viên");
                employee.setGroupSubjectId("");
                employee.setEmployeeId("GV" + (employeeRepository.findAll().size() + 1));
                employee.setEmail("");
                employee.setPassword("123");
                employee.setPhoneNumber("");
                employee.setDayOfBirth("");
                employee.setAddress("");
                employee.setDeleted(false);

                employeeRepository.save(employee);
            }
        }
        return true;
    }
}

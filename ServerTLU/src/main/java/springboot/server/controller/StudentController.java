package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.*;
import springboot.server.repository.*;
import springboot.server.response.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentRepository studentRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final FinalGradeRepository finalGradeRepository;
    private final SubjectRepository subjectRepository;
    private final StudentLessonRepository studentLessonRepository;
    private final LessonRepository lessonRepository;
    private final ShiftRepository shiftRepository;
    private final RoomRepository roomRepository;

    public StudentController(StudentRepository studentRepository, EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, FinalGradeRepository finalGradeRepository, SubjectRepository subjectRepository, StudentLessonRepository studentLessonRepository, LessonRepository lessonRepository, ShiftRepository shiftRepository, RoomRepository roomRepository) {
        this.studentRepository = studentRepository;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.finalGradeRepository = finalGradeRepository;
        this.subjectRepository = subjectRepository;
        this.studentLessonRepository = studentLessonRepository;
        this.lessonRepository = lessonRepository;
        this.shiftRepository = shiftRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping(value = "/getInfo/{studentId}")
    @ResponseBody
    public Student getInfoByStudentId(@PathVariable String studentId) {
        return studentRepository.findByStudentId(studentId);
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<StudentResponse> getAllStudent() {
        List<StudentResponse> listResponse = new ArrayList<>();
        for (Student student : studentRepository.findByIsDeleted(false)) {
            StudentResponse studentResponse = new StudentResponse();
            studentResponse.set_id(student.get_id());
            studentResponse.setStudentId(student.getStudentId());
            studentResponse.setName(student.getName());
            studentResponse.setClassName(student.getClassName());
            studentResponse.setDepartment(student.getDepartmentId());
            studentResponse.setEmail(student.getEmail());
            studentResponse.setPhone(student.getPhoneNumber());
            studentResponse.setDob(student.getDayOfBirth());
            studentResponse.setAddress(student.getAddress());
            studentResponse.setGroup(student.getGroup());
            listResponse.add(studentResponse);
        }
        return listResponse;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveStudent(@RequestBody Student student) {
        studentRepository.save(student);
        return true;
    }

    @GetMapping(value = "/getGrade/{studentId}")
    @ResponseBody
    public List<GradeResponse> getGrade(@PathVariable String studentId) {
        List<GradeResponse> gradeResponseList = new ArrayList<>();
        for (FinalGrade finalGrade : finalGradeRepository.findByStudentId(studentRepository.findBy_id(studentId).getStudentId())) {
            Subject subject = subjectRepository.findBySubjectId(finalGrade.getSubjectId());
            GradeResponse gradeResponse = new GradeResponse();
            gradeResponse.setSubjectId(finalGrade.getSubjectId());
            gradeResponse.setSubjectName(subject.getName());
            gradeResponse.setGrade(finalGrade.getGrade());
            gradeResponse.setCredit(subject.getCredit());

            gradeResponseList.add(gradeResponse);
        }
        return gradeResponseList;
    }

    @GetMapping(value = "/getCreditAndAverage/{studentId}")
    @ResponseBody
    public CreditAndAverageResponse getCreditAndAverageByStudentId(@PathVariable String studentId) {
        CreditAndAverageResponse creditAndAverageResponse = new CreditAndAverageResponse();
        float totalGrade = 0;
        int totalCredit = 0;
        for (FinalGrade finalGrade : finalGradeRepository.findByStudentId(studentRepository.findBy_id(studentId).getStudentId())) {
            totalGrade = totalGrade + Float.parseFloat(finalGrade.getGrade()) * Integer.parseInt(subjectRepository.findBySubjectId(finalGrade.getSubjectId()).getCredit());
            totalCredit = totalCredit + Integer.parseInt(subjectRepository.findBySubjectId(finalGrade.getSubjectId()).getCredit());
        }
        float average = totalGrade/totalCredit;
        creditAndAverageResponse.setAverageGrade(average);
        creditAndAverageResponse.setCredit(totalCredit);
        return creditAndAverageResponse;
    }

    @GetMapping("/getSchedule/{studentId}/{semesterId}")
    @ResponseBody
    public List<StudentScheduleResponse> getScheduleOBySemester(@PathVariable String studentId, @PathVariable String semesterId) {
        ArrayList<StudentScheduleResponse> studentScheduleResponses = new ArrayList<>();
        for (StudentLesson studentLesson : studentLessonRepository.findByStudentId(studentId)) {
            Lesson lesson = lessonRepository.findBy_id(studentLesson.getLessonId());
            if (lesson.getSemesterId().equals(semesterId) ) {

                Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
                StudentScheduleResponse studentScheduleResponse = new StudentScheduleResponse();
                studentScheduleResponse.setLessonName(lesson.getLessonName());
                studentScheduleResponse.setStartShift(shift.getStartShift());
                studentScheduleResponse.setEndShift(shift.getEndShift());
                studentScheduleResponse.setDayOfWeek(shift.getDayOfWeek());
                studentScheduleResponse.setRoomName(roomRepository.findBy_id(lesson.getRoomId()).getName());
                studentScheduleResponse.setSubjectName(subjectRepository.findBySubjectId(lesson.getSubjectId()).getName());
                studentScheduleResponses.add(studentScheduleResponse);
            }
        }
        return studentScheduleResponses;
    }

    @GetMapping(value = "/checkLogin/{account}/{password}")
    @ResponseBody
    public String checkLogin(@PathVariable String account, @PathVariable String password) {
        JsonObject jsonObject = new JsonObject();
        if (account.contains("A")) {
            if (studentRepository.findByStudentId(account).getPassword().equals(password)) {
                jsonObject.addProperty("userId", studentRepository.findByStudentId(account).get_id());
                jsonObject.addProperty("userName", studentRepository.findByStudentId(account).getName());
                jsonObject.addProperty("role", "SV");
            }
        }
        else {
            jsonObject.addProperty("userId", employeeRepository.findByEmployeeId(account).get_id());
            jsonObject.addProperty("userName", employeeRepository.findByEmployeeId(account).getName());
            jsonObject.addProperty("role", employeeRepository.findByEmployeeId(account).getRole());
        }
        return new Gson().toJson(jsonObject);
    }

    @GetMapping(value = "/getProfile/{userId}")
    @ResponseBody
    public String getProfile(@PathVariable String userId) {
        JsonObject jsonObject = new JsonObject();
        if (employeeRepository.findBy_id(userId) != null) {
            Employee employee = employeeRepository.findBy_id(userId);
            jsonObject.addProperty("userId",employee.getEmployeeId());
            jsonObject.addProperty("userName", employee.getName());
            jsonObject.addProperty("class", "");
            jsonObject.addProperty("department", "");
            jsonObject.addProperty("email", employee.getEmail());
            jsonObject.addProperty("phoneNumber", employee.getPhoneNumber());
            jsonObject.addProperty("dob", employee.getDayOfBirth());
            jsonObject.addProperty("address", employee.getAddress());
        }
        else if (studentRepository.findBy_id(userId) != null) {
            Student student = studentRepository.findBy_id(userId);
            jsonObject.addProperty("userId", student.getStudentId());
            jsonObject.addProperty("userName", student.getName());
            jsonObject.addProperty("class", student.getClassName());
            jsonObject.addProperty("department", departmentRepository.findByDepartmentId(student.getDepartmentId()).getDepartmentName());
            jsonObject.addProperty("email", student.getEmail());
            jsonObject.addProperty("phoneNumber", student.getPhoneNumber());
            jsonObject.addProperty("dob", student.getDayOfBirth());
            jsonObject.addProperty("address", student.getAddress());
        }
        return new Gson().toJson(jsonObject);
    }

    @PostMapping("/import/{filename}")
    @ResponseBody
    public boolean importStudent(@PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader(
                Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader,
                CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f", "g", "h", "i")
                        .withIgnoreHeaderCase().withTrim());

        finalGradeRepository.deleteAll();

        for (CSVRecord csvRecord : csvParser) {
            if (studentRepository.findByStudentId(csvRecord.get(0)) == null) {
                Student student = new Student();
                student.setStudentId(csvRecord.get(0));
                student.setName(csvRecord.get(8));
                student.setClassName(csvRecord.get(5));
                student.setDepartmentId("TI");
                student.setEmail("");
                student.setPassword("123");
                student.setPhoneNumber("");
                student.setDayOfBirth("");
                student.setAddress("");
                student.setDeleted(false);
                studentRepository.save(student);
            }
            FinalGrade finalGrade = new FinalGrade();
            finalGrade.setStudentId(csvRecord.get(0));
            finalGrade.setSubjectId(csvRecord.get(1));
            finalGrade.setGrade(csvRecord.get(2));
            finalGradeRepository.save(finalGrade);
        }
        return true;
    }

    @PostMapping(value = "/migrate")
    @ResponseBody
    public boolean migrate() {
        for (Student student : studentRepository.findAll()) {
            student.setDepartmentId("TI");
            studentRepository.save(student);
        }
        return true;
    }
}

package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.*;
import springboot.server.repository.*;
import springboot.server.request.CreateLessonRequest;
import springboot.server.response.LessonResponse;
import springboot.server.response.WaitingLessonResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/lesson")
public class LessonController {
    private final LessonRepository lessonRepository;
    private final SubjectRepository subjectRepository;
    private final SubjectPlanRepository subjectPlanRepository;
    private final EmployeeRepository employeeRepository;
    private final GroupSubjectRepository groupSubjectRepository;
    private final ShiftRepository shiftRepository;
    private final SemesterRepository semesterRepository;
    private final RoomRepository roomRepository;

    public LessonController(LessonRepository lessonRepository, SubjectRepository subjectRepository, SubjectPlanRepository subjectPlanRepository, EmployeeRepository employeeRepository, GroupSubjectRepository groupSubjectRepository, ShiftRepository shiftRepository, SemesterRepository semesterRepository, RoomRepository roomRepository) {
        this.lessonRepository = lessonRepository;
        this.subjectRepository = subjectRepository;
        this.subjectPlanRepository = subjectPlanRepository;
        this.employeeRepository = employeeRepository;
        this.groupSubjectRepository = groupSubjectRepository;
        this.shiftRepository = shiftRepository;
        this.semesterRepository = semesterRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Lesson> getAllLesson() {
        return lessonRepository.findAll();
    }

    @GetMapping(value = "/getLessonBySemester/{semesterId}")
    @ResponseBody
    public List<LessonResponse> getLessonBySemester(@PathVariable  String semesterId) {
        List<LessonResponse> response = new ArrayList<>();
        List<Lesson> listLesson = lessonRepository.findBySemesterId(semesterId);
        for (Lesson lesson : listLesson) {
            Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
            LessonResponse lessonResponse = new LessonResponse();
            lessonResponse.setSubjectName(subjectRepository.findBySubjectId(lesson.getSubjectId()).getName());
            lessonResponse.setLessonName(lesson.getLessonName());
            lessonResponse.setDayOfWeek(shift.getDayOfWeek());
            lessonResponse.setShift(shift.getStartShift() + "-" + shift.getEndShift());
            lessonResponse.setRoomName(roomRepository.findBy_id(lesson.getRoomId()).getName());
            lessonResponse.setTeacherName(employeeRepository.findByEmployeeId(lesson.getTeacherId()).getName());
            lessonResponse.setStatus(lesson.getStatus());
            response.add(lessonResponse);
        }
        return response;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveLesson(@RequestBody CreateLessonRequest createLessonRequest) {
        Lesson lesson = new Lesson();
        lesson.setLessonName(createLessonRequest.getLessonName());
        lesson.setTeacherId(employeeRepository.findBy_id(createLessonRequest.getTeacherId()).getEmployeeId());
        lesson.setSubjectId(subjectRepository.findBy_id(createLessonRequest.getSubjectId()).getSubjectId());
        lesson.setShiftId(createLessonRequest.getShiftId());
        lesson.setRoomId(createLessonRequest.getRoomId());
        lesson.setSemesterId(createLessonRequest.getSemesterId());
        lesson.setStatus(createLessonRequest.getStatus());
        lessonRepository.save(lesson);
        return true;
    }

    @GetMapping(value = "/getListSubject/{teacherId}/{semesterId}")
    @ResponseBody
    public List<Subject> getListSubjectFindByGroupSubjectAndSemester(@PathVariable String teacherId, @PathVariable String semesterId){
        List<Subject> list = new ArrayList<>();
        List<SubjectPlan> subjectPlanList = subjectPlanRepository.findBySemesterId(semesterId);
        String groupSubjectId = employeeRepository.findBy_id(teacherId).getGroupSubjectId();
        for (SubjectPlan subjectPlan : subjectPlanList) {
            Subject subject = subjectRepository.findBy_id(subjectPlan.getSubjectId());
            if (subject.getGroupSubjectId().equals(groupSubjectId)) {
                list.add(subject);
            }
        }
        return list;
    }

    @GetMapping(value = "/getListWaiting/{semesterId}")
    @ResponseBody
    public List<WaitingLessonResponse> getListWaitingBySemesterId(@PathVariable String semesterId){
        List<WaitingLessonResponse> list = new ArrayList<>();
        for (Lesson lesson : lessonRepository.findBySemesterIdAndStatus(semesterId, "waiting")) {
            Subject subject = subjectRepository.findBySubjectId(lesson.getSubjectId());
            Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
            WaitingLessonResponse waitingLessonResponse = new WaitingLessonResponse();
            waitingLessonResponse.setLessonId(lesson.get_id());
            waitingLessonResponse.setSubjectId(subject.getSubjectId());
            waitingLessonResponse.setCredit(subject.getCredit());
            waitingLessonResponse.setSubjectName(subject.getName());
            waitingLessonResponse.setLessonName(lesson.getLessonName());
            waitingLessonResponse.setDayOfWeek(shift.getDayOfWeek());
            waitingLessonResponse.setShift(shift.getStartShift() + "-" + shift.getEndShift());
            waitingLessonResponse.setRoomName(roomRepository.findBy_id(lesson.getRoomId()).getName());
            waitingLessonResponse.setTeacherName(employeeRepository.findByEmployeeId(lesson.getTeacherId()).getName());
            list.add(waitingLessonResponse);
        }
        return list;
    }

    @GetMapping(value = "/getListTeacher/{teacherId}")
    @ResponseBody
    public List<Employee> getListTeacherFindByGroupSubject(@PathVariable String teacherId) {
        Employee teacher = employeeRepository.findBy_id(teacherId);
        return employeeRepository.findByGroupSubjectId(teacher.getGroupSubjectId());
    }

    @GetMapping(value = "/getSchoolSchedule/{semesterId}")
    @ResponseBody
    public String getSchoolSchedule(@PathVariable String semesterId) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        for (Lesson lesson : lessonRepository.findBySemesterId(semesterId)) {
            Subject subject = subjectRepository.findBySubjectId(lesson.getSubjectId());
            Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("subjectId", subject.getSubjectId());
            jsonObject.addProperty("subjectName", subject.getName());
            jsonObject.addProperty("lessonName", lesson.getLessonName());
            jsonObject.addProperty("roomName", roomRepository.findBy_id(lesson.getRoomId()).getName());
            String shiftName = shift.getStartShift() + "-" + shift.getEndShift();
            jsonObject.addProperty("shiftName", shiftName);
            jsonObject.addProperty("dayOfWeek", shift.getDayOfWeek());
            jsonObject.addProperty("credit", subject.getCredit());
            jsonObject.addProperty("teacherName", employeeRepository.findByEmployeeId(lesson.getTeacherId()).getName());
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }

    @PostMapping(value = "/import/{inputSemester}/{group}/{year}/{filename}")
    @ResponseBody
    public boolean importSchoolSchedule(@PathVariable String inputSemester, @PathVariable int group,
                                        @PathVariable String year, @PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader(
                Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader,
                CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f", "g", "h")
                        .withIgnoreHeaderCase().withTrim());

        Semester semester = semesterRepository.findByNameAndGroupAndYear
                (inputSemester, group, year);

        lessonRepository.deleteAllBySemesterId(semester.get_id());

        for (CSVRecord csvRecord : csvParser) {
            Lesson lesson = new Lesson();
            lesson.setLessonName(csvRecord.get(2));
            lesson.setRoomId(roomRepository.findByName(csvRecord.get(5)).get_id());
            String startShift;
            String endShift;
            if (csvRecord.get(4).length() == 5) {
                startShift = csvRecord.get(4).substring(0, 2);
                endShift = csvRecord.get(4).substring(3, 5);
            }
            else {
                startShift = csvRecord.get(4).substring(0, 1);
                endShift = csvRecord.get(4);
                if (endShift.length() == 3) {
                    endShift = (endShift.substring(2, 3));
                } else if (endShift.length() == 4) {
                    endShift = (endShift.substring(2, 4));
                }
            }
            lesson.setShiftId(shiftRepository.
                    findByStartShiftAndEndShiftAndDayOfWeek(startShift, endShift, csvRecord.get(3)).get_id());
            lesson.setSubjectId(csvRecord.get(0));
            lesson.setTeacherId(employeeRepository.findByName(csvRecord.get(7)).getEmployeeId());
            lesson.setSemesterId(semester.get_id());
            lesson.setStatus("active");

            lessonRepository.save(lesson);
        }
        return true;
    }
}

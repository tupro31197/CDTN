package springboot.server.controller;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.*;
import springboot.server.repository.*;
import springboot.server.response.GroupSubjectScheduleResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/groupSubject")
public class GroupSubjectController {
    private final GroupSubjectRepository groupSubjectRepository;
    private final LessonRepository lessonRepository;
    private final SubjectRepository subjectRepository;
    private final SubjectPlanRepository subjectPlanRepository;
    private final EmployeeRepository employeeRepository;
    private final ShiftRepository shiftRepository;
    private final RoomRepository roomRepository;

    public GroupSubjectController(GroupSubjectRepository groupSubjectRepository, LessonRepository lessonRepository, SubjectRepository subjectRepository, SubjectPlanRepository subjectPlanRepository, EmployeeRepository employeeRepository, ShiftRepository shiftRepository, RoomRepository roomRepository) {
        this.groupSubjectRepository = groupSubjectRepository;
        this.lessonRepository = lessonRepository;
        this.subjectRepository = subjectRepository;
        this.subjectPlanRepository = subjectPlanRepository;
        this.employeeRepository = employeeRepository;
        this.shiftRepository = shiftRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<GroupSubject> getAllGroupSubject() {
        return groupSubjectRepository.findByIsDeleted(false);
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public GroupSubject getGroupSubject(@PathVariable String id) {
        return groupSubjectRepository.findBy_id(id);
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveGroupSubject(@RequestBody GroupSubject groupSubject) {
        groupSubjectRepository.save(groupSubject);
        return true;
    }

    @PutMapping(value = "/")
    @ResponseBody
    public boolean updateGroupSubject(@RequestBody GroupSubject newGroupSubject) {
        GroupSubject groupSubject = groupSubjectRepository.findBy_id(newGroupSubject.get_id());
        groupSubject.setName(newGroupSubject.getName());
        groupSubject.setDeleted(false);
        groupSubjectRepository.save(groupSubject);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteGroupSubject(@PathVariable String id) {
        GroupSubject groupSubject = groupSubjectRepository.findBy_id(id);
        groupSubject.setDeleted(true);
        groupSubjectRepository.save(groupSubject);
        return true;
    }

    @GetMapping(value = "/isExist/{groupSubjectName}")
    public boolean isExist(@PathVariable String groupSubjectName) {
        return groupSubjectRepository.findByName(groupSubjectName) != null;
    }

    @PostMapping(value = "/import")
    @ResponseBody
    public boolean importGroupSubject() throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\GroupSubject.csv"));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a").withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            GroupSubject groupSubject = new GroupSubject();
            groupSubject.setName(csvRecord.get(0));

            groupSubjectRepository.save(groupSubject);
        }
        return true;
    }

    @GetMapping(value = "/getGroupSubjectSchedule/{semesterId}/{teacherId}")
    @ResponseBody
    public List<GroupSubjectScheduleResponse> getGroupSubjectSchedule(@PathVariable String semesterId, @PathVariable String teacherId) {
        List<GroupSubjectScheduleResponse> groupSubjectScheduleResponseList = new ArrayList<>();
        String groupSubjectId = employeeRepository.findBy_id(teacherId).getGroupSubjectId();
        for (Lesson lesson : lessonRepository.findBySemesterId(semesterId)) {
            if (employeeRepository.findBy_id(teacherId).getGroupSubjectId().equals(groupSubjectId)) {
                Subject subject = subjectRepository.findBySubjectId(lesson.getSubjectId());
                Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
                GroupSubjectScheduleResponse groupSubjectScheduleResponse = new GroupSubjectScheduleResponse();
                groupSubjectScheduleResponse.setSubjectId(subject.getSubjectId());
                groupSubjectScheduleResponse.setCredit(subject.getCredit());
                groupSubjectScheduleResponse.setSubjectName(subject.getName());
                groupSubjectScheduleResponse.setLessonName(lesson.getLessonName());
                groupSubjectScheduleResponse.setDayOfWeek(shift.getDayOfWeek());
                groupSubjectScheduleResponse.setShift(shift.getStartShift() + "-" + shift.getEndShift());
                groupSubjectScheduleResponse.setRoomName(roomRepository.findBy_id(lesson.getRoomId()).getName());
                groupSubjectScheduleResponse.setTeacherName(employeeRepository.findByEmployeeId(lesson.getTeacherId()).getName());
                groupSubjectScheduleResponseList.add(groupSubjectScheduleResponse);
            }
        }
        return groupSubjectScheduleResponseList;
    }
}

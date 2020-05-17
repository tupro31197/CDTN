package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.*;
import springboot.server.repository.*;
import springboot.server.response.StudentScheduleResponse;
import springboot.server.response.SubjectNameRegisterResponse;

import java.text.Normalizer;
import java.util.*;

@RestController
@RequestMapping("/api/registerCondition")
public class RegisterConditionController {
    private final RegisterConditionRepository registerConditionRepository;
    private final SemesterRepository semesterRepository;
    private final LessonRepository lessonRepository;
    private final SubjectRepository subjectRepository;
    private final StudyProgramRepository studyProgramRepository;
    private final StudentRepository studentRepository;
    private final FinalGradeRepository finalGradeRepository;
    private final DepartmentRepository departmentRepository;
    private final ShiftRepository shiftRepository;
    private final StudentLessonRepository studentLessonRepository;
    private final RoomRepository roomRepository;

    public RegisterConditionController(RegisterConditionRepository registerConditionRepository, SemesterRepository semesterRepository, LessonRepository lessonRepository, SubjectRepository subjectRepository, StudyProgramRepository studyProgramRepository, StudentRepository studentRepository, FinalGradeRepository finalGradeRepository, DepartmentRepository departmentRepository, ShiftRepository shiftRepository, StudentLessonRepository studentLessonRepository, RoomRepository roomRepository) {
        this.registerConditionRepository = registerConditionRepository;
        this.semesterRepository = semesterRepository;
        this.lessonRepository = lessonRepository;
        this.subjectRepository = subjectRepository;
        this.studyProgramRepository = studyProgramRepository;
        this.studentRepository = studentRepository;
        this.finalGradeRepository = finalGradeRepository;
        this.departmentRepository = departmentRepository;
        this.shiftRepository = shiftRepository;
        this.studentLessonRepository = studentLessonRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping(value = "/listSubjectToRegister/{studentId}/{semesterId}")
    @ResponseBody
    public List<SubjectNameRegisterResponse> listSubjectToRegister(@PathVariable String studentId, @PathVariable String semesterId) {
        List<SubjectNameRegisterResponse> listSubjectRegisterResponse = new ArrayList<>();

        // Danh sách các môn mở trong kỳ
        Set<String> listLessonInSemester = new HashSet<>();
        for (Lesson lesson : lessonRepository.findBySemesterId(semesterId)) {
            listLessonInSemester.add(subjectRepository.findBySubjectId(lesson.getSubjectId()).getName());
        }

        // Danh sách các môn đã học
        Set<String> listSubjectDone = new HashSet<>();
        for (FinalGrade finalGrade : finalGradeRepository.findByStudentId(
                studentRepository.findBy_id(studentId).getStudentId())) {
            listSubjectDone.add(subjectRepository.findBySubjectId(finalGrade.getSubjectId()).getName());
        }

        int totalCredit = 0;
        for (FinalGrade finalGrade : finalGradeRepository.findByStudentId(studentRepository.findBy_id(studentId).getStudentId())) {
            totalCredit = totalCredit + Integer.parseInt(subjectRepository.findBySubjectId(finalGrade.getSubjectId()).getCredit());
        }

        // Danh sách các môn trong chương trình học của sinh viên
        Set<String> listLessonInStudyProgram = new HashSet<>();
        int i = 0;
        for (StudyProgram studyProgram : studyProgramRepository.findByDepartmentId(
                studentRepository.findBy_id(studentId).getDepartmentId())
        ) {
            if (studyProgram.getPredictCreditCondition().equals("") && studyProgram.getPredictCreditCondition().equals("")) {
                listLessonInStudyProgram.add(subjectRepository.findBy_id(studyProgram.getSubjectId()).getName());
            } else if (!studyProgram.getPredictCreditCondition().equals("")
                    && !studyProgram.getPredictSubjectCondition().equals("")) {
                if (Integer.parseInt(studyProgram.getPredictCreditCondition()) <= totalCredit) {
                    boolean pass = true;
                    String removeSpace = studyProgram.getPredictSubjectCondition().replaceAll("[,]\\s+", ",");
                    StringTokenizer tokenizer = new StringTokenizer(removeSpace, ",");
                    while (tokenizer.hasMoreTokens()) {
                        String predictSubject = tokenizer.nextToken();
                        String predictSubjectAfterRegex = predictSubject.substring(0, predictSubject.indexOf(" "));
                        if (!listSubjectDone.contains(predictSubjectAfterRegex)) {
                            pass = false;
                        }
                    }
                    if (pass) {
                        listLessonInStudyProgram.add(subjectRepository.findBy_id(studyProgram.getSubjectId()).getName());
                    }
                }

            } else if (!studyProgram.getPredictCreditCondition().equals("") &&
                    Integer.parseInt(studyProgram.getPredictCreditCondition()) <= totalCredit) {
                listLessonInStudyProgram.add(subjectRepository.findBy_id(studyProgram.getSubjectId()).getName());
            } else if (!studyProgram.getPredictSubjectCondition().equals("")) {
                boolean pass = true;
                String removeSpace = studyProgram.getPredictSubjectCondition().replaceAll("[,]\\s+", ",");
                StringTokenizer tokenizer = new StringTokenizer(removeSpace, ",");
                while (tokenizer.hasMoreTokens()) {
                    String predictSubject = tokenizer.nextToken();
                    String predictSubjectAfterRegex = predictSubject.substring(0, predictSubject.indexOf(" "));
                    if (!listSubjectDone.contains(predictSubjectAfterRegex)) {
                        pass = false;
                    }
                }
                if (pass) {
                    listLessonInStudyProgram.add(subjectRepository.findBy_id(studyProgram.getSubjectId()).getName());
                }
            }
        }

        // Danh sách các môn học sẽ mở trong kỳ và nằm trong chương trình học
        Set<String> listLessonOpen = new HashSet<>();
        for (String subjectName : listLessonInSemester) {
            if (listLessonInStudyProgram.contains(subjectName)) {
                listLessonOpen.add(subjectName);
            }
        }

        // Danh sách các môn chưa học và mở trong kì
        for (String lessonOpen : listLessonOpen) {
            if (!listSubjectDone.contains(lessonOpen)) {
                SubjectNameRegisterResponse subjectNameRegisterResponse = new SubjectNameRegisterResponse();
                subjectNameRegisterResponse.setSubjectName(lessonOpen);
                listSubjectRegisterResponse.add(subjectNameRegisterResponse);
            }
        }

        return listSubjectRegisterResponse;
    }

    @GetMapping(value = "/listLessonToRegister/{subjectName}/{studentId}/{semesterId}")
    @ResponseBody
    public String listLessonToRegister(@PathVariable String subjectName, @PathVariable String studentId,
                                       @PathVariable String semesterId) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        String a = Normalizer.normalize(subjectName, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
        List<Lesson> listLesson = new ArrayList<>();
        for (Lesson lesson : lessonRepository.findBySemesterId(semesterId)) {
            String subjectNameBeforeRegex = subjectRepository.findBySubjectId(lesson.getSubjectId()).getName();
            String b = Normalizer.normalize(subjectNameBeforeRegex, Normalizer.Form.NFD)
                    .replaceAll("[^\\p{ASCII}]", "");
            if (a.equals(b)) {
                listLesson.add(lesson);
            }
        }
        for (Lesson lesson : listLesson) {
            Shift shift = shiftRepository.findBy_id(lesson.getShiftId());
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("tenLop", lesson.getLessonName());
            jsonObject.addProperty("caHoc", shift.getStartShift() + "-" + shift.getEndShift());
            jsonObject.addProperty("thu", shift.getDayOfWeek());
            if (studentLessonRepository.findFirstByLessonIdAndStudentId(lesson.get_id(), studentId) != null) {
                jsonObject.addProperty("checked", true);
            } else {
                jsonObject.addProperty("checked", false);
            }
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }

    @PostMapping(value = "/registerLesson/{studentId}/{subjectName}/{lessonNumber}/{semesterId}")
    @ResponseBody
    public int registerLesson(@PathVariable String studentId, @PathVariable String subjectName,
                              @PathVariable String lessonNumber, @PathVariable String semesterId) {
        String lessonName = subjectName + "." + lessonNumber;
        List<Lesson> listLessonFindBySemester = lessonRepository.findBySemesterId(semesterId);

        List<StudentLesson> lessonsCancel = new ArrayList<>();
        for (StudentLesson studentLesson : studentLessonRepository.findAll()) {
            if (studentLesson.getStudentId().equals(studentId) &&
                    lessonRepository.findFirstBy_id(studentLesson.getLessonId()).getLessonName().contains(lessonName)) {
                lessonsCancel.add(studentLesson);
                break;
            }
        }

        if (!lessonsCancel.isEmpty()) {
            studentLessonRepository.deleteAll(lessonsCancel);
            return 2;
        }

        boolean flag = true;

        List<Lesson> lessonsSelected = new ArrayList<>();
        for (Lesson lesson : listLessonFindBySemester) {
            if (lesson.getLessonName().contains(lessonName)) {
                lessonsSelected.add(lesson);
            }
        }

        List<Lesson> lessonsDone = new ArrayList<>();
        for (StudentLesson studentLesson : studentLessonRepository.findByStudentId(studentId)) {
            lessonsDone.add(lessonRepository.findBy_id(studentLesson.getLessonId()));
        }

        for (Lesson lessonSelected : lessonsSelected) {
            Shift shiftOfLessSelected = shiftRepository.findBy_id(lessonSelected.getShiftId());
            int startShiftOfLessonSelected = Integer.parseInt(shiftOfLessSelected.getStartShift());
            int endShiftOfLessonSelected = Integer.parseInt(shiftOfLessSelected.getEndShift());
            int dayOfWeekOfLessonSelected = Integer.parseInt(shiftOfLessSelected.getDayOfWeek());
            for (Lesson lessonDone : lessonsDone) {
                Shift shiftOfLessDone = shiftRepository.findBy_id(lessonDone.getShiftId());
                int startShiftOfLessonDone = Integer.parseInt(shiftOfLessDone.getStartShift());
                int endShiftOfLessonDone = Integer.parseInt(shiftOfLessDone.getEndShift());
                int dayOfWeekOfLessonDone = Integer.parseInt(shiftOfLessDone.getDayOfWeek());
                if (dayOfWeekOfLessonSelected == dayOfWeekOfLessonDone) {
                    if (!(startShiftOfLessonSelected > endShiftOfLessonDone
                            || endShiftOfLessonSelected < startShiftOfLessonDone)) {
                        flag = false;
                    }
                }
            }
        }

        if (flag) {

            for (StudentLesson studentLesson : studentLessonRepository.findByStudentId(studentId)) {
                String subjectNameRegisted = lessonRepository.findBy_id(
                        studentLesson.getLessonId()).getLessonName();

                if (Normalizer.normalize(subjectNameRegisted, Normalizer.Form.NFD)
                        .replaceAll("[^\\p{ASCII}]", "").contains(subjectName)) {
                    studentLessonRepository.delete(studentLesson);
                }
            }

            for (Lesson lessonSelected : lessonsSelected) {
                StudentLesson newStudentLesson = new StudentLesson();
                newStudentLesson.setLessonId(lessonSelected.get_id());
                newStudentLesson.setStudentId(studentId);

                studentLessonRepository.save(newStudentLesson);
            }
            return 1;
        }

        return 0;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveRegisterCondition(@RequestBody RegisterCondition registerCondition) {
        registerConditionRepository.save(registerCondition);
        return true;
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public RegisterCondition getRegisterCondition(@PathVariable String id) {
        return registerConditionRepository.findBy_id(id);
    }

    @GetMapping(value = "/findBySemester/{semesterId}")
    @ResponseBody
    public List<RegisterCondition> getListBySemester(@PathVariable String semesterId) {
        return registerConditionRepository.findBySemesterIdAndIsDeleted(semesterId, false);
    }

    @PutMapping(value = "/")
    @ResponseBody
    public boolean updateRegisterCondition(@RequestBody RegisterCondition newRegisterCondition) {
        RegisterCondition registerCondition = registerConditionRepository.findBy_id(newRegisterCondition.get_id());
        registerCondition.setName(newRegisterCondition.getName());
        registerCondition.setOpenTime(newRegisterCondition.getOpenTime());
        registerCondition.setCloseTime(newRegisterCondition.getCloseTime());
        registerCondition.setCredit(newRegisterCondition.getCredit());
        registerCondition.setSemesterId(newRegisterCondition.getSemesterId());
        registerCondition.setDeleted(false);
        registerConditionRepository.save(registerCondition);
        return true;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<RegisterCondition> getAllRegisterCondition() {
        return registerConditionRepository.findByIsDeleted(false);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteRegisterCondition(@PathVariable String id) {
        RegisterCondition registerCondition = registerConditionRepository.findBy_id(id);
        registerCondition.setDeleted(true);
        registerConditionRepository.save(registerCondition);
        return true;
    }
}

package springboot.server.controller;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.Department;
import springboot.server.model.Lesson;
import springboot.server.model.Semester;
import springboot.server.model.Shift;
import springboot.server.repository.EmployeeRepository;
import springboot.server.repository.LessonRepository;
import springboot.server.repository.SemesterRepository;
import springboot.server.repository.ShiftRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/shift")
public class ShiftController {
    private final ShiftRepository shiftRepository;
    private final SemesterRepository semesterRepository;
    private final LessonRepository lessonRepository;
    private final EmployeeRepository employeeRepository;

    public ShiftController(ShiftRepository shiftRepository, SemesterRepository semesterRepository, LessonRepository lessonRepository, EmployeeRepository employeeRepository) {
        this.shiftRepository = shiftRepository;
        this.semesterRepository = semesterRepository;
        this.lessonRepository = lessonRepository;
        this.employeeRepository = employeeRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Shift> getAllShift() {
        return shiftRepository.findByIsDeleted(false);
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveShift(@RequestBody Shift shift) {
        shiftRepository.save(shift);
        return true;
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Shift getShiftById(@PathVariable String id) {
        return shiftRepository.findBy_id(id);
    }

    @PutMapping(value = "/")
    @ResponseBody
    public boolean updateShift(@RequestBody Shift newShift) {
        Shift shift = shiftRepository.findBy_id(newShift.get_id());
        shift.setStartShift(newShift.getStartShift());
        shift.setEndShift(newShift.getEndShift());
        shift.setDayOfWeek(newShift.getDayOfWeek());
        shift.setDeleted(false);
        shiftRepository.save(shift);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteShift(@PathVariable String id) {
        Shift shift = shiftRepository.findBy_id(id);
        shift.setDeleted(true);
        shiftRepository.save(shift);
        return true;
    }

    @GetMapping(value = "/isExist/{start}/{end}/{dow}")
    public boolean isExist(@PathVariable String start, @PathVariable String end, @PathVariable String dow) {
        return shiftRepository.findByStartShiftAndEndShiftAndDayOfWeek(start, end, dow) != null;
    }

    @GetMapping(value = "/getListShift/{semesterId}/{dayOfWeek}/{teacherId}")
    @ResponseBody
    public List<Shift> getListShiftFindByTeacher(@PathVariable String semesterId, @PathVariable String dayOfWeek, @PathVariable String teacherId) throws ParseException {
        Semester semester = semesterRepository.findBy_id(semesterId); // Lấy ra học kì theo tham số mã học kì đầu vào
        Date semesterStart = new SimpleDateFormat("dd/MM/yyyy").parse(semester.getStart()); // Lấy ra ngày bắt đầu học kì
        Date semesterEnd = new SimpleDateFormat("dd/MM/yyyy").parse(semester.getEnd()); // Lấy ra ngày kết thúc học kì
        List<Lesson> lessons = lessonRepository.findByTeacherId(employeeRepository.findBy_id(teacherId).getEmployeeId()); // Lấy ra danh sách các lớp học đã mở
        List<Shift> listShift = shiftRepository.findByDayOfWeek(dayOfWeek); // Lấy ra danh sách toàn bộ ca học trong hệ thống
        for (Lesson lesson: lessons) { // Duyệt qua các lớp học đã mở
            Shift openedShift = shiftRepository.findBy_id(lesson.getShiftId()); // Lấy ra ca học tương ứng với lớp đã mở
            Semester openedSemester = semesterRepository.findBy_id(lesson.getSemesterId()); // Lấy ra học kì ứng với ca học
            Date openedSemesterStart = new SimpleDateFormat("dd/MM/yyyy").parse(openedSemester.getStart()); // lấy ngày bắt đầu của học kì đang xét
            Date openedSemesterEnd = new SimpleDateFormat("dd/MM/yyyy").parse(openedSemester.getEnd()); // lấy ngày kết thúc của học kì đang xét
            for (int i = 0; i < listShift.size(); i++){
                int s1 = Integer.parseInt(listShift.get(i).getStartShift()); // Ca bắt đầu của ca học hiện tại
                int s2 = Integer.parseInt(listShift.get(i).getEndShift()); // Ca kết thúc của ca học hiện tại
                int s3 = Integer.parseInt(openedShift.getStartShift()); // Ca bắt đầu của ca học đang xét
                int s4 = Integer.parseInt(openedShift.getEndShift()); // Ca kết thúc của ca học đang xét

                if (semesterStart.before(openedSemesterEnd) && semesterEnd.after(openedSemesterStart)) { // Kiểm tra về thời gian của kì học
                    if (openedShift.getDayOfWeek().equals(listShift.get(i).getDayOfWeek())) { // Kiểm tra về ngày trong tuần
                        if (!(s1 > s4 || s2 < s3)) { // Kiểm tra về thời gian của ca học
                            listShift.remove(listShift.get(i)); // Xóa ca học khỏi danh sách
                            i--;
                        }
                    }
                }

            }
        }
        return listShift; // Trả về danh sách cần tìm
    }

    @PostMapping(value = "/import")
    @ResponseBody
    public boolean importShift() throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\Shift.csv"));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            if (shiftRepository.findByStartShiftAndEndShiftAndDayOfWeek
                    (csvRecord.get(0), csvRecord.get(1), csvRecord.get(2)) == null ) {
                Shift shift = new Shift();
                shift.setStartShift(csvRecord.get(0));
                shift.setEndShift(csvRecord.get(1));
                shift.setDayOfWeek(csvRecord.get(2));
                shift.setDeleted(false);

                shiftRepository.save(shift);
            }
        }
        return true;
    }

    @PostMapping(value = "/importFromSchoolSchedule/{filename}")
    @ResponseBody
    public boolean importShiftFromSchoolSchedule(@PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader,
                CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f", "g", "h")
                        .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            String startShift;
            String endShift;
            String dayOfWeek = csvRecord.get(3);
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
            if (shiftRepository.findByStartShiftAndEndShiftAndDayOfWeek
                    (startShift, endShift, dayOfWeek) == null ) {
                Shift shift = new Shift();
                shift.setStartShift(startShift);
                shift.setEndShift(endShift);
                shift.setDayOfWeek(dayOfWeek);
                shift.setDeleted(false);

                shiftRepository.save(shift);
            }
        }
        return true;
    }
}

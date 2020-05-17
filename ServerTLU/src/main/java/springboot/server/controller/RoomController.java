package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.*;
import springboot.server.repository.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/room")
public class RoomController {
    private final RoomRepository roomRepository;
    private final SemesterRepository semesterRepository;
    private final LessonRepository lessonRepository;
    private final EmployeeRepository employeeRepository;
    private final ShiftRepository shiftRepository;

    public RoomController(RoomRepository roomRepository, SemesterRepository semesterRepository, LessonRepository lessonRepository, EmployeeRepository employeeRepository, ShiftRepository shiftRepository) {
        this.roomRepository = roomRepository;
        this.semesterRepository = semesterRepository;
        this.lessonRepository = lessonRepository;
        this.employeeRepository = employeeRepository;
        this.shiftRepository = shiftRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Room> getAllRoom() {
        return roomRepository.findByIsDeleted(false);
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Room getRoomById(@PathVariable String id) {
        return roomRepository.findBy_id(id);
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveRoom(@RequestBody Room room) {
        roomRepository.save(room);
        return true;
    }

    @PutMapping(value = "/")
    @ResponseBody
    public boolean updateRoom(@RequestBody Room newRoom) {
        Room room = roomRepository.findBy_id(newRoom.get_id());
        room.setName(newRoom.getName());
        room.setType(newRoom.getType());
        room.setSize(newRoom.getSize());
        room.setDeleted(false);
        roomRepository.save(room);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteRoom(@PathVariable String id) {
        Room room = roomRepository.findBy_id(id);
        room.setDeleted(true);
        roomRepository.save(room);
        return true;
    }

    @GetMapping(value = "/isExist/{roomName}")
    public boolean isExist(@PathVariable String roomName) {
        return roomRepository.findByName(roomName) != null;
    }

    @GetMapping(value = "/getListRoom/{semesterId}/{shiftId}/{size}")
    @ResponseBody
    public List<Room> getListRoomFindByShift(@PathVariable String semesterId, @PathVariable String shiftId,
                                             @PathVariable String size) throws ParseException {
        Semester semester = semesterRepository.findBy_id(semesterId); // Lấy ra học kì theo mã học kì truyền vào
        Date semesterStart = new SimpleDateFormat("dd/MM/yyyy").parse(semester.getStart()); // Lấy ra ngày bắt đầu của học kì
        Date semesterEnd = new SimpleDateFormat("dd/MM/yyyy").parse(semester.getEnd()); // Lấy ra ngày kết thúc của học kì
        List<Room> listRoom = roomRepository.findAll(); // Lấy ra toàn bộ danh sách phòng học trong hệ thống
        Shift shift = shiftRepository.findBy_id(shiftId); // Lấy ra Ca học theo mã ca học truyền vào
        int s1 = Integer.parseInt(shift.getStartShift()); // Lấy ra ca bắt đầu của ca học hiện tại
        int s2 = Integer.parseInt(shift.getEndShift()); // Lấy ra ca kết thúc của ca học hiện tại
        List<Lesson> lessonList = lessonRepository.findAll(); // Lấy ra toàn bộ các lớp học đã mở
        for (Lesson lesson: lessonList) { // Duyệt toàn bộ các lớp học đã mở
            if (roomRepository.findBy_id(lesson.getRoomId()) != null) {
                if (!roomRepository.findBy_id(lesson.getRoomId()).getSize().equals(size)) {
                    Semester openedSemester = semesterRepository.findBy_id(lesson.getSemesterId()); // Lấy ra học kì tương ứng ca học đã mở
                    Date pickedSemesterStart = new SimpleDateFormat("dd/MM/yyyy").parse(openedSemester.getStart()); // Lấy ra ngày bắt đầu của học kì đang xét
                    Date pickedSemesterEnd = new SimpleDateFormat("dd/MM/yyyy").parse(openedSemester.getEnd()); // Lấy ra ngày kết thúc của học kì đang xét
                    if (semesterStart.before(pickedSemesterEnd) && semesterEnd.after(pickedSemesterStart)) { // Kiểm tra về thời gian của học kì
                        Shift pickedShift = shiftRepository.findBy_id(lesson.getShiftId()); // Lấy ra ca học tương ứng với lớp học đã mở
                        int s3 = Integer.parseInt(pickedShift.getStartShift()); // Lấy ra ca bắt đầu của ca học đang xét
                        int s4 = Integer.parseInt(pickedShift.getEndShift()); // Lấy ra ca kết thúc của ca học đang xét
                        if (pickedShift.getDayOfWeek().equals(shift.getDayOfWeek())) { // Kiểm tra về ngày trong tuần
                            if (!(s1 > s4 || s2 < s3)) { // Kiểm tra về thời gian của ca học
                                Room pickedRoom = roomRepository.findBy_id(lesson.getRoomId()); // Lấy ra phòng học tương ứng với lớp học đã mở
                                for (int i = 0; i < listRoom.size(); i++){ // Tìm và xóa ca học ra khỏi danh sách toàn bộ phòng học
                                    if ( listRoom.get(i).get_id().equals(pickedRoom.get_id())){
                                        listRoom.remove(listRoom.get(i));
                                        i--;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return listRoom; // Trả về ca học cần tìm
    }

    @PostMapping(value = "/import")
    @ResponseBody
    public boolean importRoom() throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\Room.csv"));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            if (roomRepository.findByName(csvRecord.get(0)) == null ) {
                Room room = new Room();
                room.setName(csvRecord.get(0));
                room.setType(csvRecord.get(1));
                room.setSize(csvRecord.get(2));
                room.setDeleted(false);

                roomRepository.save(room);
            }
        }
        return true;
    }

    @PostMapping(value = "/importFromSchoolSchedule/{filename}")
    @ResponseBody
    public boolean importRoomFromSchoolSchedule(@PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader,
                CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f", "g", "h")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            if (roomRepository.findByName(csvRecord.get(5)) == null ) {
                Room room = new Room();
                room.setName(csvRecord.get(5));
                room.setType("");
                room.setSize("40");
                room.setDeleted(false);

                roomRepository.save(room);
            }
        }
        return true;
    }
}

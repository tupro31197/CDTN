package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.Semester;
import springboot.server.repository.SemesterRepository;
import springboot.server.repository.StudentRepository;
import springboot.server.response.GetAllYearResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/semester")
public class SemesterController {
    private final SemesterRepository semesterRepository;
    private final StudentRepository studentRepository;

    public SemesterController(SemesterRepository semesterRepository, StudentRepository studentRepository) {
        this.semesterRepository = semesterRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Semester> getAllSemester() {
        return semesterRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveSemester(@RequestBody Semester semester) {
        semesterRepository.save(semester);
        return true;
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Semester getSemesterById(@PathVariable String id) { return semesterRepository.findBy_id(id); }

    @PutMapping(value = "/")
    @ResponseBody
    public boolean updateSemester(@RequestBody Semester newSemester) {
        Semester semester = semesterRepository.findBy_id(newSemester.get_id());
        semester.setName(newSemester.getName());
        semester.setGroup(newSemester.getGroup());
        semester.setYear(newSemester.getYear());
        semester.setStart(newSemester.getStart());
        semester.setEnd(newSemester.getEnd());
        semesterRepository.save(semester);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteById(@PathVariable String id) {
        semesterRepository.deleteById(id);
        return true;
    }

    @GetMapping(value = "/isExist/{name}/{group}/{year}")
    public boolean isExist(@PathVariable String name, @PathVariable int group, @PathVariable String year) {
        return semesterRepository.findByNameAndGroupAndYear(name, group, year) != null;
    }

    @PostMapping(value = "/import")
    @ResponseBody
    public boolean importSemester() throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\Semester.csv"));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            Semester semester = new Semester();
            semester.setName(csvRecord.get(0));
            semester.setGroup(Integer.parseInt(csvRecord.get(1)));
            semester.setYear(csvRecord.get(2));
            semester.setStart(csvRecord.get(3));
            semester.setEnd(csvRecord.get(4));

            semesterRepository.save(semester);
        }
        return true;
    }

    @GetMapping(value = "/getAllYear")
    @ResponseBody
    public List<GetAllYearResponse> getListYear() {
        List<GetAllYearResponse> getAllYearResponseList = new ArrayList<>();
        List<Semester> listSemester = semesterRepository.findAll();
        Set<String> listYear = new HashSet<>();
        for (Semester semester : listSemester) {
            listYear.add(semester.getYear());
        }
        for (String year : listYear) {
            GetAllYearResponse getAllYearResponse = new GetAllYearResponse();
            getAllYearResponse.setYear(year);
            getAllYearResponseList.add(getAllYearResponse);
        }
        getAllYearResponseList.sort((o1, o2) -> o2.getYear().compareTo(o1.getYear()));
        return getAllYearResponseList;
    }

    @GetMapping(value = "/getListSemester/{year}")
    @ResponseBody
    public List<Semester> getListSemesterByYear(@PathVariable String year){
        return semesterRepository.findByYear(year);
    }

    @GetMapping(value = "/getListSemesterByStatus/{year}")
    @ResponseBody
    public List<Semester> getListSemesterByYearAndStatus(@PathVariable String year){
        return semesterRepository.findByYearAndStatusOrStatus(year, 1, 2);
    }

    @GetMapping(value = "/currentYear")
    @ResponseBody
    public Semester latestSemester() {
        return semesterRepository.getTopByOrderByEndDesc();
    }

    @GetMapping(value = "/findByGroupAndStatus/{studentId}")
    @ResponseBody
    public Semester findByGroupAndStatus(@PathVariable String studentId) {
        return semesterRepository.findFirstByGroupAndStatus(studentRepository.findBy_id(studentId).getGroup(), 1);
    }

    @PostMapping(value = "/migrate")
    @ResponseBody
    public boolean migrate() {
        int i = 1;
        for (Semester semester : semesterRepository.findAll()) {
            if (i % 3 != 0) {
                semester.setGroup(i % 3);
            }
            else {
                semester.setGroup(3);
            }
            i++;
            semesterRepository.save(semester);
        }
        return true;
    }

}

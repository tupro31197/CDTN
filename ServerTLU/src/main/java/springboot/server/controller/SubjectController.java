package springboot.server.controller;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.Department;
import springboot.server.model.GroupSubject;
import springboot.server.model.Subject;
import springboot.server.repository.GroupSubjectRepository;
import springboot.server.repository.SubjectRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {
    private final SubjectRepository subjectRepository;
    private final GroupSubjectRepository groupSubjectRepository;

    public SubjectController(SubjectRepository subjectRepository, GroupSubjectRepository groupSubjectRepository) {
        this.subjectRepository = subjectRepository;
        this.groupSubjectRepository = groupSubjectRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<Subject> getAllSubject() {
        return subjectRepository.findByIsDeleted(false);
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Subject getSubjectById(@PathVariable String id) {
        return subjectRepository.findBy_id(id);
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveSubject(@RequestBody Subject subject) {
        subjectRepository.save(subject);
        return true;
    }

    @PutMapping(value = "/")
    @ResponseBody
    public boolean updateSubject(@RequestBody Subject newSubject) {
        Subject subject = subjectRepository.findBy_id(newSubject.get_id());
        subject.setGroupSubjectId(newSubject.getGroupSubjectId());
        subject.setName(newSubject.getName());
        subject.setSubjectId(newSubject.getSubjectId());
        subject.setCredit(newSubject.getCredit());
        subject.setTheory(newSubject.getTheory());
        subject.setPractice(newSubject.getPractice());
        subject.setDeleted(false);
        subjectRepository.save(subject);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public boolean deleteSubject(@PathVariable String id) {
        Subject subject = subjectRepository.findBy_id(id);
        subject.setDeleted(true);
        subjectRepository.save(subject);
        return true;
    }

    @GetMapping(value = "/isExist/{subjectId}")
    @ResponseBody
    public boolean isExist(@PathVariable String subjectId) {
        return subjectRepository.findBy_id(subjectId) != null;
    }

    @GetMapping(value = "/getGroupSubject/{id}")
    @ResponseBody
    public GroupSubject getGroupSubjectBySubjectId(@PathVariable String id) {
        return groupSubjectRepository.findBy_id(subjectRepository.findBy_id(id).getGroupSubjectId());
    }


    @PostMapping(value = "/import")
    @ResponseBody
    public boolean importSubject() throws IOException {
        BufferedReader reader = Files.newBufferedReader(
                Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\Subject.csv"));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord : csvParser) {
            Subject subject = new Subject();
            subject.setSubjectId(csvRecord.get(0));
            subject.setName(csvRecord.get(1));
            for (GroupSubject groupSubject: groupSubjectRepository.findAll()) {
                if (csvRecord.get(2).equals(groupSubject.getName())) {
                    subject.setGroupSubjectId(groupSubject.get_id());
                }
            }
            subject.setCredit(csvRecord.get(3));
            subject.setTheory(csvRecord.get(4));
            subject.setPractice(csvRecord.get(5));
            subject.setDeleted(false);

            subjectRepository.save(subject);
        }
        return true;
    }

    @PostMapping(value = "/importFromStudyProgram/{filename}")
    @ResponseBody
    public boolean importSubjectFromStudyProgram(@PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.
                withHeader("a", "b", "c", "d", "e", "f")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord : csvParser) {
            if (subjectRepository.findBySubjectId(csvRecord.get(1)) == null) {
                Subject subject = new Subject();
                subject.setSubjectId(csvRecord.get(1));
                subject.setName(csvRecord.get(2));
                subject.setCredit(csvRecord.get(5));
                subject.setGroupSubjectId("");
                subject.setTheory("");
                subject.setPractice("");
                subject.setDeleted(false);

                subjectRepository.save(subject);
            }
        }
        return true;
    }

    @PostMapping(value = "/importFromSchoolSchedule/{filename}")
    @ResponseBody
    public boolean importSubjectFromSchoolSchedule(@PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.
                withHeader("a", "b", "c", "d", "e", "f", "g", "h")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord : csvParser) {
            if (subjectRepository.findBySubjectId(csvRecord.get(0)) == null) {
                Subject subject = new Subject();
                subject.setSubjectId(csvRecord.get(0));
                subject.setName(csvRecord.get(1));
                subject.setCredit(csvRecord.get(6));
                subject.setGroupSubjectId("");
                subject.setTheory("");
                subject.setPractice("");
                subject.setDeleted(false);

                subjectRepository.save(subject);
            }
        }
        return true;
    }
    @PostMapping(value = "/importFromFinalGrade/{filename}")
    @ResponseBody
    public boolean importSubjectFromFinalGrade(@PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader
                (Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.
                withHeader("a", "b", "c", "d", "e", "f", "g", "h", "i")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord : csvParser) {
            if (subjectRepository.findBySubjectId(csvRecord.get(1)) == null) {
                Subject subject = new Subject();
                subject.setSubjectId(csvRecord.get(1));
                subject.setName(csvRecord.get(6));
                subject.setCredit(csvRecord.get(3));
                subject.setGroupSubjectId("");
                subject.setTheory("");
                subject.setPractice("");
                subject.setDeleted(false);

                subjectRepository.save(subject);
            }
        }
        return true;
    }
}

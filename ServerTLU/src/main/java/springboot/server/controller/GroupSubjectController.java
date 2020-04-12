package springboot.server.controller;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.GroupSubject;
import springboot.server.model.Subject;
import springboot.server.repository.GroupSubjectRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/groupSubject")
public class GroupSubjectController {
    private final GroupSubjectRepository groupSubjectRepository;

    public GroupSubjectController(GroupSubjectRepository groupSubjectRepository) {
        this.groupSubjectRepository = groupSubjectRepository;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<GroupSubject> getAllGroupSubject() {
        return groupSubjectRepository.findAll();
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveGroupSubject(@RequestBody GroupSubject groupSubject) {
        groupSubjectRepository.save(groupSubject);
        return true;
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
}

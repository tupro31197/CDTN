package springboot.server.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.*;
import springboot.server.repository.DepartmentRepository;
import springboot.server.repository.GroupSubjectRepository;
import springboot.server.repository.StudyProgramRepository;
import springboot.server.repository.SubjectRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/studyProgram")
public class StudyProgramController {
    private final StudyProgramRepository studyProgramRepository;
    private final SubjectRepository subjectRepository;
    private final DepartmentRepository departmentRepository;

    public StudyProgramController(StudyProgramRepository studyProgramRepository, SubjectRepository subjectRepository, DepartmentRepository departmentRepository) {
        this.studyProgramRepository = studyProgramRepository;
        this.subjectRepository = subjectRepository;
        this.departmentRepository = departmentRepository;
    }

    @GetMapping(value = "/{departmentId}")
    @ResponseBody
    public String getStudyProgram(@PathVariable String departmentId) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        for (StudyProgram studyProgram : studyProgramRepository.findByDepartmentIdAndIsDeleted(departmentId, false)) {
            String subjectId = subjectRepository.findBy_id(studyProgram.getSubjectId()).getSubjectId();
            String subjectName = subjectRepository.findBy_id(studyProgram.getSubjectId()).getName();
            String credit = subjectRepository.findBy_id(studyProgram.getSubjectId()).getCredit();
            String predictSubjectCondition = studyProgram.getPredictSubjectCondition();
            String predictCreditCondition = studyProgram.getPredictCreditCondition();
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("id", studyProgram.get_id());
            jsonObject.addProperty("subjectId", subjectId);
            jsonObject.addProperty("subjectName", subjectName);
            jsonObject.addProperty("predictSubjectCondition", predictSubjectCondition);
            jsonObject.addProperty("predictCreditCondition", predictCreditCondition);
            jsonObject.addProperty("credit", credit);
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }

    @PostMapping(value = "/import/{filename}")
    @ResponseBody
    public boolean importStudyProgram(@PathVariable String filename) throws IOException {
        BufferedReader reader = Files.newBufferedReader(
                Paths.get("C:\\Users\\HaAnhTU\\Desktop\\CĐTN\\CDTN\\Data\\Csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c", "d")
                .withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord : csvParser) {
            StudyProgram studyProgram = new StudyProgram();
            studyProgram.setSubjectId(subjectRepository.findBySubjectId(csvRecord.get(1)).get_id());
            studyProgram.setDepartmentId(csvRecord.get(0));
            studyProgram.setPredictSubjectCondition(csvRecord.get(3));
            studyProgram.setPredictCreditCondition(csvRecord.get(4));
            studyProgram.setDeleted(false);

            studyProgramRepository.save(studyProgram);
        }
        return true;
    }
}

package springboot.server.controller;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;
import springboot.server.model.FinalGrade;
import springboot.server.model.Student;
import springboot.server.model.Subject;
import springboot.server.repository.DepartmentRepository;
import springboot.server.repository.FinalGradeRepository;
import springboot.server.repository.StudentRepository;
import springboot.server.repository.SubjectRepository;
import springboot.server.response.FinalGradeResponse;
import springboot.server.response.GradeResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/finalGrade")
public class FinalGradeController {
    private final FinalGradeRepository finalGradeRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;
    private final DepartmentRepository departmentRepository;

    public FinalGradeController(FinalGradeRepository finalGradeRepository, StudentRepository studentRepository, SubjectRepository subjectRepository, DepartmentRepository departmentRepository) {
        this.finalGradeRepository = finalGradeRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.departmentRepository = departmentRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveFinalGrade(@RequestBody FinalGrade finalGrade) {
        finalGradeRepository.save(finalGrade);
        return true;
    }

    @GetMapping(value = "/gradeReport/{studentId}")
    @ResponseBody
    public List<GradeResponse> getBangDiem(@PathVariable String studentId) {
        List<GradeResponse> gradeResponseList = new ArrayList<>();
        List<FinalGrade> list = finalGradeRepository.findByStudentId(studentRepository.findBy_id(studentId).getStudentId());
        System.out.println(list);

        for (FinalGrade finalGrade: list) {
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

    @GetMapping(value = "/getFinalGrade")
    @ResponseBody
    public List<FinalGradeResponse> getFinalGrade() {
        List<FinalGradeResponse> listFinalGradeResponse = new ArrayList<>();
        List<String> listStudentId = new ArrayList<>();
        for (FinalGrade finalGrade : finalGradeRepository.findAll()) {
            if (!listStudentId.contains(finalGrade.getStudentId())) {
                listStudentId.add(finalGrade.getStudentId());
            }
        }
        System.out.println(listStudentId);
        for (String studentId : listStudentId) {
            List<FinalGrade> lists = finalGradeRepository.findByStudentId(studentId);
            float totalGrade = lists.parallelStream().mapToInt(myObject -> Integer.parseInt(myObject.getGrade()) * 3).sum();
            int totalCredit = lists.size() * 3;
            Student student = studentRepository.findByStudentId(studentId);
            FinalGradeResponse finalGradeResponse = new FinalGradeResponse();
            finalGradeResponse.setStudentId(studentId);
            finalGradeResponse.setStudentName(student.getName());
            finalGradeResponse.setClassName(student.getClassName());
            float averageGrade = totalGrade / totalCredit;

            finalGradeResponse.setAverageGrade(String.valueOf((double) Math.round(averageGrade * 100) / 100));
            finalGradeResponse.setDepartmentName(student.getDepartmentId());
            finalGradeResponse.setTotalCredit(String.valueOf(totalCredit));

            listFinalGradeResponse.add(finalGradeResponse);
        }
        return listFinalGradeResponse;
    }

    @GetMapping(value = "/getGrade/{studentId}")
    @ResponseBody
    public List<GradeResponse> getGrade(@PathVariable String studentId) {
        List<GradeResponse> gradeResponseList = new ArrayList<>();
        for (FinalGrade finalGrade : finalGradeRepository.findByStudentId(studentId)) {
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
            Random rd = new Random();
            int grade = rd.nextInt(11);
            FinalGrade finalGrade = new FinalGrade();
            finalGrade.setStudentId(csvRecord.get(0));
            finalGrade.setSubjectId(csvRecord.get(1));
            finalGrade.setGrade(Integer.toString(grade));
            finalGradeRepository.save(finalGrade);
        }
        return true;
    }
}

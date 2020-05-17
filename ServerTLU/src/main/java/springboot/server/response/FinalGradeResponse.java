package springboot.server.response;

import lombok.Data;

@Data
public class FinalGradeResponse {
    private String studentId;
    private String studentName;
    private String className;
    private String averageGrade;
    private String departmentName;
    private String totalCredit;
}

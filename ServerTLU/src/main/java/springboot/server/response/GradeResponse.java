package springboot.server.response;

import lombok.Data;

@Data
public class GradeResponse {
    private String subjectId;
    private String subjectName;
    private String credit;
    private String grade;
}

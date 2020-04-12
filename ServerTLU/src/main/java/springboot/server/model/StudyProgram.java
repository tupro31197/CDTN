package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "studyProgram")
public class StudyProgram {
    @Id
    private String id;
    private String subjectId;
    private String departmentId;
    private String predictionCondition;
}

package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "finalGrade")
public class FinalGrade {
    @Id
    private String _id;
    private String studentId;
    private String subjectId;
    private String grade;
}

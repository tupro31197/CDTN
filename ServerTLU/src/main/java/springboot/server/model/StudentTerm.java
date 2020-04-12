package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "studentTerm")
public class StudentTerm {
    @Id
    private String id;
    private String teacherId;
    private String studentId;
}

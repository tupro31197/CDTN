package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "studentLesson")
public class StudentLesson {
    @Id
    private String _id;
    private String lessonId;
    private String studentId;
}

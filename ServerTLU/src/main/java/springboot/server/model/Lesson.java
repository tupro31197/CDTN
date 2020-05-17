package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "lesson")
public class Lesson {
    @Id
    private String _id;
    private String lessonName;
    private String subjectId;
    private String shiftId;
    private String roomId;
    private String teacherId;
    private String status;
    private String semesterId;
}

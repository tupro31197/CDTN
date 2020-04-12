package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "schoolSchedule")
public class SchoolSchedule {
    @Id
    private String id;
    private String subjectId;
    private String termId;
}

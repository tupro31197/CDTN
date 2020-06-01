package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "subject")
public class Subject {
    @Id
    private String _id;
    private String subjectId;
    private String name;
    private String groupSubjectId;
    private String credit;
    private String theory;
    private String practice;
    private boolean isDeleted;
}

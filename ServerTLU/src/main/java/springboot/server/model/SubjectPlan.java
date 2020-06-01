package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "subjectPlan")
public class SubjectPlan {
    @Id
    private String _id;
    private String subjectId;
    private String semesterId;
}

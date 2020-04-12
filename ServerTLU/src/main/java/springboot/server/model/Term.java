package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "term")
public class Term {
    @Id
    private String id;
    private String semesterId;
    private String subjectId;
    private boolean isActive;
}

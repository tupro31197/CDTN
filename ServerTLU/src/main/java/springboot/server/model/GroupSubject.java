package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "groupSubject")
public class GroupSubject {
    @Id
    private String _id;
    private String name;
    private boolean isDeleted;
}

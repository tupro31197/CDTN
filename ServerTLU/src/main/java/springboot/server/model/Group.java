package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "group")
public class Group {
    @Id
    private String id;
    private String name;
}

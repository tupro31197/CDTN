package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "semester")
public class Semester {
    @Id
    private String id;
    private String name;
    private String group;
    private String year;
    private String start;
    private String end;
}

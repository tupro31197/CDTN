package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "semester")
public class Semester {
    @Id
    private String _id;
    private String name;
    private int group;
    private String year;
    private String start;
    private String end;
    private int status;
}

package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "department")
public class Department {
    @Id
    private String id;
    private String departmentId;
    private String departmentName;
    private String isDeleted;
}

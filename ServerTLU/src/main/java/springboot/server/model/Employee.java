package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "employee")
public class Employee {
    @Id
    private String _id;
    private String employeeId;
    private String name;
    private String groupSubjectId;
    private String email;
    private String password;
    private String phoneNumber;
    private String dayOfBirth;
    private String address;
    private String role;
    private boolean isDeleted;
}

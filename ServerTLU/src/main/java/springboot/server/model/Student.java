package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "student")
public class Student {
    @Id
    private String id;
    private String studentId;
    private String name;
    private String className;
    private String departmentId;
    private String email;
    private String password;
    private String phoneNumber;
    private String dayOfBirth;
    private String address;
    private String lastVisitedGroup;
}

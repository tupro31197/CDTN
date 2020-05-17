package springboot.server.response;

import lombok.Data;

@Data
public class StudentResponse {
    private String _id;
    private String studentId;
    private String name;
    private String className;
    private String department;
    private String email;
    private String phone;
    private String dob;
    private String address;
    private int group;
}

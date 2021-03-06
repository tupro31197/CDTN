package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "registerCondition")
public class RegisterCondition {
    @Id
    private String _id;
    private String name;
    private String openTime;
    private String closeTime;
    private String credit;
    private String semesterId;
    private boolean isDeleted;
}

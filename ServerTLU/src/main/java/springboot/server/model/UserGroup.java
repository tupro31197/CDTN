package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "userGroup")
public class UserGroup {
    @Id
    private String _id;
    private String userId;
    private String groupId;
    private String isAdmin;
    private String isSeen;
    private String lastMessageSeen;
}

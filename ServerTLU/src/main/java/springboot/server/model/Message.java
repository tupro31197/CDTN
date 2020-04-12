package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "message")
public class Message {
    @Id
    private String id;
    private String userId;
    private String groupId;
    private String content;
    private String type;
    private String dateTime;
    private boolean isAttach;
    private boolean isDeleted;
}

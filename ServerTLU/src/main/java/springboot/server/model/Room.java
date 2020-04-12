package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "room")
public class Room {
    @Id
    private String id;
    private String type;
    private String size;
    private String isDeleted;
}

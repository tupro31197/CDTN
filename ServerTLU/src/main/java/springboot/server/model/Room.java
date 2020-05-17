package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "room")
public class Room {
    @Id
    private String _id;
    private String name;
    private String type;
    private String size;
    private boolean isDeleted;
}

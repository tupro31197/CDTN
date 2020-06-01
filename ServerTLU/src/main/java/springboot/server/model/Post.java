package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "post")
public class Post {
    @Id
    private String _id;
    private String title;
    private String content;
    private String dateTime;
    private String employeeId;
    private String categoryId;
}

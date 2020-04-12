package springboot.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "shift")
public class Shift {
    @Id
    private String id;
    private String startShift;
    private String endShift;
    private String dayOfWeek;
    private String isDeleted;
}

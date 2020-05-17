package springboot.server.request;

import lombok.Data;

@Data
public class CreateLessonRequest {
    private String lessonName;
    private String teacherId;
    private String subjectId;
    private String shiftId;
    private String semesterId;
    private String roomId;
    private String status;
}

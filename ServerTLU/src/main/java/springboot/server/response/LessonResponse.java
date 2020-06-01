package springboot.server.response;

import lombok.Data;

@Data
public class LessonResponse {
    public String subjectName;
    public String lessonName;
    public String dayOfWeek;
    public String shift;
    public String roomName;
    public String teacherName;
    public String status;
}

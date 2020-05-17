package springboot.server.response;

import lombok.Data;

@Data
public class GroupSubjectScheduleResponse {
    private String subjectId;
    private String credit;
    private String subjectName;
    private String lessonName;
    private String dayOfWeek;
    private String shift;
    private String roomName;
    private String teacherName;
}

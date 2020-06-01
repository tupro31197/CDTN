package springboot.server.response;

import lombok.Data;

@Data
public class StudentScheduleResponse {
    private String lessonName;
    private String startShift;
    private String endShift;
    private String dayOfWeek;
    private String roomName;
    private String subjectName;
}

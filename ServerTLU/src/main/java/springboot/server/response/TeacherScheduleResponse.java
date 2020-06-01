package springboot.server.response;

import lombok.Data;

@Data
public class TeacherScheduleResponse {
    private String lessonName;
    private String startShift;
    private String endShift;
    private String dayOfWeek;
    private String roomName;
}

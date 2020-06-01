package springboot.server.response;

import lombok.Data;

@Data
public class CreditAndAverageResponse {
    private int credit;
    private float averageGrade;
}

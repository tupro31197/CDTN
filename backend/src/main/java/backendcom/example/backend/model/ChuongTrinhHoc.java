package backendcom.example.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class ChuongTrinhHoc {
    @Id
    private String id;
    private String tenNganh;
    private String maMon;
    private String tenMon;
    private String dKTQ;
    private String tCTQ;
    private String tinChi;
}

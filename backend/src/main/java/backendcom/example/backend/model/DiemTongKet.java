package backendcom.example.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class DiemTongKet {
    @Id
    private String id;
    private String maSinhVien;
    private String maMon;
    private String diemTongKet;
    private String soLanThi;
    private String maLop;
    private String lopChuyenNganh;
    private String tenMon;
    private String soTinChi;
    private String hoTen;
}

package backendcom.example.backend.responseModel;

import lombok.Data;

@Data
public class SinhVienResponse {
    private String maSinhVien;
    private String hoTen;
    private String lopChuyenNganh;
    private String ngaySinh;
    private String soDienThoai;
    private String email;
    private String diaChi;
}

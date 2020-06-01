package backendcom.example.backend.api;

import backendcom.example.backend.dao.DiemTongKetDAO;
import backendcom.example.backend.dao.NguoiDungDAO;
import backendcom.example.backend.dao.ThoiKhoaBieuToanTruongDAO;
import backendcom.example.backend.model.DiemTongKet;
import backendcom.example.backend.model.NguoiDung;
import backendcom.example.backend.model.ThoiKhoaBieuToanTruong;
import backendcom.example.backend.responseModel.BangDiemReponse;
import backendcom.example.backend.responseModel.NguoiDungResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/nguoi-dung")
public class NguoiDungController {

    private final NguoiDungDAO nguoiDungDAO;
    private final DiemTongKetDAO diemTongKetDAO;
    private final ThoiKhoaBieuToanTruongDAO thoiKhoaBieuToanTruongDAO;


    public NguoiDungController(NguoiDungDAO nguoiDungDAO, DiemTongKetDAO diemTongKetDAO, ThoiKhoaBieuToanTruongDAO thoiKhoaBieuToanTruongDAO) {
        this.nguoiDungDAO = nguoiDungDAO;
        this.diemTongKetDAO = diemTongKetDAO;
        this.thoiKhoaBieuToanTruongDAO = thoiKhoaBieuToanTruongDAO;
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Optional<NguoiDung> getNguoiDung(@PathVariable String id) {
        return nguoiDungDAO.findById(id);
    }

    @GetMapping(value = "/ThongTinCaNhan/{maNguoiDung}")
    @ResponseBody
    public NguoiDungResponse getThongTincCaNhan(@PathVariable String maNguoiDung) {
        DiemTongKet diemTongKet = diemTongKetDAO.findFirstByMaSinhVien(maNguoiDung);
        NguoiDung nguoiDung = nguoiDungDAO.findByMaNguoiDung(maNguoiDung);

        NguoiDungResponse nguoiDungResponse = new NguoiDungResponse();
        if (diemTongKet != null){
            nguoiDungResponse.setLop(diemTongKet.getLopChuyenNganh());
        }
        nguoiDungResponse.setMaNguoiDung(nguoiDung.getMaNguoiDung());
        nguoiDungResponse.setHoTen(nguoiDung.getHoTen());
        nguoiDungResponse.setEmail(nguoiDung.getEmail());
        nguoiDungResponse.setDiaChi(nguoiDung.getDiaChi());
        nguoiDungResponse.setNgaySinh(nguoiDung.getNgaySinh());
        nguoiDungResponse.setSoDienThoai(nguoiDung.getSoDienThoai());
        nguoiDungResponse.setQuyenHan(nguoiDung.getQuyenHan());

        return nguoiDungResponse;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveThongTinNguoiDung(@Valid @RequestBody NguoiDungResponse nguoiDungResponse) {
        NguoiDung nguoiDung = nguoiDungDAO.findByMaNguoiDung(nguoiDungResponse.getMaNguoiDung() );
        nguoiDung.setHoTen(nguoiDungResponse.getHoTen());
        nguoiDung.setNgaySinh(nguoiDungResponse.getNgaySinh());
        nguoiDung.setSoDienThoai(nguoiDungResponse.getSoDienThoai());
        nguoiDung.setDiaChi(nguoiDungResponse.getDiaChi());
        nguoiDung.setEmail(nguoiDungResponse.getEmail());
        nguoiDungDAO.save(nguoiDung);
        return true;
    }

    @GetMapping(value = "/checkLogin/{maNguoiDung}/{matKhau}")
    @ResponseBody
    public NguoiDung login(@PathVariable String maNguoiDung, @PathVariable String matKhau) {
        if (nguoiDungDAO.findByMaNguoiDung(maNguoiDung).getMatKhau().equals(matKhau)) {
            return nguoiDungDAO.findByMaNguoiDung(maNguoiDung);
        }
        return null;
    }

    @GetMapping(value = "/checkLoginMobile/{maNguoiDung}/{matKhau}")
    @ResponseBody
    public boolean loginMobile(@PathVariable String maNguoiDung, @PathVariable String matKhau) {
        if (nguoiDungDAO.findByMaNguoiDung(maNguoiDung) == null){
            return false;
        }
        return nguoiDungDAO.findByMaNguoiDung(maNguoiDung).getMatKhau().equals(matKhau);
    }

    @GetMapping(value = "/bangDiem/{maSinhVien}")
    @ResponseBody
    public List<BangDiemReponse> getBangDiem(@PathVariable String maSinhVien) {
        List<BangDiemReponse> danhSachTraVe = new ArrayList<>();
        List<DiemTongKet> list = diemTongKetDAO.findByMaSinhVien(maSinhVien);

        for (DiemTongKet diemTongKet: list) {
            BangDiemReponse bangDiemReponse = new BangDiemReponse();
            bangDiemReponse.setDiem(diemTongKet.getDiemTongKet());
            bangDiemReponse.setMaHocPhan(diemTongKet.getMaMon());
            bangDiemReponse.setTenHocPhan(diemTongKet.getTenMon());
            bangDiemReponse.setSoTinChi(diemTongKet.getSoTinChi());

            danhSachTraVe.add(bangDiemReponse);
        }
        return danhSachTraVe;
    }

    @GetMapping(value = "/tongTinChi/{maSinhVien}")
    @ResponseBody
    public String tongTinChi(@PathVariable String maSinhVien) {
        JsonObject jsonObject = new JsonObject();
        float tongDiem = 0;
        int tongSoTinChi = 0;
        for (DiemTongKet diemTongKet : diemTongKetDAO.findByMaSinhVien(maSinhVien)) {
            tongDiem = tongDiem + Float.parseFloat(diemTongKet.getDiemTongKet()) * Integer.parseInt(diemTongKet.getSoTinChi());
            tongSoTinChi = tongSoTinChi + Integer.parseInt(diemTongKet.getSoTinChi());
        }
        jsonObject.addProperty("tongTinChi", tongSoTinChi);
        jsonObject.addProperty("diemTrungBinh", tongDiem/tongSoTinChi);
        return new Gson().toJson(jsonObject);
    }

    @PostMapping(value = "/createAllAccount")
    @ResponseBody
    public boolean createAllAccount(){
        List<DiemTongKet> listDiemTongKet = diemTongKetDAO.findAll();
        for (DiemTongKet diemTongKet: listDiemTongKet) {
            List<NguoiDung> listNguoiDung = nguoiDungDAO.findAll();
            Set<String> listMaSinhVien = new HashSet<>();
            for (NguoiDung nguoiDung : listNguoiDung){
                listMaSinhVien.add(nguoiDung.getMaNguoiDung());
            }
            if (!listMaSinhVien.contains(diemTongKet.getMaSinhVien())) {
                NguoiDung nguoiDung = new NguoiDung();
                nguoiDung.setMaNguoiDung(diemTongKet.getMaSinhVien());
                nguoiDung.setHoTen(diemTongKet.getHoTen());
                nguoiDung.setSoDienThoai("");
                nguoiDung.setNgaySinh("");
                nguoiDung.setEmail("");
                nguoiDung.setMatKhau("123456");
                nguoiDung.setDiaChi("");
                nguoiDung.setQuyenHan("SV");
                nguoiDung.setTenNganh("TI");

                nguoiDungDAO.save(nguoiDung);
            }
        }
        return true;
    }

    @PostMapping("/createAccountGiangVien")
    @ResponseBody
    public boolean createAllAccountTeacher() {
        List<ThoiKhoaBieuToanTruong> listTKBTT = thoiKhoaBieuToanTruongDAO.findAll();
        int i = 1;
        for (ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong : listTKBTT) {
            List<NguoiDung> listNguoiDung = nguoiDungDAO.findAll();
            Set<String> listTenGiangVien = new HashSet<>();
            for (NguoiDung nguoiDung : listNguoiDung) {
                listTenGiangVien.add(nguoiDung.getHoTen());
            }
            if (!listTenGiangVien.contains(thoiKhoaBieuToanTruong.getGiaoVien())) {
                NguoiDung nguoiDung = new NguoiDung();
                nguoiDung.setMaNguoiDung("GV" + i);
                nguoiDung.setHoTen(thoiKhoaBieuToanTruong.getGiaoVien());
                nguoiDung.setSoDienThoai("");
                nguoiDung.setNgaySinh("");
                nguoiDung.setEmail("");
                nguoiDung.setMatKhau("123456");
                nguoiDung.setDiaChi("");
                nguoiDung.setQuyenHan("GV");
                nguoiDung.setTenNganh("TI");

                nguoiDungDAO.save(nguoiDung);
                i++;
            }
        }
        return true;
    }
}

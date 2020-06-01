package backendcom.example.backend.api;

import backendcom.example.backend.dao.*;
import backendcom.example.backend.model.*;
import backendcom.example.backend.responseModel.MonHocChuaHocResponse;
import backendcom.example.backend.responseModel.SinhVienResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.*;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/lop-hoc")
public class LopHocController {
    private final LopHocDAO lopHocDAO;
    private final ChuongTrinhHocDAO chuongTrinhHocDAO;
    private final DiemTongKetDAO diemTongKetDAO;
    private final ThoiKhoaBieuToanTruongDAO thoiKhoaBieuToanTruongDAO;
    private final NguoiDungDAO nguoiDungDAO;

    public LopHocController(LopHocDAO lopHocDAO, ChuongTrinhHocDAO chuongTrinhHocDAO1, DiemTongKetDAO diemTongKetDAO, ThoiKhoaBieuToanTruongDAO thoiKhoaBieuToanTruongDAO, NguoiDungDAO nguoiDungDAO) {
        this.lopHocDAO = lopHocDAO;
        this.chuongTrinhHocDAO = chuongTrinhHocDAO1;
        this.diemTongKetDAO = diemTongKetDAO;
        this.thoiKhoaBieuToanTruongDAO = thoiKhoaBieuToanTruongDAO;
        this.nguoiDungDAO = nguoiDungDAO;
    }

    @GetMapping(value = "/danhSachMonHocChuaHoc/{maSinhVien}")
    @ResponseBody
    public List<MonHocChuaHocResponse> danhSachMonHocChuaHoc(@PathVariable String maSinhVien) {
        List<MonHocChuaHocResponse> danhSachMonHocChuaHoc = new ArrayList<>();

        Set<String> listTKB = new HashSet<>(); // Danh sách các môn học sẽ mở
        for (ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong : thoiKhoaBieuToanTruongDAO.findAll()) {
            listTKB.add(thoiKhoaBieuToanTruong.getTenMon());
        }

        List<ChuongTrinhHoc> listChuongTrinhHoc = chuongTrinhHocDAO.findByTenNganh(nguoiDungDAO.findByMaNguoiDung(maSinhVien).getTenNganh());
        Set<String> danhSachMonHoc = new HashSet<>(); //Danh sách các môn học trong chương trình học
        for (ChuongTrinhHoc chuongTrinhHoc : listChuongTrinhHoc) {
            danhSachMonHoc.add(chuongTrinhHoc.getTenMon());
        }

        Set<String> danhSachMonHocSeMo = new HashSet<>(); // Danh sách các môn học trong chương trình học sẽ mở trong kỳ
        for (String tenMon : listTKB) {
            if (danhSachMonHoc.contains(tenMon)) {
                danhSachMonHocSeMo.add(tenMon);
            }
        }

        List<DiemTongKet> listDiemTongKet = diemTongKetDAO.findByMaSinhVien(maSinhVien);
        Set<String> listMonHocDaHoc = new HashSet<>(); // Danh sách các môn học đã học
        for (DiemTongKet diemTongKet : listDiemTongKet) {
            listMonHocDaHoc.add(diemTongKet.getTenMon());
        }


        for (String monHoc : danhSachMonHocSeMo) {  // lấy các môn học chưa học
            if (!listMonHocDaHoc.contains(monHoc)) {
                MonHocChuaHocResponse monHocChuaHocResponse = new MonHocChuaHocResponse();
                monHocChuaHocResponse.setTenMon(monHoc);
                danhSachMonHocChuaHoc.add(monHocChuaHocResponse);
            }
        }
        return danhSachMonHocChuaHoc.subList(0,20);
    }

    @GetMapping(value = "/thoiKhoaBieuCaNhan/{maSinhVien}")
    @ResponseBody
    public String thoiKhoaBieuCaNhan(@PathVariable String maSinhVien) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        List<LopHoc> listLopHoc = lopHocDAO.findByMaSinhVien(maSinhVien);
        listLopHoc.sort((l1, l2) -> thoiKhoaBieuToanTruongDAO.findFirstById(l1.getMaTKBTT()).getThu().compareTo(thoiKhoaBieuToanTruongDAO.findFirstById(l2.getMaTKBTT()).getThu()));
        for (LopHoc lopHoc : listLopHoc) {
            String tenMon = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getTenMon();
            String tenLop = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getTenLop();
            String phongHoc = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getPhongHoc();
            String caBatDau = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().substring(0, 1);
            String caKetThuc;
            if (thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().length() == 3) {
                 caKetThuc = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().substring(2, 3);
            } else {
                 caKetThuc = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().substring(2, 4);
            }

            String thu = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getThu();
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("tenMon",tenMon);
            jsonObject.addProperty("tenLop",tenLop);
            jsonObject.addProperty("phongHoc",phongHoc);
            jsonObject.addProperty("caBatDau",caBatDau);
            jsonObject.addProperty("caKetThuc",caKetThuc);
            jsonObject.addProperty("thu",thu);
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }


    @GetMapping(value = "/thoiKhoaBieuCaNhanGiangVien/{maGiangVien}")
    @ResponseBody
    public String thoiKhoaBieuCaNhanGiangVien(@PathVariable String maGiangVien) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        List<LopHoc> listLopHoc = lopHocDAO.findByMaGiaoVien(maGiangVien);
        listLopHoc.sort((l1, l2) -> thoiKhoaBieuToanTruongDAO.findFirstById(l1.getMaTKBTT()).getThu().compareTo(thoiKhoaBieuToanTruongDAO.findFirstById(l2.getMaTKBTT()).getThu()));
        for (LopHoc lopHoc : listLopHoc) {
            String tenMon = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getTenMon();
            String tenLop = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getTenLop();
            String phongHoc = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getPhongHoc();
            String caBatDau = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().substring(0, 1);
            String caKetThuc;
            if (thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().length() == 3) {
                caKetThuc = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().substring(2, 3);
            } else {
                caKetThuc = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getCa().substring(2, 4);
            }

            String thu = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getThu();
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("maTKBTT", lopHoc.getMaTKBTT());
            jsonObject.addProperty("tenMon",tenMon);
            jsonObject.addProperty("tenLop",tenLop);
            jsonObject.addProperty("phongHoc",phongHoc);
            jsonObject.addProperty("caBatDau",caBatDau);
            jsonObject.addProperty("caKetThuc",caKetThuc);
            jsonObject.addProperty("thu",thu);
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }

    @GetMapping(value = "/danhSachLopHoc/{tenMon}/{maSinhVien}")
    @ResponseBody
    public String danhSachLopHoc(@PathVariable String tenMon, @PathVariable String maSinhVien) {
        ArrayList<JsonObject> jsonArray = new ArrayList<>();
        String a = Normalizer.normalize(tenMon, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
        List<ThoiKhoaBieuToanTruong> listThoiKhoaBieuToanTruong = new ArrayList<>();
        for (ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong : thoiKhoaBieuToanTruongDAO.findAll()) {
            String b = Normalizer.normalize(thoiKhoaBieuToanTruong.getTenMon(), Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
            if (a.equals(b)) {
                listThoiKhoaBieuToanTruong.add(thoiKhoaBieuToanTruong);
            }
        }
        for (ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong : listThoiKhoaBieuToanTruong) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("tenLop", thoiKhoaBieuToanTruong.getTenLop());
            jsonObject.addProperty("caHoc", thoiKhoaBieuToanTruong.getCa());
            jsonObject.addProperty("thu", thoiKhoaBieuToanTruong.getThu());
            jsonObject.addProperty("tenLop", thoiKhoaBieuToanTruong.getTenLop());
            if (lopHocDAO.findFirstByMaTKBTTAndMaSinhVien(thoiKhoaBieuToanTruong.getId(), maSinhVien) != null) {
                jsonObject.addProperty("checked", true);
            }
            else {
                jsonObject.addProperty("checked", false);
            }
            jsonArray.add(jsonObject);
        }
        return new Gson().toJson(jsonArray);
    }

    @PostMapping(value = "/dangKyHoc/{maSinhVien}/{tenMon}/{lop}")
    @ResponseBody
    public int dangKyHoc(@PathVariable String maSinhVien, @PathVariable String tenMon, @PathVariable String lop) {
        String tenLop = tenMon + "." + lop;
        System.out.println(tenLop);
        List<LopHoc> listLopHuy = new ArrayList<>();
        for (LopHoc lopHoc : lopHocDAO.findAll()) {
            if (thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT()).getTenLop().contains(tenLop)
                    && nguoiDungDAO.findByMaNguoiDung(lopHoc.getMaSinhVien()).getMaNguoiDung().equals(maSinhVien)) {
                listLopHuy.add(lopHoc);
            }
        }
        System.out.println(listLopHuy);
        boolean flag = true;
        if (!listLopHuy.isEmpty()) {
            lopHocDAO.deleteAll(listLopHuy);
            return 2;
        }
        else {
            List<ThoiKhoaBieuToanTruong> listLopDaChon = new ArrayList<>();
            for (ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong : thoiKhoaBieuToanTruongDAO.findAll()) {
                if (thoiKhoaBieuToanTruong.getTenLop().contains(tenLop)) {
                    listLopDaChon.add(thoiKhoaBieuToanTruong);
                }
            }

            List<LopHoc> listDaHoc = lopHocDAO.findByMaSinhVien(maSinhVien);
            for (ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong : listLopDaChon) {
                int s1 = Integer.parseInt(thoiKhoaBieuToanTruong.getCa().substring(0, 1));
                int s2;
                if (thoiKhoaBieuToanTruong.getCa().length() == 3) {
                    s2 = Integer.parseInt(thoiKhoaBieuToanTruong.getCa().substring(2, 3));
                } else {
                    s2 = Integer.parseInt(thoiKhoaBieuToanTruong.getCa().substring(2, 4));
                }
                String t1 = thoiKhoaBieuToanTruong.getThu();
                for (LopHoc lopHoc : listDaHoc ) {
                    ThoiKhoaBieuToanTruong lopDaHoc = thoiKhoaBieuToanTruongDAO.findFirstById(lopHoc.getMaTKBTT());
                    int s3 = Integer.parseInt(lopDaHoc.getCa().substring(0, 1));
                    int s4;
                    if (lopDaHoc.getCa().length() == 3) {
                        s4 = Integer.parseInt(lopDaHoc.getCa().substring(2, 3));
                    } else  {
                        s4 = Integer.parseInt(lopDaHoc.getCa().substring(2, 4));
                    }
                    String t2 = lopDaHoc.getThu();
                    if (t1.equals(t2)) {
                        if (!(s1 > s4 || s2 < s3)) {
                            flag = false;
                        }
                    }
                }
            }
            if (flag) {
                for (ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong : listLopDaChon) {
                    System.out.println(thoiKhoaBieuToanTruong.getId());
                    LopHoc newLopHoc = new LopHoc();
                    newLopHoc.setMaTKBTT(thoiKhoaBieuToanTruong.getId());
                    for (NguoiDung nguoiDung : nguoiDungDAO.findAll())
                    {
                        if (nguoiDung.getHoTen().equals(thoiKhoaBieuToanTruong.getGiaoVien())) {
                            newLopHoc.setMaGiaoVien(nguoiDung.getMaNguoiDung());
                            break;
                        }
                    }
                    newLopHoc.setMaSinhVien(maSinhVien);
                    newLopHoc.setMaCTH(chuongTrinhHocDAO.findFirstByMaMon(thoiKhoaBieuToanTruong.getMaMon()).getId());

                    lopHocDAO.save(newLopHoc);
                }
                return 1;
            }
        }
        return 0;
    }

    @GetMapping(value = "danhSachSinhVien/{maTKBTT}")
    @ResponseBody
    public List<SinhVienResponse> danhSachSinhVien(@PathVariable String maTKBTT){
        List<SinhVienResponse> listResponse = new ArrayList<>();
        for (LopHoc lopHoc : lopHocDAO.findAll()) {
            if (lopHoc.getMaTKBTT().equals(maTKBTT)) {
                SinhVienResponse sinhVienResponse = new SinhVienResponse();
                NguoiDung nguoiDung = nguoiDungDAO.findByMaNguoiDung(lopHoc.getMaSinhVien());
                sinhVienResponse.setSoDienThoai(nguoiDung.getSoDienThoai());
                sinhVienResponse.setNgaySinh(nguoiDung.getNgaySinh());
                sinhVienResponse.setEmail(nguoiDung.getEmail());
                sinhVienResponse.setDiaChi(nguoiDung.getDiaChi());
                sinhVienResponse.setMaSinhVien(nguoiDung.getMaNguoiDung());
                sinhVienResponse.setLopChuyenNganh(diemTongKetDAO.findFirstByMaSinhVien(lopHoc.getMaSinhVien()).getLopChuyenNganh());
                sinhVienResponse.setHoTen(nguoiDung.getHoTen());

                listResponse.add(sinhVienResponse);
            }
        }
        return listResponse;
    }
}

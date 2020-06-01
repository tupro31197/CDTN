package backendcom.example.backend.api;

import backendcom.example.backend.dao.NguoiDungDAO;
import backendcom.example.backend.model.DiemTongKet;
import backendcom.example.backend.dao.DiemTongKetDAO;
import backendcom.example.backend.model.NguoiDung;
import backendcom.example.backend.responseModel.DiemTongKetResponse;
import backendcom.example.backend.responseModel.SinhVienResponse;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/diem-tong-ket")
public class DiemTongKetController {

    private final DiemTongKetDAO diemTongKetDAO;
    private final NguoiDungDAO nguoiDungDAO;

    public DiemTongKetController(DiemTongKetDAO diemTongKetDAO, NguoiDungDAO nguoiDungDAO) {
        this.diemTongKetDAO = diemTongKetDAO;
        this.nguoiDungDAO = nguoiDungDAO;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<DiemTongKet> getAllDiemTongKet() {
        Pageable pageRequest = PageRequest.of(0, 1000);
        return diemTongKetDAO.findAll(pageRequest).getContent();
    }

    @GetMapping(value = "/layDiemTongKet")
    @ResponseBody
    public List<DiemTongKetResponse> layDiemTongKet() {
        List<DiemTongKetResponse> listDiemTongKet = new ArrayList<>();
        List<String> listMSV = new ArrayList<>();
        for (DiemTongKet diemTongKet : diemTongKetDAO.findAll()) {
            if (!listMSV.contains(diemTongKet.getMaSinhVien())) {
                listMSV.add(diemTongKet.getMaSinhVien());
            }
        }
        for (String msv : listMSV) {
            float tongDiem = 0;
            int tongSoTinChi = 0;
            for (DiemTongKet diemTongKet : diemTongKetDAO.findByMaSinhVien(msv)) {
                tongDiem = tongDiem + Float.parseFloat(diemTongKet.getDiemTongKet()) * Integer.parseInt(diemTongKet.getSoTinChi());
                tongSoTinChi = tongSoTinChi + Integer.parseInt(diemTongKet.getSoTinChi());
            }

            DiemTongKetResponse diemTongKetResponse = new DiemTongKetResponse();
            diemTongKetResponse.setMaSinhVien(msv);
            diemTongKetResponse.setHoTen(diemTongKetDAO.findFirstByMaSinhVien(msv).getHoTen());
            diemTongKetResponse.setMaLop(diemTongKetDAO.findFirstByMaSinhVien(msv).getMaLop());
            float diemTrungBinh = tongDiem / tongSoTinChi;
            diemTongKetResponse.setDiemTongKet(String.valueOf(diemTrungBinh));
            diemTongKetResponse.setSoLanThi(diemTongKetDAO.findFirstByMaSinhVien(msv).getSoLanThi());
            diemTongKetResponse.setLopChuyenNganh(diemTongKetDAO.findFirstByMaSinhVien(msv).getLopChuyenNganh());
            diemTongKetResponse.setSoTinChi(String.valueOf(tongSoTinChi));

            listDiemTongKet.add(diemTongKetResponse);
        }
        return listDiemTongKet;
    }

    @GetMapping(value = "/danhSachSinhVien")
    @ResponseBody
    public List<SinhVienResponse> danhSachSinhVien(){
        List<SinhVienResponse> listResponse = new ArrayList<>();
        List<DiemTongKet> listDiemTongKet = diemTongKetDAO.findAll();

        List<DiemTongKet> listOrderByMaSinhVien = new ArrayList<>();
        for (DiemTongKet diemTongKet: listDiemTongKet) {
            boolean flag = true;
            for (DiemTongKet orderByMSV: listOrderByMaSinhVien) {
                if (orderByMSV.getMaSinhVien().equals(diemTongKet.getMaSinhVien())) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                listOrderByMaSinhVien.add(diemTongKet);
            }
        }

        for (DiemTongKet diemTongKet: listOrderByMaSinhVien) {
            SinhVienResponse sinhVienResponse = new SinhVienResponse();
            NguoiDung nguoiDung = nguoiDungDAO.findByMaNguoiDung(diemTongKet.getMaSinhVien());
            if (nguoiDung != null) {
                sinhVienResponse.setSoDienThoai(nguoiDung.getSoDienThoai());
                sinhVienResponse.setNgaySinh(nguoiDung.getNgaySinh());
                sinhVienResponse.setEmail(nguoiDung.getEmail());
                sinhVienResponse.setDiaChi(nguoiDung.getDiaChi());
            } else {
                sinhVienResponse.setSoDienThoai("Chưa có");
                sinhVienResponse.setNgaySinh("Chưa có");
                sinhVienResponse.setEmail("Chưa có");
                sinhVienResponse.setDiaChi("Chưa có");
            }

            sinhVienResponse.setMaSinhVien(diemTongKet.getMaSinhVien());
            sinhVienResponse.setLopChuyenNganh(diemTongKet.getLopChuyenNganh());
            sinhVienResponse.setHoTen(diemTongKet.getHoTen());


            listResponse.add(sinhVienResponse);
        }
        return listResponse;
    }

    @PostMapping(value = "/import/{filename}")
    @ResponseBody
    public boolean importDiemTongKet(@PathVariable String filename) throws IOException {
        diemTongKetDAO.deleteAll();

        BufferedReader reader = Files.newBufferedReader(Paths.get("C:\\Users\\HaAnhTU\\Desktop\\DKH\\csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f", "g", "h", "i").withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            DiemTongKet diemTongKet = new DiemTongKet();
            diemTongKet.setMaSinhVien(csvRecord.get(0));
            diemTongKet.setMaMon(csvRecord.get(1));
            diemTongKet.setDiemTongKet(csvRecord.get(2));
            diemTongKet.setSoLanThi(csvRecord.get(3));
            diemTongKet.setMaLop(csvRecord.get(4));
            diemTongKet.setLopChuyenNganh(csvRecord.get(5));
            diemTongKet.setTenMon(csvRecord.get(6));
            diemTongKet.setSoTinChi(csvRecord.get(7));
            diemTongKet.setHoTen(csvRecord.get(8));

            diemTongKetDAO.save(diemTongKet);
        }
        return true;
    }
}

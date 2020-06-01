package backendcom.example.backend.api;

import backendcom.example.backend.dao.DiemTongKetDAO;
import backendcom.example.backend.dao.ThoiGianDangKyDAO;
import backendcom.example.backend.model.DiemTongKet;
import backendcom.example.backend.model.ThoiGianDangKy;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RestController
@RequestMapping("/api/thoi-gian-dang-ky")
public class ThoiGianDangKyController {
    private final ThoiGianDangKyDAO thoiGianDangKyDAO;
    private final DiemTongKetDAO diemTongKetDAO;

    public ThoiGianDangKyController(ThoiGianDangKyDAO thoiGianDangKyDAO, DiemTongKetDAO diemTongKetDAO) {
        this.thoiGianDangKyDAO = thoiGianDangKyDAO;
        this.diemTongKetDAO = diemTongKetDAO;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveDotDangKy(@RequestBody ThoiGianDangKy thoiGianDangKy) {
        thoiGianDangKyDAO.save(thoiGianDangKy);
        return true;
    }

    @GetMapping(value = "/laySoDotDaMo")
    @ResponseBody
    public int laySoDotDaMo() {
        return thoiGianDangKyDAO.findAll().size() + 1;
    }

    @GetMapping(value = "/checkThoiGianDangKy/{maSinhVien}")
    @ResponseBody
    public boolean checkThoiGianDangKy(@PathVariable String maSinhVien) throws ParseException {
        boolean flag = false;
        int soTinChi = 0;
        for (DiemTongKet diemTongKet : diemTongKetDAO.findByMaSinhVien(maSinhVien)) {
            soTinChi = soTinChi + Integer.parseInt(diemTongKet.getSoTinChi());
        }
        for (ThoiGianDangKy thoiGianDangKy : thoiGianDangKyDAO.findAll()) {
            if (soTinChi >= Integer.parseInt(thoiGianDangKy.getSoTinChi())) {
                Date thoiGianMo = new SimpleDateFormat("dd/MM/yyyy hh:mm").parse(thoiGianDangKy.getThoiGianMo());
                Date thoiGianDong = new SimpleDateFormat("dd/MM/yyyy hh:mm").parse(thoiGianDangKy.getThoiGianDong());
                SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
                Date date = new Date();
                Date now = new SimpleDateFormat("dd/MM/yyyy hh:mm").parse(formatter.format(date));
                if ( !(thoiGianDong.before(now) || thoiGianMo.after(now)) ) {
                    flag = true;
                }
            }
        }
        return flag;
    }
}

package backendcom.example.backend.api;

import backendcom.example.backend.model.ThoiKhoaBieuToanTruong;
import backendcom.example.backend.dao.ThoiKhoaBieuToanTruongDAO;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/thoi-khoa-bieu-toan-truong")
public class ThoiKhoaBieuToanTruongController {

    private final ThoiKhoaBieuToanTruongDAO thoiKhoaBieuToanTruongDAO;

    public ThoiKhoaBieuToanTruongController(ThoiKhoaBieuToanTruongDAO thoiKhoaBieuToanTruongDAO) {
        this.thoiKhoaBieuToanTruongDAO = thoiKhoaBieuToanTruongDAO;
    }

    @RequestMapping(value = "/")
    @ResponseBody
    public List<ThoiKhoaBieuToanTruong> getAllThoiKhoaBieuToanTruong() {
        List<ThoiKhoaBieuToanTruong> list = thoiKhoaBieuToanTruongDAO.findAll();
        list.sort((l1, l2) -> thoiKhoaBieuToanTruongDAO.findFirstById(l1.getId()).getThu().compareTo(thoiKhoaBieuToanTruongDAO.findFirstById(l2.getId()).getThu()));
        return list;
    }

    @RequestMapping(value = "/mobile")
    @ResponseBody List<ThoiKhoaBieuToanTruong> ThoiKhoaBieuToanTruongMobile() {
        List<ThoiKhoaBieuToanTruong> list = thoiKhoaBieuToanTruongDAO.findAll();
        list.sort((l1, l2) -> thoiKhoaBieuToanTruongDAO.findFirstById(l1.getId()).getThu().compareTo(thoiKhoaBieuToanTruongDAO.findFirstById(l2.getId()).getThu()));
        return list.subList(0, 200);
    }

    @PostMapping(value = "/import/{filename}")
    @ResponseBody
    public boolean importDiemTongKet(@PathVariable String filename) throws IOException {
        thoiKhoaBieuToanTruongDAO.deleteAll();

        BufferedReader reader = Files.newBufferedReader(Paths.get("C:\\Users\\HaAnhTU\\Desktop\\DKH\\csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f", "g", "h").withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            ThoiKhoaBieuToanTruong thoiKhoaBieuToanTruong = new ThoiKhoaBieuToanTruong();
            thoiKhoaBieuToanTruong.setMaMon(csvRecord.get(0));
            thoiKhoaBieuToanTruong.setTenMon(csvRecord.get(1));
            thoiKhoaBieuToanTruong.setTenLop(csvRecord.get(2));
            thoiKhoaBieuToanTruong.setThu(csvRecord.get(3));
            thoiKhoaBieuToanTruong.setCa(csvRecord.get(4));
            thoiKhoaBieuToanTruong.setPhongHoc(csvRecord.get(5));
            thoiKhoaBieuToanTruong.setTinChi(csvRecord.get(6));
            thoiKhoaBieuToanTruong.setGiaoVien(csvRecord.get(7));

            thoiKhoaBieuToanTruongDAO.save(thoiKhoaBieuToanTruong);
        }
        return true;
    }
}

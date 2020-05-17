package backendcom.example.backend.api;

import backendcom.example.backend.model.ChuongTrinhHoc;
import backendcom.example.backend.dao.ChuongTrinhHocDAO;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/chuong-trinh-hoc")
public class ChuongTrinhHocController {

    private final ChuongTrinhHocDAO chuongTrinhHocDAO;

    public ChuongTrinhHocController(ChuongTrinhHocDAO chuongTrinhHocDAO) {
        this.chuongTrinhHocDAO = chuongTrinhHocDAO;
    }

    @GetMapping(value = "/")
    @ResponseBody
    public List<ChuongTrinhHoc> getAllChuongTrinhHoc() { return chuongTrinhHocDAO.findAll(); }

    @GetMapping(value = "/{tenNganh}")
    @ResponseBody
    public List<ChuongTrinhHoc> getChuongTrinhHocTheoNganh(@PathVariable String tenNganh) { return chuongTrinhHocDAO.findByTenNganh(tenNganh); }

    @PostMapping(value = "/import/{filename}")
    @ResponseBody
    public boolean importChuongTrinhHoc(@PathVariable String filename) throws IOException {
        chuongTrinhHocDAO.deleteAll();

        BufferedReader reader = Files.newBufferedReader(Paths.get("C:\\Users\\HaAnhTU\\Desktop\\DKH\\csv\\" + filename));
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("a", "b", "c", "d", "e", "f").withIgnoreHeaderCase().withTrim());

        for (CSVRecord csvRecord: csvParser) {
            ChuongTrinhHoc chuongTrinhHoc = new ChuongTrinhHoc();
            chuongTrinhHoc.setTenNganh(csvRecord.get(0));
            chuongTrinhHoc.setMaMon(csvRecord.get(1));
            chuongTrinhHoc.setTenMon(csvRecord.get(2));
            chuongTrinhHoc.setDKTQ(csvRecord.get(3));
            chuongTrinhHoc.setTCTQ(csvRecord.get(4));
            chuongTrinhHoc.setTinChi(csvRecord.get(5));

            chuongTrinhHocDAO.save(chuongTrinhHoc);
        }
        return true;
    }
}

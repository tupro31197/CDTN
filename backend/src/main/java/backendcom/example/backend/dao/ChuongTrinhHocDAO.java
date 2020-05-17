package backendcom.example.backend.dao;

import backendcom.example.backend.model.ChuongTrinhHoc;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChuongTrinhHocDAO extends MongoRepository<ChuongTrinhHoc, String> {
    List<ChuongTrinhHoc> findByTenNganh(String tenNganh);
    ChuongTrinhHoc findFirstByMaMon(String maMon);
}

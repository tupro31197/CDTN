package backendcom.example.backend.dao;

import backendcom.example.backend.model.LopHoc;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LopHocDAO extends MongoRepository<LopHoc, String> {
    List<LopHoc> findByMaSinhVien(String maSinhVien);
    List<LopHoc> findByMaGiaoVien(String maGiaoVien);
    LopHoc findFirstByMaTKBTTAndMaSinhVien(String maTKBTT, String maSinhVien);
}

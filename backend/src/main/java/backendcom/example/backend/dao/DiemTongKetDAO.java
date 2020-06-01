package backendcom.example.backend.dao;

import backendcom.example.backend.model.DiemTongKet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DiemTongKetDAO extends MongoRepository<DiemTongKet, String> {
    List<DiemTongKet> findByMaSinhVien(String maSinhVien);
    DiemTongKet findFirstByMaSinhVien(String maSinhVien);
    List<DiemTongKet> findByOrderByMaSinhVien();
}

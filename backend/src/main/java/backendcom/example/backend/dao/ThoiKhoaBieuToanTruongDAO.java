package backendcom.example.backend.dao;

import backendcom.example.backend.model.ThoiKhoaBieuToanTruong;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ThoiKhoaBieuToanTruongDAO extends MongoRepository<ThoiKhoaBieuToanTruong, String> {
    ThoiKhoaBieuToanTruong findFirstById(String id);
    List<ThoiKhoaBieuToanTruong> findByTenMon(String tenMon);
}

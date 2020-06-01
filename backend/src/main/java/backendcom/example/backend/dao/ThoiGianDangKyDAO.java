package backendcom.example.backend.dao;

import backendcom.example.backend.model.ThoiGianDangKy;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ThoiGianDangKyDAO extends MongoRepository<ThoiGianDangKy, String> {
}

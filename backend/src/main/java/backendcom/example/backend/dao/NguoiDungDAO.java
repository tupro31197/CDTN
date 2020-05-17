package backendcom.example.backend.dao;

import backendcom.example.backend.model.NguoiDung;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface NguoiDungDAO extends MongoRepository<NguoiDung, String> {
    Optional<NguoiDung> findById(String Id);

    NguoiDung findByMaNguoiDung(String maNguoiDung);
}

package springboot.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import springboot.server.model.Term;

import java.util.List;

public interface TermRepository extends MongoRepository<Term, String> {
    List<Term> findAll();
}

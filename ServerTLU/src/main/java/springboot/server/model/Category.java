package springboot.server.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}

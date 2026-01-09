package com.assignment.backend.repository;

import com.assignment.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("""
        SELECT p FROM Product p
        WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Product> searchProducts(String keyword);
}

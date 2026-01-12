package com.assignment.backend.repository;

import com.assignment.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {

    // by category filtering
    List<Product> findByCategoryIn(List<String> values);

    // by keyword search
    List<Product> findByTitleContainingOrCategoryContaining(String s1, String s2);

    //by date input
    List<Product> findByCreatedAtBetween(String start, String end);

    //by id
    Product findById(int id);


}

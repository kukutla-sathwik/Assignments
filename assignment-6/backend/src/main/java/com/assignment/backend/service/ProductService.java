package com.assignment.backend.service;


import com.assignment.backend.dto.ProductRequest;
import com.assignment.backend.entity.Product;
import com.assignment.backend.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /*
        public List<Product> fetchByCategory(List<String> values) {
            return productRepository.findByCategoryIn(values);
        }


        public Product fetchById() {
            return productRepository.findById(id);
        }

        public List<Product> fetchByDate(String start, String end) {
            return productRepository.findByCreatedAtBetween(start, end);
        }

        public List<Product> fetchBySearch(String search) {
            return productRepository.findByTitleContainingOrCategoryContaining(search, search);
        }

    */
    public List<Product> findProducts(
            List<String> categories,
            LocalDate startDate,
            LocalDate endDate,
            String search
    ) {

        return productRepository.findAll((root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // IN operator for categories
            if (categories != null && !categories.isEmpty()) {
                predicates.add(
                        root.get("category").in(categories)
                );
            }

            // start date filter
            if (startDate != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("createdAt"),
                                startDate
                        )
                );
            }

            // end date filter
            if (endDate != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("createdAt"),
                                endDate
                        )
                );
            }

            // search filter
            if (search != null && !search.isBlank()) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("title")),
                                "%" + search.toLowerCase() + "%"
                        )
                );
            }


            if (predicates.isEmpty()) {
                return cb.conjunction();
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }

    public Product findProductById(int id) {
        return productRepository.findById(id);
    }

    public void postProduct(ProductRequest request) {

        Product product = new Product();

        product.setTitle(request.getTitle());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());

        Product save = productRepository.save(product);
    }


}

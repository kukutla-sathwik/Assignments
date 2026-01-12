package com.assignment.backend.controller;

import com.assignment.backend.dto.ProductRequest;
import com.assignment.backend.entity.Product;
import com.assignment.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("products/getProducts")
    public List<Product> getProducts(
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String search
    ) {
        return productService.findProducts(
                categories,
                startDate,
                endDate,
                search
        );

    }


    @GetMapping("/products/getProduct/{productId}")
    Product getProduct(@PathVariable int productId) {
        return productService.findProductById(productId);
    }

    @PostMapping("/product/add")
    public ResponseEntity<Void> postProduct(@RequestBody ProductRequest request) {


        productService.postProduct(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }



/*
    @GetMapping("/products/category")
    List<Product> productFetch1() {
        List<String> values = Arrays.asList("furniture", "fragrance");
        return productService.fetchByCategory(values);
    }

    @GetMapping("/products/search")
    List<Product> productFetch2() {
        return productService.fetchBySearch("beauty");
    }

    @GetMapping("/products/date")
    List<Product> productFetch3() {
        return productService.fetchByDate("2000-04-30", "2025-04-30");
    }

 */


}

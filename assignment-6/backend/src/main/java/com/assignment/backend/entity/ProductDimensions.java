package com.assignment.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_dimensions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDimensions {

    @Id
    @Column(name = "product_id")
    private Integer productId;

    private Double width;
    private Double height;
    private Double depth;

    @OneToOne
    @MapsId
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private Product product;
}

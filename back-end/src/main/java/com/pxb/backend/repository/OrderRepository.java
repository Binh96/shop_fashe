package com.pxb.backend.repository;

import com.pxb.backend.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderProduct, Integer> {
}

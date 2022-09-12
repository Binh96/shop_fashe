package com.pxb.backend.controller;

import com.pxb.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/order-product")
public class OrderProductController {
    @Autowired
    private IOrderService iOrderService;
}

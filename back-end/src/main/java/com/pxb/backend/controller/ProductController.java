package com.pxb.backend.controller;

import com.pxb.backend.dto.CategoryDto;
import com.pxb.backend.dto.ProductDto;
import com.pxb.backend.model.Product;
import com.pxb.backend.service.ICategoriesService;
import com.pxb.backend.service.IProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService productService;
    @Autowired
    private ICategoriesService iCategoriesService;

    @GetMapping("/getProduct")
    public ResponseEntity<Page<Product>> getAllProduct(@PageableDefault(10)Pageable pageable){
        Page<Product> products = productService.getAll(pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/get-categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories(){
        List<CategoryDto> categoriesDto = iCategoriesService.getAllCategoryHasPicture();
        return new ResponseEntity<>(categoriesDto, HttpStatus.OK);
    }

    @GetMapping("/get-product/{name}")
    public ResponseEntity<Page<Product>> getAllProduct(@PathVariable String name,
                                                       @PageableDefault(20) Pageable pageable,
                                                       @RequestParam("page") Optional<Integer> page) {
        Page<Product> products = productService.getAllProductByCategory(name, pageable);
        if (products.isEmpty()) {
            return new ResponseEntity<>(products, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("/get-product-by-name/{name}&{category}")
    public ResponseEntity<Product> searchProductByName(@PathVariable String name,
                                                             @PathVariable int category){
        Product product = productService.searchProductByName(name, category);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(product, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get-product-by-filter-price/{name}&{category}&{brand}&{first}&{second}")
    public ResponseEntity<List<Product>> searchProductByFilterPrice(@PathVariable String name,
                                                             @PathVariable String first,
                                                             @PathVariable String second,
                                                             @PathVariable int category,
                                                             @PathVariable String brand){
        List<Product> products = productService.searchProductByFilterPrice(first, second, name, category, brand);
        if (products.isEmpty()) {
            return new ResponseEntity<>(products, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("/getDetailProduct/{id}")
    public ResponseEntity<Product> getAllProduct(@PathVariable int id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/create-product")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDto productDto, BindingResult bindingResult){
        Product product = new Product();
        if(!bindingResult.hasErrors()){
            BeanUtils.copyProperties(productDto, product);
            productService.createProduct(product);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
    }
}

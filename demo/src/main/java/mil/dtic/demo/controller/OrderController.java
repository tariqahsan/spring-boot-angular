package mil.dtic.demo.controller;

import mil.dtic.demo.dto.OrderRequest;
import mil.dtic.demo.dto.OrderResponse;
import mil.dtic.demo.model.Customer;
import mil.dtic.demo.repository.CustomerRepository;
import mil.dtic.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ProductRepository productRepository;

    // @PostMapping("/placeOrder")
    // public Customer placeOrder(@RequestBody OrderRequest request){
    //    return customerRepository.save(request.getCustomer());
    // }

    // @PostMapping("/placeOrder")
    // public Customer placeOrder(@RequestBody OrderRequest request){
    //     System.out.println("=== DEBUGGING ===");
    //     System.out.println("Request is null? " + (request == null));
    //     System.out.println("Request toString: " + request);
        
    //     if (request != null) {
    //         System.out.println("Customer is null? " + (request.getCustomer() == null));
    //         System.out.println("Customer: " + request.getCustomer());
    //     }
    //     System.out.println("=== END DEBUG ===");
        
    //     if (request == null || request.getCustomer() == null) {
    //         throw new IllegalArgumentException("Customer cannot be null in request");
    //     }
        
    //     return customerRepository.save(request.getCustomer());
    // }

    @PostMapping("/placeOrder")
    public Customer placeOrder(@RequestBody OrderRequest request){
        Customer customer = request.getCustomer();
        
        // Set the customer reference in each product
        if (customer != null && customer.getProducts() != null) {
            customer.getProducts().forEach(product -> product.setCustomer(customer));
        }
        
        return customerRepository.save(customer);
    }
    @GetMapping("/findAllOrders")
    public List<Customer> findAllOrders(){
        return customerRepository.findAll();
    }

    @GetMapping("/getInfo")
    public List<OrderResponse> getJoinInformation(){
        return customerRepository.getJoinInformation();
    }
}

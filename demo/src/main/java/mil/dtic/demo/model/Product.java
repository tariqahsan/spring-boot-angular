package mil.dtic.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "customer")  // Avoid circular reference in toString
@Entity
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pid;
    
    private String productName;
    private Integer qty;
    private Integer price;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    // The infinite loop in the JSON response is a common issue with bidirectional JPA relationships. It happens because:
    // - Customer contains Products
    // - Each Product contains Customer
    // - Which contains Products... (infinite loop)
    // Option 1: @JsonManagedReference and @JsonBackReference (Simplest)
    // Option 2: @JsonIgnore (Most common)
    // Option 3: Use DTOs (Best for production)
    @JsonIgnore
    private Customer customer;
}

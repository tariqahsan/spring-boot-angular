package mil.dtic.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import jakarta.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Customer {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String email;
    private String gender;
    // @OneToMany(targetEntity = Product.class,cascade = CascadeType.ALL)
    // @JoinColumn(name ="cp_fk",referencedColumnName = "id")

    // @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // @JoinColumn(name = "customer_id", referencedColumnName = "id")
    // private List<Product> products;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

}

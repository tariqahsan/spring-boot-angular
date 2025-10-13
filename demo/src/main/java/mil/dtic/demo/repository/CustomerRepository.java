package mil.dtic.demo.repository;

import mil.dtic.demo.dto.OrderResponse;
import mil.dtic.demo.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {

   @Query("SELECT new mil.dtic.demo.dto.OrderResponse(c.name , p.productName) FROM Customer c JOIN c.products p")
    public List<OrderResponse> getJoinInformation();
}

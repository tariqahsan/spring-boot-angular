package org.mma.training.java.spring.repository;

import org.mma.training.java.spring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{

}

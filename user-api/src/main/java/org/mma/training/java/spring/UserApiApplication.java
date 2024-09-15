package org.mma.training.java.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class UserApiApplication {

	public static void main(String[] args) {
		System.out.println("Salaam!");
		SpringApplication.run(UserApiApplication.class, args);
	}
	
	@GetMapping("/welcome")
	public String greeting() {
		return "Assalaam u alaikum from our Community!";
	}

}

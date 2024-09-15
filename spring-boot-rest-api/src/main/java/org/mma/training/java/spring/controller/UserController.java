package org.mma.training.java.spring.controller;

import java.util.List;
import java.util.Optional;

import org.mma.training.java.spring.model.User;
import org.mma.training.java.spring.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		
		return new ResponseEntity<List<User>>(userRepository.findAll(), HttpStatus.OK);		
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") long userId) {
		
		Optional<User> user = userRepository.findById(userId);
		
		try {
			if(user.isPresent()) {
				return new ResponseEntity<User>(user.get(), HttpStatus.FOUND);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PostMapping("/users/add") 
	public ResponseEntity<User> addUser(@RequestBody User user) {
		
		return new ResponseEntity<User>(userRepository.save(user), HttpStatus.CREATED);
	}
	
	@PutMapping("/users/update/{id}")
	public ResponseEntity<User> updateUserById(@PathVariable("id") long userId, @RequestBody User user) {
		
		Optional<User> userDetail = userRepository.findById(userId);
		
		try {
			if(userDetail.isPresent()) {
				user.setId(userDetail.get().getId());
				BeanUtils.copyProperties(userDetail, user);
				return new ResponseEntity<User>(userRepository.save(user), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@DeleteMapping("/users/delete/{id}")
	public ResponseEntity<User> deleteUserById(@PathVariable("id") long userId) {
		
		Optional<User> userDetail = userRepository.findById(userId);
		
		try {
			if(userDetail.isPresent()) {
				userRepository.deleteById(userId);
				return new ResponseEntity<>(null, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

}

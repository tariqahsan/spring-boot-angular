package org.mma.training.java.spring.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.mma.training.java.spring.model.User;
import org.mma.training.java.spring.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
public class UserController {

	@Autowired
	UserRepository userRepository;

	@GetMapping("/users")
	public List<User> getUsers() {

		return userRepository.findAll();
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		Optional<User> user = userRepository.findById(id);

		if(user.isPresent()) {
			return new ResponseEntity<User>(user.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@PostMapping("users/add")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		return new ResponseEntity<User>(userRepository.save(user), HttpStatus.CREATED);
	}

	@PutMapping("users/update/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
		Optional<User> userDb = userRepository.findById(id);
		if (userDb.isPresent()) {
			System.out.println("USERDB: " + userDb.get().getId());
			System.out.println("USERDB: " + userDb.get().getFirstName());
			System.out.println("USERDB: " + userDb.get().getLastName());
			System.out.println("USERDB: " + userDb.get().getPhone());
			System.out.println("USERDB: " + userDb.get().getEmail());
			user.setId(userDb.get().getId());
			BeanUtils.copyProperties(user, userDb.get(), getNullOrBlankPropertyNames(user));
			System.out.println(user.getFirstName());
			System.out.println(user.getLastName());
			System.out.println(user.getEmail());
			System.out.println("USERDB: " + userDb.get().getEmail());
			return new ResponseEntity<User>(userRepository.save(userDb.get()), HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/users/delete/{id}")
	public ResponseEntity<User> deleteUserById(@PathVariable long id) {
		
		Optional<User> user = userRepository.findById(id);
		if(!user.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		// Delete row by ID
		userRepository.deleteById(id);
		return new ResponseEntity<>(null, HttpStatus.OK);
		
	}
	
	// Helper method to get the list of null properties in the updated entity
	/**
	 * The getNullPropertyNames() helper method identifies which fields are null in the 
	 * updated entity and prevents them from being copied over.
	 * 
	 * @param source
	 * @return
	 */
	private String[] getNullPropertyNames(User source) {
		return Arrays.stream(BeanUtils.getPropertyDescriptors(source.getClass()))
				.map(pd -> {
					try {
						return pd.getReadMethod().invoke(source) == null ? pd.getName() : null;
					} catch (Exception e) {
						return null;
					}
				})
				.filter(Objects::nonNull)
				.toArray(String[]::new);
	}


	// Helper method to get the list of null or blank property names in the updated entity
	/**
	 * This helper method identifies which fields are null in the 
	 * updated entity and prevents them from being copied over.
	 * In addition to checking if the value is null, we also check if the value is a String and whether it is 
	 * blank (either empty or contains only whitespace) using ((String) value).trim().isEmpty().
	 * If the value is either null or blank, the property name is added to the list of properties to be ignored 
	 * by BeanUtils.copyProperties().
	 * @param source
	 * @return
	 */
	private String[] getNullOrBlankPropertyNames(User source) {
		return Arrays.stream(BeanUtils.getPropertyDescriptors(source.getClass()))
				.map(pd -> {
					try {
						Object value = pd.getReadMethod().invoke(source);
						// Treat null or blank strings as null
						if (value == null || (value instanceof String && ((String) value).trim().isEmpty())) {
							System.out.println("pd.getName() -> " + pd.getName());
							return pd.getName();
						}
					} catch (Exception e) {
						return null;
					}
					return null;
				})
				.filter(Objects::nonNull)
				.toArray(String[]::new);
	}
}

package org.mma.training.java.spring.controller;

import java.util.List;
import java.util.Optional;

import org.mma.training.java.spring.model.Employee;
import org.mma.training.java.spring.repository.EmployeeRepository;
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

@RestController20 885659
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class EmployeeController {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@GetMapping("/employees")
	public ResponseEntity<List<Employee>> getAllEmployees() {
		
		return new ResponseEntity<List<Employee>>(employeeRepository.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long empId) {
		
		Optional<Employee> employee = employeeRepository.findById(empId);
		
		try {
			
			if(employee.isPresent()) {
			
				return new ResponseEntity<Employee>(employee.get(), HttpStatus.FOUND);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PostMapping("/employees/add") 
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee){
		System.out.println("ID is -->" + employee.getId());
		return new ResponseEntity<Employee>(employeeRepository.save(employee), HttpStatus.CREATED);
		
	}
	
	@PutMapping("/employees/update/{id}")
	public ResponseEntity<Employee> updateEmployeeById(@PathVariable("id") Long empId, @RequestBody Employee employee) {
		
		Optional<Employee> employeeDetail = employeeRepository.findById(empId);
		
		try {
			
			if(employeeDetail.isPresent()) {
				
				employee.setId(employeeDetail.get().getId());
				
				BeanUtils.copyProperties(employeeDetail, employee);
			
				return new ResponseEntity<Employee>(employeeRepository.save(employee), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@DeleteMapping("/employees/delete/{id}")
	public ResponseEntity<Employee> deleteEmployeeById(@PathVariable("id") Long empId) {
		
		Optional<Employee> employee = employeeRepository.findById(empId);
		
		try {
			
			if(employee.isPresent()) {
				employeeRepository.deleteById(empId);
				return new ResponseEntity<>(null, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

}

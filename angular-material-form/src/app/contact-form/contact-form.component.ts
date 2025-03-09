import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service'; // Adjust path as necessary
import { Contact } from '../contact.model'; // Adjust path as necessary

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData: Contact = {
        name: this.contactForm.value.fullName,
        email: this.contactForm.value.email,
      };

      this.contactService.createContact(contactData).subscribe(
        response => {
          console.log('Contact created:', response);
          // Handle success (e.g., show a success message or redirect)
        },
        error => {
          console.error('Error creating contact:', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
  }
}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-contact-form',
//   templateUrl: './contact-form.component.html',
//   styleUrl: './contact-form.component.css'
// })
// export class ContactFormComponent implements OnInit {

//   contactForm!: FormGroup;

//   constructor(private formBuilder: FormBuilder) {}

//   ngOnInit() {
//     this.contactForm = this.formBuilder.group({
//       fullName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       message: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     console.log('Reactive form data:', this.contactForm.value);
//     // Handle submission logic here.
//   }

  // onSubmit(form: NgForm) {
  //   console.log('Your form data:', form.value);
  //   // Here you can handle form submission, e.g., send it to a server.
  // }

//}

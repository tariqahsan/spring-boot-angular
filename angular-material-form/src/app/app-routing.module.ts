import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component'; // Import your component
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: 'contact', component: ContactFormComponent }, // Define route for contact form
  { path: 'user', component: UserFormComponent}, // Define route for user form
  { path: '', redirectTo: '/contact', pathMatch: 'full' }, // Redirect to contact form on empty path
  // Add more routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

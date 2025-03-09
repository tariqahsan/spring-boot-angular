import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatInputModule } from '@angular/material/input'; // For inputs
import { MatButtonModule } from '@angular/material/button'; // For buttons
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    FooterComponent,
    HeaderComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    provideAnimationsAsync(), provideHttpClient()
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

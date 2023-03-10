import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeTableComponent } from './employees/employee-table/employee-table.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeesComponent,
    EmployeeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
